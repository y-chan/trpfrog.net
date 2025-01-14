import styles from '@/app/(home)/page.module.scss'

import { Block } from '@/components/molecules/Block'

type Props = {
  id?: string
}

export const Bird = ({ id }: Props) => {
  const birdX = [
    '',
    '　　 ／￣￣＼　ﾑｼｬﾑｼｬ',
    '  /　 (●)/￣￣＼',
    '.　 / 　 　ト、 　 ＼',
    '　彳 　 　 ＼＼　　|',
    '.／　　　/⌒ヽヽ　 |',
    '/　 　 　 |　　| .|　 /。',
    '　　　　|　　ヽ|／∴',
    '　　　　　　　。゜',
    '',
    '',
  ].join('\n')

  const birdY = [
    'オエーー !!!　＿＿_',
    '　　　 ＿＿_／　　 ヽ',
    '　　 ／ 　 ／　／⌒ヽ|',
    '/　(ﾟ)/　 ／ /',
    '.　 /　 　 ﾄ､ /｡⌒ヽ。',
    '　彳　 　 ＼＼ﾟ｡∴｡ｏ',
    '.／　　　　 ＼＼｡ﾟ｡ｏ',
    '/　　　　 ／⌒＼Ｕ∴)',
    '　　　 　 | 　　ﾞＵ |',
    '　　　 　 | 　　　| |',
    '　　　　　　　　Ｕ',
  ].join('\n')

  return (
    <Block title={'特に意味のない鳥'} h2icon={'think'} id={id}>
      <div style={{ textAlign: 'center' }}>
        <pre className={styles.aa}>{birdX}</pre>
        <pre className={styles.aa} style={{ marginLeft: '20px' }}>
          {birdY}
        </pre>
      </div>
    </Block>
  )
}
