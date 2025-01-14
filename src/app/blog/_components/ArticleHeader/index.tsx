import * as React from 'react'

import Balancer from 'react-wrap-balancer'

import { Title } from '@/components/organisms/Title'

import { ParseWithBudouX } from '@/lib/wordSplit'

import { EditButton } from '@blog/[slug]/[[...options]]/_components/EditButton'
import { EntryButtons } from '@blog/[slug]/[[...options]]/_components/EntryButtons'
import { PostAttributes } from '@blog/_components/PostAttributes'
import { Tag } from '@blog/_components/Tag'
import { BlogPost } from '@blog/_lib/blogPost'

import styles from './index.module.scss'

type Props = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  post: BlogPost
  addEntryButtons?: boolean
  addEditButtonOnDevMode?: boolean
}

export const ArticleHeader = React.memo(function ArticleHeader(props: Props) {
  const {
    post,
    addEntryButtons = true,
    addEditButtonOnDevMode = true,
    className = '',
    style = {},
    ...rest
  } = props

  const tags = post.tags

  return (
    <>
      <Title
        className={`${styles.article_title_block} ${className}`}
        style={{
          backgroundImage: post.thumbnail
            ? `url(${post.thumbnail})`
            : undefined,
          ...style,
        }}
        {...rest}
      >
        <div
          className={styles.inner_title_block}
          data-parent-has-thumbnail={!!post.thumbnail}
        >
          <h1>
            <Balancer>
              <ParseWithBudouX
                str={(() => {
                  if (post.title?.endsWith('！')) {
                    return post.title.slice(0, post.title.length - 1) + ' !'
                  } else {
                    return post.title
                  }
                })()}
                slug={post.slug}
              />
            </Balancer>
          </h1>
          {post.description && (
            <p style={{ margin: '0.5em', fontSize: '1rem', lineHeight: 1.5 }}>
              <Balancer>
                <ParseWithBudouX str={post.description} slug={post.slug} />
              </Balancer>
            </p>
          )}
          <PostAttributes post={post} />

          {/* Tags */}
          <p>
            {tags.map((tag: string) => (
              <span
                style={{
                  margin: '3px 3px 0 0',
                  display: 'inline-block',
                }}
                key={tag}
              >
                <Tag tag={tag} />
              </span>
            ))}
          </p>
          {/*<div id={styles.entry_top_buttons}>*/}
          {/*  <RichEntryButtons post={post} extended={true}/>*/}
          {/*</div>*/}
          {addEditButtonOnDevMode && (
            <p>
              <EditButton slug={post.slug} />
            </p>
          )}
          {/*<BadBlogButton/>*/}
        </div>
      </Title>
      {addEntryButtons && <EntryButtons post={post} style={{ margin: 0 }} />}
    </>
  )
})
