'use strict';
var markdown = require('github-markdown-render')
var validator = require('validator')


/**
 * Exporting the model
 * @param {object} sequelize
 * @param {object} DataTypes
 * @return {object}
 */
module.exports = function(sequelize,DataTypes) {
  return sequelize.define('Blog',{
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      uri: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true
      },
      authorUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      coverPhotoUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      html: {
        type: DataTypes.TEXT,
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
      indexes: [
        {
          name: 'uri_unique',
          unique: true,
          method: 'BTREE',
          fields: ['uri']
        }
      ],
      hooks: {
        beforeUpdate: function(blog){
          return markdown(blog.content)
            .then(function(result){
              blog.html = result
            })
        }
      }
    })
}
