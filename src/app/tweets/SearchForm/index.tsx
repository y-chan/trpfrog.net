'use client'
import styles from './index.module.scss'

export function SearchForm(props: { defaultValue?: string }) {
  return (
    <form action="/tweets#tweets" method="get" className={styles.searchForm}>
      <input
        type="text"
        name="q"
        placeholder="ツイート検索"
        defaultValue={props.defaultValue}
      />
      <input type="submit" value="検索" />
    </form>
  )
}
