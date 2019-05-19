import React from 'react'
import {connect} from 'react-redux'
import LoginAndRegister  from '../../components/loginAndRegister/loginAndRegister'
import {login} from '../../redux/action'
import {Redirect} from 'react-router-dom'
class Login extends React.Component{
  login = (data) => {
    this.props.login(data)
  }
  toRegister = () => {
    this.props.history.replace('/register')
  }
  render () {
    const {msg, _id} = this.props.user;
    if (_id) {
      return <Redirect to='home'/>
    }
    return (
      <LoginAndRegister type='login' msg={msg} login={this.login} toRegister={this.toRegister}/>
    )
  }
}
export default connect(
  state => ({user: state.user}),
  {login}
)(Login);