import {Link} from 'react-router-dom'
import {ImgSIze, Para, Heading, Container} from './styledComponent'
import ContextName from '../../context'

const GamingCard = props => {
  const {data} = props
  const {id} = data

  return (
    <ContextName.Consumer>
      {value => {
        const {darkMode} = value

        let clr = '#fff'
        /* let bgClr = '#181818' */

        if (!darkMode) {
          clr = '#000'
          /* bgClr = '#ebebeb' */
        }

        return (
          <Link to={`/videos/${id}`}>
            <Container>
              <ImgSIze alt="video thumbnail" src={data.thumbnail_url} />
              <Heading color={clr}>{data.title}</Heading>
              <Para color={clr}>{data.view_count} Watchihng worldwide</Para>
            </Container>
          </Link>
        )
      }}
    </ContextName.Consumer>
  )
}

export default GamingCard
