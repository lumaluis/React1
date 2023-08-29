import './index.scss'

interface ITextArea {
  text: string
  setText: (value: string | ((prevVar: string) => string)) => void
}

const TextArea = ({ text, setText }: ITextArea) => {
  return (
    <textarea
      className="text-area"
      value={text}
      autoFocus
      placeholder="Paste your text here..."
      onChange={(e) => {
        console.log(e.target.value)
        setText(e.target.value)
      }}
    />
  )
}

export default TextArea
