const prisma = require('../lib/prisma');

// Controlador para operações relacionadas às moedas
const moedaController = {
  // Listar todas as moedas disponíveis
  listarMoedas: async (req, res) => {
    try {
      const moedas = await prisma.moeda.findMany();
      return res.status(200).json(moedas);
    } catch (error) {
      console.error('Erro ao listar moedas:', error);
      return res.status(500).json({ mensagem: 'Erro ao listar moedas', erro: error.message });
    }
  },

  // Obter o saldo atual
  obterSaldo: async (req, res) => {
    try {
      const saldo = await prisma.saldo.findFirst();
      return res.status(200).json(saldo);
    } catch (error) {
      console.error('Erro ao obter saldo:', error);
      return res.status(500).json({ mensagem: 'Erro ao obter saldo', erro: error.message });
    }
  },

  // Adicionar moedas ao saldo
  adicionarMoeda: async (req, res) => {
    try {
      const { moedaId, quantidade } = req.body;

      // Validações
      if (!moedaId || !quantidade || quantidade <= 0) {
        return res.status(400).json({ mensagem: 'Moeda e quantidade são obrigatórios e quantidade deve ser maior que zero' });
      }

      // Busca a moeda pelo ID
      const moeda = await prisma.moeda.findUnique({
        where: { id: moedaId }
      });
      
      if (!moeda) {
        return res.status(404).json({ mensagem: 'Moeda não encontrada' });
      }

      // Calcula o valor a ser adicionado ao saldo
      const valorAdicional = moeda.valor * quantidade;

      // Busca o saldo atual
      const saldo = await prisma.saldo.findFirst();
      if (!saldo) {
        return res.status(404).json({ mensagem: 'Saldo não encontrado' });
      }

      // Usa transação do Prisma para atualizar moeda e saldo
      const resultado = await prisma.$transaction([
        // Atualiza a quantidade de moedas
        prisma.moeda.update({
          where: { id: moedaId },
          data: { quantidade: moeda.quantidade + quantidade }
        }),
        // Atualiza o saldo
        prisma.saldo.update({
          where: { id: saldo.id },
          data: { valor: saldo.valor + valorAdicional }
        })
      ]);

      const moedaAtualizada = await prisma.moeda.findUnique({
        where: { id: moedaId }
      });
      
      const saldoAtualizado = await prisma.saldo.findFirst();

      return res.status(200).json({
        mensagem: `${quantidade} moeda(s) adicionada(s) com sucesso`,
        moeda: moedaAtualizada,
        saldoAtual: saldoAtualizado.valor
      });
    } catch (error) {
      console.error('Erro ao adicionar moeda:', error);
      return res.status(500).json({ mensagem: 'Erro ao adicionar moeda', erro: error.message });
    }
  },

  // Vender moedas do saldo
  venderMoeda: async (req, res) => {
    try {
      const { moedaId, quantidade } = req.body;

      // Validações
      if (!moedaId || !quantidade || quantidade <= 0) {
        return res.status(400).json({ mensagem: 'Moeda e quantidade são obrigatórios e quantidade deve ser maior que zero' });
      }

      // Busca a moeda pelo ID
      const moeda = await prisma.moeda.findUnique({
        where: { id: moedaId }
      });
      
      if (!moeda) {
        return res.status(404).json({ mensagem: 'Moeda não encontrada' });
      }

      // Verifica se há moedas suficientes para vender
      if (moeda.quantidade < quantidade) {
        return res.status(400).json({ mensagem: 'Quantidade insuficiente de moedas para vender' });
      }

      // Calcula o valor a ser subtraído do saldo
      const valorSubtracao = moeda.valor * quantidade;

      // Busca o saldo atual
      const saldo = await prisma.saldo.findFirst();
      if (!saldo) {
        return res.status(404).json({ mensagem: 'Saldo não encontrado' });
      }

      // Usa transação do Prisma para atualizar moeda e saldo
      const resultado = await prisma.$transaction([
        // Atualiza a quantidade de moedas
        prisma.moeda.update({
          where: { id: moedaId },
          data: { quantidade: moeda.quantidade - quantidade }
        }),
        // Atualiza o saldo
        prisma.saldo.update({
          where: { id: saldo.id },
          data: { valor: saldo.valor - valorSubtracao }
        })
      ]);

      const moedaAtualizada = await prisma.moeda.findUnique({
        where: { id: moedaId }
      });
      
      const saldoAtualizado = await prisma.saldo.findFirst();

      return res.status(200).json({
        mensagem: `${quantidade} moeda(s) vendida(s) com sucesso`,
        moeda: moedaAtualizada,
        saldoAtual: saldoAtualizado.valor
      });
    } catch (error) {
      console.error('Erro ao vender moeda:', error);
      return res.status(500).json({ mensagem: 'Erro ao vender moeda', erro: error.message });
    }
  }
};

module.exports = moedaController;