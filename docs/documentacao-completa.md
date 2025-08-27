# Documentação Completa do Sistema de Gerenciamento de Moedas

## Visão Geral

O Sistema de Gerenciamento de Moedas é uma aplicação que permite aos usuários gerenciar moedas com diferentes valores. O sistema oferece funcionalidades para adicionar e vender moedas, além de visualizar o saldo atual e as moedas disponíveis.

## Arquitetura do Sistema

O sistema foi desenvolvido utilizando uma arquitetura de API RESTful com as seguintes tecnologias:

- **Backend**: Node.js com Express
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Deploy**: Render

### Estrutura do Projeto

```
/
├── src/                # Código fonte
│   ├── config/         # Configurações do projeto
│   ├── controllers/    # Controladores da API
│   ├── lib/            # Bibliotecas e utilitários
│   ├── models/         # Modelos de dados
│   ├── routes/         # Rotas da API
│   └── server.js       # Arquivo principal do servidor
├── prisma/             # Configurações do Prisma ORM
│   ├── schema.prisma   # Schema do banco de dados
│   └── seed.js         # Script para popular o banco de dados
├── docs/               # Documentação
├── .env                # Variáveis de ambiente
├── package.json        # Dependências do projeto
└── README.md           # Documentação básica
```

## Modelos de Dados

O sistema utiliza dois modelos principais:

### Moeda

```prisma
model Moeda {
  id        Int      @id @default(autoincrement())
  nome      String
  valor     Float
  quantidade Int     @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("moedas")
}
```

### Saldo

```prisma
model Saldo {
  id        Int      @id @default(autoincrement())
  valor     Float    @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("saldos")
}
```

## Fluxo de Operações

### Adicionar Moedas

1. O usuário envia uma requisição POST para `/api/adicionar` com o ID da moeda e a quantidade a ser adicionada.
2. O sistema verifica se a moeda existe e se a quantidade é válida.
3. O sistema adiciona a quantidade especificada à moeda existente.
4. O sistema atualiza o saldo, adicionando o valor total das moedas (valor unitário * quantidade).
5. O sistema retorna uma mensagem de sucesso, a moeda atualizada e o saldo atual.

### Vender Moedas

1. O usuário envia uma requisição POST para `/api/vender` com o ID da moeda e a quantidade a ser vendida.
2. O sistema verifica se a moeda existe e se há quantidade suficiente disponível.
3. O sistema subtrai a quantidade especificada da moeda existente.
4. O sistema atualiza o saldo, subtraindo o valor total das moedas (valor unitário * quantidade).
5. O sistema retorna uma mensagem de sucesso, a moeda atualizada e o saldo atual.

## Documentação da API

### Base URL

```
http://localhost:3000/api
```

Em produção, a URL será fornecida pela Render.

### Endpoints

#### 1. Listar Moedas

Retorna a lista de todas as moedas disponíveis no sistema.

- **URL**: `/moedas`
- **Método**: `GET`
- **Resposta de Sucesso**:
  - **Código**: 200
  - **Conteúdo**: Array de objetos de moedas

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

#### 2. Obter Saldo

Retorna o saldo atual do sistema.

- **URL**: `/saldo`
- **Método**: `GET`
- **Resposta de Sucesso**:
  - **Código**: 200
  - **Conteúdo**: Objeto com o saldo atual

**Exemplo de Resposta:**

```json
{
  "id": 1,
  "valor": 125,
  "createdAt": "2025-08-27T14:30:00.000Z",
  "updatedAt": "2025-08-27T14:30:00.000Z"
}
```

#### 3. Adicionar Moeda

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

#### 4. Vender Moeda

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

### Códigos de Erro

- **400 Bad Request**: Parâmetros inválidos ou insuficientes
  - Exemplo: Moeda e quantidade são obrigatórios e quantidade deve ser maior que zero
- **404 Not Found**: Recurso não encontrado
  - Exemplo: Moeda não encontrada
- **500 Internal Server Error**: Erro interno do servidor

## Exemplos de Uso com cURL

### Listar Moedas

```bash
curl -X GET http://localhost:3000/api/moedas
```

### Obter Saldo

```bash
curl -X GET http://localhost:3000/api/saldo
```

### Adicionar Moeda

```bash
curl -X POST http://localhost:3000/api/adicionar \
  -H "Content-Type: application/json" \
  -d '{"moedaId": 1, "quantidade": 2}'
```

### Vender Moeda

```bash
curl -X POST http://localhost:3000/api/vender \
  -H "Content-Type: application/json" \
  -d '{"moedaId": 1, "quantidade": 2}'
```

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js (v14 ou superior)
- PostgreSQL (v12 ou superior)

### Instalação

1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd sistema-gerenciamento-moedas
```

2. Instale as dependências

```bash
npm install
```

3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome-do-banco"
PORT=3000
```

4. Execute as migrações do banco de dados

```bash
npx prisma migrate dev
```

5. Popule o banco de dados com dados iniciais

```bash
npx prisma db seed
```

6. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

## Deploy

O sistema está configurado para deploy na plataforma Render. O arquivo `render.yaml` contém as configurações necessárias para o deploy automático.

## Considerações de Segurança

- O sistema não implementa autenticação ou autorização, o que seria necessário em um ambiente de produção.
- As senhas e credenciais de banco de dados devem ser armazenadas de forma segura, utilizando variáveis de ambiente ou serviços de gerenciamento de segredos.
- Recomenda-se implementar rate limiting para evitar abusos da API.

## Próximos Passos

- Implementar autenticação e autorização
- Adicionar testes automatizados
- Implementar validação de entrada mais robusta
- Adicionar logs e monitoramento
- Implementar cache para melhorar o desempenho

## Contribuição

Contribuições são bem-vindas! Para contribuir com o projeto, siga os passos abaixo:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.