'use strict';
var P = require('bluebird')
var bodyParser = require('body-parser')
var express = require('express')
var expressSession = require('express-session')
var flash = require('connect-flash')
var http = require('http')
var moment = require('moment')
var worker = require('infant').worker
var morgan = require('morgan')
var RedisStore = require('connect-redis')(expressSession)


var app = express()
var config = require('../config')
var routes = require('./routes')
var server = http.createServer(app)
var sessionStore = new RedisStore()

//make some promises
P.promisifyAll(server)

// middleware stack
//app.disable('etag')
app.set('trust proxy',true)
app.set('views',__dirname + '/views')
app.set('view engine','pug')
app.use(express.static(__dirname + '/public',{maxAge: 3600000}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(flash())

//register alerts
app.use(function(req,res,next){
  res.flash = req.flash.bind(req)
  next()
})

//setup sessions
app.use(expressSession({
  cookie: {
    path: '/',
    maxAge: config.main.cookie.maxAge || 360000,
    domain: config.main.cookie.domain || null
  },
  domain: config.main.cookie.domain || null,
  resave: true,
  saveUninitialized: true,
  store: sessionStore,
  secret: config.main.cookie.secret
}))

/**
 * Global template vars
 * @type {*}
 */
app.locals = {
  pretty: true,
  S: require('string'),
  moment: moment,
  prettyBytes: require('pretty-bytes'),
  version: config.version
}

// development only
if('development' === app.get('env')){
  /**
   * Setup pretty code in dev
   * @type {boolean}
   */
  app.locals.pretty = true
  app.use(morgan('dev'))
}


//home page
app.get('/home',routes.home.index)

//news page
app.get('/news',routes.news.index)
app.post('/news/newsInfo',routes.news.newsInfo)

//shows page
app.get('/shows',routes.show.index)

//photo page
app.get('/photos',routes.photo.index)

//music page
app.get('/music',routes.music.index)

//blog
app.get('/blog',function(req,res){
  res.redirect(301,'/blog/list')
})
app.get('/blog/list',routes.blog.index)
app.get('/blog/:blogUri',routes.blog.entry)

//contact
app.get('/contact',function(req,res){
  res.redirect(301,'/contact-us')
})
app.get('/contact-us',routes.contact.index)
app.post('/contact/save',routes.contact.save)

//redirects
app.get('/aboutUs',function(req,res){
  res.redirect(301,'/about-us')
})
//privacy
app.get('/privacy',function(req,res){
  res.redirect(301,'/privacy-policy')
})
//terms
app.get('/terms',function(req,res){
  res.redirect(301,'/terms-of-service')
})

//index
app.get('/',routes.index)

//legal
app.get('/terms-of-service',function(req,res){
  res.render('terms-of-service')
})
app.get('/privacy-policy',function(req,res){
  res.render('privacy-policy')
})


/**
 * Start main
 * @param {function} done
 */
exports.start = function(done){
  server.listenAsync(+config.main.port,config.main.host)
    .then(function(){
      done()
    })
    .catch(done)
}


/**
 * Stop main
 * @param {function} done
 */
exports.stop = function(done){
  server.close()
  done()
}

if(require.main === module){
  worker(
    server,
    config.name + ':main:worker',
    function(done){
      exports.start(done)
    },
    function(done){
      exports.stop(done)
    }
  )
}
