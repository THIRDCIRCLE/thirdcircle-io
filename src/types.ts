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

    export namespace RedisPubSub {
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
