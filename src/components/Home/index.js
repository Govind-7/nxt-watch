import {Component} from 'react'

import Cookies from 'js-cookie'
import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CardThumbnail from '../CardThumbnail'

import {
  HomeBg,
  NavbarHomeAlign,
  FailureImg,
  VideosAlign,
  PopButton,
  TestCaseBg,
  Logo,
  LogoContainer,
  Fcontainer,
  PopupContainer,
  LoaderContainer,
} from './styledComponent'
import NavbarSide from '../NavbarSide'
import ContextName from '../../context'

const apiStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    status: apiStatus.loading,
    videoList: [],
    searchValue: '',
    searchInp: '',
    banner: true,
  }

  componentDidMount() {
    this.getVideoData()
  }

  getVideoData = async () => {
    const {searchInp} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInp}`
    const token = Cookies.get('jwt_token')
    // console.log(token)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const responseData = await fetch(url, options)
    // console.log(responseData)
    if (responseData.ok) {
      const jsonData = await responseData.json()
      this.setState({videoList: jsonData.videos, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  retryFunction = () => {
    this.setState({status: apiStatus.loading}, this.getVideoData)
  }

  loaderFunc = () => (
    <LoaderContainer className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </LoaderContainer>
  )

  successFunc = () => {
    // console.log(darkMode)
    const {videoList} = this.state
    return videoList.length === 0 ? (
      <Fcontainer>
        <FailureImg
          alt="no videos"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        />
        <h1>No Search results found</h1>
        <p>Try different key words or remove search filter</p>
        <button onClick={this.retryFunction} type="button">
          Retry
        </button>
      </Fcontainer>
    ) : (
      videoList.map(item => <CardThumbnail key={item.id} data={item} />)
    )
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

  searchFunction = () => {
    const {searchValue} = this.state
    this.setState({searchInp: searchValue}, this.getVideoData)
  }

  searchInp = event => {
    // console.log(event.target.value)
    this.setState({searchValue: event.target.value})
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

  closeBanner = () => {
    this.setState({banner: false})
  }

  render() {
    const {searchValue, banner} = this.state
    // console.log(videoList)
    // Cookies.remove('jwtToken')
    return (
      <ContextName.Consumer>
        {value => {
          const {darkMode} = value

          let clr = '#fff'
          let bgClr = '#181818'

          if (!darkMode) {
            clr = '#000'
            bgClr = '#f9f9f9'
          }

          return (
            <TestCaseBg bgColor={bgClr} data-testid="home">
              <Header />
              <NavbarHomeAlign>
                <NavbarSide />
                <HomeBg bgColor={bgClr} color={clr}>
                  {banner && (
                    <PopupContainer data-testid="banner">
                      <LogoContainer>
                        <Logo
                          alt="nxt watch logo"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        />
                        <PopButton
                          data-testid="close"
                          type="button"
                          onClick={this.closeBanner}
                        >
                          <AiOutlineClose />
                        </PopButton>
                      </LogoContainer>

                      <p>Buy Nxt Watch Premium prepaid plans with UPL</p>
                      <button type="button">GET IT NOW</button>
                    </PopupContainer>
                  )}

                  <input
                    value={searchValue}
                    onChange={this.searchInp}
                    type="search"
                  />
                  <button
                    data-testid="searchButton"
                    onClick={this.searchFunction}
                    type="button"
                  >
                    <AiOutlineSearch />
                  </button>
                  <VideosAlign>{this.aiFunction(darkMode)}</VideosAlign>
                </HomeBg>
              </NavbarHomeAlign>
            </TestCaseBg>
          )
        }}
      </ContextName.Consumer>
    )
  }
}

export default Home
