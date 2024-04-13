import React, { FormEvent, useState } from "react"
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import styles from './styles.module.scss'
import { Modal } from "@mui/material"

export default function AdminScreen() {
  const baseUrl: string = 'http://localhost:3333/patient'

  const disabledButton: boolean = true
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [birthDate, setBirthDate] = React.useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const token = localStorage.getItem('token')
      console.log(token)
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email,
          address,
          birthDate
        })
      })
      const data = await response.json()  
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <>
      <div className={styles.containerButtons}>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button onClick={handleOpen}>Create</Button>
          <Button disabled={disabledButton}>Edit</Button>
          <Button disabled={disabledButton}>View</Button>
          <Button disabled={disabledButton}>Delete</Button>
        </ButtonGroup>
      </div>

      <section className={styles.containerInfo}>
      
      </section>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modalContent}>
          <form onSubmit={handleSubmit}>
          <input
            className={styles.inputForm}
            type="text"
            placeholder="Name"
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            type="text"
            placeholder="addresss"
            name='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          /> 
        <input
            className={styles.inputForm}
            type="date"
            placeholder="birthDate"
            name='birthDate'
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          /> 

          <button type='submit'>Cadastrar</button>
          </form>
        </div>
      </Modal>
    </>
  )
}