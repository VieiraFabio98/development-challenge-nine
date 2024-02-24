import { Login } from '@/components/Login'
import styles from './home.module.scss'

export default function Home() {
  return(
    <>
      <title>Home | MedCloud</title>
      <main className={styles.container}>
        <section className={styles.content}>
          <img src='/images/logo-medcloud.png' alt='MedCloud' className={styles.logo}/>
          <h1>Sua Clínica Simplificada e <span>Otimizada</span></h1>
          <Login />
        </section>
      </main>
    </>
  )
}