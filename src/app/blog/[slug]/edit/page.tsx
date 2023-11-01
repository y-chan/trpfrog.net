'use client'

import React, { useDeferredValue, useMemo, useRef } from 'react'

import { useMountEffect } from '@react-hookz/web'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'
import { useAlwaysShownHeader } from '@/components/organisms/Header'

import { Editor } from '@blog/[slug]/edit/Editor'
import { Viewer } from '@blog/[slug]/edit/Viewer'
import { buildBlogPost } from '@blog/_lib/buildBlogPost'

import styles from './page.module.scss'

export default function Index(props: { params: { slug: string } }) {
  const INITIAL_CONTENT = 'Loading...'
  const [post, setPost] = React.useState(INITIAL_CONTENT)
  const deferredPost = useDeferredValue(post)

  const [pageIdx, setPageIdx] = React.useState(1)
  const deferredPageIdx = useDeferredValue(pageIdx)

  useMountEffect(() => {
    console.log('fire')
    fetch(`/blog/${props.params.slug}/edit/api/read`, {
      headers: {
        'x-blog-slug': props.params.slug,
      },
    })
      .then(res => res.text())
      .then(text => setPost(text))
      .catch(console.error)
  })

  useAlwaysShownHeader()
  const scrollToTopRef = useRef<HTMLDivElement>(null)

  const deferredBlogPost = useMemo(
    () => buildBlogPost('', deferredPost, { pagePos1Indexed: deferredPageIdx }),
    [deferredPageIdx, deferredPost],
  )

  const editorBlockRef = React.useRef<HTMLDivElement>(null)
  const scrollToBottom = React.useCallback(() => {
    if (editorBlockRef.current) {
      editorBlockRef.current.scrollTop = editorBlockRef.current.scrollHeight
    }
    if (document) {
      document.documentElement.scrollTop = document.documentElement.scrollHeight
    }
  }, [])

  return (
    <MainWrapper className={styles.fullscreen}>
      <button onClick={scrollToBottom}>Scroll to bottom</button>
      <div className={styles.editor_grid}>
        <Block
          ref={editorBlockRef}
          className={styles.editor_block}
          style={{ overflow: 'scroll' }}
        >
          <Editor
            slug={props.params.slug}
            rawMarkdown={post}
            setPost={setPost}
          />
        </Block>
        <div className={styles.viewer_wrapper} ref={scrollToTopRef}>
          <Viewer post={deferredBlogPost} setPageIdx={setPageIdx} />
        </div>
      </div>
    </MainWrapper>
  )
}
