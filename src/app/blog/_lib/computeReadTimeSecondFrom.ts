import type { ExtraCodeBlockComponentName } from '@blog/_components/OriginalMarkdownComponent'

function isUtilityCodeBlock(name: string): boolean {
  const ignoreTarget: string[] = [
    'twitter',
    'ignore-read-count',
  ] satisfies ExtraCodeBlockComponentName[]
  return !ignoreTarget.includes(name)
}

export function computeReadTimeSecondFrom(markdown: string) {
  const imageRegex = new RegExp('!\\[(.*?)]\\(.*?\\)', 'g')
  const linkRegex = new RegExp('[^!]\\[(.*?)]\\(.*?\\)', 'g')
  const linkRemoved = markdown.replace(linkRegex, '$1')

  const codeBlockStack: string[] = []
  const getStackTop = () => {
    if (codeBlockStack.length > 0) {
      return codeBlockStack[codeBlockStack.length - 1]
    } else {
      return undefined
    }
  }

  let numOfCharacters: number = 0
  let addtionalSeconds: number = 0
  let manualEnableWordCounting = true
  let inStyleTag = false

  const isEnabledWordCounting = () => manualEnableWordCounting && !inStyleTag

  for (let line of linkRemoved.split('\n')) {
    // code block
    if (line.startsWith('```')) {
      const cmd = line.replaceAll('`', '').trim()
      if (cmd.length > 0) {
        if (isUtilityCodeBlock(cmd)) {
          codeBlockStack.push(cmd)
        } else {
          codeBlockStack.push('code-block')
        }
      } else if (codeBlockStack.length > 0) {
        codeBlockStack.pop()
      }
      continue
    }

    if (codeBlockStack.includes('code-block')) {
      continue
    }

    const commentRegex = /^<!--+ ?(.*) ?--+>/
    if (commentRegex.test(line)) {
      const content = commentRegex.exec(line)![1].trim()

      if (content.includes('disable read-count')) {
        manualEnableWordCounting = false
      } else if (content.includes('enable read-count')) {
        manualEnableWordCounting = true
      } else if (content.includes('add-read-time-seconds')) {
        const sec = parseFloat(
          content.replace('add-read-time-seconds', '').trim(),
        )
        addtionalSeconds += Number.isNaN(sec) ? 0 : sec
      }
      continue
    }

    if (line.includes('<style>')) {
      inStyleTag = true
    } else if (line.includes('</style>')) {
      inStyleTag = false
    }

    if (!isEnabledWordCounting()) {
      continue
    }

    if (getStackTop() === 'twitter-archived') {
      if (line.startsWith('tweet:')) {
        line = line.slice(7)
      } else if (/^image[234]?:.*/.test(line)) {
        addtionalSeconds += 1
        continue
      } else {
        continue
      }
    }

    if (line.startsWith('<iframe')) {
      continue
    }

    if (line.match(imageRegex)) {
      addtionalSeconds += 1
      continue
    }

    line = line.replace(/\s/g, '').trim()
    numOfCharacters += line.length
  }

  const CHARACTERS_PER_MINUTE = 700
  const CHARACTERS_PER_SECOND = CHARACTERS_PER_MINUTE / 60.0
  return Math.floor(numOfCharacters / CHARACTERS_PER_SECOND) + addtionalSeconds
}
