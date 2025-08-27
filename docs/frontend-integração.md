# Documentação para Integração Frontend - Sistema de Gerenciamento de Moedas

## Visão Geral

Esta documentação contém as informações essenciais para desenvolvedores frontend que precisam integrar com a API do Sistema de Gerenciamento de Moedas.

## URL Base da API

```
https://arquivoteste.onrender.com/api
```

## Endpoints Disponíveis

### 1. Listar Moedas

Retorna todas as moedas disponíveis no sistema.

- **URL**: `/moedas`
- **Método**: `GET`
- **Resposta**: Array de objetos de moedas

**Exemplo de Resposta:**

```json
[
  {
    "id": 1,
    "nome": "MOEDA 1",
    "valor": 5,
    "quantidade": 10,
    "createdAt": "2025-08-27T14:30:00.000Z",
    "updatedAt": "2025-08-27T14:30:00.000Z"
  },
  {
    "id": 2,
    "nome": "MOEDA 2",
    "valor": 10,
    "quantidade": 5,
    "createdAt": "2025-08-27T14:30:00.000Z",
    "updatedAt": "2025-08-27T14:30:00.000Z"
  }
]
```

### 2. Obter Moeda por ID

Retorna uma moeda específica pelo seu ID.

- **URL**: `/moedas/:id`
- **Método**: `GET`
- **Parâmetros da URL**:
  - `id`: ID da moeda a ser consultada
- **Resposta de Sucesso**: Objeto da moeda
- **Resposta de Erro**:
  - Código 400: ID da moeda inválido
  - Código 404: Moeda não encontrada

**Exemplo de Resposta:**

```json
{
  "id": 1,
  "nome": "MOEDA 1",
  "valor": 5,
  "quantidade": 10,
  "createdAt": "2025-08-27T14:30:00.000Z",
  "updatedAt": "2025-08-27T14:30:00.000Z"
}
```

### 3. Obter Saldo

Retorna o saldo atual do sistema.

- **URL**: `/saldo`
- **Método**: `GET`
- **Resposta**: Objeto com o saldo atual

**Exemplo de Resposta:**

```json
{
  "id": 1,
  "valor": 125,
  "createdAt": "2025-08-27T14:30:00.000Z",
  "updatedAt": "2025-08-27T14:30:00.000Z"
}
```

### 4. Adicionar Moeda

Adiciona uma quantidade de moedas ao sistema.

- **URL**: `/adicionar`
- **Método**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Corpo da Requisição**:

```json
{
  "moedaId": 1,
  "quantidade": 2
}
```

**Exemplo de Resposta:**

```json
{
  "mensagem": "2 moeda(s) adicionada(s) com sucesso",
  "moeda": {
    "id": 1,
    "nome": "MOEDA 1",
    "valor": 5,
    "quantidade": 12,
    "createdAt": "2025-08-27T14:30:00.000Z",
    "updatedAt": "2025-08-27T14:35:00.000Z"
  },
  "saldoAtual": 135
}
```

### 5. Vender Moeda

Vende uma quantidade de moedas do sistema.

- **URL**: `/vender`
- **Método**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Corpo da Requisição**:

```json
{
  "moedaId": 1,
  "quantidade": 2
}
```

**Exemplo de Resposta:**

```json
{
  "mensagem": "2 moeda(s) vendida(s) com sucesso",
  "moeda": {
    "id": 1,
    "nome": "MOEDA 1",
    "valor": 5,
    "quantidade": 10,
    "createdAt": "2025-08-27T14:30:00.000Z",
    "updatedAt": "2025-08-27T14:40:00.000Z"
  },
  "saldoAtual": 125
}
```

## Tratamento de Erros

A API retorna os seguintes códigos de erro:

- **400 Bad Request**: Parâmetros inválidos ou insuficientes
  - Exemplo: Moeda e quantidade são obrigatórios e quantidade deve ser maior que zero
- **404 Not Found**: Recurso não encontrado
  - Exemplo: Moeda não encontrada
- **500 Internal Server Error**: Erro interno do servidor

## Exemplos de Integração

### Exemplo com Fetch API (JavaScript)

```javascript
// Listar todas as moedas
async function listarMoedas() {
  try {
    const response = await fetch('https://arquivoteste.onrender.com/api/moedas');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao listar moedas:', error);
  }
}

// Obter moeda específica por ID
async function obterMoedaPorId(id) {
  try {
    const response = await fetch(`https://arquivoteste.onrender.com/api/moedas/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao obter moeda:', error);
  }
}

// Obter saldo atual
async function obterSaldo() {
  try {
    const response = await fetch('https://arquivoteste.onrender.com/api/saldo');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao obter saldo:', error);
  }
}

// Adicionar moedas
async function adicionarMoeda(moedaId, quantidade) {
  try {
    const response = await fetch('https://arquivoteste.onrender.com/api/adicionar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ moedaId, quantidade })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao adicionar moeda:', error);
  }
}

// Vender moedas
async function venderMoeda(moedaId, quantidade) {
  try {
    const response = await fetch('https://arquivoteste.onrender.com/api/vender', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ moedaId, quantidade })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao vender moeda:', error);
  }
}
```

### Exemplo com Axios (JavaScript)

```javascript
import axios from 'axios';

const API_URL = 'https://arquivoteste.onrender.com/api';

// Listar todas as moedas
async function listarMoedas() {
  try {
    const response = await axios.get(`${API_URL}/moedas`);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar moedas:', error);
  }
}

// Obter moeda específica por ID
async function obterMoedaPorId(id) {
  try {
    const response = await axios.get(`${API_URL}/moedas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter moeda:', error);
  }
}

// Obter saldo atual
async function obterSaldo() {
  try {
    const response = await axios.get(`${API_URL}/saldo`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter saldo:', error);
  }
}

// Adicionar moedas
async function adicionarMoeda(moedaId, quantidade) {
  try {
    const response = await axios.post(`${API_URL}/adicionar`, { moedaId, quantidade });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar moeda:', error);
  }
}

// Vender moedas
async function venderMoeda(moedaId, quantidade) {
  try {
    const response = await axios.post(`${API_URL}/vender`, { moedaId, quantidade });
    return response.data;
  } catch (error) {
    console.error('Erro ao vender moeda:', error);
  }
}
```

## Dicas para Implementação

1. **Atualizações em Tempo Real**: Após adicionar ou vender moedas, atualize a lista de moedas e o saldo para refletir as mudanças mais recentes.

2. **Validação de Formulários**: Implemente validação no frontend para garantir que apenas valores válidos sejam enviados para a API (quantidade > 0, moedaId válido).

3. **Tratamento de Erros**: Implemente um tratamento de erros adequado para lidar com falhas na API e fornecer feedback ao usuário.

4. **Loading States**: Adicione indicadores de carregamento durante as chamadas à API para melhorar a experiência do usuário.

5. **Responsividade**: Certifique-se de que a interface seja responsiva e funcione bem em dispositivos móveis e desktop.

## Suporte

Para questões relacionadas à API, entre em contato com a equipe de backend.