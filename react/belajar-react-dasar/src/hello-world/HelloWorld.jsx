import "./HelloWorld.css"

export function HelloWorld() {
  const props = {

    subTitle: "Text Apa Ya",
    text: "Semangat belajarnya Ripunn!"
  }
  return (
    <div>
      <HeaderHelloWorld text="Hello World" />
      <ParagraphHelloWorld {...props} />
    </div>
  )
}

function HeaderHelloWorld(props) {
  // memanggil nama class dengan attr className
  // title
  return <h1 className="title">{props.text.toUpperCase()}</h1>
}

function ParagraphHelloWorld({ text = "Ga ada textnya loh ya!", subTitle }) {

  return (
    <div>
      <h2>{subTitle}</h2>
      {/* content */}
      <p className="content">{text.toLowerCase()}</p>
      <hr />
    </div>
  )
}
