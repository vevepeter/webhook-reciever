// import path from 'path'
// import fs from 'fs'

export async function storeVevPage(page, projectDir = '') {
  return console.log('"saved"')
  // // Putting the files in the public dir
  // // if page is index page then set the path to be public/index.html
  // let pagePath = path.join('./public/' + projectDir, page.index ? 'index.html' : page.path)
  //
  // // Page path can have file extension
  // if (!path.extname(pagePath)) pagePath = path.join(pagePath, 'index.html')
  //
  // // Creating the dir to put the file in
  // // Remember that in vev the page path can be nested (example dir1/dir2/index.html)
  // // So important to create dir recursive
  // const dir = path.dirname(pagePath)
  //
  // try {
  //   await fs.promises.access(dir)
  // } catch (e) {
  //   await fs.promises.mkdir(dir, { recursive: true })
  // }
  //
  // // Writing the file to the page path
  // await fs.promises.writeFile(pagePath, page.html)
}
