const express = require('express')
const http = require('http')
const path = require('path')
const fs = require('fs/promises')
const { Server } = require('socket.io')

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

const PORT = 3153
const TOTAL_COUNT = path.join(__dirname, 'totalcount.txt')
const STREAM_COUNT = path.join(__dirname, 'streamcount.txt')

// init storage files if they don't exist
async function initStorage() {
    try {
        await fs.access(TOTAL_COUNT)
    } catch (error) {
        await fs.writeFile(TOTAL_COUNT, '0', 'utf8')
        console.log('created totalcount.txt')
    }
    try {
        await fs.access(STREAM_COUNT)
    } catch (error) {
        await fs.writeFile(STREAM_COUNT, '0', 'utf8')
        console.log('created streamcount.txt')
    }
}
async function getTotalCount() {
  try {
    const data = await fs.readFile(TOTAL_COUNT, 'utf8');
    return parseInt(data);
  } catch (error) {
    console.error('Error reading data:', error.message);
    return [];
  }
}
async function getStreamCount() {
  try {
    const data = await fs.readFile(STREAM_COUNT, 'utf8');
    return parseInt(data);
  } catch (error) {
    console.error('Error reading data:', error.message);
    return [];
  }
}
async function addCount() {
  io.emit('addOrnament');
  try {
    getStreamCount().then(async (data) => {
      await fs.writeFile(STREAM_COUNT, `${data+1}`, 'utf8');
    })
    getTotalCount().then(async (data) => {
      await fs.writeFile(TOTAL_COUNT, `${data+1}`, 'utf8');
    })
  } catch (error) {
    console.error('Error writing data:', error.message);
  }
}

app.use(express.json());

io.on('connection', (socket) => {
  console.log('user connected')

  getTotalCount().then(data => {
    socket.emit('initialData', data)
  })
})

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// const triggerRouter = require('./eventHook.js');
// app.use('/eventHook', triggerRouter);


app.get('/addOrnament', (req, res) => {
    console.log('adding ornament!');

    addCount().then(() => {
      res.status(200)
    }).catch((e) => {
      res.status(500)
    })
});

initStorage().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}`)
  })
})