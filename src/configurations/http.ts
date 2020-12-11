import _ from 'lodash';
import {ThirdCircle as TC} from '../types';
import HttpServer = TC.IO.HttpServer;

module.exports = {
  http: {
    [HttpServer.Configuration.Keys.Host]: _.get(process.env, HttpServer.Environment.Variables.Host),
    [HttpServer.Configuration.Keys.Port]: _.get(process.env, HttpServer.Environment.Variables.Port),
  },
};
