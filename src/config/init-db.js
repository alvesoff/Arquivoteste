const { sequelize } = require('./database');
const { Moeda } = require('../models/Moeda');
const { Saldo } = require('../models/Saldo');

// Função para inicializar o banco de dados
async function initDatabase() {
  try {
    // Sincroniza os modelos com o banco de dados (cria as tabelas se não existirem)
    await sequelize.sync({ force: false });
    console.log('Banco de dados sincronizado com sucesso.');

    // Verifica se já existem moedas cadastradas
    const moedasCount = await Moeda.count();
    
    // Se não existirem moedas, cria as moedas padrão
    if (moedasCount === 0) {
      await Moeda.bulkCreate([
        { nome: 'MOEDA 1', valor: 5 },
        { nome: 'MOEDA 2', valor: 10 },
        { nome: 'MOEDA 3', valor: 15 }
      ]);
      console.log('Moedas padrão criadas com sucesso.');
    }

    // Verifica se já existe um registro de saldo
    const saldoCount = await Saldo.count();
    
    // Se não existir saldo, cria um saldo inicial de 0
    if (saldoCount === 0) {
      await Saldo.create({ valor: 0 });
      console.log('Saldo inicial criado com sucesso.');
    }

    console.log('Banco de dados inicializado com sucesso.');
    return true;
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    return false;
  }
}

module.exports = { initDatabase };