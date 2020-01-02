import React from 'react'
import { css } from 'emotion'
import { Global, css as gcss } from '@emotion/core'
import styled from '@emotion/styled'

const GlobalStyle = props => (
  <Global
    {...props}
    styles={gcss`
      html, body, div#root {
        margin: 0px;
        padding: 0px;
        height: 100%;
      }
    `}
  />
)

const Header = styled.div`
  background-color: #3f51b5;
  height: 128px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Footer = styled.div`
  color: white;
  background-color: #3f51b5;
  display: flex;
  height: 62px;
  justify-content: center;
  align-items: center;
`

const Hr = styled.hr`
  border: 1px solid black;
  margin: 0px;
  padding: 0px;
`

const Wrapper = styled.div`
  height: 100%;
  margin-top: -64px;
`

const Content = styled.div`
  padding-top: 64px;
`

const H1 = styled.h1`
  color: white;
`

const SignInButton = styled.button`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: 100%;
  color: white;
  background-color: #3f51b5;
  border: 1px solid black;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 900;
`

const ErrorBox = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: red;
  font-weight: 900;
  height: 2em;
`

const SignInScreen = () => {
  return (
    <>
      <div
        className={css`
          margin-top: 4rem;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f50057;
            border: 1px solid black;
            border-radius: 50%;
            width: 40px;
            height: 40px;
          `}
        >
          <div>JA</div>
        </div>
      </div>
      <h2
        className={css`
          text-align: center;
        `}
      >
        Sign in
      </h2>
      <ErrorBox>Wrong credentials</ErrorBox>
      <form
        className={css`
          margin-top: 2rem;
          margin-bottom: 1rem;
        `}
      >
        <div
          className={css`
            margin: 1rem 4rem 1rem 4rem;
            padding: 0.5rem;
            border: 1px solid black;
            border-radius: 3px;
          `}
        >
          <input
            className={css`
              width: 100%;
              border: 0px;
              font-size: 1rem;
            `}
            type="text"
            placeholder="Username"
            required={true}
          />
        </div>
        <div
          className={css`
            margin: 1rem 4rem 1rem 4rem;
            padding: 0.5rem;
            border: 1px solid black;
            border-radius: 3px;
          `}
        >
          <input
            className={css`
              width: 100%;
              border: 0px;
              font-size: 1rem;
            `}
            type="password"
            placeholder="Password"
            required={true}
          />
        </div>
        <div
          className={css`
            margin: 2rem 4rem 1rem 4rem;
          `}
        >
          <SignInButton>Sign in</SignInButton>
        </div>
      </form>
    </>
  )
}

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Content>
          <Header>
            <H1>BlogList App</H1>
          </Header>
          <Hr />
          <SignInScreen />
        </Content>
      </Wrapper>
      <Hr />
      <Footer>Copyright © Jukka Aho 2019</Footer>
    </>
  )
}

export default App
