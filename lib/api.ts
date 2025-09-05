const url = 'http://localhost:3333'

export async function login(email: string, password: string) {
  const response = await fetch(url + '/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    const err: any = new Error(data.message || "L'email ou le mot de passe est incorrect.")
    err.status = response.status
    throw err
  }

  return data
}
