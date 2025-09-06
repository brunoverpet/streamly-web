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

export async function register(
  firstname: string,
  lastname: string,
  email: string,
  password: string
) {
  try {
    return await fetchUtilities('/register', 'POST', { email, firstname, lastname, password })
  } catch (err: any) {
    const error: any = new Error("Il s'est passé une erreur.")
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

export async function getItem(id: string) {
  try {
    return await fetchUtilities(`/media/${id}`, 'get')
  } catch (err: any) {
    const error: any = new Error("Une erreur s'est produite.")
    error.status = err.status || 400
    throw error
  }
}

export async function addWatchedItem(id: string) {
  try {
    return await fetchUtilities(`/addWatchedItem/${id}`, 'post')
  } catch (err: any) {
    const error: any = new Error("Une erreur s'est produite.")
    error.status = err.status || 400
    throw error
  }
}

export async function removeWatchedItem(id: string) {
  try {
    return await fetchUtilities(`/removeWatchedItem/${id}`, 'delete')
  } catch (err: any) {
    const error: any = new Error("Une erreur s'est produite.")
    error.status = err.status || 400
    throw error
  }
}

export async function searchItem(value: string) {
  try {
    return await fetchUtilities(`/searchItem`, 'POST', { query: value })
  } catch (err: any) {
    const error: any = new Error("Une erreur s'est produite.")
    error.status = err.status || 400
    throw error
  }
}

export async function fetchUtilities(
  endpoint: string,
  method: string,
  body?: Record<string, unknown>
) {
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
