import { FormEvent, useState } from 'react'
import styles from './styles.module.scss'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Email:', email);
    console.log('Password:', password);
  }

  return(
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.containerLogin}>
          <p>E-mail</p>
          <input 
            className={styles.input} 
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Senha</p>
          <input 
            className={styles.input} 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.loginButton} type='submit'>Entrar</button>
      </div>
    </form>
  )
}