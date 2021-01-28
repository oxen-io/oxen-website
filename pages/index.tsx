import React from 'react';
// import { ISanityArticle } from '../types/article';

// interface Props {
// posts: Array<ISanityArticle>;
// AuthUserInfo: any;
// }

// const Index: NextPage<Props> = () => {
const Index = () => {
  // const cards = posts
  //   ? posts.slice(0, 4).map(post => <ArticleCard key={post.id} {...post} />)
  //   : [];

  // console.log('posts', posts);

  return (
    <div>
      {/* <Head>
        <title>{METADATA.TITLE_SUFFIX}</title>
        <meta
          property="og:title"
          content="Oxen - Privacy should be simple."
          key="title"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head> */}
    </div>
  );
};

// Index.getInitialProps = async () => {
//   const query = groq`
//     *[_type == "post"]|order(publishedAt desc) {
//       ${sanityPostQuery}
//     }
//   `;

//   let posts: Array<ISanityArticle>;
//   try {
//     posts = await client.fetch(query);
//     console.log('Posts', posts);
//   } catch (error) {
//     console.warn('Error:', error);
//   }

//   return { posts };
// };

// export default withAuthUser(withAuthUserInfo(Index));
export default Index;
