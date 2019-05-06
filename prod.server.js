const Koa = require('koa')
const serve = require('koa-static')
const history = require('koa2-history-api-fallback')
const path = require('path')

const app = new Koa()

app.use(serve(path.resolve(__dirname, './dist')))

app.use(history())

const PORT = process.env.PORT || 8888

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}!`)
})
