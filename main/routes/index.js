'use strict';


/**
 * Landing Page
 * @param {object} req
 * @param {object} res
 */
exports.index = function(req,res){
  res.render('index')
}


/**
 * Contact Us
 * @param {object} req
 * @param {object} res
 */
exports.contact = require('./contact')


/**
 * Blog
 * @param {object} req
 * @param {object} res
 */
exports.blog = require('./blog')


/**
 * Home
 * @param {object} req
 * @param {object} res
 */
exports.home = require('./home')


/**
 * News
 * @param {object} req
 * @param {object} res
 */
exports.news = require('./news')


/**
 * Shows
 * @param {object} req
 * @param {object} res
 */
exports.show = require('./show')


/**
 * Pics
 * @param {object} req
 * @param {object} res
 */
exports.photo = require('./photo')