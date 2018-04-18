'use strict';
var sequelize = require('../../helpers/sequelize')()

var Show = sequelize.models.Show


/**
 * List
 * @param {object} req
 * @param {object} res
 */
exports.index = function(req,res){
  Show.findAll({where: {active: true}, order: [['date','ASC']]})
    .then(function(results){
      res.render('shows',{
        showList: results
      })
    })
    .catch(function(err){
      console.log(err)
      res.render('error',{error: err})
    })
}
