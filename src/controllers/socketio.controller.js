import { __decorate, __param } from "tslib";
import { service } from '@loopback/core';
import { socketio } from '@loopback/socketio';
import { RedisPublisherClientService } from 'loopback4-redis-pubsub';
import { EntityEvent } from 'xd-data';
import { ThirdCircle } from '../types';
var Actions = ThirdCircle.IO.Actions;
var Channels = ThirdCircle.IO.RedisPubSub.Channels;
var Namespaces = ThirdCircle.IO.Namespaces;
var Zones = ThirdCircle.IO.Zones;
let SocketIoController = class SocketIoController {
    constructor(socket, redisPublisherClient) {
        this.socket = socket;
        this.redisPublisherClient = redisPublisherClient;
    }
    connect(socket) {
        console.debug('Client connected: %s', this.socket.id);
        socket.join(Zones.Default);
        const message = {
            action: Actions.Connect,
            socket: this.socket.id,
        };
        const messageStr = JSON.stringify(message);
        this.redisPublisherClient.publish(Channels.Application, messageStr);
        socket.emit('echo', this.socket.id);
    }
    // @socketio.emit('namespace' | 'requestor' | 'broadcast')
    registerChannel(msg) {
        console.debug('Subscribe to channel: %s', msg);
        if (Array.isArray(msg) && msg.length > 0) {
            msg.forEach(item => {
                this.socket.join(item);
            });
        }
        else {
            throw new Error('Channels data not appropriate');
        }
    }
    // @socketio.emit('namespace' | 'requestor' | 'broadcast')
    handleChatMessage(msg) {
        console.debug('General forwarded message: %s', msg);
        this.socket.nsp.emit('general-message-forward', msg);
    }
    // @socketio.emit('namespace' | 'requestor' | 'broadcast')
    handleGeneralMessage(msg) {
        var _a, _b;
        console.debug('General Message : %s', msg);
        const parsedMsg = JSON.parse(msg);
        if (((_b = (_a = parsedMsg === null || parsedMsg === void 0 ? void 0 : parsedMsg.receiver) === null || _a === void 0 ? void 0 : _a.to) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            parsedMsg.receiver.to.forEach(item => this.socket.nsp.to(item.id).emit('message', {
                subject: parsedMsg.subject,
                body: parsedMsg.body,
                options: parsedMsg.options,
            }));
        }
        else {
            throw new Error('Inappropriate message data');
        }
    }
    logMessage(...args) {
        console.debug('Message: %s', args);
        const actions = args[0];
        const action = actions[0].toLowerCase();
        const message = { action: action, data: args };
        const messageStr = JSON.stringify(message);
        this.redisPublisherClient.publish(action, messageStr);
    }
    disconnect() {
        console.debug('Client disconnected: %s', this.socket.id);
        const message = {
            action: Actions.Disconnect,
            socket: this.socket.id,
        };
        const messageStr = JSON.stringify(message);
        this.redisPublisherClient.publish(Channels.Application, messageStr);
    }
    dataMessage(...args) {
        console.debug('Data: %s', args);
        const message = args[0];
        const messageStr = JSON.stringify(message);
        this.redisPublisherClient.publish(EntityEvent.DataChange, messageStr);
    }
};
__decorate([
    socketio.connect()
], SocketIoController.prototype, "connect", null);
__decorate([
    socketio.subscribe('subscribe-to-channel')
], SocketIoController.prototype, "registerChannel", null);
__decorate([
    socketio.subscribe('general-message-forward')
], SocketIoController.prototype, "handleChatMessage", null);
__decorate([
    socketio.subscribe('general-message')
], SocketIoController.prototype, "handleGeneralMessage", null);
__decorate([
    socketio.subscribe(/.+/)
], SocketIoController.prototype, "logMessage", null);
__decorate([
    socketio.disconnect()
], SocketIoController.prototype, "disconnect", null);
__decorate([
    socketio.subscribe(/^data/)
], SocketIoController.prototype, "dataMessage", null);
SocketIoController = __decorate([
    socketio(Namespaces.Default),
    __param(0, socketio.socket()),
    __param(1, service(RedisPublisherClientService))
], SocketIoController);
export { SocketIoController };
//# sourceMappingURL=socketio.controller.js.map