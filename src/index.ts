import _ from 'lodash';
import path from 'path';
import {ApplicationConfig, ThirdCircleIoApplication} from './application';
import {ConfigurationOptions, ServerConfigurationLoader} from '@xtnd-dynamics/xd-server-config';
import {ServerConfigurationLoaderOptions} from '@xtnd-dynamics/xd-server-config';

export * from './application';


const serverConfigurationLoaderOptions: ServerConfigurationLoaderOptions = {
  dirname: path.join(__dirname),
  basePath: 'configurations',
};
const serverConfigurationLoader = new ServerConfigurationLoader(serverConfigurationLoaderOptions);
const httpServerOptions: ConfigurationOptions | any = serverConfigurationLoader.load({
  namespace: 'http',
});
const socketIoOptions: ConfigurationOptions | any = serverConfigurationLoader.load({
  namespace: 'socket-io',
});
const redisPubSubOptions: ConfigurationOptions | any = serverConfigurationLoader.load({
  namespace: 'redis',
});


export async function main(options: ApplicationConfig = {}) {


  const $options = _.defaults({}, options, {
    httpServerOptions: httpServerOptions.http,
    socketIoOptions: socketIoOptions.socketIo,
    redis: redisPubSubOptions.redis,
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
const config = httpServerOptions;
main(config).catch(err => {
  console.error('Cannot start the application.', err);
  process.exit(1);
});
// }
