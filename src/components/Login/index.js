import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import ContextName from '../../context'
import {
  LogoAlign,
  ButEl,
  InputEl,
  CardLogin,
  Para,
  LoginContainer,
} from './StyleComponent'

class Login extends Component {
  state = {showPassword: false, massage: ''}

  getData = async event => {
    event.preventDefault()
    const userName = document.getElementById('username').value
    const passWord = document.getElementById('password').value

    const url = 'https://apis.ccbp.in/login'
    const data = {
      username: userName,
      password: passWord,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    // console.log(this.props)
    const responseData = await fetch(url, options)
    let jsonData = await responseData.json()
    if (responseData.ok) {
      jsonData = jsonData.jwt_token
      // console.log(jsonData)

      Cookies.set('jwt_token', jsonData, {expires: 30})
      const {history} = this.props
      history.replace('/')

      // console.log(Cookies.get('jwtToken'))
    } else {
      //   console.log(jsonData.error_msg)
      this.setState({massage: jsonData.error_msg})
    }
  }

  passwordShowFunc = event => {
    // console.log(event.target.checked)
    this.setState({showPassword: event.target.checked})
  }

  render() {
    // console.log(Cookies.get('jwtToken'))

    const {showPassword, massage} = this.state
    const inputType = showPassword ? 'text' : 'password'

    // console.log(massage)
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ContextName.Consumer>
        {value => {
          const {darkMode} = value

          let clr = '#000'
          let bgClr = '#f9f9f9'
          let bgClr1 = '#ebebeb'

          let url =
            'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          if (darkMode) {
            clr = '#fff'
            url =
              'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            bgClr = '#000'
            bgClr1 = '#181818'
          }

          return (
            <LoginContainer color={clr} bgColor={bgClr}>
              <CardLogin onSubmit={this.getData} color={clr} bgColor={bgClr1}>
                <LogoAlign alt="website logo" src={url} />
                <br />
                <label htmlFor="username">USERNAME</label>
                <br />
                <InputEl placeholder="Username" type="text" id="username" />
                <br />
                <label htmlFor="password">PASSWORD</label>
                <br />
                <InputEl
                  placeholder="Password"
                  id="password"
                  type={inputType}
                />
                <br />
                <input
                  onChange={this.passwordShowFunc}
                  type="checkbox"
                  id="passwordShow"
                />
                <label htmlFor="passwordShow">Show Password</label>
                <br />
                <ButEl type="submit">Login</ButEl>
                {massage !== '' && <Para>{massage}</Para>}
              </CardLogin>
            </LoginContainer>
          )
        }}
      </ContextName.Consumer>
    )
  }
}
export default Login
