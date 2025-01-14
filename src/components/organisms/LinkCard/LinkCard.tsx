import * as React from 'react'

import { faEarthAsia } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import { BlockLink } from '@/components/molecules/BlockLink'

import { createURL } from '@/lib/url'
import { ParseWithBudouX } from '@/lib/wordSplit'

import styles from './LinkCard.module.scss'

export type LinkCardProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children'
> & {
  title: string
  description?: string
  imageUrl?: string
  favicon?: string
  href: string
  themeColor?: string
  skeleton?: false
}

export function LinkCard(props: LinkCardProps) {
  let {
    className,
    favicon,
    title,
    description = '',
    imageUrl,
    href,
    themeColor,
    ...rest
  } = props

  const hostname = new URL(href).hostname
  const origin = new URL(href).origin

  if (title.length > 80) {
    title = title.slice(0, 80) + '...'
  }

  const maxDescriptionLength = {
    pc: 80,
    sp: 40,
  }
  const descriptionNode = (
    <>
      <span className="only-on-pc">
        {description.slice(0, maxDescriptionLength.pc)}
        {description.length > maxDescriptionLength.pc && '...'}
      </span>
      <span className="only-on-sp">
        {description.slice(0, maxDescriptionLength.sp)}
        {description.length > maxDescriptionLength.sp && '...'}
      </span>
    </>
  )
  if (description && description?.length > 80) {
    description = description.slice(0, 80) + '...'
  }

  if (imageUrl && imageUrl.startsWith('/')) {
    imageUrl = createURL(imageUrl, origin)
  }

  if (favicon && favicon.startsWith('/')) {
    favicon = createURL(favicon, origin)
  }

  return (
    <div className={classNames(className, styles.wrapper)} {...rest}>
      <BlockLink href={href} className={styles.main} openInNewTab>
        <div className={styles.textArea}>
          <div className={styles.domain}>
            {favicon ? (
              <img
                className={styles.favicon}
                alt=""
                src={favicon}
                loading="lazy"
                width={16}
                height={16}
              />
            ) : (
              <FontAwesomeIcon
                className={styles.favicon}
                icon={faEarthAsia}
                data-default-favicon
              />
            )}
            {hostname && <span className={styles.domainText}>{hostname}</span>}
          </div>
          <div className={styles.titleDescription}>
            <div className={styles.title}>
              <ParseWithBudouX str={title} slug={''} />
            </div>
            {description && (
              <div className={styles.description}>{descriptionNode}</div>
            )}
          </div>
        </div>
        {imageUrl && (
          <img className={styles.image} alt="" src={imageUrl} loading="lazy" />
        )}
      </BlockLink>
    </div>
  )
}
