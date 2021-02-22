import { createClient } from 'contentful';
import dotenv from 'dotenv';
import moment from 'moment';
import { CMS } from '../constants';
import { IAuthor, IFigureImage, IPost } from '../types/cms';

interface IPath {
  params: { slug: string };
}

interface IFetchBlogEntriesReturn {
  posts: Array<IPost>;
  total: number;
}

dotenv.config();

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const convertPost = (rawData): IPost => {
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
    tags: rawPost?.tags, //?.map(t => t?.fields?.label) ?? [],
    title: rawPost.title,
    featureImage: convertImage(rawFeatureImage),
    author: convertAuthor(rawAuthor),
  };
};

const convertImage = (rawImage): IFigureImage =>
  rawImage
    ? {
        imageUrl: rawImage.file.url.replace('//', 'http://'), // may need to put null check as well here
        description: rawImage.description ?? null,
        title: rawImage.title ?? null,
      }
    : null;

const convertAuthor = (rawAuthor): IAuthor =>
  rawAuthor
    ? {
        name: rawAuthor?.name ?? null,
        avatar: convertImage(rawAuthor.avatar.fields),
        shortBio: rawAuthor?.shortBio ?? null,
        position: rawAuthor?.position ?? null,
        email: rawAuthor?.email ?? null,
        twitter: rawAuthor?.twitter ?? null,
        facebook: rawAuthor.facebook ?? null,
        github: rawAuthor.github ?? null,
      }
    : null;

const fetchBlogEntries = async (
  quantity = CMS.BLOG_RESULTS_PER_PAGE,
  page = 1,
): Promise<IFetchBlogEntriesReturn> => {
  console.log('cms ➡️ page:', page);
  console.log('cms ➡️ quantity:', quantity);
  console.log('cms ➡️ (page - 1) * quantity:', (page - 1) * quantity);

  try {
    const entries = await client.getEntries({
      content_type: 'post', // only fetch blog post entry
      order: '-fields.date',
      limit: quantity,
      skip: (page - 1) * quantity,
    });

    if (entries && entries.items && entries.items.length > 0) {
      const blogPosts = entries.items.map(entry => convertPost(entry));
      return { posts: blogPosts, total: entries.total };
    }

    return { posts: [], total: 0 } as IFetchBlogEntriesReturn;
  } catch (e) {
    return { posts: [], total: 0 } as IFetchBlogEntriesReturn;
  }
};

describe('getStaticPaths', () => {
  test('', async () => {
    let posts: IPost[] = [];
    let page = 1;
    let foundAllPosts = false;

    // Contentful only allows 100 at a time
    while (!foundAllPosts) {
      const { posts: _posts } = await fetchBlogEntries(100, page);

      if (_posts.length === 0) {
        foundAllPosts = true;
        continue;
      }

      posts = [...posts, ..._posts];
      page++;
    }

    const paths: IPath[] = posts.map(item => ({
      params: { slug: item.slug },
    }));

    console.log('getStaticPaths.test ➡️     postPaths:', paths);
  });
});
