'use strict';

var picList = [
  '../images/Tru-2.jpg',
  '../images/Tru-3.jpg',
  '../images/Tru-4.jpg',
  '../images/Tru-5.jpg',
  '../images/Tru-6.jpg',
  '../images/Tru-7.jpg',
  '../images/Tru-8.jpg',
  '../images/Tru-10.jpg'
]


/**
 * Photo page
 * @param {object} req
 * @param {object} res
 */
exports.index = function(req,res){
  res.render('photos',{picList:picList})
}