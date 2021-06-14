import {ThirdCircle as TC} from '../types';
import HttpServer = TC.IO.HttpServer;
import fs from "fs";
import path from "path";

const cwd = __dirname;
const tsd = path.join(cwd, '../../../', 'thirdcircle-security');

module.exports = {
  http: {
    protocol: 'https',
    key: fs.readFileSync(path.join(tsd, 'localhost.key')),
    cert: fs.readFileSync(path.join(tsd, 'localhost.crt')),
    [HttpServer.Configuration.Keys.GRACE_PERIOD_FOR_CLOSE]: 5000,
  },
};
