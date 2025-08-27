require('dotenv').config();
const express = require('express');
const cors = require('cors');
const prisma = require('./lib/prisma');
const moedaRoutes = require('./routes/moedaRoutes');

// Inicializa o aplicativo Express
const app = express();

// Configurações do middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração das rotas
app.use('/api', moedaRoutes);

// Rota raiz para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.json({ mensagem: 'API do Sistema de Gerenciamento de Moedas está funcionando!' });
});

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Inicializa o servidor
async function startServer() {
  try {
    // Testa a conexão com o banco de dados
    await prisma.$connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Acesse: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

// Tratamento para encerramento do servidor
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Conexão com o banco de dados encerrada.');
  process.exit(0);
});

// Inicia o servidor
startServer();