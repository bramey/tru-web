'use strict';
var P = require('bluebird')
var bodyParser = require('body-parser')
var compress = require('compression')
var cookieParser = require('cookie-parser')
var flash = require('connect-flash')
var express = require('express')
var expressSession = require('express-session')
var http = require('http')
var worker = require('infant').worker
var morgan = require('morgan')
var RedisStore = require('connect-redis')(expressSession)

var sequelize = require('../helpers/sequelize')()

var app = express()
var config = require('../config')
var server = http.createServer(app)
var routes = require('./routes')

//make some promises
P.promisifyAll(server)


/**
 * Global template vars
 * @type {*}
 */
app.locals = {
  pretty: true,
  S: require('string'),
  moment: require('moment'),
  prettyBytes: require('pretty-bytes'),
  version: config.version
}


//setup view enging
app.set('trust proxy',true)
app.set('views',__dirname + '/' + 'views')
app.set('view engine','pug')

//load middleware
app.use(compress())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser(config.admin.cookie.secret))
app.use(expressSession({
  cookie: {
    maxAge: config.admin.cookie.maxAge
  },
  resave: true,
  saveUninitialized: true,
  store: new RedisStore(),
  secret: config.admin.cookie.secret
}))
app.use(flash())
app.use(function(req,res,next){
  res.locals.flash = req.flash.bind(req)
  next()
})
app.use(express.static(__dirname + '/public'))
app.use(function(req,res,next){
  //allow public routes
  if(req.url.match(/\/api\//)) return next()
  //private
  if(!req.session.staff && req.url.indexOf('/login') < 0){
    res.redirect('/login')
  } else {
    app.locals.user = req.session.staff
    next()
  }
})

// development only
if('development' === app.get('env'))
  app.use(morgan('dev'))

//----------------
//public routes
//----------------

//app.post('/api/shredder/update',routes.shredder.update)

//----------------
//private routes
//----------------

//auth
app.post('/login',routes.staff.loginAction)
app.get('/login',routes.staff.login)
app.get('/logout',routes.staff.logout)

//staff
app.post('/staff/list',routes.staff.listAction)
app.post('/staff/save',routes.staff.save)
app.get('/staff/list',routes.staff.list)
app.get('/staff/create',routes.staff.create)
app.get('/staff/edit',routes.staff.edit)
app.get('/staff',function(req,res){ res.redirect('/staff/list') })

//blog entries
app.post('/blog/list',routes.blog.listAction)
app.post('/blog/save',routes.blog.save)
app.get('/blog/list',routes.blog.list)
app.get('/blog/create',routes.blog.create)
app.get('/blog/edit',routes.blog.edit)
app.get('/blog/preview',routes.blog.preview)
app.get('/blog',function(req,res){ res.redirect('/blog/list') })

//news entries
app.post('/news/list',routes.news.listAction)
app.post('/news/save',routes.news.save)
app.get('/news/list',routes.news.list)
app.get('/news/create',routes.news.create)
app.get('/news/edit',routes.news.edit)
app.get('/news',function(req,res){ res.redirect('/news/list') })

//photo entries
//app.post('/photo/list',routes.photo.listAction)
//app.post('/photo/save',routes.photo.save)
//app.get('/photo/list',routes.photo.list)
//app.get('/photo/create',routes.photo.create)
//app.get('/photo/edit',routes.photo.edit)
//app.get('/photo',function(req,res){ res.redirect('/photo/list') })

//show entries
app.post('/show/list',routes.show.listAction)
app.post('/show/save',routes.show.save)
app.get('/show/list',routes.show.list)
app.get('/show/create',routes.show.create)
app.get('/show/edit',routes.show.edit)
app.get('/show',function(req,res){ res.redirect('/show/list') })

//home page
app.get('/',routes.index)

/**
 * Start admin system
 * @param {function} done
 */
exports.start = function(done){
  sequelize.doConnect()
    .then(function(){
      return server.listenAsync(+config.admin.port,config.admin.host)
    }).then(done).catch(function(err){
    done(err)
  })
}


/**
 * Stop admin system
 * @param {function} done
 */
exports.stop = function(done){
  //dont wait for this since it will take to long and we are stopping now
  server.close()
  //close our db connection
  sequelize.close()
  //just return now
  done()
}

if(require.main === module){
  worker(
    server,
    config.name + ':admin:worker',
    function(done){
      exports.start(done)
    },
    function(done){
      exports.stop(done)
    }
  )
}
