'use strict';

var picList = [
  '../images/Tru-2.jpg',
  '../images/Tru-3.jpg',
  '../images/Tru-4.jpg',
  '../images/Tru-5.jpg',
  '../images/Tru-6.jpg',
  '../images/Tru-7.jpg',
  '../images/Tru-10.jpg',
  '../images/Tru-8.jpg',
  '../images/Tru-11.jpg',
  '../images/Tru-12.jpg',
  '../images/Tru-13.jpg',
  '../images/Tru-14.jpg',
  '../images/Tru-15.jpg',
  '../images/Tru-16.jpg',
  '../images/Tru-17.jpg',
  '../images/Tru-18.jpg',
  '../images/Tru-19.jpg',
  '../images/Tru-20.jpg',
  '../images/Tru-21.jpg',
  '../images/TruShow.jpg'
]


/**
 * Photo page
 * @param {object} req
 * @param {object} res
 */
exports.index = function(req,res){
  picList.reverse()
  res.render('photos',{picList:picList})
}
