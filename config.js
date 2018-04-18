'use strict';
var ObjectManage = require('object-manage')
var fs = require('fs')
var pkg = require('./package.json')

var config = new ObjectManage()

//dist config schema
config.$load({
  version: pkg.version,
  title: 'Tru-Web',
  name: 'tru-web',
  //databases
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 0,
    prefix: 'nullivex',
    options: {}
  },
  mysql: {
    name: 'tru-web',
    host: '127.0.0.1',
    port: 3306,
    user: '',
    password: '',
    logging: false
  },
  //admin
  admin: {
    enabled: false,
    port: 3003,
    host: null,
    workers: {
      count: 1,
      maxConnections: 10000
    },
    mainBaseUrl: 'http://localhost:3000',
    cookie: {
      secret: '',
      maxAge: 2592000000 //30 days
    }
  },
  main: {
    enabled: false,
    port: 3000,
    host: null,
    workers: {
      count: 1,
      maxConnections: 10000
    },
    cookie: {
      secret: '',
      domain: null,
      maxAge: 2592000000 //30 days
    }
  }
})

//load user config
if(fs.existsSync(__dirname + '/config.local.js')){
  config.$load(require(__dirname + '/config.local.js'))
}


/**
 * Export config
 * @type {ObjectManage}
 */
module.exports = config
