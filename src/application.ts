import _ from 'lodash';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingScope} from '@loopback/core';
import {SocketIoApplication} from '@loopback/socketio';
import debugFactory from 'debug';
import {SocketIoController} from './controllers';
import {Socket} from 'socket.io';
import {
  RedisPubSubBindings,
  RedisPubSubComponent,
  RedisPubSubOptionsKeyBindings,
} from 'loopback4-redis-pubsub';
import {
  RedisPubSubLifecycleObserver,
  SocketIoLifecycleObserver,
} from './observers';
import {
  REDIS_PUBSUB_DATA_HANDLER,
  RedisPubSubDataHandlerProvider,
} from './services';
import {EntityEvent} from '@xtnd-dynamics/xd-data';

import path from 'path';

_.set(global, '__dirname', path.resolve());

const debug = debugFactory('loopback:example:socketio:demo');

export {ApplicationConfig};

export class ThirdCircleIoApplication extends BootMixin(SocketIoApplication) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.projectRoot = __dirname;

    this.configure(RedisPubSubBindings.COMPONENT).to(options.redis);
    this.component(RedisPubSubComponent);

    this.lifeCycleObserver(SocketIoLifecycleObserver);
    this.lifeCycleObserver(RedisPubSubLifecycleObserver);

    this.bind(REDIS_PUBSUB_DATA_HANDLER)
      .toProvider(RedisPubSubDataHandlerProvider)
      .tag({
        [RedisPubSubOptionsKeyBindings.NAMESPACE]:
          RedisPubSubBindings.REDIS_PUBSUB_NAMESPACE,
        [RedisPubSubOptionsKeyBindings.OPTIONS]: {
          channel: EntityEvent.DataChange,
        },
      })
      .inScope(BindingScope.SINGLETON);

    this.socketServer.use((socket, next) => {
      console.log('Global middleware - socket:', socket.id);
      next();
    });

    this.socketServer.on('connect', (socket, next) => {
      console.log('Socket Connected: ' + socket.id);
      next();
    });

    const ns = this.socketServer.route(SocketIoController);
    ns.use((socket: Socket, next: Function) => {
      debug(
        'Middleware for namespace %s - socket: %s',
        socket.nsp.name,
        socket.id,
      );
      next();
    });
  }
}
