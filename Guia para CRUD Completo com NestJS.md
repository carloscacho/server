# Guia para CRUD Completo com NestJS + Prisma

## 1. Gerar Cliente Prisma

Execute `npx prisma generate` após modificar o schema.

## 2. Para cada entidade:

- Crie DTO em `src/<entidade>/dto/<entidade>.dto.ts`
- Crie Service em `src/<entidade>/<entidade>.service.ts`
- Crie Controller em `src/<entidade>/<entidade>.controller.ts`
- Crie Module em `src/<entidade>/<entidade>.module.ts`
- Adicione o módulo no `AppModule`

## 3. Endpoints REST

- `POST /<entidade>`: criar
- `GET /<entidade>`: listar todos
- `GET /<entidade>/:id`: buscar por id
- `PUT /<entidade>/:id`: atualizar
- `DELETE /<entidade>/:id`: deletar

## 4. Testes

- Crie testes unitários e e2e para cada controller/service.

## 5. Documentação

- Configure Swagger para documentar a API.

## 6. Segurança

- Implemente autenticação/autorização conforme necessário.

## 7. Exemplo de Estrutura

```
src/
  sala/
    sala.controller.ts
    sala.service.ts
    sala.module.ts
    dto/
      sala.dto.ts
  turma/
    turma.controller.ts
    turma.service.ts
    turma.module.ts
    dto/
      turma.dto.ts
  ...
  database/
    prisma.service.ts
    prisma.module.ts
  app.module.ts
```
