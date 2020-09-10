require('dotenv').config();
import * as Koa from "koa";
// import * as Router from "koa-router";

import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser";
import router from './router'


const app = new Koa();
// const router = new Router();
// const config = require('config');


// interface RootState {
//   name: string;
//   age: string;
// }

// Route
app.use(router.routes()).use(router.allowedMethods());

router.stack.forEach(route => {
  // tslint:disable-next-line:no-console
  console.log(route.path)
});

// Middleware
app.use(json());
app.use(logger());
app.use(bodyParser());


export async function startServer() {
  app.listen(process.env.PORT0, () => {
    // tslint:disable-next-line:no-console
    console.log('start server at:', process.env.PORT0)
  })
}
