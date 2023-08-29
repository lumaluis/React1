import { useState, useEffect, useCallback, useMemo } from 'react'
import './index.scss'

interface IResultBox {
  text: string
}

const WPM = 225

const BottomResultBox = ({ text }: IResultBox) => {
  const [bottomResultBar, setBottomResultBar] = useState<Record<string, string>>({
    'Average Reading Time': '~',
    'Longest word': '-',
  })
  const words = useMemo(() => {
    const cleanText = text.trim()
    return cleanText
      .replace(/\n/g, ' ')
      .replace(/[?!.,]/g, ' ')
      .split(' ')
      .filter((w) => w !== '')
  }, [text])
  const longestWord = useMemo(() => {
    return words.reduce((longestWord, current) => {
      return current.length > longestWord.length ? current : longestWord
    }, '')
  }, [words])
  const updateInfo = useCallback(() => {
    const copyResults = { ...bottomResultBar }
    const time = Math.ceil(words.length / WPM)
    copyResults['Average Reading Time'] = time ? `~${time}` : '~'
    copyResults['Longest word'] = longestWord || '-'

    setBottomResultBar(copyResults)
  }, [bottomResultBar, text])

  useEffect(() => {
    updateInfo()
  }, [text])

  return (
    <div className="bottom-result-bar">
      {Object.keys(bottomResultBar).map((title: string) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{bottomResultBar[title]}</span>
        </div>
      ))}
    </div>
  )
}

export default BottomResultBox
