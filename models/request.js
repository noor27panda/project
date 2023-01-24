'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Request.init({
    locationId: DataTypes.INTEGER,
    datetime: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    workerId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    confirmedAt: DataTypes.DATE,
    rooms: DataTypes.INTEGER,
    notes: DataTypes.STRING,
    cleaningTypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};