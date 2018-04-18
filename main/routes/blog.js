'use strict';
var sequelize = require('../../helpers/sequelize')()

var Blog = sequelize.models.Blog


/**
 * List
 * @param {object} req
 * @param {object} res
 */
exports.index = function(req,res){
  Blog.findAll({where: {active: true}, order: [['datePosted','DESC']]})
    .then(function(results){
      res.render('blog/list',{
        blogList: results
      })
    })
    .catch(function(err){
      res.render('error',{error: err})
    })
}


/**
 * Entry
 * @param {object} req
 * @param {object} res
 */
exports.entry = function(req,res){
  Blog.findOne({where: {uri: req.params.blogUri}})
    .then(function(result){
      res.render('blog/entry',{
        blog: result
      })
    })
    .catch(function(err){
      res.render('error',{error: err})
    })
}
