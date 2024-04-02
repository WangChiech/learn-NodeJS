import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import browserSync from 'browser-sync'

const mdPath = path.join(process.cwd(), process.argv[2])
const htmlPath = mdPath.replace('.md', '.html')
console.log(mdPath, htmlPath)

fs.watchFile(mdPath, (cur, pre) => {
  if (cur.mtime !== pre.mtime) {
    fs.readFile(mdPath, 'utf-8', (err, data) => {
      const htmlData = htmlTemp.replace('{{content}}', marked(data))
      fs.writeFile(htmlPath, htmlData, 'utf-8', err => {
        if (err) {
          console.log('write html file err: ', err)
        }
      })
    })
  }
})

browserSync.init({
  browser: '',
  server: process.cwd(),
  watch: htmlPath,
  index: path.basename(htmlPath)
})


const htmlTemp = `
<!DOCTYPE html>
<html lang="en">
<head></head>
<body>{{content}}</body>
</html>
`