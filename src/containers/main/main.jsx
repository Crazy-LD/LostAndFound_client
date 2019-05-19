import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import './css/main.less'
import CompleteInfo from '../complete-info/complete-info'
import Message from '../message/message'
import Personal from '../personal/personal'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'
import Home from '../home/home'

import {getUser} from '../../redux/action'
class Main extends React.Component{
  // 给组件对象添加属性
  navList = [ // 包含所有导航组件的相关信息数据
    {
      path: '/home', // 路由路径
      component: Home,
      icon: 'home',
      text: '主页',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      icon: 'personal',
      text: '个人',
    }
  ];
  componentDidMount () {
    const userid = Cookies.get('userid');
    const {_id} = this.props.user;
    if (userid && !_id) {
      this.props.getUser()
    }
  }
  render () {
    const userid = Cookies.get('userid');
    if (!userid) {
      return <Redirect to='/login'/>
    }
    const {_id, header} = this.props.user;
    if (!_id) {
      return null
    } else {
      let path = this.props.location.pathname;
      if (path === '/') {
        if (!header) {
          return <Redirect to='completeinfo'/>
        } else {
          return <Redirect to='home'/>
        }
      }
    }
    const {navList} = this;
    const path = this.props.location.pathname;
    let currentPage = navList.find(nav => path.indexOf(nav.path) > -1);
    if (path === '/home/sendmsg') {
      currentPage = false;
    }
    const {unReadCount} = this.props;

    return (
      <div>
        <Switch>
          {
            navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
          }
          <Route path='/completeinfo' component={CompleteInfo}/>
          <Route path='/chat/:userid' component={Chat}/>
        </Switch>
        {
          currentPage ? <NavFooter navList={navList}
                                  tintColor='#fe8456'
                                  unReadCount={unReadCount}/> : null
        }
      </div>
    )
  }
}
export default connect(
  state => ({user: state.user, unReadCount: state.chat.unReadCount}),
  {getUser}
)(Main);