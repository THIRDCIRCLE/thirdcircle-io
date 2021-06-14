import {ThirdCircle as TC} from '../types';
import HttpServer = TC.IO.HttpServer;

module.exports = {
  socketIo: {
    [HttpServer.Configuration.Keys.CORS]: {
      origin: '*',
    }
  },
};
