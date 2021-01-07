import React from 'react'
import LoginGoogle from '../../../Services/google-auth/login'
import { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../../../Services/firebase/index'
import {
  Container,
  LoginContainer,
  Title,
  Subtitle,
  TextError,
  TitleForm,
  FormLogin,
  Input,
  Button,
  AsideContainer
} from './signinStyle'
import bgImage from '../../../assets/illustrations/bg-illustration.svg'
import { Link } from 'react-router-dom'

const SignIn = () => {
  const firebase = useContext(FirebaseContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [btn, setBtn] = useState(false)

  useEffect(() => {
    if (password.length > 5 && email !== '') {
      setBtn(true)
    } else if (btn) setBtn(false)
  }, [email, password, btn])

  const handleSubmit = e => {
    e.preventDefault()
    try {
      firebase.login(email, password)
      setEmail('')
      setPassword('')
      setError('')
      console.log('Successful login ')
    } catch (error) {
      setError(error)
    }
  }

  return (
    <>
      <Title> Bienvenue sur ScheduleGO </Title>{' '}
      <Container>
        <AsideContainer>
          <img
            style={{ width: 700, height: 700 }}
            src={bgImage}
            alt='illustration'
          />
        </AsideContainer>{' '}
        <LoginContainer>
          <Subtitle> Vous avez un évènement à planifier ? </Subtitle>{' '}
          <TitleForm> Commencer dès maintenant! </TitleForm>{' '}
          {error !== '' && <TextError> {error.message} </TextError>}{' '}
          <FormLogin onSubmit={handleSubmit}>
            <Input
              type='email'
              placeholder='Votre email? ex: johnDoe@yahoor.fr'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />{' '}
            <Input
              type='password'
              placeholder='Votre mot de passe'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />{' '}
            {btn ? (
              <Button type='submit'> Connexion </Button>
            ) : (
              <Button disabled> Connexion </Button>
            )}{' '}
            <LoginGoogle />
          </FormLogin>{' '}
          <Link
            to='/signup'
            style={{ fontSize: '1.2rem', textDecoration: 'none' }}
          >
            {' '}
            Créer un nouveau compte ici{' '}
          </Link>{' '}
        </LoginContainer>{' '}
      </Container>{' '}
    </>
  )
}
export default SignIn
