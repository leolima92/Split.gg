# 🎮 Split.gg

## 📱 Sobre o Projeto
**Split.gg** é um aplicativo mobile desenvolvido em **React Native** com o objetivo de simular um sistema de **balanceamento automático de times** para jogos competitivos.

O aplicativo permite o cadastro de jogadores com informações como **nickname, rank e função**, e utiliza essas informações para organizar partidas equilibradas, armazenando os dados em um **banco de dados relacional local (SQLite)**.

O projeto foi desenvolvido como parte de um trabalho acadêmico, aplicando conceitos de **desenvolvimento mobile**, **modelagem de dados**, **CRUD** e **lógica de negócio**.

---

## 🎯 Objetivos
- Aplicar conceitos de **React Native**
- Utilizar **banco de dados relacional (SQLite)**
- Implementar operações **CRUD (Create, Read, Update, Delete)**
- Trabalhar com **relacionamentos N:N**
- Simular lógica de **matchmaking e balanceamento de times**

---

## 🧩 Funcionalidades
- Cadastro, edição e exclusão de jogadores
- Listagem de jogadores cadastrados
- Criação de partidas
- Distribuição automática de jogadores em times
- Histórico de partidas geradas

---

## 🗄️ Banco de Dados
O aplicativo utiliza **SQLite**, armazenado localmente no dispositivo.

### Principais tabelas:
- `players` — Armazena os jogadores
- `matches` — Armazena as partidas
- `match_players` — Tabela associativa entre jogadores e partidas

---

## 🛠️ Tecnologias Utilizadas
- React Native (Expo)
- JavaScript
- SQLite (`expo-sqlite`)
- Node.js (ambiente de desenvolvimento)

---

## 🚀 Como executar o projeto
1. Clone este repositório
2. Instale as dependências:
   ```bash
   npm install
````

3. Execute o projeto:

   ```bash
   npx expo start
   ```
4. Execute no emulador ou dispositivo físico com o Expo Go

---

## 👨‍💻 Desenvolvido por

* **Leonardo Lima**
* **Yasmin Ayumi**

---

## 📚 Observações

Este projeto tem finalidade **acadêmica**, servindo como prática de desenvolvimento para dispositivos móveis.

```
