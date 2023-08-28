'use client';

import BlogMarkdown from "@blog/_renderer/BlogMarkdown";
import React from "react";
import styles from "@blog/edit/[slug]/page.module.scss";
import BlogPost from "@blog/_lib/blogPost";
import useOverwritePageNavHref from "@blog/edit/_hooks/useOverwritePageNavHref";

type Props = {
  post: BlogPost
  pageNavOverwrite: {
    setPageIdx: (pageIdx: number) => void
    scrollToTopRef: React.RefObject<any>
  }
}

export default React.memo(function Viewer(props: Props) {
  useOverwritePageNavHref(props.pageNavOverwrite.setPageIdx, props.pageNavOverwrite.scrollToTopRef)
  return (
    <BlogMarkdown entry={props.post} imageSize={{}} className={styles.blog_markdown}/>
  )
})
