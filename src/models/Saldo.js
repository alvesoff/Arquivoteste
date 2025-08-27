const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Modelo para a tabela de Saldo
const Saldo = sequelize.define('Saldo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'saldo',
  timestamps: true
});

module.exports = { Saldo };