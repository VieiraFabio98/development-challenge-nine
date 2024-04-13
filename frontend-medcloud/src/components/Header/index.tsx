import { AuthContext } from "@/contexts/AuthContext"
import { useContext } from "react"
import styles from './styles.module.scss'

export default function Header() {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated? (
    <header>
      <nav className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <img className={styles.logo} src='/images/logo-medcloud.png' alt="MedCloud" />
          <label className={styles.label}>Sair</label>
        </div>
      </nav>
    </header>
  ) : null
}