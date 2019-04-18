import React from 'react'

// Render Text Prediction OR GifBar
const renderPredictions = props => {
  // only render if predictions is in singular format
  if (props.predictions[0] && props.predictions[0].className) {
    return (
      <div id="predictions">
        <ul>
          {
            props.predictions.map(prediction => {
              let type = '';
              if (prediction.className === 'Neutral') {
                type = '中立'
              } else if (prediction.className === 'Drawing') {
                type = '画图'
              } else if (prediction.className === 'Sexy') {
                type = '性感'
              } else if (prediction.className === 'Porn') {
                type = '色情'
              } else if (prediction.className === 'Hentai') {
                type = '变态'
              }
              return <li key={prediction.className}>
                {type} -{' '}
                {(prediction.probability * 100).toFixed(2)}%
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default props => (
  <div id="results">
    {renderPredictions(props)}
  </div>
)
