const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Modelo para a tabela de Moedas
const Moeda = sequelize.define('Moeda', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'moedas',
  timestamps: true
});

module.exports = { Moeda };