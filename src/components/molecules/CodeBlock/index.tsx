'use client'

import * as React from 'react'

import { faClone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-light'

import { ButtonWithTooltip } from '@/components/atoms/ButtonWithTooltip'
import { customPrismTheme } from '@/components/molecules/CodeBlock/customPrismTheme'
import { registerLanguages } from '@/components/molecules/CodeBlock/languages'
import { normalizeLangName } from '@/components/molecules/CodeBlock/normalizeLangName'
import { useLineHighlight } from '@/components/molecules/CodeBlock/useLineHighlight'

import styles from './index.module.scss'

registerLanguages()

export type CodeBlockProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children'
> & {
  children?: string
  language?: string
  fileName?: string
  highlightLines?: {
    error?: number[]
    warning?: number[]
    info?: number[]
  }
}

export function CodeBlock(props: CodeBlockProps) {
  const { className = '', children, language = '', fileName, ...rest } = props

  const ref = useLineHighlight({
    errorLines: props.highlightLines?.error,
    warningLines: props.highlightLines?.warning,
    infoLines: props.highlightLines?.info,
  })

  return (
    <div {...rest}>
      {language != '' && (
        <div className={styles.code_lang_wrapper}>
          <span className={styles.code_lang}>
            {fileName || normalizeLangName(language)}
          </span>
          <ButtonWithTooltip
            className={styles.copy_button}
            onClick={() => {
              navigator.clipboard
                .writeText(children as string)
                .catch(console.error)
            }}
            hoveredTooltipContent={'Copy'}
            clickedTooltipContent={'Copied!'}
          >
            <FontAwesomeIcon icon={faClone} />
          </ButtonWithTooltip>
        </div>
      )}
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={customPrismTheme}
        className={styles.code_block}
        codeTagProps={{ className: styles.lines, ref }}
        wrapLines
      >
        {children as string}
      </SyntaxHighlighter>
    </div>
  )
}
