import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import Header from '../Header'
import NavbarSide from '../NavbarSide'
import ContextName from '../../context'

import {
  ChannelAlign,
  LikeAlign,
  TestCaseBg,
  DetailsBg,
  Para,
  SaveButton,
  ImgChannel,
  Container,
  LikeButton,
  DisLikeButton,
  Fcontainer,
  FailureImg,
  LoaderContainer,
} from './styledComponent'

const apiStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    details: '',
    channel: '',
    status: apiStatus.loading,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/${id}`

    // console.log(token)
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jsonData = await response.json()
      // console.log(jsonData)
      const mainData = {
        id: jsonData.video_details.id,
        title: jsonData.video_details.title,
        videoUrl: jsonData.video_details.video_url,
        thumbnailUrl: jsonData.video_details.thumbnail_url,
        channel: jsonData.video_details.channel,
        viewCount: jsonData.video_details.view_count,
        publishedat: jsonData.video_details.published_at,
        description: jsonData.video_details.description,
      }
      this.setState({
        details: mainData,
        channel: jsonData.video_details.channel,
        status: apiStatus.success,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  retryFunction = () => {
    this.setState({status: apiStatus.loading}, this.getData)
  }

  loaderFunc = () => (
    <LoaderContainer className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </LoaderContainer>
  )

  failureFunc = darkMode => {
    let url =
      'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
    if (darkMode) {
      url =
        'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    }
    return (
      <Fcontainer>
        <FailureImg alt="failure view" src={url} />
        <h1>Oops! Something Went Wrong</h1>
        <p>
          We are having some trouble to complete your request. Please try again.
        </p>
        <button onClick={this.retryFunction} type="button">
          Retry
        </button>
      </Fcontainer>
    )
  }

  addSavedItems = addFunction => {
    const {details} = this.state
    addFunction(details)
  }

  addLike = darj => {
    const {details} = this.state
    const {id} = details
    darj(id)
  }

  addDisLike = darj => {
    const {details} = this.state
    const {id} = details
    darj(id)
  }

  successFunc = (
    sVideos,
    lVideos,
    dVideos,
    addLikeFunc,
    addDisLikeFunc,
    addFunction,
  ) => {
    const {details, channel} = this.state
    const {
      publishedat,
      id,

      videoUrl,
      description,
      viewCount,
      title,
    } = details
    // console.log(darkMode)
    let a = '#64748b'
    let b = '#64748b'
    let c = '#64748b'
    let content = 'Save'

    // if (!darkMode) {
    //   a = '#000'
    //   b = '#000'
    //   c = '#000'
    // }
    lVideos.map(item1 => {
      if (item1 === id) {
        b = '#2563eb'
        return b
      }
      return ''
    })

    dVideos.map(item2 => {
      if (item2 === id) {
        c = '#2563eb'
        return c
      }
      return ''
    })

    sVideos.map(item => {
      if (item.id === id) {
        a = '#2563eb'
        return a
      }

      return ''
    })

    sVideos.map(item => {
      if (item.id === id) {
        content = 'Saved'
        return content
      }

      return ''
    })

    const formatedDate = new Date(publishedat)
    const month = formatedDate.getMonth()
    const day = formatedDate.getDate()
    const year = formatedDate.getFullYear()

    // const formattedDistance = formatDistanceToNow(new Date(year, month, day))
    let formattedDistance = ''
    if (typeof details === 'object') {
      formattedDistance = formatDistanceToNow(new Date(year, month, day))

      //   console.log(formattedDistance)
    }

    return (
      <DetailsBg>
        <ReactPlayer width="670px" url={videoUrl} controls />
        <p>{title}</p>

        <LikeAlign>
          <ChannelAlign>
            <Para>{viewCount}</Para>
            <p>{formattedDistance}</p>
          </ChannelAlign>
          <ChannelAlign>
            <LikeButton
              onClick={() => this.addLike(addLikeFunc)}
              type="button"
              color={b}
            >
              <AiOutlineLike /> Like
            </LikeButton>
            <DisLikeButton
              onClick={() => this.addDisLike(addDisLikeFunc)}
              type="button"
              color={c}
            >
              <AiOutlineDislike /> DisLike
            </DisLikeButton>
            <SaveButton
              color={a}
              type="button"
              onClick={() => this.addSavedItems(addFunction)}
            >
              <BiListPlus /> {content}
            </SaveButton>
          </ChannelAlign>
        </LikeAlign>

        <hr />
        <ChannelAlign>
          <ImgChannel alt="channel logo" src={channel.profile_image_url} />
          <div>
            <p>{channel.name}</p>
            <p>{channel.subscriber_count} subscribers</p>
          </div>
        </ChannelAlign>
        <p>{description}</p>
      </DetailsBg>
    )
  }

  aiFunction = (
    sVideos,
    lVideos,
    dVideos,
    addLikeFunc,
    addDisLikeFunc,
    addFunction,
    darkMode,
  ) => {
    const {status} = this.state
    switch (status) {
      case apiStatus.loading:
        return this.loaderFunc()

      case apiStatus.failure:
        return this.failureFunc(darkMode)

      case apiStatus.success:
        return this.successFunc(
          sVideos,
          lVideos,
          dVideos,
          addLikeFunc,
          addDisLikeFunc,
          addFunction,
          darkMode,
        )

      default:
        return ''
    }
  }

  render() {
    // const {details, channel} = this.state
    // console.log(details)

    return (
      <ContextName.Consumer>
        {value => {
          const {
            sVideos,
            lVideos,
            dVideos,
            addLikeFunc,
            addDisLikeFunc,
            addFunction,
            darkMode,
          } = value

          let clr = '#fff'
          let bgClr = '#0f0f0f'

          if (!darkMode) {
            clr = '#000'
            bgClr = '#ebebeb'
          }

          /* console.log('sVideos   :', sVideos.id)
          console.log('lVideos    :', lVideos)
          console.log('dVideos   :', dVideos) */

          return (
            <TestCaseBg bgColor={bgClr} data-testid="videoItemDetails">
              <Header />
              <Container color={clr} bgColor={bgClr}>
                <NavbarSide />
                {this.aiFunction(
                  sVideos,
                  lVideos,
                  dVideos,
                  addLikeFunc,
                  addDisLikeFunc,
                  addFunction,
                  darkMode,
                )}
              </Container>
            </TestCaseBg>
          )
        }}
      </ContextName.Consumer>
    )
  }
}

export default VideoItemDetails
