import React, { ReactNode } from 'react';
import { Footer } from '../Footer';
import { Header } from '../header/Header';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div
      style={{ height: '100vh', width: '100%' }}
      className="flex flex-col justify-between"
    >
      <div className="relative flex-grow">
        {/* <SearchOverlay /> */}
        <Header />
        <div className="flex-grow">{children}</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum eos
        exercitationem numquam deleniti repellendus provident, ipsa itaque
        aperiam, natus nesciunt quam dolorem nulla laudantium corporis quasi,
        voluptas adipisci quas fuga expedita veniam placeat sequi perspiciatis
        accusantium voluptatibus! Sapiente eius exercitationem culpa quas quidem
        fuga numquam eaque a asperiores iusto, dolorum commodi dignissimos
        molestiae saepe explicabo tempora amet eligendi facilis doloribus sed
        accusamus repudiandae beatae tempore sunt. Similique delectus, fuga
        magnam enim consequatur maxime eligendi veniam? Dicta quasi nam,
        consequatur facilis eos porro numquam nihil aut veniam accusamus iusto
        commodi unde accusantium vero ipsam architecto perspiciatis autem
        suscipit. Optio vero modi ipsam odio exercitationem, laborum dolore?
        Minima architecto eligendi commodi deleniti ipsam vitae, laudantium
        error repudiandae dolorem maxime quas totam fugit rem animi quae numquam
        non sit nostrum sint aperiam nemo tempore? Vitae consequatur laudantium
        est laboriosam, illum commodi deleniti repellat eaque corrupti qui
        doloremque neque aperiam, accusantium aspernatur eligendi, minus sed
        quidem non! Repudiandae ducimus dolores quisquam eos alias. Vero saepe
        tempore dolorem, libero neque dolorum suscipit officia explicabo ut est
        unde sint molestias molestiae qui eveniet sit dolore possimus. Odio sed
        illum similique natus! Omnis vitae officiis fuga natus perspiciatis
        maiores quisquam magni, rerum corrupti, est esse iure modi tempore
        dolorem suscipit dolore earum nostrum, accusamus iusto animi numquam.
        Id, hic aspernatur. Recusandae, obcaecati ducimus. Rem consectetur
        perspiciatis aliquid officiis blanditiis reprehenderit ut at architecto
        veniam dolor, amet corporis explicabo illo voluptates sint distinctio
        minus et debitis tenetur tempora praesentium fugiat error. Beatae et ut
        nam provident, laudantium maxime. Ipsa ipsam culpa voluptatum repellat,
        voluptates omnis eos rem quam ab, dolores iusto quasi eius ea blanditiis
        assumenda alias et quas cum a. Numquam commodi veritatis quo provident
        vero sed quisquam neque iste adipisci animi rerum ipsum amet tempore
        praesentium sunt molestiae aperiam suscipit, veniam consequatur tenetur
        ut modi ipsam? Eaque fugiat amet tempore vel nemo, dolorem eos corrupti
        dolores numquam distinctio enim dicta obcaecati quis quaerat laborum
        quas consequatur sapiente labore accusantium totam iste aliquam.
        Doloribus id qui consequatur eaque, nihil quia dolorem nulla quos odit
        possimus vero nisi in deserunt minima magni aperiam esse commodi
        suscipit saepe facere iste repudiandae. Explicabo sed doloribus
        reprehenderit voluptate consequuntur, ducimus voluptates rem eveniet
        tempore maxime natus adipisci, in tempora! Dolore dignissimos mollitia
        tempora impedit modi sequi ullam nostrum commodi id facilis! Velit
        veritatis veniam error sed illum vitae harum commodi sequi hic dolorem
        dignissimos dolores magnam adipisci, quos magni ad reiciendis eveniet
        ipsa! Excepturi error consequuntur illo cum inventore exercitationem,
        placeat voluptatibus magni molestias vero dolore officia velit
        consectetur deserunt odio natus deleniti rem eveniet in tempora facilis
        soluta porro rerum aspernatur? Nisi deserunt, eligendi quo mollitia
        perferendis dignissimos cumque id placeat in soluta distinctio
        laudantium deleniti eum voluptatibus eius veniam? Nihil, tempore
        reiciendis est magnam totam eos. Optio fugit fuga amet. Error, optio
        inventore officia earum laboriosam aperiam fuga provident aspernatur
        vitae ipsa accusantium. Ut culpa veniam necessitatibus tempora quos
        aliquam corrupti id hic rem placeat ducimus odio, architecto, excepturi
        esse officiis asperiores vel debitis eligendi pariatur quae nulla
        praesentium ullam! Aliquid ipsa quo nisi repellat, velit numquam ipsam
        commodi eaque necessitatibus modi similique! Odio, pariatur? Esse dolore
        fuga deserunt quidem reprehenderit dolor eaque placeat, nisi modi
        adipisci eligendi repudiandae impedit tenetur rerum ab qui consectetur
        ea delectus beatae saepe ipsa molestias eius! Sunt ratione aperiam
        aspernatur eius fuga ducimus mollitia odit consequatur unde voluptas ad
        vel tenetur delectus nulla quibusdam sequi nisi quam, repellat,
        asperiores nostrum velit optio. Laudantium impedit veniam sint commodi
        corporis. Rem molestiae voluptates blanditiis cum, vel facilis optio
        perspiciatis quod illo quis voluptatem, nihil quas tempore maxime ipsum
        distinctio temporibus placeat suscipit ex unde harum iste consectetur
        laboriosam magnam! Mollitia eveniet cum dolor eaque dolorum soluta
        asperiores dolores esse illo autem inventore dolorem ut, sequi omnis
        voluptates, aliquam, iste consequuntur fugiat velit ab assumenda illum
        maxime doloribus ex! Cumque, amet impedit beatae quidem totam
        praesentium dignissimos libero. Nobis nam vitae, rem voluptatum, dolore
        ex consectetur accusantium autem ipsam rerum, laudantium saepe illo
        magni. Ducimus eligendi tenetur debitis sit, amet, suscipit quibusdam
        voluptatum laboriosam modi eos repudiandae adipisci rerum consequuntur
        dicta accusantium, delectus dolorem qui sint recusandae aspernatur
        possimus architecto. Blanditiis laborum ratione ducimus fugiat facere
        temporibus cumque similique laudantium! Cupiditate itaque velit ex
        aperiam aut, sit sapiente beatae, aliquam quaerat tempora minus nesciunt
        fugit commodi doloribus non exercitationem dolorem debitis quam corporis
        quo quasi numquam iusto eveniet. Molestiae ullam laborum nulla. Suscipit
        omnis aut aliquam cum eligendi quidem nobis, odio ex similique illo
        mollitia temporibus expedita, porro et assumenda alias qui incidunt.
        Voluptatem doloribus exercitationem ea magni at harum mollitia fugit
        assumenda, quae maxime nulla esse cum repellat facere blanditiis nostrum
        nihil possimus? Repudiandae dignissimos mollitia distinctio nobis itaque
        in, suscipit assumenda rem! Nam aliquid magnam maiores labore magni,
        facere quo dolorum numquam tempore eos, minima iste assumenda odio
        quasi. Officiis modi laudantium labore laborum, blanditiis officia
        perspiciatis ut reprehenderit nihil provident libero atque voluptates
        cupiditate minus rerum, voluptatem error natus nisi a illo. Repellat
        molestiae officiis id voluptatum, tenetur incidunt quam repellendus
        commodi porro iusto, dicta facilis numquam temporibus labore, esse
        aspernatur possimus culpa quas. Tempore corporis veritatis laborum nisi
        provident id amet cupiditate! Sint natus nobis vel? Facere iure at
        pariatur minus quasi! Laudantium dolore ea deserunt architecto fugit
        quasi sunt soluta autem ullam unde et impedit eveniet quisquam molestiae
        ex ducimus itaque, nisi nobis quae expedita dolorum consequatur
        quibusdam. Sit, ipsum? Beatae tempora, vero provident dolorum cupiditate
        in nobis sunt sint pariatur quis, laborum optio dolor odio quia magnam
        velit architecto iste impedit minus voluptatem odit eligendi non rerum
        soluta. Veniam in itaque, illo architecto totam autem magnam voluptatem
        deleniti. Hic maiores rerum aspernatur labore laudantium itaque quis non
        cumque numquam quo minima sapiente esse tempore eum id, tenetur ut
        voluptatibus saepe? Harum sapiente error deserunt minus facere incidunt
        quod beatae magni quis quaerat, exercitationem hic et, aut voluptatum
        sint ipsum suscipit modi necessitatibus corporis cum quas atque
        doloribus possimus! Consectetur amet quis necessitatibus doloremque!
        Harum illo autem iure tenetur aliquam tempora voluptatum adipisci qui
        beatae unde! Qui perferendis sunt natus, necessitatibus fugit animi aut
        at odio debitis dolorem tempore dolore excepturi illum architecto esse
        fuga pariatur blanditiis quod ab. Ipsa nam pariatur voluptas dignissimos
        perspiciatis nisi hic numquam? Reprehenderit culpa saepe labore?
        Deleniti error reiciendis, minus quibusdam nesciunt nostrum, enim
        repellendus earum facilis, adipisci voluptatem consectetur dolorem
        eaque? Culpa officia nesciunt deleniti perspiciatis velit est obcaecati
        sunt consectetur corrupti voluptates numquam, atque provident ratione,
        iste dolorum unde! A aperiam distinctio, dolor voluptate quis optio,
        unde at dolore aliquam laborum nisi consequatur atque. Nulla natus eaque
        voluptatum esse cupiditate expedita, rerum autem laborum incidunt
        eveniet velit praesentium. Dolorum, commodi quos minima atque minus
        facilis cumque, dicta quaerat dignissimos error laudantium, laborum rem
        amet veniam dolorem nostrum vero doloribus praesentium repellat expedita
        unde! Qui eveniet quasi aliquid eum consectetur quo ab, ullam
        accusantium! Odit explicabo commodi nesciunt dolorem in similique
        sapiente, veritatis optio dicta, deserunt minus ad enim quam vitae!
        Ducimus a repellat magni eaque nisi recusandae ea nulla incidunt iusto
        eos. Itaque beatae autem saepe sunt repellat dolor libero dolores
        dolorum ipsam molestiae ullam corrupti eligendi illo cumque consectetur
        veniam hic reiciendis, temporibus maiores vel accusamus. Omnis et
        debitis voluptatem doloremque distinctio earum dignissimos accusantium
        natus cumque, magnam laborum fugit nesciunt labore incidunt iusto
        numquam tempora vitae at excepturi maxime culpa. Saepe, pariatur?
        Blanditiis nihil optio sed magni quisquam accusantium tempore fugiat,
        deserunt cumque beatae rerum velit aspernatur officiis excepturi
        nesciunt minima error? Libero, asperiores facilis? Sequi magnam velit
        animi nulla provident, accusantium magni! Voluptatibus sint rerum quae,
        in corporis maxime nesciunt facere ex, ratione, earum consectetur.
        Placeat quia, possimus perferendis alias velit dolore ducimus non sed!
        Libero possimus excepturi consequuntur. Iste expedita odio corporis,
        temporibus eaque dolores illum enim, perspiciatis eveniet excepturi
        labore molestias laborum doloremque unde veniam corrupti ratione totam
        modi in fugit optio sequi ipsa, tenetur magni! Velit impedit natus
        numquam quas culpa voluptatem optio beatae non, maxime aperiam aut,
        quaerat quasi enim nam deserunt. Dolorem, esse. Qui molestias quis sunt
        esse modi reiciendis ipsam atque cumque, ad neque animi sapiente
        repudiandae laboriosam! Molestiae impedit tempora magni soluta sit natus
        consequatur, necessitatibus cumque debitis delectus nihil, aut
        consequuntur quis. Pariatur aspernatur nemo saepe assumenda inventore
        provident eveniet, velit dolorum eligendi perspiciatis modi iusto iure
        delectus repudiandae, ipsam suscipit error itaque. Temporibus
        praesentium quos eaque illum corporis placeat accusantium porro
        distinctio, culpa laborum saepe rerum repellat aliquid eius in odit
        explicabo nam veniam excepturi consectetur! Aliquid soluta, esse
        reprehenderit, rerum tempora praesentium commodi quo consequuntur nemo
        exercitationem similique, eos eaque? Autem corrupti alias architecto
        eaque assumenda fugiat sunt officiis praesentium eum error? Voluptatum
        sapiente dolor distinctio! Quos alias quisquam dolores quidem at ut
        error est ex aut reprehenderit consequatur aperiam inventore laborum
        suscipit incidunt corrupti dolorum, sunt maiores consectetur
        voluptatibus libero! Nesciunt sequi aspernatur cupiditate sit facere,
        vel voluptate explicabo asperiores animi quas, temporibus ullam alias
        aliquam minima quaerat libero soluta ipsam doloremque nemo laudantium.
        Necessitatibus, sint. Mollitia magnam est, doloremque tempore soluta cum
        libero tenetur deserunt eaque corrupti assumenda velit illo incidunt
        officiis voluptate at perferendis quia fugit, itaque expedita quasi
        sapiente aperiam quisquam. Magni optio cupiditate hic inventore. Magnam
        rem quaerat veritatis mollitia, omnis beatae molestias non tempora eaque
        a quasi, consequuntur earum ipsa et consectetur fuga sed, veniam
        provident laboriosam! Asperiores saepe maxime eveniet recusandae nemo
        dolor optio soluta natus quidem aspernatur velit debitis tempora amet
        possimus hic vitae quam, accusantium illum nihil nostrum? Dicta omnis
        debitis aliquam at! Veniam non dolor error fugit, a aperiam possimus
        assumenda nostrum quidem delectus qui eaque ex suscipit voluptates
        libero excepturi distinctio ipsam dolorum eveniet debitis quam obcaecati
        incidunt. Dolore doloribus, quo dolores, officiis tenetur quas est nemo
        quaerat neque libero amet consectetur beatae similique delectus
        provident dolorem corporis fugit eveniet pariatur laboriosam et
        accusamus, omnis dolor deserunt. Ipsum officia itaque amet doloremque
        in, facilis sint, accusamus accusantium aliquam reiciendis ipsam,
        reprehenderit veritatis labore dignissimos sequi! Quibusdam harum
        eligendi possimus dolorum? Inventore, asperiores magnam. Nulla, ipsum
        corrupti distinctio at in voluptate optio ullam reiciendis explicabo
        accusantium ratione nisi neque rerum quasi aliquam sunt magni fugiat,
        delectus rem omnis sapiente! Deleniti nostrum dicta commodi impedit?
        Beatae tenetur veniam excepturi possimus voluptatem velit, hic magni
        recusandae quos voluptates ab provident labore at consequatur amet
        repellat asperiores ullam in quidem quod est nesciunt enim eveniet
        rerum? Corporis optio minus, repellat deleniti illum magnam iusto in
        voluptas eum repellendus laborum, esse quia animi ipsam nostrum. Minima,
        in ut? Dolores consectetur sit fugit natus laboriosam tempora, et omnis
        animi reprehenderit ducimus, doloribus accusantium inventore cupiditate
        tempore asperiores consequuntur incidunt veniam est. Odit laborum
        aspernatur quisquam, accusantium eius dolor fuga, obcaecati excepturi
        ipsum, quaerat pariatur eum magnam et corporis nisi voluptatibus magni
        iste possimus aperiam eos consequuntur a soluta eveniet. Quasi neque
        nisi modi, asperiores ab libero debitis, sint repudiandae, voluptas
        officia fugiat eaque aliquam laboriosam ipsam veritatis maiores
        similique dolorem hic quod. Explicabo doloremque repellat nihil. A porro
        dolorem sint voluptatum! Maiores eaque alias ratione placeat tempora vel
        magnam quia sed nemo tempore modi id ipsam error veritatis distinctio
        odio, a minus cumque blanditiis, soluta aspernatur. Doloribus totam ut
        assumenda eaque sed, minus ullam molestias dolorum ab maiores
        consequuntur voluptas vel. Neque ut temporibus voluptatem, dolor
        repellendus fuga possimus totam aliquam est praesentium? Corrupti
        debitis minima, harum exercitationem accusamus sunt vitae, at impedit
        nisi fuga aliquam tempore sapiente, officiis dolor libero nulla quia
        ducimus possimus deserunt dolores? Quam error ipsam eveniet nisi nemo!
        Exercitationem a earum inventore illum deleniti, sit et magni molestiae
        fugiat ducimus iusto cupiditate ipsum labore quo eligendi totam delectus
        consequuntur tempora illo vel. Inventore quibusdam, rerum natus
        voluptatum necessitatibus ipsam porro officia, reprehenderit ullam enim
        eos accusantium! Esse dolores at rerum placeat voluptas eaque, nihil
        nulla quaerat veniam cum corrupti recusandae aperiam maxime assumenda
        perferendis? Pariatur doloremque impedit nulla totam quae est beatae
        illo, corporis velit, omnis, veritatis delectus dolores. Aliquam, error
        ducimus! Voluptas cumque reprehenderit perferendis doloremque dolore
        tempore sapiente expedita, atque illum assumenda, repudiandae dicta
        fugit animi nobis ea, a aliquid mollitia perspiciatis iure. Hic, dolorem
        repellat, esse amet quae, excepturi atque exercitationem aperiam
        expedita nisi facere quis voluptatum?
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
