# chop-image

chop-image is an npm module which splits an image into chunks of given height. chop-image is inspired from [split-images](https://www.npmjs.com/package/split-images). Unlike split-images which uses jimp for processing image, chop-image uses [high performing sharp](https://sharp.pixelplumbing.com/performance) for chopping images.

### Supported Images
JPEG, PNG, WebP, AVIF, TIFF, GIF and SVG images.

### npm
`npm i chop-image --save`

### Node versions
Node >= 10

## Methods
**`imageToChunks(image,chunkSize)`**

Splits the image horizontaly to chunks having height=chunkSize. Chunks are returned as array buffer.

> returns `Array<Buffer>` 

## Examples
**Read from a local file**
```
const fs = require('fs')
const imageSplitter = require('./imageSplitter.js')
;(async () => {
  try {
    const chunckSize = 500
    const chuncks = await imageSplitter.imageToChunks(
      'imgs/test.jpg',
      chunckSize
    )
    console.log('Number of chunks', chuncks.length)
    actions = []
    console.log(chuncks)
    let i = 0
    chuncks.forEach(c => {
      i++
      actions.push(
        fs.writeFile(`./imgs/slice_${i}.jpg`, c, function (err, result) {
          if (err) console.log('error', err)
        })
      )
    })
    await Promise.all(actions)
  } catch (e) {
    console.log(e)
  }
})()
```