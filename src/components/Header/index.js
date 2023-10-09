import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {FiSun} from 'react-icons/fi'
import {FaMoon} from 'react-icons/fa'
import {
  Container,
  ModeButton,
  Profile,
  DarkImg,
  LogoSize,
  Pop,
  Align,
} from './styledComponents'
import ContextName from '../../context'

const Header = props => {
  const LogoutFunc = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
    // console.log(path)
  }

  const changeModeFunction = modeChange => {
    modeChange()
  }

  return (
    <ContextName.Consumer>
      {value => {
        const {darkMode, modeChange} = value
        let clr = '#ffffff'
        let bgClr = '#212121'
        let urlLogo =
          'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        if (!darkMode) {
          clr = '#000000'
          bgClr = '#ffffff'
          urlLogo =
            'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        }
        /* console.log(darkMode) */

        return (
          <Container color={clr} bgColor={bgClr}>
            <Link to="/">
              <LogoSize alt="website logo" src={urlLogo} />
            </Link>
            <Align>
              <ModeButton
                data-testid="theme"
                type="button"
                onClick={() => changeModeFunction(modeChange)}
              >
                <DarkImg color={clr}>
                  {darkMode ? <FiSun /> : <FaMoon />}
                </DarkImg>
              </ModeButton>

              <Profile
                alt="profile"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              />
              <Popup modal trigger={<button type="button">Logout</button>}>
                {close => (
                  <Pop color={clr} bgColor={bgClr}>
                    <p>Are you sure, you want to logout</p>
                    <button onClick={LogoutFunc} type="button">
                      Confirm
                    </button>
                    <button type="button" onClick={() => close()}>
                      Cancel
                    </button>
                  </Pop>
                )}
              </Popup>
            </Align>
          </Container>
        )
      }}
    </ContextName.Consumer>
  )
}

export default withRouter(Header)
