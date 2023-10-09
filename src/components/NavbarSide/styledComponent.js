import styled from 'styled-components'

export const NavbarBg = styled.nav`
  background-color: ${props => props.bgColor};
  padding: 30px;
  color: ${props => props.color};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
`
export const Socialmedia = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`
export const SocialContainer = styled.div`
  display: flex;
`

export const Para = styled.li`
  color: ${props => props.color};
  background-color: ${props => props.splColor};
  padding: 10px;
  list-style-type: none;
  text-decoration: none;
`
