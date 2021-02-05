import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { METADATA } from '../constants';
import { ScreenContext } from '../contexts/screen';
import { CmsApi } from '../services/cms';
import { SideMenuItem } from '../state/navigation';
import { IState } from '../state/reducers';

export async function getServerSideProps() {
  const api = new CmsApi();
  const page = await api.fetchPageById(SideMenuItem.WHO_ARE_WE);

  console.log('index ➡️  page:', page);
  return { props: page };
}

const Index = (
  page: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  // const cards = posts
  //   ? posts.slice(0, 4).map(post => <ArticleCard key={post.id} {...post} />)
  //   : [];

  // console.log('posts', posts);

  const { isTablet } = useContext(ScreenContext);
  const { sideMenuExpanded } = useSelector((state: IState) => state.navigation);

  return (
    <div>
      <Head>
        <title>{METADATA.TITLE_SUFFIX}</title>
        <meta
          property="og:title"
          content="Oxen - Privacy should be simple."
          key="title"
        />
      </Head>

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A nostrum
        temporibus, velit repellat accusamus quis nam praesentium porro magni
        omnis nulla natus fugit sequi ex reprehenderit, illum, necessitatibus
        est amet voluptate odit mollitia voluptas officia in? Repellat minus
        quod repellendus, quisquam dolorem numquam asperiores illo nemo quidem
        voluptate. Iure itaque reprehenderit, hic laborum sit dolorum in quidem,
        maxime odio voluptate non? Autem commodi, hic magni natus praesentium
        blanditiis voluptas minus enim ipsa quam quae amet assumenda fugit iusto
        a ea voluptatibus rerum in perferendis doloribus. Laborum, in assumenda?
        Temporibus error dolorum numquam labore illum atque reprehenderit,
        cupiditate tenetur repellendus eos omnis, minima explicabo id odit ea?
        Reprehenderit atque perspiciatis provident amet est! Commodi dolor,
        officia excepturi rerum dolores numquam cum sequi ab pariatur
        repellendus, sapiente aperiam perferendis, dolorum perspiciatis ea nisi
        sed impedit debitis? Dicta ad quae tempora at sed. Sapiente id suscipit
        iure libero eos odit ut excepturi aliquam doloribus, eligendi magni
        illo, dolorum veritatis iusto. Accusantium voluptates dolor sapiente sit
        cupiditate rem architecto ipsum non tempora assumenda. Aut id ratione
        ex. Vel, neque iste. Aliquid nostrum aperiam dolorem ad ab maxime.
        Similique sapiente cumque blanditiis autem eos eius culpa temporibus
        sint in illo, architecto corporis ipsam a molestiae reprehenderit libero
        reiciendis error sunt dolorum veritatis dolor fugiat esse doloremque
        laboriosam. Omnis, obcaecati? Nam fuga quas nisi qui illum, libero
        consectetur, quos vitae provident sit voluptate facilis. Repellat quidem
        inventore dolorum, ab nobis ad nesciunt nostrum deserunt aperiam minus
        nihil magnam sunt perspiciatis eligendi vitae omnis, minima quisquam
        odit hic? Assumenda, nobis deleniti minima, cumque ab iste ratione
        similique suscipit, asperiores nulla iure in aspernatur fuga neque!
        Tempore vitae est laborum eos debitis, rerum nesciunt inventore ipsum
        minus iusto obcaecati voluptatem. Expedita eveniet culpa magnam
        eligendi, quas numquam inventore soluta neque? Laudantium ducimus
        consectetur sapiente nesciunt, amet, soluta excepturi labore pariatur ut
        corrupti dolores doloribus accusantium est eaque alias quaerat
        dignissimos, saepe earum neque nisi perspiciatis? Odio harum molestias,
        nam corrupti nesciunt cumque eum sit voluptatem, voluptatum quam eaque
        quisquam dolore facilis velit laboriosam porro autem vero quae illo
        optio ad minima neque? Asperiores ratione beatae aliquam provident ullam
        ipsam saepe cumque magnam tempora rerum! Sapiente aperiam ea recusandae!
        Asperiores, quidem. Qui veritatis modi architecto illo. Inventore, ullam
        beatae dolor. tempora est velit nam placeat quis ipsum laborum, nobis
        assumenda molestias odit repellendus vel explicabo minima porro quaerat
        ratione. Eius asperiores error dicta. In modi fugiat alias assumenda ut
        possimus eaque libero, harum ullam aspernatur dolores eius nisi quo
        nobis a soluta, velit perferendis mollitia, cupiditate ipsa saepe?
        Totam, cupiditate! Accusantium sapiente deleniti itaque quis inventore
        ipsam, iure reiciendis repellat nulla numquam aliquam sequi laborum ipsa
        qui deserunt obcaecati aut aperiam molestias, nesciunt eum adipisci
        architecto eveniet hic similique. Atque, repellendus? Dolore nostrum
        est, exercitationem facere similique quia neque harum in inventore,
        veniam atque laborum nam molestiae placeat voluptatum error molestias
        perferendis? Quo fuga eligendi perspiciatis est enim suscipit iure
        reiciendis, dolorum voluptatibus provident laudantium nam minus numquam
        exercitationem, ducimus quibusdam iste esse accusantium voluptates
        corrupti quia corporis! Impedit hic officiis provident esse sint, iure
        ipsa beatae aperiam magni voluptate at? Laborum, temporibus?
      </div>
    </div>
  );
};

export default Index;
