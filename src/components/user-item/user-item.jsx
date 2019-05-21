import React, {Component} from 'react'
import {Card, Button} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import './css/user-item.less'
import PropTypes from 'prop-types'
const {Header, Body, Footer} = Card;
class UserItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    status: PropTypes.number,
    handleClick: PropTypes.func,
    showFullImg: PropTypes.func,
    isManager: PropTypes.bool
  };
  render() {
    const {item, status, handleClick, showFullImg, isManager} = this.props;
    const path = this.props.location.pathname;
    return (
      <Card>
        <Header title={item.name}
                extra={status !== 0 ? <Button style={{width: '60%', background: '#e85a4b', float: 'right', color: 'white', fontSize: '15px'}}
                                              size='small'
                                              onClick={() => handleClick(item._lostId)}>
                  {status === 1 ? '找到' : '删除'}
                </Button> : null}
                onClick={() => path === '/home' ? this.props.history.push(`/chat/${item._id}`) : null}
                thumb={require(`../../assets/images/${item.header}.png`)}/>
        <Body>
        <div className="imagesContainer">
          {
            item.images.map((imgItem, imgIndex) => <img src={imgItem} key={imgIndex} alt={item.name} onClick={() => showFullImg(imgItem)}/>)
          }
        </div>
        <div className="desc">
          {isManager ? <div className='nowrap'>失物状态：<span>{item.status === 0 ? '正在寻找失主' : item.status === 1 ? '已经找到' : '已经删除'}</span></div> : null}
          <div className='nowrap'>失物名称：<span>{item.lName}</span></div>
          <div className='nowrap'>失物地点：<span>{item.address}</span></div>
          <div className='clearfix desc_other'>
            <div className="other_left">
              其他描述：
            </div>
            <div className='other_right'>
              {item.desc}
            </div>
          </div>
          <div>联系方式：<span>{item.contact}</span></div>
        </div>
        </Body>
        <Footer extra={this.formatTime(item.create_time)}/>
      </Card>
    )
  }
  formatTime(time) {
    const date = new Date(time);
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const nowTime = Date.now();
    const inter = nowTime - time;
    let firstName = '';
    const secondName = hour + ':' + minute;
    if (inter < 1000*60*60*24) {
      firstName = '今天'
    } else if (inter < 1000*60*60*24*2) {
      firstName = '昨天'
    } else if (inter < 1000*60*60*24*3) {
      firstName = '前天'
    } else {
      firstName = month + '-' + day;
    }
    return firstName + ' ' + secondName;
  }
}

export default withRouter(UserItem)