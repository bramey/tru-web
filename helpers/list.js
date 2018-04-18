'use strict';
var P = require('bluebird')
var validator = require('validator')


/**
 * Remove members from a list
 * @param {Sequelize} Model
 * @param {Array} items
 * @return {P}
 */
exports.remove = function(Model,items){
  return P.try(function(){
    if(!(items instanceof Array))
      throw new Error('Invalid data passed for record removal')
    var promises = []
    var i = items.length - 1
    for(; i >= 0; i--){
      if(validator.isNumeric(items[i])){
        promises.push(Model.destroy({where: {id: items[i]}}))
      }
    }
    return P.all(promises)
  })
}


/**
 * Move members from a list
 * @param {Sequelize} Model
 * @param {Array} items
 * @return {P}
 */
exports.move = function(Model,items){
  var folder = '???'
  return P.try(function(){
    if(!(items instanceof Array))
      throw new Error('Invalid data passed for item movement')
    var promises = []
    items.forEach(function(item){
      if(validator.isNumeric(item)){
        promises.push(Model.update({FolderId: folder},{where: {id: item}}))
      }
    })
    return P.all(promises)
  })
}


/**
 * Pagination helper
 * @param {number} start
 * @param {number} count
 * @param {number} limit
 * @return {{start: *, end: *, previous: number, next: *}}
 */
exports.pagination = function(start,count,limit){
  if(start > count) start = count - limit
  var page = {
    start: start,
    end: start + limit,
    previous: start - limit,
    next: start + limit
  }
  if(page.previous < 0) page.previous = 0
  if(page.next > count) page.next = start
  if(page.end > count) page.end = count
  return page
}
