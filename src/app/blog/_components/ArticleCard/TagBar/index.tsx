import React from 'react'

import Tag from '@blog/_components/Tag'

import styles from './index.module.scss'

type Props = Omit<React.ComponentProps<'div'>, 'children'> & {
  tags: string[]
}

export default function TagBar(props: Props) {
  const { tags, className, ...rest } = props
  return (
    <div className={`${styles.tags} ${className}`} {...rest}>
      {tags.map(tag => (
        <Tag tag={tag} key={tag} />
      ))}
    </div>
  )
}
