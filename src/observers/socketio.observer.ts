import {LifeCycleObserver, service} from '@loopback/core';
import {RedisPublisherClientService} from 'loopback4-redis-pubsub';
import {RedisClient} from 'redis';

export class SocketIoLifecycleObserver implements LifeCycleObserver {

  status = 'not-initialized';

  constructor(
    @service(RedisPublisherClientService) private redisPublisherClient: RedisClient,
  ) {
    console.log(this + ':created');
  }

  init() {
    this.status = `initialized`;
    console.log(this + ':' + this.status);
  }

  start() {
    this.status = `started`;
    console.log(this + ':' + this.status);

    const messageStr: string = JSON.stringify({source: 'socketio', status: this.status});
    this.redisPublisherClient.publish('app', messageStr);
  }

  stop() {
    this.status = `stopped`;
    console.log(this + ':' + this.status);
  }

  toString(): string {
    return SocketIoLifecycleObserver.name;
  }
}
