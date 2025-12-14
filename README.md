# 💰 Financial Dashboard

Um sistema de controle financeiro **Full Stack** desenvolvido para gerenciar receitas e despesas. O projeto permite o cadastro de transações e visualização de dados, com persistência real em banco de dados relacional.

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

## 🚀 Tecnologias Utilizadas

### Back-end
- **Java**: Linguagem principal.
- **Spring Boot**: Framework para criação da API REST.
- **Spring Data JPA**: Para persistência de dados.
- **MySQL**: Banco de dados relacional.
- **Maven**: Gerenciador de dependências.

### Front-end
- **React.js**: Biblioteca para construção da interface.
- **Vite**: Ferramenta de build rápida.
- **Axios**: Para consumo da API.

---

## ⚙️ Como rodar o projeto

### Pré-requisitos
- Java JDK instalado.
- Node.js instalado.
- MySQL rodando (Database: `financedb`).

### 1️⃣ Rodando o Back-end (Servidor)
```bash
# Entre na pasta do backend
cd backend

# Execute o projeto
./mvnw spring-boot:run
