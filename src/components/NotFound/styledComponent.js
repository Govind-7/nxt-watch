import styled from 'styled-components'

export const Align = styled.div`
  display: flex;
`

export const Img = styled.img`
  width: 400px;
  height: 300px;
  margin: 40px;
`

export const Container = styled.div`
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  width: 100vw;
  text-align: center;
`
