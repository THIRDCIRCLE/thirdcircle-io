import {LifeCycleObserver, inject, service} from '@loopback/core';
import {RedisPublisherClientService} from 'loopback4-redis-pubsub';
import {RedisClient} from 'redis';
import {REDIS_PUBSUB_DATA_HANDLER, RedisPubSubDataHandlerProvider} from '../services';

export class RedisPubSubLifecycleObserver implements LifeCycleObserver {

  status = 'not-initialized';

  constructor(
    @service(RedisPublisherClientService) protected redisPublisherClient: RedisClient,
    @inject(REDIS_PUBSUB_DATA_HANDLER) protected readonly redisPubSubDataHandler: RedisPubSubDataHandlerProvider,
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

    const messageStr: string = JSON.stringify({source: 'redis-pubsub', status: this.status});
    this.redisPublisherClient.publish('app', messageStr);
  }

  stop() {
    this.status = `stopped`;
    console.log(this + ':' + this.status);
  }

  toString(): string {
    return RedisPubSubLifecycleObserver.name;
  }
}
