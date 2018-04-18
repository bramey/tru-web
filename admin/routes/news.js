'use strict';
var list = require('../../helpers/list')
var sequelize = require('../../helpers/sequelize')()


var News = sequelize.models.News

var config = require('../../config')


/**
 * List news
 * @param {object} req
 * @param {object} res
 */
exports.list = function(req,res){
  var limit = +req.query.limit || 20
  var start = +req.query.start || 0
  var search = req.query.search || ''
  if(start < 0) start = 0
  News.findAndCountAll({
    where: sequelize.or(
      {title: {like: '%' + search + '%'}}
    ),
    offset: start,
    limit: limit,
    order: ['datePosted']
  })
    .then(function(result){
      res.render('news/list',{
        page: list.pagination(start,result.count,limit),
        count: result.count,
        search: search,
        limit: limit,
        list: result.rows,
        mainBaseUrl: config.admin.mainBaseUrl
      })
    })
    .catch(function(err){
      res.render('error',{error: err})
    })
}


/**
 * Process list actions
 * @param {object} req
 * @param {object} res
 */
exports.listAction = function(req,res){
  list.remove(News,req.body.remove)
    .then(function(){
      req.flash('success','News(s) removed successfully')
      res.redirect('/news/list')
    })
    .catch(function(err){
      res.render('error',{error: err})
    })
}


/**
 * Create News
 * @param {object} req
 * @param {object} res
 */
exports.create = function(req,res){
  res.render('news/create')
}


/**
 * Edit
 * @param {object} req
 * @param {object} res
 */
exports.edit = function(req,res){
  News.findById(req.query.id)
    .then(function(news){
      if(!news) throw new Error('News not found')
      res.render('news/edit',{news: news})
    })
    .catch(function(err){
      res.render('error',{error: err})
    })
}


/**
 * Save
 * @param {object} req
 * @param {object} res
 */
exports.save = function(req,res){
  var data = req.body
  News.findById(data.id)
    .then(function(news){
      if(!news) news = News.build()
      if(data.title) news.title = data.title
      if(data.content) news.content = data.content
      if(data.photoUrl) news.photoUrl = data.photoUrl
      if('undefined' === typeof data.active) news.active = false
      if(data.active) news.active = true
      return news.save()
    })
    .then(function(news){
      req.flash('success','News saved')
      res.redirect('/news/edit?id=' + news.id)
    })
    .catch(function(err){
      res.render('error',{error: err})
    })
}
