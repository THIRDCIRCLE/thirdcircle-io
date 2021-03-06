var _a;
import { __awaiter } from "tslib";
import * as _ from 'lodash';
import { ThirdCircleIoApplication } from './application';
export * from './application';
export function main(options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const httpServerOptions = {
            host: '127.0.0.1',
            port: 3100,
        };
        const redisPubSubOptions = {
            port: 6379
        };
        const $options = _.defaults({}, options, {
            httpServerOptions: httpServerOptions,
            redisPubSubOptions: redisPubSubOptions
        });
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const app = new ThirdCircleIoApplication($options);
        yield app.boot();
        yield app.start();
        const url = app.socketServer.url;
        console.log(`Server is running at ${url}`);
        console.log(`Try ${url}/ping`);
        return app;
    });
}
if (require.main === module) {
    // Run the application
    const config = {
        rest: {
            port: +((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3100),
            host: process.env.HOST,
            // The `gracePeriodForClose` provides a graceful close for http/https
            // servers with keep-alive clients. The default value is `Infinity`
            // (don't force-close). If you want to immediately destroy all sockets
            // upon stop, set its value to `0`.
            // See https://www.npmjs.com/package/stoppable
            gracePeriodForClose: 5000,
        },
    };
    main(config).catch(err => {
        console.error('Cannot start the application.', err);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map