import styled from 'styled-components'

export const LogoAlign = styled.img`
  width: 200px;
  height: 50px;
  margin-bottom: 30px;
  margin-left: 130px;
`

export const Para = styled.p`
  color: red;
`

export const LoginContainer = styled.div`
  display: flex;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const ButEl = styled.button`
  background-color: blue;
  color: #ffffff;
  width: 450px;
  height: 60px;
  border-radius: 10px;
  border-width: 0px;
`

export const InputEl = styled.input`
  width: 450px;
  height: 60px;
  border-radius: 10px;
  border-width: 1px;
  margin-top: 10px;
  margin-bottom: 10px;
`

export const CardLogin = styled.form`
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  box-shadow: 0px 4px 10px 0px grey;
  padding: 50px;
  margin: 20px;
  margin-top: 200px;
  border-radius: 18px;
`
