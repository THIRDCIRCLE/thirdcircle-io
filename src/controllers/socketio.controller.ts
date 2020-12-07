import _ from 'lodash';
import {service} from '@loopback/core';
import {Socket, socketio} from '@loopback/socketio';
import {RedisClient} from 'redis';
import {RedisPublisherClientService} from 'loopback4-redis-pubsub';
import {DataChangeMessage} from '@xtnd-dynamics/xd-data';

import {ThirdCircle} from '../types';
import Actions = ThirdCircle.IO.Actions;
import Channels = ThirdCircle.IO.RedisPubSub.Channels;
import Namespaces = ThirdCircle.IO.Namespaces;
import Zones = ThirdCircle.IO.Zones;


@socketio(
  Namespaces.Default,
)
export class SocketIoController {

  constructor(
    @socketio.socket()
    private socket: Socket,
    @service(RedisPublisherClientService)
    private redisPublisherClient: RedisClient,
  ) {
  }


  @socketio.connect()
  connect(socket: Socket) {
    console.debug('Client connected: %s', this.socket.id);

    socket.join(Zones.Default);

    const message = {
      action: Actions.Connect,
      socket: this.socket.id,
    };

    const messageStr: string = JSON.stringify(message);
    this.redisPublisherClient.publish(Channels.Application, messageStr);

    socket.emit('echo', this.socket.id);
  }


  @socketio.subscribe('subscribe-to-channel')
  // @socketio.emit('namespace' | 'requestor' | 'broadcast')
  registerChannel(msg: string[]) {
    console.debug('Subscribe to channel: %s', msg);

    if (Array.isArray(msg) && msg.length > 0) {
      msg.forEach(item => {
        this.socket.join(item);
      });
    } else {
      throw new Error('Channels data not appropriate');
    }
  }


  @socketio.subscribe('general-message-forward')
  // @socketio.emit('namespace' | 'requestor' | 'broadcast')
  handleChatMessage(msg: unknown) {
    console.debug('General forwarded message: %s', msg);
    this.socket.nsp.emit('general-message-forward', msg);
  }


  @socketio.subscribe('general-message')
  // @socketio.emit('namespace' | 'requestor' | 'broadcast')
  handleGeneralMessage(msg: string) {
    console.debug('General Message : %s', msg);

    const parsedMsg: {
      subject: string;
      body: string;
      receiver: {
        to: {
          id: string;
          name?: string;
        }[];
      };
      type: string;
      sentDate: Date;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options?: any;
    } = JSON.parse(msg);

    if (parsedMsg?.receiver?.to?.length > 0) {
      parsedMsg.receiver.to.forEach(item =>
        this.socket.nsp.to(item.id).emit('message', {
          subject: parsedMsg.subject,
          body: parsedMsg.body,
          options: parsedMsg.options,
        }),
      );
    } else {
      throw new Error('Inappropriate message data');
    }
  }

  @socketio.subscribe(/.+/)
  logMessage(...args: unknown[]) {
    console.debug('Message: %s', args);

    const actions: Array<string> = args[0] as Array<string>;
    const action = actions[0].toLowerCase() as string;
    const message = {action: action, data: args};

    const messageStr: string = JSON.stringify(message);
    this.redisPublisherClient.publish(action, messageStr);
  }


  @socketio.disconnect()
  disconnect() {
    console.debug('Client disconnected: %s', this.socket.id);

    const message = {
      action: Actions.Disconnect,
      socket: this.socket.id,
    };

    const messageStr: string = JSON.stringify(message);
    this.redisPublisherClient.publish(Channels.Application, messageStr);
  }


  @socketio.subscribe(/^data/)
  dataMessage(messages: Array<DataChangeMessage>) {
    console.debug('Data: %s', messages.length);

    _.each(messages, message => {
      const messageStr: string = JSON.stringify(message);
      this.redisPublisherClient.publish('app', messageStr);
      this.redisPublisherClient.publish('dataChange', messageStr);
    });
  }
}
