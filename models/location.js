'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Location.init({
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    street: DataTypes.STRING,
    buildingName: DataTypes.STRING,
    floorNumber: DataTypes.INTEGER,
    flat: DataTypes.STRING,
    lattitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};