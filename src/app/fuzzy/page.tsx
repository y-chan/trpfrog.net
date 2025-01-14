import { Block } from '@/components/molecules/Block'

import { SearchBox } from './SearchBox'
import styles from './style.module.scss'

export default function Fuzzy() {
  return (
    <>
      <Block style={{ textAlign: 'center' }} ribbonText={'BETA'}>
        <h2 className={styles.title}>
          trpfrog.net/<b style={{ fontWeight: 800 }}>fuzzy</b>
        </h2>
        <p>あいまい URL リダイレクト</p>
      </Block>

      <Block style={{ textAlign: 'center' }}>
        <SearchBox />
      </Block>

      <Block title="入力例" h2icon="trpfrog">
        <ul>
          <li>
            enoshima {'=> '}
            <a href={'https://trpfrog.net/blog/enoshima-walk'}>
              https://trpfrog.net/blog/enoshima-walk
            </a>
          </li>
          <li>
            balllloooon {'=> '}
            <a href={'https://trpfrog.net/balloon'}>
              https://trpfrog.net/balloon
            </a>
          </li>
          <li>
            山登り {'=> '}
            <a href={'https://trpfrog.net/blog/takao-full-search'}>
              https://trpfrog.net/blog/takao-full-search
            </a>
          </li>
        </ul>
      </Block>

      <Block title="仕組み" h2icon="robot">
        <p>
          OpenAI API の Chat でごにょごにょします。
          単純な編集距離じゃないので日本語を突っ込んでも機能します。(すごい！)
        </p>
        <p>
          API 料金が高いので飽きたらやめます。(1 時間に 10
          リクエストまでの単純な rate limit があります)
        </p>
      </Block>
    </>
  )
}
