'use strict';
var markdown = require('github-markdown-render')


/**
 * Exporting the model
 * @param {object} sequelize
 * @param {object} DataTypes
 * @return {object}
 */
module.exports = function(sequelize,DataTypes) {
  return sequelize.define('News',{
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      html: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      photoUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      datePosted: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      hooks: {
        beforeUpdate: function(news){
          return markdown(news.content)
            .then(function(result){
              news.html = result
            })
        }
      }
    })
}
