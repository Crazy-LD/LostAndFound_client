import React from 'react'
import {connect} from 'react-redux'
import LoginAndRegister  from '../../components/loginAndRegister/loginAndRegister'
import {addPhone, resetUserRedirect, resetUserMsg} from '../../redux/action'
import {Redirect} from 'react-router-dom'
import {reqSendCode} from "../../api";
import {Toast} from "antd-mobile/lib/index";
class BindPhone extends React.Component{
  render () {
    const {msg, redirectTo} = this.props.user;
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <LoginAndRegister
        type='bindphone'
        msg={msg}
        bindPhone={this.bindPhone}
        getSendCode={this.getSendCode}
        isShowLeft={true}
        resetUserMsg={this.props.resetUserMsg}
       />
    )
  }
  bindPhone = ({phone, code}) => {
    this.props.addPhone({phone, code});
  };
  getSendCode = async (phone) => {
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
  {addPhone, resetUserRedirect, resetUserMsg}
)(BindPhone);