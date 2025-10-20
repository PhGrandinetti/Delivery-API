# 🍽️ Delivery API

API desenvolvida como projeto para a disciplina de **Backend** da faculdade.  
Ela simula um sistema de delivery/menu, com autenticação de usuários e gerenciamento de itens de cardápio.

---

## 🚀 Tecnologias utilizadas

- **Node.js**
- **Express.js**
- **LowDB** (banco de dados simples em arquivo JSON)
- **Express Validator** (validação de dados)
- **Bcrypt** (hashing de senhas)
- **dotenv** (variáveis de ambiente)
- **Arquitetura em camadas** (Controllers, Services, Repositories, etc.)

---

## 🧱 Estrutura do projeto

O projeto segue o padrão de **arquitetura em camadas**, com separação clara de responsabilidades:

<pre>
src/
│
├── config/ # Configurações e inicialização do banco de dados
├── controllers/ # Lógica das rotas (camada de controle)
├── dtos/ # Objetos de transferência de dados
├── middlewares/ # Middlewares de autenticação, erros, etc.
├── repositories/ # Acesso e manipulação dos dados no banco (LowDB)
├── routes/ # Definição das rotas Express
├── services/ # Regras de negócio
├── validators/ # Validação de entrada de dados
└── app.js # Ponto de entrada da aplicação
</pre>

---

## 📦 Instalação e uso

1. **Clone o repositório**

   ```bash
   git clone <url-do-seu-repo>
   cd delivery-api

2. **Instale as dependências**
    ```bash
    npm install

## 📦 Configuração e execução

3. Configure o arquivo `.env`

    - Existe um arquivo chamado **`.env.example`** com um modelo pronto.  
    - **Renomeie-o para `.env`** (removendo a parte `.example`).  
    - Preencha as variáveis conforme indicado dentro do arquivo.

4. Execute o servidor

    ```bash
    node app.js

---

## 🔐 Autenticação e autorização

- O sistema utiliza **JWT (JSON Web Token)** para autenticação.  
- Algumas rotas só podem ser acessadas por **usuários autenticados**.  
- Outras rotas (como as de administrador) exigem **autorização específica**.  
- As senhas dos usuários são **hashadas com bcrypt** antes de serem salvas.

---

## 🍔 Funcionalidades atuais

### ✅ Entidades implementadas

#### 👤 Usuários
- Cadastro, login e controle de acesso  
- Hashing de senha e autenticação JWT

#### 🍽️ Menu (cardápio)
- CRUD completo (criação, leitura, atualização e exclusão)  
- Validação de dados (nome, preço, ingredientes etc.)  
- Apenas administradores podem criar/editar/deletar itens  
- Qualquer usuário pode visualizar o menu

---

## 🧩 Funcionalidades futuras

- Adição da rota **`/orders`** para pedidos de usuários  
- Migração do banco de dados para **MongoDB (cloud)**  
- Relacionamento entre **itens do menu** e **usuários (restaurantes)**

---

## 🗂️ Arquivo “informações”

Dentro do projeto existe um arquivo chamado **`informações`** contendo:

- Rotas rápidas para:
  - Criação de usuários  
  - Login  
  - Criação e visualização de itens do menu  
- Exemplo de preenchimento do arquivo `.env`  
- Dicas de uso e dados de teste  

Esse arquivo serve como uma **referência rápida** para quem quiser testar o projeto localmente.

## 💡 Como contribuir

1. Faça um **fork** do projeto  

2. Crie uma nova **branch** para sua feature ou correção:  
   ```bash
   git checkout -b minha-feature
   ```

3. Faça suas alterações e crie um commit descritivo:  
   ```bash
   git commit -m "feat: nova funcionalidade"
   ```

4. Envie suas alterações para o repositório remoto:  
   ```bash
   git push origin minha-feature
   ```

5. Abra um **Pull Request** neste repositório principal 🚀  

---

