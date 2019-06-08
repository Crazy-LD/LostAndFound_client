/*
用户个人中心路由组件
*/
import React from 'react'
import {WhiteSpace, Card, WingBlank, NavBar, Icon, List, Drawer, Modal, Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import {receiveCurrentPath, resetUser, removePhone, resetUserMsg} from '../../redux/action'
import {reqSendCode} from '../../api/index'
import './css/personal.less'
import NavFooter from '../../components/nav-footer/nav-footer'
import News from './children/news/news'
import History from './children/history/history'
import AboutUs from './children/about-us/about-us'
import Cookies from "js-cookie";

const {Header, Body} = Card;
class Personal extends React.Component {
  state = {
    open: false,
  };

  navList = [ // 包含所有导航组件的相关信息数据
    {
      path: '/personal/news', // 路由路径
      component: News,
      icon: 'news',
      text: 'News',
    },
    {
      path: '/personal/history', // 路由路径
      component: History,
      icon: 'history',
      text: 'History',
    },
    {
      path: '/personal/aboutus', // 路由路径
      component: AboutUs,
      icon: 'aboutus',
      text: 'AboutUs',
    }
  ];

  componentDidMount() {
      if (!this.props.currentPath) {
        this.changePath('/personal/news')
      } else {
        this.props.history.replace(this.props.currentPath);
      }
  }

  componentWillUnmount() {
    document.body.removeEventListener('touchmove', this._handle);
    clearTimeout(this.timeoutId);
    document.body.removeEventListener('wheel', this._handle);
  }
  componentDidUpdate(prevProps) {
    const msg = this.props.user.msg;
    if (prevProps.user.msg !== msg && msg) {
      Toast.fail(msg, 3, () => {
        this.props.resetUserMsg();
      });
    }
  }
  render() {
    const {navList} = this;
    const {open} = this.state;
    const {name, phone, header} = this.props.user;
    // if (msg) {
    //   Toast.fail(msg, () => {
    //     this.props.resetUserMsg();
    //   });
    // }
    const sidebar = (
      <List>
        <List.Item align='middle' onClick={() => {this.props.history.push('/completeinfo');this.onOpenChange()}}>
          修改信息
        </List.Item>
        <List.Item align='middle' onClick={() => {this.props.history.push('/changepassword');this.onOpenChange()}}>
          修改密码
        </List.Item>
        {
          phone ? <List.Item align='middle' onClick={() => {this.unBindPhone();this.onOpenChange()}}>
            解除手机绑定
          </List.Item> : null
        }
        <List.Item align='middle' onClick={this.logout}>
          退出
        </List.Item>
      </List>);
    return (
      <div>
        <NavBar className='sticky-header'
                rightContent={
                  <div onClick={this.onOpenChange}>
                   <Icon key="0" type="ellipsis" style={{ marginRight: '16px' }} />
                  </div>}>
          个人中心
        </NavBar>
        <div style={{marginTop: 50, marginBottom: 60}}>
          <WingBlank>
            <WhiteSpace/>
            <Card>
              <Header title={
                <div id='personal' onClick={this.bindPhone}>
                  <div className="name">{name}</div>
                  <div className="sign">{phone || '绑定手机号'}</div>
                </div>
              }
                      thumb={require(`../../assets/images/${header}.png`)}/>
              <Body>
              <div id='personalTab'>
                <NavFooter navList={this.navList}
                           tintColor='#d73243'
                           callback={this.changePath}/>
              </div>
              <Switch>
                {
                  navList.map(item => <Route key={item.path} path={item.path} component={item.component}/>)
                }
              </Switch>
              </Body>
            </Card>
          </WingBlank>
        </div>
        <div id='myDrawer' style={{display: open ? 'block' : 'none'}}>
          <Drawer
            className="my-drawer"
            style={{ minHeight: document.documentElement.clientHeight }}
            contentStyle={{ display: 'none' }}
            sidebar={sidebar}
            open={open}
            enableDragHandle
            onOpenChange={this.onOpenChange}
            position='bottom'
          >
            hidden
          </Drawer>
        </div>
      </div>
    )
  }
  changePath = currentPath => {
    this.props.receiveCurrentPath(currentPath);
    this.props.history.replace(currentPath);
  };

  onOpenChange = () => {
    const open = !this.state.open;
    if (open) {
      this.scrollControl(true)
    } else {
      this.scrollControl(false)
    }
    this.setState({ open });
  };

  scrollControl(isStop) {
    // function _handle(ev) {
    //   ev.preventDefault();
    //   ev.stopPropagation();
    // }
    if (isStop) {
      document.body.addEventListener('touchmove', this._handle, {passive: false});

      document.body.addEventListener('wheel', this._handle,{passive: false});
    } else {
      // 清除事件时，一定要保证处理事件的函数的地址相同，而不仅仅只是名字相同，而每次调用这个函数的时候，都会重新创建一个函数
      document.body.removeEventListener('touchmove', this._handle);

      document.body.removeEventListener('wheel', this._handle);
    }
  }

  _handle(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  };

  logout = () => {
    Modal.alert('退出', '确定要退出吗？', [
      {text: '取消'},
      {
        text: '确定',
        onPress: () => {
          Cookies.remove('userid');
          console.log('shanchuio')
          Cookies.remove('io');
          this.props.resetUser();
          this.props.receiveCurrentPath('');
        }
      }
    ])
  };
  bindPhone = () => {
    const {phone} = this.props.user;
    if (!phone) {
      this.props.history.push("/bindphone");
    }
  };
  unBindPhone = () => {
    const {phone} = this.props.user;
    if (!this.timeoutId) {
      reqSendCode({phone});
      this.timeoutId = setTimeout(() => {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }, 60000)
    }
    Modal.prompt('验证码', '请输入你的验证码',
      [
        {
          text: '取消',
          onPress: () => {
            Toast.info('成功取消', 1);
          }
        },
        {
          text: '确定',
          onPress: code => {
            this.props.removePhone({phone, code})
          }
        },
      ], '', null)
  }

}
export default connect(
  state => ({user: state.user, currentPath: state.currentPath}),
  {receiveCurrentPath, resetUser, removePhone, resetUserMsg}
)(Personal)

