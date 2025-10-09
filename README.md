# 🍗 La Casa Di Frango – Frontend Web

Frontend desenvolvido em **Vue 3 + Vite** para o sistema **La Casa Di Frango**, com foco em usabilidade, experiência do usuário e integração completa com a API REST do backend.

> Projeto acadêmico com autenticação via Passage id, gerenciamento de pedidos, produtos e usuários, além de dashboards com dados dinâmicos.

---

## 🚀 Funcionalidades Implementadas

* 🔐 Login e cadastro via [Passage ID](https://passage.id/)  
* 🛍️ Visualização de catálogo com filtros e busca  
* 🛒 Carrinho de compras com atualização em tempo real  
* ✅ Finalização de pedidos com exibição de confirmação  
* 💳 Seleção e envio de método de pagamento  
* 📈 Dashboard administrativo com relatório de vendas e produtos mais vendidos  
* 🧑‍💼 Controle de sessão e permissões por grupo de usuário  
* 🎨 Layout responsivo com design moderno e organizado  
* 🔧 Integração com API REST usando Axios e Stores com Pinia  

---

## 🛠️ Tecnologias Utilizadas

* Vue 3 (Composition API)  
* Vite (dev server + build)  
* Pinia (gerenciamento de estado)  
* Vue Router  
* Passage ID (autenticação)  
* Axios (requisições HTTP)  
* TailwindCSS (estilização)  
* Cloudinary (renderização de imagens do backend)  
* Render (deploy da aplicação)

---

## 📁 Estrutura de Pastas

```
📦 frontend-lacasadifrango/
├── public/
├── scripts/
├── src/
│   ├── api/
│   │   ├── pedido/
│   │   ├── produto/
│   │   ├── usuario/
│   │   └── index.js
│   ├── assets/
│   ├── components/
│   │   └── index.js
│   ├── plugins/
│   │   └── axios.js
│   ├── router/
│   │   └── index.js
│   ├── stores/
│   │   ├── pedido/
│   │   ├── produto/
│   │   ├── usuario/
│   │   └── index.js
│   ├── views/
│   ├── App.vue
│   └── main.js
```

---

## 🧭 Rotas e Páginas Principais

### 📦 Produtos
- `/` → Página inicial com catálogo e filtros  
- `/produto/:id` → Detalhes do produto  

### 🛒 Pedidos e Carrinho
- `/carrinho` → Visualização do carrinho  
- `/checkout` → Finalização do pedido  

### 👤 Usuário
- `/login` → Login via Passage  
- `/perfil` → Dados do usuário logado  
- `/pedidos` → Histórico de pedidos  

### 🧑‍💼 Administrador
- `/admin/dashboard` → Relatório de vendas  
- `/admin/produtos` → Gerenciamento de produtos  
- `/admin/pedidos` → Visualização de pedidos finalizados  

---

## 🔐 Controle de Acesso

Permissões e renderizações condicionais baseadas nos grupos de usuário:

- `administrador` — acesso completo (produtos, relatórios, pedidos)
- `usuario` — pode realizar pedidos e gerenciar seus dados
- `convidado` — pode visualizar catálogo, mas sem comprar

Validações extras no frontend garantem que somente usuários autorizados visualizem rotas protegidas. Regras aplicadas com base no estado global (Pinia) e rotas protegidas via `beforeEach` no Vue Router.

---

## ⚙️ Como Rodar o Projeto Localmente

1. Instale [Node.js](https://nodejs.org/) versão 18+

2. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/frontend-lacasadifrango.git
cd frontend-lacasadifrango
```

3. Instale as dependências:

```bash
npm install
```

4. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

> Ajuste a variável `VITE_API_BASE_URL` para o endereço do backend (local ou deploy)

5. Rode o servidor local:

```bash
npm run dev
```

6. Acesse no navegador:  
[http://localhost:5173](http://localhost:5173)

---

## 🌐 Deploy

O projeto está configurado para deploy na plataforma [Render](https://render.com/), utilizando integração com build automático.

---

## 🧪 Comandos Úteis

* `npm run dev` – Inicia o servidor local  
* `npm run build` – Gera os arquivos de produção  
* `npm run preview` – Visualiza o build localmente  

---

## 📄 Licença

Distribuído sob a licença [GPL](https://www.gnu.org/licenses/gpl-3.0.html), mesmo modelo do backend.
