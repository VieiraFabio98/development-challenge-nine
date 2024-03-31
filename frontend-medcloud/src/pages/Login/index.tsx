import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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

      if(response.ok) {
        const data = await response.json()
        router.push('AdminScreen')
      }
    }catch(error){
      console.log(error)
    }
  }
  return(
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