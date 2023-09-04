import React from 'react'
import styles from './index.module.scss'
import dayjs from 'dayjs'
import ArticleRenderer from '@blog/_renderer/ArticleRenderer'
import { parseInlineMarkdown } from '@blog/_renderer/BlogMarkdown'
import { getMarkdownPlugins } from '@blog/_renderer/rendererProperties'
import SwitchUI from '@blog/_components/article-parts/ProfileCards/SwitchUI'
import Button from '@/components/atoms/Button'

export type ProfileData = {
  name: string
  club?: string
  twitter?: string
  description: string
}

type ProfileKey = 'name' | 'club' | 'twitter' | 'description'

const CardFormat = ({ personalDataList }: any) => (
  <div className={styles.profile_card_grid}>
    {personalDataList.map((personalData: any) => (
      <div className={styles.profile_card} key={personalData.name}>
        <div className={styles.header}>
          <div className={styles.club}>{personalData.club}</div>
          <div className={styles.twitter_id}>
            <a href={'https://twitter.com/' + personalData.twitter}>
              @{personalData.twitter}
            </a>
          </div>
        </div>
        <div className={styles.name}>
          {personalData.name}
          <span style={{ fontSize: '0.8em' }}>
            {personalData.name === 'つまみ' ? ' (筆者)' : 'さん'}
          </span>
        </div>
        <div className={styles.description}>
          {parseInlineMarkdown(personalData.description)}
        </div>
      </div>
    ))}
  </div>
)

const ListFormat = ({ personalDataList }: any) => (
  <ul>
    {personalDataList.map((personalData: any) => (
      <>
        <li key={personalData.name + '-name'}>
          {personalData.name}
          {personalData.name === 'つまみ' ? ' (筆者)' : 'さん'}
        </li>
        <ul key={personalData.name + '-info'}>
          <li>{personalData.club}</li>
          <li>
            <a href={'https://twitter.com/' + personalData.twitter}>
              @{personalData.twitter}
            </a>
          </li>
          <li>{parseInlineMarkdown(personalData.description)}</li>
        </ul>
      </>
    ))}
  </ul>
)

const ProfileCards = ({
  content,
  held,
}: {
  content: string
  held?: string
}) => {
  const cards = content.split('---')

  const personalDataList = cards.map(card => {
    const personalData: { [key: string]: string } = {}
    const lines = card.trim().split('\n')

    for (const line of lines) {
      const divided = line.split(':').map(e => e.trim())
      const key = divided[0] as ProfileKey
      const value = divided.slice(1).join(':')
      personalData[key] = value
    }
    return personalData as ProfileData
  })

  const twitterSearchLink = held
    ? 'https://twitter.com/search?q=' +
      personalDataList.map(e => 'from%3A' + e.twitter).join('%20OR%20') +
      `%20until%3A${dayjs(held)
        .add(1, 'd')
        .format('YYYY-MM-DD')}_04%3A00%3A00_JST` +
      '&src=typed_query&f=live&pf=on'
    : ''

  return (
    <>
      <SwitchUI
        primaryChildren={<CardFormat personalDataList={personalDataList} />}
        primaryButtonText={'リスト表示に切り替え'}
        secondaryChildren={<ListFormat personalDataList={personalDataList} />}
        secondaryButtonText={'カード表示に切り替え'}
      />
      {twitterSearchLink !== '' && (
        <Button externalLink={true} href={twitterSearchLink}>
          当日の同行者のツイートを見る
        </Button>
      )}
    </>
  )
}

export default ProfileCards
