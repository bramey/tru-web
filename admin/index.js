'use strict';
var child = require('infant').child
var clusterSetup = require('infant').cluster

var cluster
var config = require('../config')

if(require.main === module){
  child(
    config.name + ':admin:master',
    function(done){
      cluster = clusterSetup(
        './worker',
        {
          enhanced: true,
          stopTimeout: 30000,
          count: config.admin.workers.count,
          maxConnections: config.admin.workers.maxConnections
        }
      )
      cluster.start(function(err){
        done(err)
      })
    },
    function(done){
      if(!cluster) return done()
      cluster.stop(function(err){
        done(err)
      })
    }
  )
}
