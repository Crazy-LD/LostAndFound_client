import React from 'react'
import {connect} from 'react-redux'
import LoginAndRegister from '../../components/loginAndRegister/loginAndRegister'
import {register, resetUserRedirect} from '../../redux/action'
import {Redirect} from 'react-router-dom'
import '../../assets/css/index.less'

class Register extends React.Component{
  register = (data) => {
    this.props.register(data)
  };
  toLogin = () => {
    this.props.history.replace('/login')
  };
  render () {
    const {redirectTo, msg} = this.props;
    console.log('redirectTo', redirectTo);
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <LoginAndRegister type='register' toLogin={this.toLogin} register={this.register} msg={msg}/>
    )
  }

  componentWillUnmount() {
    this.props.resetUserRedirect();
  }
}
export default connect(
  state => state.user,
  {register, resetUserRedirect}
)(Register);