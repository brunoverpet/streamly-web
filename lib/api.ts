const url = 'http://localhost:3333'

export async function login(email: string, password: string) {
  try {
    return await fetchUtilities('/login', 'POST', { email, password })
  } catch (err: any) {
    const error: any = new Error("L'email ou le mot de passe est incorrect.")
    error.status = err.status || 400
    throw error
  }
}

export async function getRecommandations() {
  const response = await fetchUtilities('/recommandations', 'get')
  if (!response.ok) {
  }
}

export async function fetchUtilities(endpoint: string, method: string, body?: {}) {
  const res = await fetch(url + endpoint, {
    method: method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: method === 'GET' || method === 'HEAD' ? undefined : JSON.stringify(body),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.message || `Erreur HTTP ${res.status}`)
  }

  return data
}
