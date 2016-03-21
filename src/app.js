import React from 'react'
import Dropzone from 'react-dropzone'

import './style.scss'

const DL_STYLE = {
    width: '100%',
    height: '100px',
    borderWidth: '2px',
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: '5px',
    padding: '10px'
}
export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}

    this.onDrop = files => {
      console.log('Received files: ', files)
      let data = new FormData()
      data.append('file', files[0])

      fetch('/upload', {
        method: 'post',
        body: data
      }).then( response => {
        if (response.status !== 200) {
          throw response.statusText
        }
        return response.json()
      }).then( result => {
        this.setState({ fileSize: result.fileSize,
                        error: ''})
      }).catch( error => {
        this.setState({ error: error })
      })
    }
}

  render() {
    // const api_link = window.location.href + 'upload/'
    return (
            <div className='container'>
              <h1 className='header'>
              API Basejump: URL Shortener
              </h1>
              <blockquote>
              User stories:
                <ul><li>I can submit a FormData object that includes a file upload.</li></ul>
                <ul><li>When I submit something, I will receive the file size in bytes within the JSON response</li></ul>
              </blockquote>
              <Dropzone style={DL_STYLE} onDrop={this.onDrop}>
                <div>Try dropping some files here, or click to select files to upload.</div>
              </Dropzone>
              { this.state.fileSize && (
              <div>Uploaded file size was reported as: { this.state.fileSize }</div>
              )}
              { this.state.error &&
                <div>Error {this.state.error}</div>
              }
            </div>

    )
  }
}
