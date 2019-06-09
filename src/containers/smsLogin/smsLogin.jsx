import React from 'react'
import {connect} from 'react-redux'
import LoginAndRegister  from '../../components/loginAndRegister/loginAndRegister'
import {resetUserRedirect, smsLogin,resetUserMsg} from '../../redux/action'
import {reqSendCode} from '../../api/index'
import {Redirect} from 'react-router-dom'
import {Toast} from 'antd-mobile'
class SmsLogin extends React.Component{
  componentWillUnmount() {
    this.props.resetUserRedirect();
  }
  render () {
    const {msg, _id} = this.props.user;
    if (_id) {
      return <Redirect to='home'/>
    }
    return (
      <LoginAndRegister
        type='smslogin'
        msg={msg}
        toRegister={this.toRegister}
        toLogin={this.toLogin}
        getSendCode={this.getSendCode}
        resetUserMsg={this.props.resetUserMsg}
        smsLogin={this.smsLogin}/>
    )
  }
  smsLogin = (data) => {
    this.props.smsLogin(data);
  };
  toRegister = () => {
    this.props.history.replace('/register')
  };
  toLogin = () => {
    this.props.history.replace('/login')
  };
  getSendCode =  async (phone) => {
    let response = await reqSendCode(phone);
    const result = response.data;
    console.log(result);
    if (result.code === 1) {
      Toast.fail(result.msg);
    }
  }
}
export default connect(
  state => ({user: state.user}),
  {resetUserRedirect, smsLogin, resetUserMsg}
)(SmsLogin);