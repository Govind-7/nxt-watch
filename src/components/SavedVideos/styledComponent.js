import styled from 'styled-components'

export const SavedCont = styled.div`
  display: flex;
`

export const SaveBg = styled.div`
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  padding: 20px;
  height: 88vh;
  overflow-y: auto;
  width: 100vw;
  //   display: flex;
`

export const ThumbImg = styled.img`
  height: 250px;
  width: 430px;
  margin-right: 20px;
`

export const Para = styled.p`
  margin-right: 30px;
`

export const Spl = styled.li`
  color: ${props => props.color};
  text-decoration: none;
  display: flex;
  margin-bottom: 25px;
`

export const NosavedImg = styled.img`
  margin: 30px;
  height: 250px;
  width: 430px;
`

export const NosavedContainer = styled.div`
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  width: 100vw;
  text-align: center;
`

export const TestCaseBg = styled.div`
  background-color: ${props => props.bgColor};
`
