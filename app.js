import Koa             from 'koa';            // Koa framework
import body            from 'koa-body';       // body parser
import compose         from 'koa-compose';    // middleware composer
import compress        from 'koa-compress';   // HTTP compression
import session         from 'koa-session';    // session for flash messages
// import dotenv          from 'dotenv'; // load environment variables from a .env file into process.env
// dotenv.config();

const app = new Koa();


// return response time in X-Response-Time header
app.use(async function responseTime(ctx, next) {
    const t1 = Date.now();
    await next();
    const t2 = Date.now();
    ctx.response.set('X-Response-Time', Math.ceil(t2-t1)+'ms');
});


// HTTP compression
app.use(compress({}));


// only search-index www subdomain
app.use(async function robots(ctx, next) {
    await next();
    if (ctx.request.hostname.slice(0, 3) != 'www') ctx.response.set('X-Robots-Tag', 'noindex, nofollow');
});


// parse request body into ctx.request.body
// - multipart allows parsing of enctype=multipart/form-data
app.use(body({ multipart: true }));


// set signed cookie keys for JWT cookie & session cookie
app.keys = [ 'md-api-koa' ];

// session for flash messages (uses signed session cookies, with no server storage)
app.use(session(app));

app.use(async function subApp(ctx, next) {
    // use subdomain to determine which app to serve: www. as default, or admin. or api
    ctx.state.subapp = ctx.request.hostname.split('.')[0]; // subdomain = part before first '.' of hostname
    // note: could use root part of path instead of sub-domains e.g. ctx.request.url.split('/')[1]
    await next();
});

import appApi   from './app-api/app-api.js';

app.use(async function composeSubapp(ctx) { // note no 'next' after composed subapp
    switch (ctx.state.subapp) {
        case 'api':   await compose(appApi.middleware)(ctx);   break;
        default:
            ctx.response.redirect(ctx.request.protocol+'://'+'www.'+ctx.request.host+ctx.path+ctx.search);
            break;
    }
});


app.listen(process.env.PORT||3000);
console.info(`${process.version} listening on port ${process.env.PORT||3000} (${app.env})`);

export default app;
