import React from 'react'
import {connect} from 'react-redux'
import LoginAndRegister  from '../../components/loginAndRegister/loginAndRegister'
import {addPhone, resetUserRedirect} from '../../redux/action'
import {Redirect} from 'react-router-dom'
import {reqSendCode} from "../../api";
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
       />
    )
  }
  bindPhone = ({phone, code}) => {
    this.props.addPhone({phone, code});
  };
  getSendCode = (phone) => {
    reqSendCode(phone);
  }
}
export default connect(
  state => ({user: state.user}),
  {addPhone, resetUserRedirect}
)(BindPhone);