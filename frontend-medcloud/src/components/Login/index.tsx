import styles from './styles.module.scss'

export function Login() {
  return(
    <>
      <div className={styles.container}>
        <div className={styles.containerLogin}>
          <p>E-mail</p>
          <input className={styles.input} type='email'/>
          <p>Senha</p>
          <input className={styles.input} type='password'/>
        </div>
        <button className={styles.loginButton} type='button'>Entrar</button>
      </div>
    </>
  )
}