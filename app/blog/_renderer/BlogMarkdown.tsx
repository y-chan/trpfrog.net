import styles from "@blog/_styles/blog.module.scss";
import React, {CSSProperties} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {BlogImageData} from "@blog/_lib/imagePropsFetcher";
import PageNavigation from "@blog/_components/PageNavigation";
import Block from "@/components/Block";

import RendererProvider from "./RendererProvider";
import ArticleRendererFromContext from "./ArticleRenderer";
import BlogPost from "@blog/_lib/blogPost";

export const parseInlineMarkdown = (markdown: string) => {
  const comp = {
    p: ({children}: any) => <>{children}</>
  }
  return <ReactMarkdown
    components={comp}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}>
    {markdown}
  </ReactMarkdown>
}

type Props = {
  entry: BlogPost
  imageSize: { [path: string]: BlogImageData }
  style?: CSSProperties
  className?: string
}

const BlogMarkdown = ({entry, imageSize, style, className}: Props) => {
  const markdown = entry.content

  return (
    <RendererProvider entry={entry} imageSize={imageSize}>
      {markdown.map((content, idx) => (
        <Block key={'window-' + idx} style={style} className={className}>
          {idx === 0 &&
            <>
              <span id={'article'}/>
              <PageNavigation entry={entry} doNotShowOnFirst={true}/>
            </>
          }
          <article
            className={styles.post}
            style={{wordBreak: 'break-word'}}
          >
            <ArticleRendererFromContext toRender={content}/>
          </article>
          {idx === markdown.length - 1 &&
            <PageNavigation entry={entry}/>
          }
        </Block>
      ))}
    </RendererProvider>
  )
}

export default BlogMarkdown;
