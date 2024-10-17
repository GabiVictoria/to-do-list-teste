require('dotenv').config();
const Sequelize = require('sequelize');
const redis = require('redis');

// Configurando MySQL (mantém isso)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on('error', (err) => console.log('Erro no Redis', err));



module.exports = { sequelize , redisClient  };
