# Involves Stage API Reference

Este projeto é um portal de documentação profissional e otimizado para desenvolvedores da API Involves Stage, com foco em processos eficientes de integração e uma experiência clara e intuitiva. Construído com tecnologias modernas como VitePress, Vue.js e Scalar, enfatiza performance, interatividade, suporte multi-idiomas e facilidade de manutenção.

---

## Início Rápido

Siga os passos abaixo para rodar rapidamente o projeto em seu ambiente local.

### Pré-requisitos

* Node.js (>=18.0.0)
* pnpm (>=8.15.5)

### Instalação

Clone o repositório e entre no diretório:

```bash
git clone https://github.com/rafactx/api-docs.git
cd api-docs
```

Instale as dependências:

```bash
pnpm install
```

### Ambiente de Desenvolvimento

Inicie o servidor de desenvolvimento com suporte a hot-reloading:

```bash
pnpm run dev
```

Acesse a documentação em [`http://localhost:5173`](http://localhost:5173) ou na porta que estiver disponível.

### Build de Produção

Para gerar uma versão estática da documentação:

```bash
pnpm run build
```

Os arquivos gerados estarão disponíveis em:

```plaintext
docs/.vitepress/dist
```

### Pré-visualização da Build

Para testar a versão construída localmente:

```bash
pnpm run preview
```

---

## Estrutura do Projeto

```plaintext
.
├── docs/                             # Documentação VitePress
│   ├── .vitepress/                   # Configurações e tema do VitePress
│   │   ├── components/               # Componentes Vue personalizados
│   │   ├── theme/                    # CSS global e estilos personalizados
│   │   ├── config.ts                 # Configurações principais (i18n, navbar, sidebar)
│   │   └── index.ts                  # Entry point do tema
│   ├── public/                       # Recursos estáticos
│   │   ├── openapi-pt-br.json        # Especificação OpenAPI (Português)
│   │   └── openapi.scalar.yaml       # Integração Scalar API
│   ├── en/                           # Conteúdo em Inglês
│   ├── es/                           # Conteúdo em Espanhol
│   ├── fr/                           # Conteúdo em Francês
│   ├── pt/                           # Conteúdo em Português (padrão)
│   └── index.md                      # Redirecionamento por idioma
├── .gitignore                        # Exclusões do Git
├── package.json                      # Dependências e scripts
├── pnpm-lock.yaml                    # Lockfile para consistência de dependências
├── pnpm-workspace.yaml               # Configuração do workspace pnpm
├── tsconfig.json                     # Configuração TypeScript
├── vercel.json                       # Configuração do deploy (Vercel)
└── vite.config.ts                    # Build e configuração do Vite
```

---

## Principais Funcionalidades

* **Referência Interativa da API**: Teste endpoints diretamente na documentação com Scalar, com esquemas claros e completos.
* **Suporte Multi-idiomas**: Documentação em Português, Inglês, Espanhol e Francês, incluindo detecção automática de idioma.
* **Design Responsivo**: Compatível com diversos dispositivos e tamanhos de tela.
* **Estilo Consistente**: Interface inspirada em melhores práticas de design, proporcionando uma experiência profissional e limpa.
* **Performance Otimizada**: Carregamento rápido através de técnicas modernas como code splitting, lazy loading e otimizações na construção.
* **Documentação Clara de Autenticação e Versionamento**: Explicações detalhadas sobre autenticação HTTP Basic e gerenciamento de versões via cabeçalho.
* **Exemplos Práticos**: Trechos de código em JavaScript, Python, cURL e PHP para facilitar integrações rápidas e robustas.

---

## Conceitos da API

### URL Base

A URL base utilizada para todas as requisições é:

```plaintext
https://{customerSubdomain}.involves.com/webservices/api/v3
```

### Autenticação

É utilizada autenticação HTTP Basic. Codifique suas credenciais em Base64 e adicione-as no cabeçalho:

```http
Authorization: Basic <credenciais-base64>
```

*Exemplo*: para `user:password`, codifique como `user:password | base64`.

### Versionamento

Especifique a versão da API que deseja utilizar através do cabeçalho:

```http
Accept-Version: 2020-02-26
```

### Tratamento de Erros

A API retorna códigos HTTP padrão acompanhados de informações detalhadas em JSON para auxiliar no debug e resolução de problemas:

```json
{
  "status": 400,
  "term": "ID_INVALIDO",
  "message": "The provided ID is invalid.",
  "details": [
    {
      "field": "id",
      "message": "The ID must be a valid integer."
    }
  ]
}
```

---

