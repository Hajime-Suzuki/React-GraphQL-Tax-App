"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var Router = require("koa-router");
var app = new Koa();
var router = new Router();
// router.get('/', async ctx => {
//   ctx.body = 'Hello World!'
// })
// const a = 'aht'
router.get('/', function (ctx) {
    // ctx.body = 'c'
    console.log('asht');
});
app.use(router.routes());
app.listen(4000, function () {
    console.log('server is on 4000');
});
//# sourceMappingURL=app.js.map