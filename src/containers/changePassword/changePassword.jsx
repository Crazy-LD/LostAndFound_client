import React from 'react'
import {connect} from 'react-redux'
import {Toast} from 'antd-mobile'
import LoginAndRegister from '../../components/loginAndRegister/loginAndRegister'
import {updatePassword} from '../../redux/action'
import {Redirect} from 'react-router-dom'

class Register extends React.Component{
  updatePassword = (data) => {
    if (data.password !== data.password2) {
      Toast.offline('两次密码不同', 1);
    } else {
      if (this.props.updatePassword(data)) {
        Toast.success('密码修改成功', 1);
      }
    }
  };

  render () {
    const {redirectTo, msg} = this.props;
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <LoginAndRegister type='change' isShowLeft={true} updatePassword={this.updatePassword} msg={msg}/>
    )
  }
}
export default connect(
  state => state.user,
  {updatePassword}
)(Register);