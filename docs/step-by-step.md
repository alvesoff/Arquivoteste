# Desenvolvimento do Sistema de Gerenciamento de Moedas - Passo a Passo

Este documento descreve o processo de desenvolvimento do Sistema de Gerenciamento de Moedas, detalhando cada etapa e explicando a função de cada arquivo.

## 1. Estrutura do Projeto

Iniciamos criando a estrutura básica do projeto com os seguintes diretórios:

- `src/`: Contém todo o código fonte do projeto
  - `controllers/`: Controladores da API
  - `lib/`: Bibliotecas e utilitários
  - `routes/`: Rotas da API
- `prisma/`: Configuração e modelos do Prisma ORM
- `docs/`: Documentação do projeto

## 2. Configuração do Ambiente

Criamos os arquivos de configuração iniciais:

- `package.json`: Define as dependências do projeto
- `.env`: Armazena variáveis de ambiente, incluindo a URL do banco de dados PostgreSQL na Render
- `README.md`: Documentação principal do projeto

## 3. Configuração do Banco de Dados com Prisma

Implementamos a configuração do banco de dados PostgreSQL usando o Prisma ORM:

- `prisma/schema.prisma`: Define os modelos de dados e a conexão com o banco de dados
- `prisma/seed.js`: Script para popular o banco de dados com dados iniciais
- `src/lib/prisma.js`: Cliente Prisma para uso em toda a aplicação

## 4. Modelos de Dados

Definimos os modelos de dados para o sistema no arquivo `prisma/schema.prisma`:

- `Moeda`: Modelo para as moedas, com atributos como nome, valor e quantidade
- `Saldo`: Modelo para o saldo total do sistema

## 5. Controladores e Rotas

Implementamos a lógica de negócio e as rotas da API:

- `src/controllers/moedaController.js`: Controlador com as operações de listar, adicionar e vender moedas, utilizando o Prisma para interagir com o banco de dados
- `src/routes/moedaRoutes.js`: Definição das rotas da API

## 6. Servidor Principal

Criamos o arquivo principal do servidor:

- `src/server.js`: Inicializa o servidor Express, configura middleware, rotas e estabelece a conexão com o banco de dados usando o Prisma

## 7. Configuração para Deploy

Preparamos o projeto para deploy na Render:

- `render.yaml`: Configuração para deploy na plataforma Render

## 8. Documentação

Finalizamos com a documentação detalhada da API e do sistema:

- `docs/api.md`: Documentação dos endpoints da API
- `docs/documentacao-completa.md`: Documentação abrangente do sistema, incluindo arquitetura, fluxos de operação, exemplos de uso e configuração do ambiente
- `docs/step-by-step.md`: Este documento, descrevendo o processo de desenvolvimento

## Descrição dos Arquivos

### package.json
Contém as dependências do projeto e scripts para execução. Utilizamos Express como framework web, Sequelize como ORM para o PostgreSQL, e outras bibliotecas auxiliares.

### .env
Armazena variáveis de ambiente como configurações do banco de dados e porta do servidor. Em produção, estas variáveis serão fornecidas pela Render.

### src/config/database.js
Estabelece a conexão com o banco de dados PostgreSQL usando Sequelize. Suporta tanto ambiente de desenvolvimento local quanto produção na Render.

### src/config/init-db.js
Inicializa o banco de dados, criando as tabelas necessárias e inserindo dados iniciais (moedas padrão e saldo inicial).

### src/models/Moeda.js
Define o modelo para as moedas, com atributos como id, nome, valor e quantidade. Cada moeda tem um valor específico que afeta o saldo quando adicionada ou vendida.

### src/models/Saldo.js
Define o modelo para o saldo total do sistema, que é atualizado quando moedas são adicionadas ou vendidas.

### src/controllers/moedaController.js
Implementa a lógica de negócio para operações com moedas:
- Listar todas as moedas disponíveis
- Obter o saldo atual
- Adicionar moedas ao sistema (aumentando o saldo)
- Vender moedas do sistema (diminuindo o saldo)

### src/routes/moedaRoutes.js
Define as rotas da API para acessar as funcionalidades do sistema.

### src/server.js
Arquivo principal que inicializa o servidor Express, configura middleware (CORS, JSON), define rotas e inicia o servidor na porta especificada.

### render.yaml
Configura o deploy na plataforma Render, definindo o serviço web para o backend e o banco de dados PostgreSQL.