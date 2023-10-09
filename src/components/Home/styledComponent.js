import styled from 'styled-components'

export const VideosAlign = styled.ul`
  display: flex;
  flex-wrap: wrap;

  //   overflow-y: auto;
`
export const PopupContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;

  padding: 30px;
  color: black;
`

export const PopButton = styled.button`
  background-color: transparent;
  border-width: 0px;
`

export const HomeBg = styled.div`
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  padding: 20px;
  height: 88vh;
  width: 100vw;
  overflow-y: auto;
`

export const NavbarHomeAlign = styled.div`
  display: flex;
`

export const FailureImg = styled.img`
  margin: 20px;
  width: 600px;
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

export const Logo = styled.img`
  width: 250px;
  height: 50px;
`
export const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
export const TestCaseBg = styled.div`
  background-color: ${props => props.bgColor};
`
