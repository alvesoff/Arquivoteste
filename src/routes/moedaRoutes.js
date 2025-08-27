const express = require('express');
const router = express.Router();
const moedaController = require('../controllers/moedaController');

// Rota para listar todas as moedas
router.get('/moedas', moedaController.listarMoedas);

// Rota para obter o saldo atual
router.get('/saldo', moedaController.obterSaldo);

// Rota para adicionar moedas ao saldo
router.post('/adicionar', moedaController.adicionarMoeda);

// Rota para vender moedas do saldo
router.post('/vender', moedaController.venderMoeda);

module.exports = router;