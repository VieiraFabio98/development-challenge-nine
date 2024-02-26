import { FormEvent, useState, useEffect } from 'react'
import styles from './styles.module.scss'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const url = 'http://localhost:3333/sessions'

    const userData = {
      name: 'admin',
      email: email,
      password: password
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }

    try{
      const response = await fetch(url, requestOptions)
      console.log(response)
    }catch(err){
      console.log(err)
    }
    
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