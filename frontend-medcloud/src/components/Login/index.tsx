import styles from './login.module.scss'

export function Login() {
  return(
    <>
      <p>E-mail</p>
      <input type='email'/>
      <p>Senha</p>
      <input type='password'/>
    </>
  )
}