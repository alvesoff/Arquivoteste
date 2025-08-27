# Resumo Simples do Sistema de Moedas

## Lógica do Sistema

O sistema gerencia moedas com diferentes valores. Você pode:
- Ver todas as moedas disponíveis
- Consultar uma moeda específica pelo ID
- Ver o saldo total
- Adicionar moedas (aumenta o saldo)
- Vender moedas (diminui o saldo)

## Moedas Disponíveis

Temos 3 tipos de moedas:

1. **MOEDA 1**
   - Valor: 5 unidades
   - ID: 1

2. **MOEDA 2**
   - Valor: 10 unidades
   - ID: 2

3. **MOEDA 3**
   - Valor: 15 unidades
   - ID: 3

## Rotas da API

URL Base: `https://arquivoteste.onrender.com/api`

### O que cada rota faz:

1. **GET /moedas**
   - Mostra todas as moedas disponíveis e suas quantidades
   - Exemplo: `GET https://arquivoteste.onrender.com/api/moedas`

2. **GET /moedas/:id**
   - Mostra uma moeda específica pelo seu ID
   - Exemplo: `GET https://arquivoteste.onrender.com/api/moedas/1`

3. **GET /saldo**
   - Mostra o saldo total atual do sistema
   - Exemplo: `GET https://arquivoteste.onrender.com/api/saldo`

3. **POST /adicionar**
   - Adiciona moedas ao sistema
   - Aumenta o saldo total
   - Enviar: `{"moedaId": 1, "quantidade": 2}`
   - Exemplo: `POST https://arquivoteste.onrender.com/api/adicionar`

4. **POST /vender**
   - Vende moedas do sistema
   - Diminui o saldo total
   - Enviar: `{"moedaId": 1, "quantidade": 2}`
   - Exemplo: `POST https://arquivoteste.onrender.com/api/vender`

## Exemplos Simples

### Para ver todas as moedas:
```javascript
fetch('https://arquivoteste.onrender.com/api/moedas')
  .then(response => response.json())
  .then(moedas => console.log(moedas))
```

### Para consultar uma moeda específica:
```javascript
// Consultando moeda com ID 2
fetch('https://arquivoteste.onrender.com/api/moedas/2')
  .then(response => response.json())
  .then(moeda => console.log(moeda))
```

### Para adicionar moedas:
```javascript
fetch('https://arquivoteste.onrender.com/api/adicionar', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ moedaId: 2, quantidade: 5 })
})
  .then(response => response.json())
  .then(resultado => console.log(resultado))
```