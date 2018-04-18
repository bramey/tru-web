'use strict';
var sequelize = require('../../helpers/sequelize')()

var News = sequelize.models.News


/**
 * List
 * @param {object} req
 * @param {object} res
 */
exports.index = function(req,res){
  News.findAll({where: {active: true}, order: [['datePosted','DESC']]})
    .then(function(results){
      res.render('news',{
        newsList: results
      })
    })
    .catch(function(err){
      res.render('error',{error: err})
    })
}


/**
 * News detail
 * @param {object} req
 * @param {object} res
 */
exports.newsInfo = function(req,res){
  var news = {}
  console.log(req.body)
  News.find({
    where: {id: req.body.newsId}
  })
    .then(function(result){
      if(!result) throw new UserError('News Not Found!')
      news = result
      console.log(news)
      return news
    })
    .then(function(){
      res.json({
        status: 'success',
        message: 'News details retrieved',
        news: news
      })
    })
    .catch(function(err){
      console.log(err.stack)
      res.status(500)
      res.render('error',{error: err.message})
    })
}