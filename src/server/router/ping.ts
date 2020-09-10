import {
    ping
} from '../controller/ping'

export default (router: any) => {
    router.get('/ping',
        async (ctx: any, next: any) => {
            await next()
        },
        ping);
}
