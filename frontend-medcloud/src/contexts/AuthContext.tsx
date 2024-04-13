import { useRouter } from "next/router"
import { createContext, useState } from "react"

type AuthContextType = {
  isAuthenticated: boolean,
  signIn: (data: SignInData) => Promise<void>
}

type SignInData = {
  email: string,
  password: string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  async function signIn(data: SignInData) {
    const { email, password } = data;
    const url = 'http://localhost:3333/sessions'

    const payload = {
      email: email,
      password: password
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const responseData = await response.json()
      const token = responseData.token
      console.log(token)
      localStorage.setItem('token', token)
      if (response.ok) {
        setIsAuthenticated(true)
        router.push('AdminScreen')
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.log(error)
      setIsAuthenticated(false)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
