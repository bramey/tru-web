'use strict';
var P = require('bluebird')
var Recaptcha = require('recaptcha').Recaptcha
var nodemailer = require('nodemailer')
var pug = require('pug')

var config = require('../../config')


/**
 * Contact Us
 * @param {object} req
 * @param {object} res
 */
exports.index = function(req,res){
  res.render('contact')
}


/**
 * Save
 * @param {object} req
 * @param {object} res
 */
exports.save = function(req,res){
  var data = req.body
  var fn = pug.compileFile('main/views/contactTemplate.pug')
  var text = fn({data: data})
  var transporter = P.promisifyAll(nodemailer.createTransport({
    service: config.gmail.service,
    auth: config.gmail.auth
  }))
  return transporter.sendMailAsync({
    from: config.contact.from,
    to: config.contact.to,
    replyTo: data.email,
    subject: 'New StretchFS Contact Email',
    text: text
  })
    .then(function(){
      res.redirect('/success')
    })
    .catch(function(err){
      res.render('error',{error: err.message})
    })
}
