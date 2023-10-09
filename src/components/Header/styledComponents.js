import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${props => props.bgColor};
  padding: 15px;
  color: ${props => props.color};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`
export const Pop = styled.div`
  background-color: ${props => props.bgColor};
  padding: 15px;
  color: ${props => props.color};
`

export const Align = styled.div`
  display: flex;
`
export const Profile = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 30px;
  margin-left: 30px;
`
export const DarkImg = styled.div`
  color: ${props => props.color};
  font-size: 30px;
`

export const LogoSize = styled.img`
  width: 200px;
  height: 60px;
`
export const ModeButton = styled.button`
  background-color: transparent;
  border-width: 0px;
`
