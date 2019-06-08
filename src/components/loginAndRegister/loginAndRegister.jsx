import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {
  NavBar,
  WingBlank,
  List,
  WhiteSpace,
  InputItem,
  Button,
  Icon,
  Toast
} from 'antd-mobile'
import PropTypes from 'prop-types'
import Logo from '../../components/logo/logo'
import './css/loginAndRegister.less'

class LoginAndRegister extends Component{
  isResetCaptcha =  false; // 是否已经重置验证码
  static propTypes = {
    type: PropTypes.string, // 类型
    toLogin: PropTypes.func, // 去密码登陆
    register: PropTypes.func, // 注册
    login: PropTypes.func, // 密码登录
    smsLogin: PropTypes.func, // 短信登录
    toSmsLogin: PropTypes.func, // 去短信登录
    toRegister: PropTypes.func, // 去注册
    updatePassword: PropTypes.func, // 更改密码
    isShowLeft: PropTypes.bool, // 显示左边
    getSendCode: PropTypes.func, // 发送短信验证码
    bindPhone: PropTypes.func // 绑定手机号
  };
  state = {
    username: '', // 用户名
    oldPassword: '', // 旧密码
    password: '', // 密码
    password2: '',
    captcha: '', // 验证码
    phone: '', // 手机号码
    code: '', // 短信验证码
    sendedTime: 0 // 短信剩下的时间
  };
  render () {
    const {msg, toLogin, type, toRegister, isShowLeft, toSmsLogin} = this.props;
    let {phone, sendedTime} = this.state;
    if (msg === '验证码错误' && !this.isResetCaptcha) {
      this.isResetCaptcha = true;
      this.getCaptcha();
    }
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
                : type === 'smslogin' || type === 'bindphone' ? <InputItem type='phone' placeholder='请输入手机号' onChange={val => this.handleChange('phone', val)} extra={<span onClick={this.getSmsCode} className={/^1\d{2}\s\d{4}\s\d{4}$/.test(phone) ? 'black' : ''} style={{float: 'right', marginTop: '1rem'}}>{sendedTime === 0 ? '获取验证码' : sendedTime + 's'}</span>}>手机号:</InputItem> : <InputItem placeholder='请输入用户名' onChange={val => this.handleChange('username', val)}>用户名:</InputItem>
            }
            <WhiteSpace/>
            {
              type === 'smslogin' || type === 'bindphone' ? null : <InputItem type='password' placeholder='请输入密码' onChange={val => this.handleChange('password', val)}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
            }
            <WhiteSpace/>
            <div id='captch'>
              {
                type === 'login' ? <React.Fragment>
                  <InputItem type='text' placeholder='请输入验证码' onChange={val => this.handleChange('captcha', val)} extra={ <img style={{float: 'right'}} src="http://localhost:4000/captcha" alt="captcha" onClick={this.getCaptcha} ref={ref => this.captcha = ref}/>}>验证码:</InputItem>{/*<div className='clearfix'></div>*/}</React.Fragment>: type === 'smslogin' || type === 'bindphone' ? <InputItem type='text' placeholder='请输入短信验证码' onChange={val => this.handleChange('code', val)}>验证码:</InputItem> : <InputItem type='password' placeholder='请输入确认密码' onChange={val => this.handleChange('password2', val)}>确认密码:</InputItem>
              }
            </div>
            <WhiteSpace/>
            {
              type === 'register' ? <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button> : type === 'login' ? <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button> : type === 'smslogin' ? <Button type='primary' onClick={this.smsLogin}>登&nbsp;&nbsp;&nbsp;录</Button> : type === 'bindphone' ? <Button type='primary' onClick={this.bindPhone}>绑定手机</Button> : <Button type='primary' onClick={this.changePassword}>更改密码</Button>
            }
            <WhiteSpace/>
            {
              type === 'login' || type === 'bindphone' ? null : <Button onClick={toLogin}>密码登录</Button>
            }
            <WhiteSpace/>
            {
              type === 'smslogin' || type === 'bindphone' ? null : <Button onClick={toSmsLogin}>短信登录</Button>
            }
            <WhiteSpace/>
            {
              type === 'register' || type === 'bindphone' ? null : <Button onClick={toRegister}>注册</Button>
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
    if (!(username&&password&&password2)) {
      Toast.fail('表单不够完整，请确认后提交', 3);
    } else if (password !== password2) {
      Toast.fail('两次密码不相等', 3);
      this.setState({
        password: '',
        password2: ''
      })
    } else {
      this.props.register({username, password});
    }
  };

  login = () => {
    const {username, password, captcha} = this.state;
    if (!(username && password)) {
      Toast.fail('用户名和密码不能为空', 3);
    } else if (!captcha) {
      Toast.fail('验证码不能为空', 3)
    } else {
      this.isResetCaptcha = false;
      this.props.login({username, password, captcha});
    }
  };
  changePassword = () => {
    const {oldPassword, password, password2} = this.state;
    if (!(oldPassword && password && password2)) {
      Toast.fail('表单不够完整，请确认后提交', 3);
    } else if (password !== password2) {
      Toast.fail('两次密码不相等', 3);
      this.setState({
        password: '',
        password2: ''
      })
    } else {
      this.props.updatePassword({oldPassword, password, password2});
    }
  };
  goBack = () => {
    this.props.history.goBack();
  };
  getCaptcha = () => {
    this.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now();
  };
  smsLogin = () => {
    const {code} = this.state;
    if (!code) {
      Toast.fail("验证码不能为空", 3);
    } else {
      const phone = this.state.phone.trim().replace(/^(1\d{2})\s(\d{4})\s(\d{4})$/, '$1$2$3');
      this.props.smsLogin({phone, code});
    }
  };
  getSmsCode = () => {
    const {phone, sendedTime} = this.state;
    if (/^1\d{2}\s\d{4}\s\d{4}$/.test(phone) && sendedTime === 0) {
      const phone = this.state.phone.trim().replace(/^(1\d{2})\s(\d{4})\s(\d{4})$/, '$1$2$3');
      this.props.getSendCode({phone});
      this.setState({
        sendedTime: 30
      });
      this.intervalId = setInterval(() => {
        let {sendedTime} = this.state;
        sendedTime--;
        if (sendedTime < 0) {
          clearInterval(this.intervalId);
          this.setState({
            sendedTime: 0
          })
        } else {
          this.setState({
            sendedTime: sendedTime
          })
        }
      }, 1000)
    }
  };
  bindPhone = () => {
    const {code} = this.state;
    const phone = this.state.phone.trim().replace(/^(1\d{2})\s(\d{4})\s(\d{4})$/, '$1$2$3');
    if (!(phone && code)) {
      Toast.fail("表单不够完整，请确认后提交", 3)
    } else {
      this.props.bindPhone({phone, code});
    }
  }
}
export default
withRouter(LoginAndRegister);