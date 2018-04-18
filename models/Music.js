'use strict';


/**
 * Exporting the model
 * @param {object} sequelize
 * @param {object} DataTypes
 * @return {object}
 */
module.exports = function(sequelize,DataTypes) {
  return sequelize.define('Photo',{
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //have to see what this needs as far as type and saving and shit
    song: {
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
      defaultValue: true
    }
  })
}
