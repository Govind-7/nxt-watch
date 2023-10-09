import React from 'react'

const ContextName = React.createContext({
  savedVideo: [],
  addVideoToSavedList: () => {},
})

export default ContextName
