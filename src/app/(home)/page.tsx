import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import { TrpFrogIconFrame } from '@/app/(home)/_components/TrpFrogIconFrame'

import { MainWrapper } from '@/components/atoms/MainWrapper'

import { AboutMe } from './_components/AboutMe'
import { Bird } from './_components/Bird'
import { Links } from './_components/Links'
import { Ratings } from './_components/Ratings'
import { Store } from './_components/Store'
import { TempTwitter } from './_components/TempTwitter'
import { TopPageBalloons } from './_components/TopPageBalloons'
import { TopPageIcons } from './_components/TopPageIcons'
import { TopPageMusic } from './_components/TopPageMusic'
import { TrpFrogAnimation as TrpFrogAnimationFrame } from './_components/TrpFrogAnimation'
import { WhatsNew } from './_components/WhatsNew'
import styles from './page.module.scss'

export default function Index() {
  return (
    <>
      <TrpFrogAnimationFrame />
      <MainWrapper>
        <TempTwitter />
        <div id={styles.top_page_grid}>
          <AboutMe id={styles.about_me_grid} />
          <WhatsNew id={styles.whats_new} />
          <Store id={styles.sticker} />
          <TopPageIcons id={styles.icons} />
          <TopPageMusic id={styles.music} />
          <TopPageBalloons id={styles.balloon} />
          <TrpFrogIconFrame id={styles.diffusion} />
          <Links id={styles.link_grid} />
          <Ratings id={styles.music_game} />
          <Bird id={styles.bird} />
        </div>
      </MainWrapper>
    </>
  )
}
