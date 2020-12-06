export var ThirdCircle;
(function (ThirdCircle) {
    let IO;
    (function (IO) {
        let Namespaces;
        (function (Namespaces) {
            Namespaces.Default = '/';
        })(Namespaces = IO.Namespaces || (IO.Namespaces = {}));
        let Zones;
        (function (Zones) {
            Zones.Default = '';
        })(Zones = IO.Zones || (IO.Zones = {}));
        let Actions;
        (function (Actions) {
            Actions.Connect = 'connect';
            Actions.Disconnect = 'disconnect';
        })(Actions = IO.Actions || (IO.Actions = {}));
        let RedisPubSub;
        (function (RedisPubSub) {
            let Channels;
            (function (Channels) {
                Channels.Application = 'app';
            })(Channels = RedisPubSub.Channels || (RedisPubSub.Channels = {}));
        })(RedisPubSub = IO.RedisPubSub || (IO.RedisPubSub = {}));
        let SocketIo;
        (function (SocketIo) {
            let Channels;
            (function (Channels) {
                Channels.Application = 'app';
            })(Channels = SocketIo.Channels || (SocketIo.Channels = {}));
        })(SocketIo = IO.SocketIo || (IO.SocketIo = {}));
    })(IO = ThirdCircle.IO || (ThirdCircle.IO = {}));
})(ThirdCircle || (ThirdCircle = {}));
//# sourceMappingURL=types.js.map