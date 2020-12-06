import _ from 'lodash';
import {ApplicationConfig, ThirdCircleIoApplication} from './application';
import {RedisPubSubConfig} from 'loopback4-redis-pubsub';

export * from './application';

export async function main(options: ApplicationConfig = {}) {


  const httpServerOptions = {
    host: '127.0.0.1',
    port: 3100,
  };

  const redisPubSubOptions: RedisPubSubConfig = {
    port: 6379
  }

  const $options = _.defaults({}, options, {
    httpServerOptions: httpServerOptions,
    redisPubSubOptions: redisPubSubOptions
  });


  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


  const app = new ThirdCircleIoApplication($options);


  await app.boot();
  await app.start();


  const url = app.socketServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);


  return app;
}

// if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3100),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
// }
