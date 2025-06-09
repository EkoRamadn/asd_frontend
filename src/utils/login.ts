export const login = async (email: string, password: string) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error(`Gagal login! Status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Login berhasil:', data)

    if (data.token) {
      localStorage.setItem('token', data.token)
    }

    alert('Login berhasil! Selamat datang kembali')

  } catch (error) {
    console.error('Gagal login:', error)
    alert('Login gagal, pastikan email & password kamu benar')
  }
}