import { BootMixin } from '@loopback/boot';
import { SocketIoApplication } from '@loopback/socketio';
import debugFactory from 'debug';
import { SocketIoController } from './controllers';
import { RedisPubSubBindings, RedisPubSubComponent } from 'loopback4-redis-pubsub';
import { RedisPubSubLifecycleObserver, SocketIoLifecycleObserver } from './observers';
const debug = debugFactory('loopback:example:socketio:demo');
export class ThirdCircleIoApplication extends BootMixin(SocketIoApplication) {
    constructor(options = {}) {
        super(options);
        this.projectRoot = __dirname;
        this.configure(RedisPubSubBindings.COMPONENT).to(options.redisPubSubOptions);
        this.component(RedisPubSubComponent);
        this.lifeCycleObserver(SocketIoLifecycleObserver);
        this.lifeCycleObserver(RedisPubSubLifecycleObserver);
        this.socketServer.use((socket, next) => {
            debug('Global middleware - socket:', socket.id);
            next();
        });
        const ns = this.socketServer.route(SocketIoController);
        ns.use((socket, next) => {
            debug('Middleware for namespace %s - socket: %s', socket.nsp.name, socket.id);
            next();
        });
    }
}
//# sourceMappingURL=application.js.map