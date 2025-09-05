const url = 'http://localhost:3333'

export async function login(email: string, password: string) {
  try {
    console.log(email, password)
    return await fetchUtilities('/login', 'POST', { email, password })
  } catch (err: any) {
    const error: any = new Error("L'email ou le mot de passe est incorrect.")
    error.status = err.status || 400
    throw error
  }
}

export async function getRecommandations() {
  try {
    return await fetchUtilities('/recommendations', 'get')
  } catch (err: any) {
    const error: any = new Error("Une erreur s'est produite.")
    error.status = err.status || 400
    throw error
  }
}

export async function getHistoric() {
  try {
    return await fetchUtilities('/watched', 'get')
  } catch (err: any) {
    const error: any = new Error("Une erreur s'est produite.")
    error.status = err.status || 400
    throw error
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
