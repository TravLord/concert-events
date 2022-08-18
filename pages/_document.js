import { Html, Head, Main, NextScript } from 'next/document'
// This file is work around the lack of having access to the index.html in pages so we have to create a 
//custom document
//once its rendered server side in next.js we need to add the div with the modal root id so it can show the modal
export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id='modal-root'></div> 
      </body>
    </Html>
  )
}