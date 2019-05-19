import React from 'react'
import {connect} from 'react-redux'
import {changeStatus} from '../../../../redux/action'
import UserList from '../../../../components/user-list/user-list'
class News extends React.Component {
  render() {
    const {foodList} = this.props.lostFood;
    const {changeStatus} = this.props;
    const {_id} = this.props.user;
    return (
      <div>
        <UserList _id={_id} changeStatus={changeStatus} status={1} foodList={foodList}/>
      </div>
    )
  }
}
export default connect(
  state => ({lostFood: state.lostFood, user: state.user}),
  {changeStatus}
)(News)

