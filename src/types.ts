export namespace ThirdCircle {

  export namespace IO {

    export namespace ContextTags {
      export enum Values {
        Service = 'service'
      }
    }

    export namespace Namespaces {
      export const Default = '/';
    }

    export namespace Zones {
      export const Default = '';
    }

    export namespace Actions {
      export const Connect = 'connect';
      export const Disconnect = 'disconnect';
    }

    export namespace HttpServer {
      export namespace Configuration {

        export function getKey(identifier: string): string {
          return [Prefix, identifier].join(Seperator).toUpperCase();
        }

        export const Prefix = 'HTTP_SERVER';
        export const Seperator = '_';

        export enum Keys {
          Host = 'host',
          Port = 'port'
        }
      }
      export namespace Channels {
        export const Application = 'app';
      }
    }

    export namespace RedisPubSub {
      export namespace Configuration {

        export function getKey(identifier: string): string {
          return [Prefix, identifier].join(Seperator).toUpperCase();
        }

        export const Prefix = 'REDIS';
        export const Seperator = '_';

        export enum Keys {
          URL = 'url'
        }
      }
      export namespace Channels {
        export const Application = 'app';
      }
    }

    export namespace SocketIo {
      export namespace Channels {
        export const Application = 'app';
      }
    }
  }
}
