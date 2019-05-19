import React from 'react'
import {connect} from 'react-redux'
import './css/about-us.less'

class AboutUs extends React.Component {
  render() {
    return (
      <div id='about-us'>
        <img src="/images/myQQ.png" alt=""/>
      </div>
    )
  }
}
export default connect()(AboutUs)

