import {Route, Redirect, Switch} from 'react-router-dom'
import {Component} from 'react'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import ContextName from './context'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    sVideos: [],
    lVideos: [],
    dVideos: [],
    darkMode: false,
    presentRoute: '',
  }

  modeChange = () => {
    this.setState(prev => ({darkMode: !prev.darkMode}))
  }

  routeBgColor = h => {
    this.setState({presentRoute: h})
  }

  addLikeFunc = pu => {
    const {lVideos, dVideos} = this.state
    let a = true
    lVideos.map(item => {
      if (item === pu) {
        const filterdList = lVideos.filter(ite => ite !== pu)
        a = false

        return this.setState({lVideos: filterdList})
      }
      return ''
    })
    if (a) {
      this.setState(prev => ({lVideos: [...prev.lVideos, pu]}))
    }
    dVideos.map(item1 => {
      if (item1 === pu) {
        const filter = dVideos.filter(item2 => item2 !== pu)
        return this.setState({dVideos: filter})
      }
      return ''
    })
  }

  addDisLikeFunc = pu => {
    const {lVideos, dVideos} = this.state
    let a = true
    dVideos.map(item => {
      if (item === pu) {
        const filterdList = dVideos.filter(ite => ite !== pu)
        a = false

        return this.setState({dVideos: filterdList})
      }
      return ''
    })
    if (a) {
      this.setState(prev => ({dVideos: [...prev.dVideos, pu]}))
    }
    lVideos.map(item1 => {
      if (item1 === pu) {
        const filter = lVideos.filter(item2 => item2 !== pu)
        return this.setState({lVideos: filter})
      }
      return ''
    })
  }

  addFunction = lov => {
    const {sVideos} = this.state
    let a = true
    sVideos.map(item => {
      if (item.id === lov.id) {
        const filterdList = sVideos.filter(ite => ite.id !== lov.id)
        // console.log('if intiated')
        a = false
        return this.setState({sVideos: filterdList})
      }
      //   console.log('else intiated')
      return ''
    })
    if (a) {
      this.setState(prev => ({sVideos: [...prev.sVideos, lov]}))
    }

    // console.log(lov.id)
  }

  render() {
    const {sVideos, presentRoute, dVideos, darkMode, lVideos} = this.state
    // console.log(sVideos)

    return (
      <ContextName.Provider
        value={{
          lVideos,
          sVideos,
          dVideos,
          darkMode,
          presentRoute,
          modeChange: this.modeChange,
          addLikeFunc: this.addLikeFunc,
          addFunction: this.addFunction,
          addDisLikeFunc: this.addDisLikeFunc,
          routeBgColor: this.routeBgColor,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />

          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ContextName.Provider>
    )
  }
}
export default App
