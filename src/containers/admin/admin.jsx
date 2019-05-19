import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import {getArticle, changeStatus} from '../../redux/action'
import UserList from '../../components/user-list/user-list'
class Admin extends Component {
  componentDidMount() {
    this.props.getArticle();
  }
  render () {
    const {foodList} = this.props.lostFood;
    const search = this.props.location.search;
    let searCon = search.slice(1);
    let allParams = {};
    // eslint-disable-next-line
    searCon.split('&').map(item => {
      let oneParam = item.split('=');
      allParams[oneParam[0]] = oneParam[1];
    });
    if (allParams.pw !== '123456') {
      return <Redirect to='/home'/>
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
