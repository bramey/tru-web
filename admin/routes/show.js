'use strict';
var list = require('../../helpers/list')
var sequelize = require('../../helpers/sequelize')()
var moment = require('moment')

var Show = sequelize.models.Show

var config = require('../../config')


/**
 * List shows
 * @param {object} req
 * @param {object} res
 */
exports.list = function(req,res){
  var limit = +req.query.limit || 20
  var start = +req.query.start || 0
  var search = req.query.search || ''
  if(start < 0) start = 0
  Show.findAndCountAll({
    where: sequelize.or(
      {venue: {like: '%' + search + '%'}},
      {date: {like: '%' + search + '%'}}
    ),
    offset: start,
    limit: limit,
    order: ['date']
  })
    .then(function(result){
      res.render('show/list',{
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
  list.remove(Show,req.body.remove)
    .then(function(){
      req.flash('success','Show(s) removed successfully')
      res.redirect('/show/list')
    })
    .catch(function(err){
      res.render('error',{error: err})
    })
}


/**
 * Create Show
 * @param {object} req
 * @param {object} res
 */
exports.create = function(req,res){
  res.render('show/create')
}


/**
 * Edit
 * @param {object} req
 * @param {object} res
 */
exports.edit = function(req,res){
  Show.findById(req.query.id)
    .then(function(show){
      if(!show) throw new Error('Show not found')
      res.render('show/edit',{show: show})
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
  Show.findById(data.id)
    .then(function(show){
      if(!show) show = Show.build()
      if(data.date) show.date = moment.utc(data.date,'MM-DD-YYYY')
      if(data.time) show.time = moment(data.time, 'HH:mm A').format('HH:mm A')
      if(data.venue) show.venue = data.venue
      if(data.location) show.location = data.location
      if(data.with) show.with = data.with
      if(data.ticketLink) show.ticketLink = data.ticketLink
      if('undefined' === typeof data.active) show.active = false
      if(data.active) show.active = true
      return show.save()
    })
    .then(function(show){
      req.flash('success','Show saved')
      res.redirect('/show/edit?id=' + show.id)
    })
    .catch(function(err){
      res.render('error',{error: err})
    })
}
