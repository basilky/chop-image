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