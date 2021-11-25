import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <React.StrictMode>
    <h1>Vite + React + Electron + Typescript</h1>
  </React.StrictMode>,
  document.getElementById('root'),
  () => {
    window.Main.removeLoading()
  }
)