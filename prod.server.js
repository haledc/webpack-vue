const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')

const app = new Koa()

app.use(serve(path.join(__dirname, './dist')))

const PORT = process.env.PORT || 8888

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}!`)
})
