import React, {Component} from 'react'
import {WhiteSpace, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import QueueAnim from 'rc-queue-anim'
import './css/user-list.less'
import UserItem from '../user-item/user-item'
class UserList extends Component {
  static propTypes = {
    status: PropTypes.number,
    foodList: PropTypes.array.isRequired,
    changeStatus: PropTypes.func,
    _id: PropTypes.string,
    isManager: PropTypes.bool // 是否为管理员
  };
  state = {
    fullSrc: '', // 详情图片
    isShow: false // 是否显示详情图片
  };
  render () {
    const {status, foodList, _id, isManager} = this.props;
    const {fullSrc, isShow} = this.state;
    let list = [];
    if (status === 0) {
      list = foodList.filter(food => (food._id !== _id && food._id) && food.status === 0)
    } else if (status === 1) {
      list = foodList.filter(food => (food._id === _id || !food._id) && food.status === 0);
    } else if (status === 2) {
      list = foodList.filter(food => (food._id === _id || !food._id) && food.status === 1);
    } else {
      list = foodList;
    }
    list.sort((a, b) => {
          return b.create_time - a.create_time;
        });
    return (
      <div style={{marginTop: 50, marginBottom: 60}}>
        <WingBlank>
          <QueueAnim type='scale'>
            {
              list.map((item, index) => (
                <div key={index}>
                  <WhiteSpace/>
                  <UserItem item={item}
                            status={status}
                            showFullImg={fullSrc => this.showFullImg(fullSrc)}
                            isManager={isManager}
                            handleClick={_lostId => this.handleClick(_lostId)}/>
                </div>
              ))
            }
          </QueueAnim>
        </WingBlank>
        {isShow ? <div id="fullImg"
                       onClick={() => this.setState({isShow: false})}>
          <img src={fullSrc} alt=""/>
        </div> : null}
      </div>
    )
  }
  handleClick(_lostId) {
      let {status} = this.props;
      if (this.props.isManager) {
        status = 2;
      }
      this.props.changeStatus({_lostId, status});
  }
  showFullImg = (fullSrc) => {
    this.setState({
      fullSrc,
      isShow: true
    });
    setTimeout(() => {
      document.getElementById('fullImg').classList.add('active');
    }, 100)
  }
}
export default withRouter(UserList)