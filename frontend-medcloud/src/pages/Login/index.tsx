import { FormEvent, useContext, useState } from 'react'
import styles from './styles.module.scss'
import { AuthContext } from '@/contexts/AuthContext'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useContext(AuthContext)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await signIn({ email, password })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.containerLogin}>
          <input
            className={styles.inputForm}
            type="email"
            placeholder="E-mail"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.inputForm}
            type="password"
            placeholder="Senha"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.loginButton} type='submit'>Entrar</button>
      </div>
    </form>
  )
}
