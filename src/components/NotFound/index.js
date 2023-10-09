import ContextName from '../../context'
import Header from '../Header'
import NavbarSide from '../NavbarSide'
import {Align, Container, Img} from './styledComponent'

const NotFound = () => (
  <ContextName.Consumer>
    {value => {
      const {darkMode} = value

      let clr = '#fff'
      let bgClr = '#181818'

      if (!darkMode) {
        clr = '#000'
        bgClr = '#ebebeb'
      }
      let url =
        'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      if (!darkMode) {
        url =
          'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      }
      return (
        <div>
          <Header />
          <Align>
            <NavbarSide />
            <Container color={clr} bgColor={bgClr}>
              <Img alt="not found" src={url} />
              <h1>Page Not Found</h1>
              <p>we are sorry, the page you requested could not be found.</p>
            </Container>
          </Align>
        </div>
      )
    }}
  </ContextName.Consumer>
)

export default NotFound
