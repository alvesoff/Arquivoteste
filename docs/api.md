# Documentação da API do Sistema de Moedas

Esta documentação descreve os endpoints disponíveis na API do Sistema de Gerenciamento de Moedas.

## Base URL

```
http://localhost:3000/api
```

Em produção, a URL será fornecida pela Render.

## Endpoints

### Listar Moedas

Retorna a lista de todas as moedas disponíveis no sistema.

- **URL**: `/moedas`
- **Método**: `GET`
- **Resposta de Sucesso**:
  - **Código**: 200
  - **Conteúdo**: Array de objetos de moedas

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
  },
  {
    "id": 3,
    "nome": "MOEDA 3",
    "valor": 15,
    "quantidade": 2,
    "createdAt": "2025-08-27T14:30:00.000Z",
    "updatedAt": "2025-08-27T14:30:00.000Z"
  }
]
```

### Obter Moeda por ID

Retorna uma moeda específica pelo seu ID.

- **URL**: `/moedas/:id`
- **Método**: `GET`
- **Parâmetros da URL**:
  - `id`: ID da moeda a ser consultada
- **Resposta de Sucesso**:
  - **Código**: 200
  - **Conteúdo**: Objeto da moeda

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

- **Resposta de Erro**:
  - **Código**: 400
    - **Conteúdo**: `{ "mensagem": "ID da moeda inválido" }`
  - **Código**: 404
    - **Conteúdo**: `{ "mensagem": "Moeda não encontrada" }`
```

### Obter Saldo

Retorna o saldo atual do sistema.

- **URL**: `/saldo`
- **Método**: `GET`
- **Resposta de Sucesso**:
  - **Código**: 200
  - **Conteúdo**: Objeto com o saldo atual

```json
{
  "id": 1,
  "valor": 125,
  "createdAt": "2025-08-27T14:30:00.000Z",
  "updatedAt": "2025-08-27T14:30:00.000Z"
}
```

### Adicionar Moeda

Adiciona uma quantidade de moedas ao sistema e atualiza o saldo.

- **URL**: `/adicionar`
- **Método**: `POST`
- **Corpo da Requisição**:

```json
{
  "moedaId": 1,
  "quantidade": 2
}
```

- **Resposta de Sucesso**:
  - **Código**: 200
  - **Conteúdo**: Objeto com mensagem de sucesso, moeda atualizada e saldo atual

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

### Vender Moeda

Vende uma quantidade de moedas do sistema e atualiza o saldo.

- **URL**: `/vender`
- **Método**: `POST`
- **Corpo da Requisição**:

```json
{
  "moedaId": 1,
  "quantidade": 2
}
```

- **Resposta de Sucesso**:
  - **Código**: 200
  - **Conteúdo**: Objeto com mensagem de sucesso, moeda atualizada e saldo atual

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

## Códigos de Erro

- **400 Bad Request**: Parâmetros inválidos ou insuficientes
- **404 Not Found**: Recurso não encontrado
- **500 Internal Server Error**: Erro interno do servidor