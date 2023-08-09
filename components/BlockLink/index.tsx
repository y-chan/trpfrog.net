import Link, {LinkProps} from "next/link";
import styles from './index.module.scss';
import React from "react";

type Props = LinkProps & {
  className?: string
  style?: React.CSSProperties
  key?: React.Key
  id?: string
  children?: React.ReactNode
}

export default function BlockLink(props: Props) {
  const {className = '', id, key, children, ...linkProps} = props
  return (
    <div className={`${styles.box} ${className}`} id={id} key={key}>
      {children}
      <Link {...linkProps} className={styles.link}/>
    </div>
  )
}
