import parser from 'accept-language-parser'

// A lista de idiomas que seu site suporta
const supportedLanguages = ['pt', 'en', 'es', 'fr']
// O idioma padrão caso não haja correspondência
const defaultLanguage = 'pt'

export const config = {
  // O matcher garante que este middleware rode APENAS para a página inicial ('/').
  matcher: '/',
}

// A única mudança é aqui: removemos a tipagem da 'request' e da resposta
export function middleware(request) {
  // 1. Pega o cabeçalho 'accept-language' que o navegador envia.
  const acceptLanguageHeader = request.headers.get('accept-language')

  // 2. Usa o 'accept-language-parser' para encontrar a melhor correspondência
  const preferredLanguage = parser.pick(supportedLanguages, acceptLanguageHeader, {
    loose: true,
  })

  // 3. Determina para qual idioma redirecionar (o preferido ou o padrão).
  const langToRedirect = preferredLanguage || defaultLanguage

  // 4. Monta a URL final (ex: https://seusite.com/es)
  const url = request.nextUrl.clone()
  url.pathname = `/${langToRedirect}`

  // 5. Usamos a classe Response nativa da web para criar o redirecionamento
  return new Response(null, {
    status: 308, // Permanent Redirect
    headers: {
      Location: url.toString(),
    },
  })
}
