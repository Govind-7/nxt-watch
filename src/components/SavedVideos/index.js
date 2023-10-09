import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import {AiFillFire} from 'react-icons/ai'
import ContextName from '../../context'
import Header from '../Header'
import NavbarSide from '../NavbarSide'
import {
  ThumbImg,
  NosavedImg,
  Spl,
  Para,
  TestCaseBg,
  SaveBg,
  SavedCont,
  NosavedContainer,
} from './styledComponent'

class SavedVideos extends Component {
  render() {
    return (
      <ContextName.Consumer>
        {value => {
          const {sVideos, darkMode} = value

          const noSavedVideos = sVideos.length === 0

          let clr = '#fff'
          let bgClr = '#0f0f0f'

          if (!darkMode) {
            clr = '#000'
            bgClr = '#f9f9f9'
          }
          /* console.log(noSavedVideos) */

          return (
            <TestCaseBg bgColor={bgClr} data-testid="savedVideos">
              <Header />
              <SavedCont>
                <NavbarSide />

                {noSavedVideos ? (
                  <NosavedContainer color={clr} bgColor={bgClr}>
                    <NosavedImg
                      alt="no saved videos"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    />
                    <h1>No saved videos found</h1>
                    <p>You can save your videos while watching them</p>
                  </NosavedContainer>
                ) : (
                  <SaveBg color={clr} bgColor={bgClr}>
                    <h1>
                      <AiFillFire /> Saved Videos
                    </h1>
                    <ul>
                      {sVideos.map(item => {
                        const {id, publishedat, channel} = item

                        /* console.log(publishedat) */

                        const formatedDate = new Date(publishedat)
                        const month = formatedDate.getMonth()
                        const day = formatedDate.getDate()
                        const year = formatedDate.getFullYear()

                        // const formattedDistance = formatDistanceToNow(new Date(year, month, day))

                        const formattedDistance = formatDistanceToNow(
                          new Date(year, month, day),
                        )

                        //   console.log(formattedDistance)
                        /* console.log(noSavedVideos) */

                        return (
                          <Link to={`/videos/${id}`}>
                            <Spl key={id} color={clr}>
                              <ThumbImg
                                src={item.thumbnailUrl}
                                alt="video thumbnail"
                              />
                              <div>
                                <p>{item.title}</p>
                                <p>{channel.name}</p>
                                <SavedCont>
                                  <Para>{item.viewCount}</Para>
                                  <p>{formattedDistance}</p>
                                </SavedCont>
                              </div>
                            </Spl>
                          </Link>
                        )
                      })}
                    </ul>
                  </SaveBg>
                )}
              </SavedCont>
            </TestCaseBg>
          )
        }}
      </ContextName.Consumer>
    )
  }
}

export default SavedVideos
