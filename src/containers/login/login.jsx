import React from 'react'
import {connect} from 'react-redux'
import LoginAndRegister  from '../../components/loginAndRegister/loginAndRegister'
import {login, resetUserRedirect} from '../../redux/action'
import {Redirect} from 'react-router-dom'
class Login extends React.Component{
  componentWillUnmount() {
    this.props.resetUserRedirect();
  }
  render () {
    const {msg, _id} = this.props.user;
    if (_id) {
      return <Redirect to='home'/>
    }
    return (
      <LoginAndRegister type='login' msg={msg} login={this.login} toRegister={this.toRegister} toSmsLogin={this.toSmsLogin}/>
    )
  }
  login = (data) => {
    this.props.login(data)
  };
  toRegister = () => {
    this.props.history.replace('/register')
  };
  toSmsLogin = () => {
    this.props.history.replace('/smslogin')
  };
}
export default connect(
  state => ({user: state.user}),
  {login, resetUserRedirect}
)(Login);