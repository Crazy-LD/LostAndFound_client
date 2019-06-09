import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import {getArticle, changeStatus} from '../../redux/action'
import UserList from '../../components/user-list/user-list'
import {Modal, Toast} from "antd-mobile/lib/index";
class Admin extends Component {
  state = {
    isManager: true
  };
  componentDidMount() {
    Modal.prompt('登录', '请输入登录信息',
      [
        {
          text: '取消',
          onPress: () => {
            Toast.info('成功取消', 1);
            this.setState({isManager: false});
          }
        },
        {
          text: '确定',
          onPress: (username, code) => {
            if (username === 'admin' && code === '123456') {
              this.setState({isManager: true});
              this.forceUpdate();
              this.props.getArticle();
            } else {
              Toast.fail('密码错误');
              this.setState({isManager: false});
            }
          }
        },
      ], 'login-password', null)
  }
  render () {
    const {foodList} = this.props.lostFood;
    if (!this.state.isManager) {
      return <Redirect to='home'/>
    }
    return (
      <div>
        <NavBar className='sticky-header'>
          管理员界面
        </NavBar>
        <UserList isManager={true} foodList={foodList} changeStatus={this.props.changeStatus}/>
      </div>
    )
  }
}
export default connect(
  state => ({lostFood: state.lostFood}),
  {getArticle, changeStatus}
)(Admin)
