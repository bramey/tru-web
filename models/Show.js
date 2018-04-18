'use strict';


/**
 * Exporting the model
 * @param {object} sequelize
 * @param {object} DataTypes
 * @return {object}
 */
module.exports = function(sequelize,DataTypes) {
  return sequelize.define('Show',{
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      time: {
        type: DataTypes.STRING,
        allowNull: true
      },
      venue: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      with: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      ticketLink: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    })
}
