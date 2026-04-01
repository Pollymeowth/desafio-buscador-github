# 🔍 Search d_evs

> 🇧🇷 [Português](#-português) | 🇺🇸 [English](#-english)

---

## 🇧🇷 Português

Esse projeto foi desenvolvido como parte de um desafio técnico para uma vaga de estágio na **Petize**. A proposta era criar uma aplicação que consome a API pública do GitHub para buscar perfis de desenvolvedores e exibir seus repositórios.

Foi meu primeiro contato com algumas tecnologias como **Zod** e **i18next**, e aproveitei o desafio para aprender na prática!

### ✨ O que o projeto faz

- Busca usuários do GitHub pelo username
- Exibe o perfil completo: foto, bio, seguidores, empresa, localização, email, site e Twitter
- Lista os repositórios com **scroll infinito** (10 por vez)
- Permite **ordenar os repositórios** por diferentes critérios
- Tem **mensagem de erro** caso o usuário não seja encontrado
- É **responsivo** para desktop e mobile
- Suporta **Português e Inglês** com i18next

### 🛠️ Tecnologias utilizadas

- React + TypeScript
- Vite
- Chakra UI v2
- React Router
- i18next
- Zod
- Axios

### 🚀 Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/Pollymeowth/desafio-buscador-github.git

# Instale as dependências
npm install

# Rode em modo de desenvolvimento
npm run dev
```

### 📄 Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial com campo de busca |
| `/profile/:username` | Perfil do usuário pesquisado |

---

## 🇺🇸 English

This project was developed as part of a technical challenge for a internship position at **Petize**. The goal was to build an app that consumes the public GitHub API to search for developer profiles and display their repositories.

### 🚀 How to run

```bash
git clone https://github.com/Pollymeowth/desafio-buscador-github.git
npm install
npm run dev
```

### 📄 Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with search |
| `/profile/:username` | Searched user's profile |
