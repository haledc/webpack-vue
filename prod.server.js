const Koa = require('koa')
const serve = require('koa-static')
const history = require('koa2-connect-history-api-fallback')
const path = require('path')

const app = new Koa()

app.use(serve(path.join(__dirname, './dist')))

app.use(history())

const PORT = process.env.PORT || 8888

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}!`)
})
