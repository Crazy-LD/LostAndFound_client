import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch, Route} from 'react-router-dom'
import UserList from '../../components/user-list/user-list'
import SendMsg from '../../containers/sendMsg/sendMsg'
import {getArticle} from '../../redux/action'
class Home extends Component {
  componentWillUnmount() {
    this.props.getArticle();
  }
  render () {
    if (this.props.location.pathname !== '/home') {
      return (
        <Switch>
          <Route path='/home/sendmsg' component={SendMsg}/>
        </Switch>
      )
    }
    const {foodList} = this.props.lostFood;
    const {_id} = this.props.user;
    return (
      <div>
        <NavBar className='sticky-header'
                leftContent={<img src={require('../../assets/images/add.png')} alt="" style={{width: '23%'}}/>}
                onLeftClick={this.leftClick}>
          Lost & Found
        </NavBar>
        <UserList _id={_id} status={0} foodList={foodList}/>
      </div>
    )
  }
  leftClick = () => {
    this.props.history.push('/home/sendmsg');
  }
}
export default connect(
  state => ({lostFood: state.lostFood, user: state.user}),
  {getArticle}
)(Home)
