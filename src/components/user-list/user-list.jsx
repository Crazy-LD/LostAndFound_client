import React, {Component} from 'react'
import {WhiteSpace, WingBlank, Card, Button} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import QueueAnim from 'rc-queue-anim'
import './css/user-list.less'
const {Header, Body, Footer} = Card;
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
    const path = this.props.location.pathname;
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
                  <Card>
                    <Header title={item.name}
                            extra={status !== 0 ? <Button style={{width: '60%', background: '#e85a4b', float: 'right', color: 'white', fontSize: '15px'}}
                                           size='small'
                                           onClick={() => this.handleClick(item._lostId)}>
                                {status === 1 ? '找到' : '删除'}
                            </Button> : null}
                            onClick={() => path === '/home' ? this.props.history.push(`/chat/${item._id}`) : null}
                            thumb={require(`../../assets/images/${item.header}.png`)}/>
                    <Body>
                    <div className="imagesContainer">
                      {
                        item.images.map((imgItem, imgIndex) => <img src={imgItem} key={imgIndex} alt={item.name} onClick={() => this.showFullImg(imgItem)}/>)
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