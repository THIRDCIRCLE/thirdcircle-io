import {BindingKey, inject, Provider} from '@loopback/core';
import {RedisMessage, RedisPubSubEvent, RedisPubSubReturnVal} from 'loopback4-redis-pubsub';
import {SocketIoBindings, SocketIoServer} from '@loopback/socketio';
import {DataChangeMessage, IdentifierSeperator} from 'xd-data';


export const REDIS_PUBSUB_DATA_HANDLER = BindingKey.create<RedisPubSubEvent>(
  'redis.pubsub.dataHandler',
);


export class RedisPubSubDataHandlerProvider implements Provider<RedisPubSubEvent> {

  constructor(
    @inject(SocketIoBindings.SERVER.key)
    protected readonly socketServer: SocketIoServer,
  ) {
    console.log(this + ':created');
  }

  value() {
    return this.action.bind(this);
  }

  async action(event: RedisMessage): Promise<RedisPubSubReturnVal> {
    console.log(this + ':action');

    const message = event.message as unknown as DataChangeMessage;

    const eventName = [
      message.event,
      message.model,
      message.id,
    ].join(IdentifierSeperator);

    // @ts-ignore
    this.socketServer.io.sockets.emit(eventName, message);
  }

  toString(): string {
    return RedisPubSubDataHandlerProvider.name;
  }
}