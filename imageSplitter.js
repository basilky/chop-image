const sharp = require('sharp')

// helpers
/**
 *
 * @param {*} image the image to process
 * @param {*} chunk size of each chunk
 * @param {*} step the start of image , defaults to 0
 * @param {*} chunks the array of chunks
 * @param {*} height the height of the image
 * @param {*} width the width of the image
 */
async function imageChunks (
  image,
  chunk,
  step = 0,
  chunks = [],
  height,
  width
) {
  return new Promise(resolve => {
    if (height <= chunk + step) {
      sharp(image)
        .extract({ left: 0, top: step, width: width, height: height - step })
        .toBuffer()
        .then(data => {
          chunks.push(data)
          resolve(chunks)
        })
    } else {
      sharp(image)
        .extract({ left: 0, top: step, width: width, height: chunk })
        .toBuffer()
        .then(data => {
          chunks.push(data)
          resolve(
            imageChunks(image, chunk, step + chunk, chunks, height, width)
          )
        })
    }
  })
}

// helpers
/**
 *
 * @param {*} image the image to process
 * @param {*} chunk size of each chunk
 */
async function imageToChunks (image, chunkSize) {
  let sharpimage = sharp(image)
  meta = await sharpimage.metadata()
  let height = meta.height
  let width = meta.width
  if (chunkSize >= height) {
    throw new Error("The chunk size can't be bigger than the image height!")
  }
  let chunks = []
  await imageChunks(image, chunkSize, 0, chunks, height, width)
  return chunks
}
exports.imageToChunks = imageToChunks
