'use strict';


/**
 * Staff
 * @type {exports}
 */
exports.staff = require('./staff')


/**
 * Blog
 * @type {exports}
 */
exports.blog = require('./blog')


/**
 * Music
 * @type {exports}
 */
exports.music = require('./music')


/**
 * Photos
 * @type {exports}
 */
exports.photo = require('./photo')


/**
 * News
 * @type {exports}
 */
exports.news = require('./news')


/**
 * Shows
 * @type {exports}
 */
exports.show = require('./show')


/**
 * Index
 * @param {object} req
 * @param {object} res
 */
exports.index = function(req,res){
  res.redirect('/staff/list')
}
