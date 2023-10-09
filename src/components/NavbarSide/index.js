import {Link} from 'react-router-dom'

import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import ContextName from '../../context'

import {Socialmedia, Para, SocialContainer, NavbarBg} from './styledComponent'

let h
let t
let g
let s

const NavbarSide = () => (
  <ContextName.Consumer>
    {value => {
      const {darkMode, presentRoute, routeBgColor} = value

      let clr = '#f9f9f9'
      let bgClr = '#181818'

      if (!darkMode) {
        clr = '#0f0f0f'
        bgClr = '#f9f9f9'
      }
      switch (presentRoute) {
        case 'Home':
          h = '#616060'
          t = 'transparent'
          g = 'transparent'
          s = 'transparent'
          break
        case 'Trending':
          t = '#616060'
          h = 'transparent'
          g = 'transparent'
          s = 'transparent'
          break
        case 'Gaming':
          g = '#616060'
          t = 'transparent'
          h = 'transparent'
          s = 'transparent'
          break
        case 'Savedvideos':
          s = '#616060'
          t = 'transparent'
          g = 'transparent'
          h = 'transparent'
          break

        default:
          break
      }
      return (
        <NavbarBg color={clr} bgColor={bgClr}>
          <ul>
            <Link to="/">
              <Para
                key="1"
                onClick={() => routeBgColor('Home')}
                color={clr}
                bgColor={bgClr}
                splColor={h}
              >
                <AiFillHome />
                Home
              </Para>
            </Link>

            <Link to="/trending">
              <Para
                key="2"
                onClick={() => routeBgColor('Trending')}
                color={clr}
                splColor={t}
                bgColor={bgClr}
              >
                <AiFillFire />
                Trending
              </Para>
            </Link>
            <Link to="/gaming">
              <Para
                key="3"
                onClick={() => routeBgColor('Gaming')}
                color={clr}
                splColor={g}
                bgColor={bgClr}
              >
                <SiYoutubegaming />
                Gaming
              </Para>
            </Link>

            <Link to="/saved-videos">
              <Para
                key="4"
                onClick={() => routeBgColor('Savedvideos')}
                color={clr}
                splColor={s}
                bgColor={bgClr}
              >
                <BiListPlus />
                Saved videos
              </Para>
            </Link>
          </ul>
          <div>
            <p>CONTACT US</p>
            <SocialContainer>
              <Socialmedia
                alt="facebook logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              />
              <Socialmedia
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <Socialmedia
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </SocialContainer>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </NavbarBg>
      )
    }}
  </ContextName.Consumer>
)

export default NavbarSide
