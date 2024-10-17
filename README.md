Aqui está uma versão simplificada do `README.md`:

---

# To-Do List - Gerenciador de Tarefas

Uma aplicação simples de Lista de Tarefas (To-Do List) usando Node.js, MySQL, Redis e HTML/CSS.

## Funcionalidades

- Adicionar, atualizar e remover tarefas.
- Cache de tarefas com Redis.
- Autenticação com JWT (usuário: `user`, senha: `password`). 

## Requisitos

- [Node.js](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/)
- [Redis](https://redis.io/download)

## Configuração

### 1. Clone o repositório

### 2. Configurar o Banco de Dados MySQL

No MySQL, crie o banco e a tabela:

```sql
CREATE DATABASE todo_db;

USE todo_db;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  status ENUM('pending', 'complete') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Instale as dependências

Navegue até a pasta `backend` e instale as dependências:

```bash
cd backend
npm install
```

### 4. Inicie o Redis

No terminal, execute:

```bash
redis-server
```

### 5. Execute o servidor

Ainda na pasta `backend`, execute:

```bash
node server.js
```
Aplicação em processo de desenvolvimento e implementação de alguns requisitos faltantes.
