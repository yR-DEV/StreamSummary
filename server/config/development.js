'use-strict';

import path from 'path';

//development specific configuration
//----------------------------------------------
module.exports = {

      //root path of the server
      root: path.normalize(__dirname + '../../..'),

      //development port, not using env yet but why not have it ready
      port: process.env.PORT || 9000,
      
}
