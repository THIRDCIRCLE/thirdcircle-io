import { __decorate, __param } from "tslib";
import { service } from '@loopback/core';
import { RedisPublisherClientService } from 'loopback4-redis-pubsub';
let SocketIoLifecycleObserver = class SocketIoLifecycleObserver {
    constructor(redisPublisherClient) {
        this.redisPublisherClient = redisPublisherClient;
        this.status = 'not-initialized';
        console.log(this + ':created');
    }
    init() {
        this.status = `initialized`;
        console.log(this + ':' + this.status);
    }
    start() {
        this.status = `started`;
        console.log(this + ':' + this.status);
        const messageStr = JSON.stringify({ source: 'socketio', status: this.status });
        this.redisPublisherClient.publish('app', messageStr);
    }
    stop() {
        this.status = `stopped`;
        console.log(this + ':' + this.status);
    }
    toString() {
        return SocketIoLifecycleObserver.name;
    }
};
SocketIoLifecycleObserver = __decorate([
    __param(0, service(RedisPublisherClientService))
], SocketIoLifecycleObserver);
export { SocketIoLifecycleObserver };
//# sourceMappingURL=socketio.observer.js.map