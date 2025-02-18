# Projeto de Formulário com Frontend e Backend

Este projeto consiste em um sistema de cadastro de formulários, com um frontend desenvolvido em **Vite + TypeScript + TailwindCSS** e um backend em **NestJS + MongoDB Atlas**. O sistema permite cadastrar, listar e editar formulários, além de validar os dados enviados.

## 🚀 Como Rodar o Projeto
Siga os passos abaixo para rodar o frontend e o backend juntos.

### ✨ Pré-requisitos
Antes de começar, certifique-se de que você tem instalado:

- **Node.js** (versão 16 ou superior)
- **npm** ou **Yarn**
- **MongoDB Atlas** (ou um banco de dados MongoDB local)

---

## 💻 Passo 1: Configurar o Backend

Clone o repositório:

```bash
git clone https://github.com/killu4kun/challenge-form-frontend/
cd challenge-form-frontend/frontend
```

Instale as dependências:

```bash
npm install
```

### Configure o arquivo `.env`:
Crie um arquivo `.env` na raiz do projeto backend e adicione a URI do MongoDB Atlas:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

Substitua `<username>`, `<password>` e `<dbname>` pelos valores corretos.

### Inicie o servidor do backend:

```bash
npm run start:dev
```

O backend estará rodando em:

```
http://localhost:3000
```

---

## 🛠️ Passo 2: Configurar o Frontend

Navegue até a pasta do frontend:

```bash
cd ../frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor do frontend:

```bash
npm run dev
```

O frontend estará rodando em:

```
http://localhost:5173
```

---

## 👀 Passo 3: Acesse a Aplicação

Abra o navegador e acesse:

```
http://localhost:5173
```

### 📝 Cadastre um formulário:
- Preencha os campos (**nome, e-mail e CEP**).
- Clique em **"Enviar"**.

### 🔄 Liste os formulários:
- Os formulários cadastrados serão exibidos abaixo do formulário de cadastro.

### 🔄 Edite um formulário:
- Clique no botão **"Editar"** ao lado de um formulário na listagem.
- Os dados serão carregados no formulário de cadastro para edição.

---

## 🛠️ Endpoints do Backend

O backend fornece os seguintes endpoints:

### **POST /form/submit**
- Envia um novo formulário.

#### **Exemplo de Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "cep": "12345678"
}
```

### **GET /form**
- Lista todos os formulários cadastrados.

### **PATCH /form/:id**
- Atualiza um formulário existente.

#### **Exemplo de Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "cep": "12345678"
}
```

---

## 📁 Estrutura do Projeto

### **Backend**
```
backend/
├── src/
│   ├── form/                  # Módulo do formulário
│   │   ├── form.controller.ts # Controlador do formulário
│   │   ├── form.service.ts    # Serviço do formulário
│   │   ├── form.module.ts     # Módulo do formulário
│   │   ├── dto/               # DTOs (Data Transfer Objects)
│   │   ├── schemas/           # Schemas do MongoDB
│   │   └── interfaces/        # Interfaces
│   ├── config/                # Configurações do projeto
│   ├── database/              # Configuração do banco de dados
│   ├── app.module.ts          # Módulo principal da aplicação
│   ├── app.controller.ts      # Controller principal
│   └── main.ts                # Ponto de entrada da aplicação
├── test/                      # Testes automatizados
├── .env                       # Variáveis de ambiente
└── package.json               # Dependências e scripts
```

### **Frontend**
```
frontend/
├── src/
│   ├── assets/                # Recursos como imagens, ícones, etc.
│   ├── components/            # Componentes reutilizáveis
│   ├── services/              # Serviços para chamadas à API
│   ├── App.tsx                # Componente principal
│   ├── main.tsx               # Ponto de entrada da aplicação
│   └── index.css              # Estilos globais
├── .gitignore                 # Arquivos ignorados pelo Git
├── tailwind.config.js         # Configuração do TailwindCSS
├── tsconfig.json              # Configuração do TypeScript
├── vite.config.ts             # Configuração do Vite
└── package.json               # Dependências e scripts
```

---

## 👥 Como Contribuir

1. Faça um **fork** do repositório.
2. Crie uma **branch** para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m 'Adicionando nova feature'
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um **pull request**.

---

## 📚 Licença

Este projeto está licenciado sob a licença **MIT**. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

