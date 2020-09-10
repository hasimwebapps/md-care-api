// import koaRouter from 'koa-router'
import * as Router from "koa-router";

import pingRoute from './ping'


const router = new Router();

pingRoute(router);

// router.get('*', async (ctx: any) => {
//   ctx.response.status = 404;
//   await ctx.render('error', {
//     status: 404,
//   })
// });

export default router
