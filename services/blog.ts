import { ContentfulClientApi, createClient } from 'contentful';
import moment from 'moment';
import { IAuthor, IFigureImage, IPost } from '../types/blog';

export class BlogApi {
  client: ContentfulClientApi;

  constructor() {
    this.client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
  }

  async fetchBlogEntries(): Promise<Array<IPost>> {
    return this.client
      .getEntries({
        // content_type: 'blogPost', // only fetch blog post entry
      })
      .then(entries => {
        console.log('blog ➡️           entries:', entries);
        if (entries && entries.items && entries.items.length > 0) {
          const blogPosts = entries.items.map(entry => this.convertPost(entry));
          return blogPosts;
        }
        return [];
      });
  }

  async fetchBlogById(id): Promise<IPost> {
    return this.client.getEntry(id).then(entry => {
      if (entry) {
        const post = this.convertPost(entry);
        return post;
      }
      return null;
    });
  }

  convertImage = (rawImage): IFigureImage => {
    if (rawImage) {
      return {
        imageUrl: rawImage.file.url.replace('//', 'http://'), // may need to put null check as well here
        description: rawImage.description,
        title: rawImage.title,
      };
    }
    return null;
  };

  convertAuthor = (rawAuthor): IAuthor => {
    if (rawAuthor) {
      return {
        name: rawAuthor.name,
        phone: rawAuthor.phone,
        shortBio: rawAuthor.shortBio,
        title: rawAuthor.title,
        email: rawAuthor.email,
        twitter: rawAuthor.twitter,
        facebook: rawAuthor.facebook,
        github: rawAuthor.github,
      };
    }
    return null;
  };

  convertPost = (rawData): IPost => {
    const rawPost = rawData.fields;
    const rawFeatureImage = rawPost.featureImage
      ? rawPost.featureImage.fields
      : null;
    const rawAuthor = rawPost.author ? rawPost.author.fields : null;
    return {
      id: rawData.sys.id,
      body: rawPost.body,
      description: rawPost.description,
      publishedDate: moment(rawPost.publishedDate).format('DD MMM YYYY'),
      slug: rawPost.slug,
      tags: rawPost.tags,
      title: rawPost.title,
      featureImage: this.convertImage(rawFeatureImage),
      author: this.convertAuthor(rawAuthor),
    };
  };
}
