import fs from 'fs'
import EventEmitter from 'events'

class ImitateFsReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    this.path = path
    this.start = options.start || 0
    this.end = options.end
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.encoding = options.encoding || null
    this.mode = options.mode || 438
    this.flag = options.flag || 'r'
    this.fsReadPosition = 0
    this.open()
    this.on('newListener', type => {
      if (type === 'data') {
        this.read()
      }
    })
  }
  open() {
    fs.open(this.path, (err, fd) => {
      if (err) {
        this.emit('error', err)
      } else {
        this.fd = fd
        this.emit('open', fd)
      }
    })
  }
  read() {
    if (!this.fd) {
      this.once('open', this.read)
      return
    }
    const readLen = this.highWaterMark
    const buf = Buffer.alloc(readLen)
    fs.read(this.fd, buf, 0, readLen, this.fsReadPosition, (err, bytesRead, buffer) => {
      if(err) {
        this.emit('error', err)
        return
      } else if (bytesRead) {
        this.emit('data', buf.subarray(0, bytesRead))
        this.fsReadPosition += readLen
      }
      console.log('read', bytesRead, buffer)
      if (bytesRead) {
        this.read()
      }
    }) 
  }
}

const rs = new ImitateFsReadStream('./README.md', {
  highWaterMark: 3
})

rs.on('open', (fd) => {
  console.log('open fd', fd) 
})
rs.on('error', (err) => {
  console.log('err', err)
})
rs.on('data', chunk => {
  console.log('data chunk', chunk, chunk.toString())
})