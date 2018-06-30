const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')

const app = new Koa()

app.use(serve(path.join(__dirname, './dist')))

app.listen(9999, () => {
  console.log('Server start at port: 9999!')
})
