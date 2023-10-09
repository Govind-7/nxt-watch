import styled from 'styled-components'

export const Align = styled.div`
  display: flex;
`

export const BgContainer = styled.ul`
  background-color: ${props => props.bgColor};
  color: ${props => props.color};

  display: flex;
  flex-wrap: wrap;
  height: 88vh;
  overflow-y: auto;
`

export const BgContainer1 = styled.div`
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  padding: 30px;
`

export const FailureImg = styled.img`
  width: 700px;
  height: 300px;
`

export const Fcontainer = styled.div`
  text-align: center;
`
export const LoaderContainer = styled.div`
  width: 100vw;
  padding-top: 150px;
  text-align: center;
`
export const TestCaseBg = styled.div`
  background-color: ${props => props.bgColor};
`
