import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  display: flex;
`

export const DetailsBg = styled.div`
  padding: 20px;
  height: 85.6vh;
  width: 100vw;
  overflow-y: auto;
`

export const ChannelAlign = styled.div`
  display: flex;
`

export const Para = styled.p`
  margin-right: 15px;
`

export const ImgChannel = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 40px;
  margin-right: 20px;
  margin-top: 16px;
`

export const LikeAlign = styled.div`
  display: flex;
  justify-content: space-between;
`
export const SaveButton = styled.button`
  background-color: transparent;
  border-width: 0px;
  color: ${props => props.color};
`

export const LikeButton = styled.button`
  background-color: transparent;
  border-width: 0px;
  color: ${props => props.color};
`

export const DisLikeButton = styled.button`
  background-color: transparent;
  border-width: 0px;
  color: ${props => props.color};
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
