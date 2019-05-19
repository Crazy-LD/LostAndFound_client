import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {
  NavBar,
  WingBlank,
  List,
  WhiteSpace,
  InputItem,
  Button,
  Icon
} from 'antd-mobile'
import PropTypes from 'prop-types'
import Logo from '../../components/logo/logo'

class LoginAndRegister extends Component{
  static propTypes = {
    type: PropTypes.string, // 类型
    toLogin: PropTypes.func, // 去登陆
    register: PropTypes.func, // 注册
    login: PropTypes.func, // 登录
    toRegister: PropTypes.func, // 去注册
    updatePassword: PropTypes.func, // 更改密码
    isShowLeft: PropTypes.bool // 显示左边
  };
  state = {
    username: '', // 用户名
    oldPassword: '', // 旧密码
    password: '', // 密码
    password2: ''
  };
  render () {
    const {msg, toLogin, type, toRegister, isShowLeft} = this.props;
    return (
      <div>
        {
          isShowLeft ? <NavBar icon={<Icon type="left" size='lg'/>}
                               onLeftClick={this.goBack}
          >失&nbsp;物&nbsp;招&nbsp;领</NavBar> : <NavBar>失&nbsp;物&nbsp;招&nbsp;领</NavBar>
        }
        <Logo/>
        <WingBlank>
          {msg ? <p className='error-msg'>{msg}</p> : null}
          <List>
            <WhiteSpace/>
            {
              type === 'change' ? <InputItem type='password' placeholder='请输入旧密码' onChange={val => this.handleChange('oldPassword', val)}>旧密码:</InputItem>
                : <InputItem placeholder='请输入用户名' onChange={val => this.handleChange('username', val)}>用户名:</InputItem>
            }
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入密码' onChange={val => this.handleChange('password', val)}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
            <WhiteSpace/>
            {
              type === 'login' ? null : <InputItem type='password' placeholder='请输入确认密码' onChange={val => this.handleChange('password2', val)}>确认密码:</InputItem>
            }
            <WhiteSpace/>
            {
              type === 'register' ? <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button> : type === 'login' ? <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button> : <Button type='primary' onClick={this.changePassword}>更改密码</Button>
            }
            <WhiteSpace/>
            {
              type === 'register' ? <Button onClick={toLogin}>已有账户</Button> : type === 'login' ? <Button onClick={toRegister}>还没有账户</Button> : null
            }
          </List>
        </WingBlank>
      </div>
    )
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  };

  register = () => {
    const {username, password, password2} = this.state;
    this.props.register({username, password, password2});
  };

  login = () => {
    const {username, password} = this.state;
    this.props.login({username, password});
  };
  changePassword = () => {
    const {oldPassword, password, password2} = this.state;
    this.props.updatePassword({oldPassword, password, password2})
  };
  goBack = () => {
    this.props.history.goBack();
  }
}
export default withRouter(LoginAndRegister);