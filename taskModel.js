const { DataTypes } = require('sequelize');
const { sequelize } = require('./config');

// Definir o modelo de tarefa
const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pendente',
  },
});

module.exports = Task;
