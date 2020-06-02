
import koaStaticServer from 'koa-static-server'
import { lib,myLib } from 'lib/global'
var koa = require('koa')
var app = koa()
app.use(koaStaticServer({rootDir: 'web'}))
function fn(param:myLib,param2:lib.stringOrNumber) {
}
