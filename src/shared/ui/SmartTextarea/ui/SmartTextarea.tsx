import { useState, useRef, useEffect, TextareaHTMLAttributes, FC } from 'react'

import styles from './SmartTextarea.module.scss'

type SmartTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const MIN_WIDTH = 148
const MAX_WIDTH = 444 // 472
const MIN_HEIGHT = 56
const MAX_HEIGHT = 184

export const SmartTextarea: FC<SmartTextareaProps> = ({ placeholder, autoFocus, required }) => {
  const [value, setValue] = useState('')
  const taRef = useRef<HTMLTextAreaElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ta = taRef.current!
    const ghost = ghostRef.current!
    // Mirror content (add zero‑width to force final line)
    ghost.textContent = value + '\u200b'

    // Measure needed width (no wrap)
    ghost.style.whiteSpace = 'pre'
    ghost.style.width = 'auto'
    const neededW = Math.min(Math.max(ghost.scrollWidth, MIN_WIDTH), MAX_WIDTH) + 28 // TODO: The magical number should be redone. It's used to prevent glitches when typing fast and letters go to the next line and then back again
    ta.style.width = `${neededW}px`

    // Measure needed height (wrapped at that width)
    ghost.style.whiteSpace = 'pre-wrap'
    ghost.style.width = `${neededW}px`
    ghost.style.height = 'auto'
    const neededH = Math.min(Math.max(ghost.scrollHeight, MIN_HEIGHT), MAX_HEIGHT)
    ta.style.height = `${neededH}px`

    ta.style.overflow = neededH >= MAX_HEIGHT ? 'auto' : 'hidden'
  }, [value])

  return (
    <>
      <textarea
        ref={taRef}
        className={styles.SmartTextarea}
        placeholder={placeholder}
        //   value={question === null ? '' : question}
        //   onChange={changeQuestion}
        value={value}
        // placeholder="Type here..."
        onChange={e => setValue(e.target.value)}
        autoFocus={autoFocus}
        required={required}
      />
      <div ref={ghostRef} className={styles.Ghost} />
    </>
  )
}
