import _ from 'lodash';
import {ThirdCircle as TC} from '../types';
import RedisPubSubConfiguration = TC.IO.RedisPubSub.Configuration;

module.exports = {
  redis: {
    [RedisPubSubConfiguration.Keys.URL]: _.get(process.env, RedisPubSubConfiguration.getKey(RedisPubSubConfiguration.Keys.URL)),
  },
};
