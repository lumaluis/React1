import { useState, useEffect, useCallback } from 'react'
import './index.scss'
import { pronouns } from '../../data/pronouns'

interface IResultBox {
  text: string
}

const ResultBox = ({ text }: IResultBox) => {
  const [resultBar, setResultBar] = useState<Record<string, number>>({
    Words: 0,
    Characters: 0,
    Sentences: 0,
    Paragraphs: 0,
    Pronouns: 0,
  })
  const updateInfo = useCallback(() => {
    const cleanText = text.trim()
    const chars = cleanText.length
    const words = cleanText
      .replace(/\n/g, ' ')
      .split(' ')
      .filter((w) => w !== '')
    const copyResultBar = { ...resultBar }
    copyResultBar.Words = words.length
    copyResultBar.Characters = chars

    copyResultBar.Sentences = (cleanText.match(/[\w|\)][.?!](\s|$)/g) || []).length
    copyResultBar.Paragraphs = (cleanText.replace(/\n$/gm, '').split(/\n/) || []).length
    copyResultBar.Pronouns = words.filter((w) =>
      pronouns.includes(w.replace(/[?.,!]/g, '').toLowerCase())
    ).length
    setResultBar(copyResultBar)
  }, [resultBar, text])

  useEffect(() => {
    updateInfo()
  }, [text])

  return (
    <div className="result-bar">
      {Object.keys(resultBar).map((title: string) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{resultBar[title]}</span>
        </div>
      ))}
    </div>
  )
}

export default ResultBox
