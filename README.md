# Sistema de Gerenciamento de Moedas

Este é um sistema básico para gerenciar moedas com diferentes valores. O usuário pode adicionar e vender moedas, e o sistema atualiza automaticamente o saldo total.

## Funcionalidades

- Adicionar moedas ao saldo
- Vender moedas do saldo
- Visualizar saldo atual
- Visualizar moedas disponíveis

## Tecnologias Utilizadas

- Backend: Node.js com Express
- Banco de Dados: PostgreSQL
- Deploy: Render

## Estrutura do Projeto

```
/
├── src/                # Código fonte
│   ├── config/         # Configurações do projeto
│   ├── controllers/    # Controladores da API
│   ├── models/         # Modelos de dados
│   ├── routes/         # Rotas da API
│   └── server.js       # Arquivo principal do servidor
├── .env                # Variáveis de ambiente
├── package.json        # Dependências do projeto
└── README.md           # Documentação
```

## Como Executar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente no arquivo `.env`
4. Execute o servidor: `npm start`

## API Endpoints

- `GET /api/moedas`: Lista todas as moedas disponíveis
- `GET /api/saldo`: Retorna o saldo atual
- `POST /api/adicionar`: Adiciona moedas ao saldo
- `POST /api/vender`: Vende moedas do saldo

Para mais detalhes sobre os endpoints, consulte a [documentação da API](docs/api.md).

Para uma documentação mais abrangente do sistema, incluindo arquitetura, fluxos de operação, exemplos de uso e configuração do ambiente, consulte a [documentação completa](docs/documentacao-completa.md).