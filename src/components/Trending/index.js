import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillFire} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import NavbarSide from '../NavbarSide'
import {
  Align,
  LoaderContainer,
  Fcontainer,
  FailureImg,
  TestCaseBg,
  TrendingBg1,
  TrendingBg,
} from './styledComponet'
import CardThumbnail from '../CardThumbnail'
import ContextName from '../../context'

const apiStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class Trending extends Component {
  state = {
    trendingList: [],
    status: apiStatus.loading,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jsonData = await response.json()
      this.setState({trendingList: jsonData.videos, status: apiStatus.success})
      // console.log(jsonData)
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

  successFunc = () => {
    // console.log(darkMode)
    const {trendingList} = this.state
    // return trendingList.map(item => <CardThumbnail data={item} />)
    return trendingList.map(item => <CardThumbnail key={item.id} data={item} />)
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
            <TestCaseBg bgColor={bgClr} data-testid="trending">
              <Header />
              <Align>
                <NavbarSide />
                <TrendingBg1 color={clr} bgColor={bgClr}>
                  {status === apiStatus.success && (
                    <h1>
                      <AiFillFire />
                      Trending
                    </h1>
                  )}
                  <TrendingBg color={clr} bgColor={bgClr}>
                    {this.aiFunction(darkMode)}
                  </TrendingBg>
                </TrendingBg1>
              </Align>
            </TestCaseBg>
          )
        }}
      </ContextName.Consumer>
    )
  }
}

export default Trending
