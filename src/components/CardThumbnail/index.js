import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ContextName from '../../context'

import {
  CardAlignImg,
  CardChannelAlign,
  CardContainer,
  ChannelImg,
  Para,
  Views,
} from './styledComponent'

const CardThumbnail = props => {
  const {data} = props
  const {channel} = data
  //   console.log(data.published_at)

  const alignedDate = new Date(data.published_at)
  const year = alignedDate.getFullYear()
  const month = alignedDate.getMonth()
  const day = alignedDate.getDay()

  let formatedDate = ''

  if (typeof data === 'object') {
    formatedDate = formatDistanceToNow(new Date(year, month, day))
  }
  //   console.log(formatedDate)

  return (
    <ContextName.Consumer>
      {value => {
        const {darkMode} = value

        let clr = '#fff'

        if (!darkMode) {
          clr = '#000'
        }

        return (
          <Link to={`/videos/${data.id}`}>
            <CardContainer>
              <CardAlignImg alt="video thumbnail" src={data.thumbnail_url} />

              <CardChannelAlign>
                <ChannelImg
                  alt="channel logo"
                  src={channel.profile_image_url}
                />
                <div>
                  <Para color={clr}>{data.title}</Para>
                  <Para color={clr}>{channel.name}</Para>
                  <Views>
                    <Para color={clr}>{data.view_count} views</Para>
                    <Para color={clr}>{formatedDate}</Para>
                  </Views>
                </div>
              </CardChannelAlign>
            </CardContainer>
          </Link>
        )
      }}
    </ContextName.Consumer>
  )
}

export default CardThumbnail
