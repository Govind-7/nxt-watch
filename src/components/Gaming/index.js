import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import NavbarSide from '../NavbarSide'
import {
  Align,
  BgContainer,
  BgContainer1,
  Fcontainer,
  TestCaseBg,
  FailureImg,
  LoaderContainer,
} from './styledComponent'
import GamingCard from '../GamingCard'
import ContextName from '../../context'

const apiStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {
    status: apiStatus.loading,
    gamingList: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/videos/gaming'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jsonData = await response.json()

      const {videos} = jsonData
      this.setState({gamingList: videos, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }

    // console.log(videos)
  }

  retryFunction = () => {
    this.setState({status: apiStatus.loading}, this.getData)
  }

  loaderFunc = () => (
    <LoaderContainer className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </LoaderContainer>
  )

  successFunc = () => {
    // console.log(darkMode)
    const {gamingList} = this.state
    // return trendingList.map(item => <CardThumbnail data={item} />)
    return gamingList.map(item => <GamingCard key={item.id} data={item} />)
  }

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
          We are having some trouble to complete your request.Please try again.
        </p>
        <button onClick={this.retryFunction} type="button">
          Retry
        </button>
      </Fcontainer>
    )
  }

  aiFunction = darkMode => {
    const {status} = this.state
    switch (status) {
      case apiStatus.loading:
        return this.loaderFunc()

      case apiStatus.failure:
        return this.failureFunc(darkMode)

      case apiStatus.success:
        return this.successFunc()

      default:
        return ''
    }
  }

  render() {
    const {status} = this.state
    // console.log(gamingList)
    return (
      <ContextName.Consumer>
        {value => {
          const {darkMode} = value

          let clr = '#fff'
          let bgClr = '#0f0f0f'

          if (!darkMode) {
            clr = '#000'
            bgClr = '#f9f9f9'
          }

          return (
            <TestCaseBg bgColor={bgClr} data-testid="gaming">
              <Header />

              <Align>
                <NavbarSide />
                <BgContainer1 color={clr} bgColor={bgClr}>
                  {status === apiStatus.success && (
                    <h1>
                      <SiYoutubegaming /> Gaming
                    </h1>
                  )}
                  <BgContainer color={clr} bgColor={bgClr}>
                    {this.aiFunction(darkMode)}
                  </BgContainer>
                </BgContainer1>
              </Align>
            </TestCaseBg>
          )
        }}
      </ContextName.Consumer>
    )
  }
}
export default Gaming
