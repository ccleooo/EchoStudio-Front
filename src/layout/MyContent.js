function MyContent(props) {
  return (
    <main role="main">
      <div className="container h-500 bg-primary">{props.children}</div>
    </main>
  )
}

export default MyContent
