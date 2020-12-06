var RedisPubSubDataActionHandlerProvider_1;
import { __awaiter, __decorate, __param } from "tslib";
import { inject } from '@loopback/core';
import { redisSubscriber } from 'loopback4-redis-pubsub';
import { SocketIoBindings } from '@loopback/socketio';
import { EntityEvent, MessageSeperator } from 'xd-data';
let RedisPubSubDataActionHandlerProvider = RedisPubSubDataActionHandlerProvider_1 = class RedisPubSubDataActionHandlerProvider {
    constructor(socketServer) {
        this.socketServer = socketServer;
        console.log(this + ':created');
    }
    value() {
        return this.action.bind(this);
    }
    action(event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this + ':action');
            const message = event;
            const eventName = [
                message.event,
                message.model,
                message.id
            ].join(MessageSeperator);
            // @ts-ignore
            this.socketServer.io.sockets.emit(eventName, message);
        });
    }
    toString() {
        return RedisPubSubDataActionHandlerProvider_1.name;
    }
};
RedisPubSubDataActionHandlerProvider = RedisPubSubDataActionHandlerProvider_1 = __decorate([
    redisSubscriber({
        channel: EntityEvent.DataChange,
    }),
    __param(0, inject(SocketIoBindings.SERVER.key))
], RedisPubSubDataActionHandlerProvider);
export { RedisPubSubDataActionHandlerProvider };
//# sourceMappingURL=redis-pubsub-data.service.js.map