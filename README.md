# Eventos IFMS - Backend

API RESTful para o sistema de gerenciamento de eventos do IFMS. Desenvolvida com [NestJS](https://nestjs.com/) e [Prisma ORM](https://www.prisma.io/), esta aplicação fornece os serviços necessários para o funcionamento do frontend, gerenciando regras de negócio e persistência de dados.

## 🚀 Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)**: Framework Node.js progressivo para construção de aplicações server-side eficientes e escaláveis.
- **[Prisma](https://www.prisma.io/)**: ORM moderno para Node.js e TypeScript.
- **[MySQL](https://www.mysql.com/)**: Banco de dados relacional.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset tipado de JavaScript.
- **[Class Validator](https://github.com/typestack/class-validator)**: Biblioteca para validação de dados baseada em decoradores.

## ✨ Funcionalidades da API

- **CRUD Completo**: Endpoints para criação, leitura, atualização e exclusão de:
    - Eventos
    - Atividades
    - Palestrantes
    - Salas
    - Turmas
    - Turnos
    - Usuários
- **Relacionamentos**: Gerenciamento de vínculos complexos (ex: Palestrantes em Atividades, Atividades em Salas).
- **Tratamento de Erros**: Respostas padronizadas e tratamento específico para violações de integridade referencial (ex: impedir exclusão de registros em uso).
- **DTOs (Data Transfer Objects)**: Validação rigorosa de dados de entrada.

## 📦 Instalação e Execução

1.  **Navegue até a pasta do servidor**:
    ```bash
    cd eventosIFMS/server
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configuração do Banco de Dados**:
    - Certifique-se de ter um servidor MySQL rodando.
    - Crie um arquivo `.env` na raiz da pasta `server` com a string de conexão:
      ```env
      DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
      ```
    - Execute as migrações do Prisma para criar as tabelas:
      ```bash
      npx prisma migrate dev
      ```

4.  **Execute a aplicação**:
    ```bash
    # desenvolvimento
    npm run start:dev

    # produção
    npm run start:prod
    ```

    A API estará disponível em `http://localhost:3001` (ou a porta configurada).

## 🛠️ Comandos Úteis

- **Gerar Cliente Prisma**: `npx prisma generate` (necessário após alterações no `schema.prisma`).
- **Visualizar Banco de Dados**: `npx prisma studio` (abre uma interface web para gerenciar os dados).

## 📂 Estrutura de Módulos

A aplicação segue a arquitetura modular do NestJS:
- `src/atividade`: Módulo de atividades.
- `src/evento`: Módulo de eventos.
- `src/palestrante`: Módulo de palestrantes.
- `src/sala`: Módulo de salas.
- `src/usuario`: Módulo de usuários.
- `src/database`: Configuração e serviço do Prisma.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.
