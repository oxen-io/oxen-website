import { ContentfulClientApi, createClient } from 'contentful';
import moment from 'moment';
import { CMS } from '../constants';
import { SideMenuItem, TPages } from '../state/navigation';
import { IAuthor, IFigureImage, IPost, ISplitPage } from '../types/cms';

// Turns CMS IDs into slugs
export const slugify = (id: string) => id?.replace(/_/g, '-').toLowerCase();
export const unslugify = (slug: string) =>
  slug.replace(/-/g, '_').toUpperCase();

export class CmsApi {
  client: ContentfulClientApi;

  constructor() {
    this.client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
  }

  public async fetchBlogEntries(): Promise<Array<IPost>> {
    return this.client
      .getEntries({
        content_type: 'post', // only fetch blog post entry
        order: 'sys.createdAt',
      })
      .then(entries => {
        if (entries && entries.items && entries.items.length > 0) {
          console.log('cms ➡️ entries:', entries);

          const blogPosts = entries.items.map(entry => this.convertPost(entry));

          return blogPosts;
        }
        return [];
      });
  }

  public async fetchBlogById(id): Promise<IPost> {
    return this.client.getEntry(id).then(entry => {
      if (entry) {
        return this.convertPost(entry);
      }
      return null;
    });
  }

  public async fetchBlogBySlug(slug: string): Promise<IPost> {
    return this.client
      .getEntries({
        content_type: 'post',
        'fields.slug[in]': slug,
      })
      .then(entries => {
        if (entries && entries.items && entries.items.length > 0) {
          const post = this.convertPost(entries.items[0]);
          return post;
        }
        return null;
      });
  }

  public async fetchBlogEntriesByTag(tag: string): Promise<IPost[]> {
    return this.client
      .getEntries({
        content_type: 'post',
        'fields.tags.sys.id[in]': tag,
      })
      .then(entries => {
        if (entries && entries.items && entries.items.length > 0) {
          const posts = entries.items.map(entry => this.convertPost(entry));
          return posts;
        }
        return [];
      });
  }

  public async fetchPageEntries(): Promise<TPages> {
    try {
      const entries = await this.client.getEntries({
        content_type: 'splitPage', // only fetch blog post entry
        order: 'sys.createdAt',
      });

      if (entries && entries.items && entries.items.length > 0) {
        const pagesArray = entries.items.map(entry => this.convertPage(entry));

        const pages: TPages = {};
        pagesArray.forEach(page => {
          const pageExists = SideMenuItem[page.id];

          if (pageExists) {
            pages[page.id] = page;
          }
        });

        return pages;
      }
    } catch (e) {
      return {};
    }
  }

  public async fetchPageById(id: SideMenuItem): Promise<ISplitPage> {
    return this.client
      .getEntries({
        content_type: 'splitPage',
        'fields.id[in]': id,
      })
      .then(entries => {
        if (entries && entries.items && entries.items.length > 0) {
          return this.convertPage(entries.items[0]);
        }
        return null;
      });
  }

  public convertImage = (rawImage): IFigureImage =>
    rawImage
      ? {
          imageUrl: rawImage.file.url.replace('//', 'http://'), // may need to put null check as well here
          description: rawImage.description ?? null,
          title: rawImage.title ?? null,
        }
      : null;

  public convertAuthor = (rawAuthor): IAuthor =>
    rawAuthor
      ? {
          name: rawAuthor?.name ?? null,
          avatar: this.convertImage(rawAuthor.avatar.fields),
          shortBio: rawAuthor?.shortBio ?? null,
          position: rawAuthor?.position ?? null,
          email: rawAuthor?.email ?? null,
          twitter: rawAuthor?.twitter ?? null,
          facebook: rawAuthor.facebook ?? null,
          github: rawAuthor.github ?? null,
        }
      : null;

  public convertPost = (rawData): IPost => {
    const rawPost = rawData.fields;
    const rawFeatureImage = rawPost?.featureImage
      ? rawPost?.featureImage.fields
      : null;
    const rawAuthor = rawPost.author ? rawPost.author.fields : null;

    return {
      id: rawData.sys.id ?? null,
      body: rawPost.body ?? null,
      subtitle: rawPost.subtitle ?? null,
      description: rawPost.description ?? null,
      publishedDate: moment(rawPost.date).format('DD MMMM YYYY'),
      slug: rawPost.slug,
      tags: rawPost?.tags?.map(t => t?.fields?.label) ?? [],
      title: rawPost.title,
      featureImage: this.convertImage(rawFeatureImage),
      author: this.convertAuthor(rawAuthor),
    };
  };

  public convertPage = (rawData): ISplitPage => {
    const rawPage = rawData.fields;
    const rawHero = rawPage?.hero ? rawPage?.hero?.fields : null;

    return {
      id: SideMenuItem[rawPage?.id] ?? null,
      label: rawPage?.label ?? null,
      title: rawPage?.title ?? null,
      body: rawPage?.body ?? null,
      hero: this.convertImage(rawHero),
    };
  };
}

interface IShortcodeGeneralButton {
  href: string;
  text: string;
}

export const extractShortcodeGeneralButton = (
  value: string,
): IShortcodeGeneralButton => {
  if (!CMS.SHORTCODES.GENERAL_BUTTON.test(value)) {
    return null;
  }

  // Pull our href and text
};
