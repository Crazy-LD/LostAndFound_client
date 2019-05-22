import React, {Component} from 'react'
import {WhiteSpace, WingBlank, SearchBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import QueueAnim from 'rc-queue-anim'
import './css/user-list.less'
import UserItem from '../user-item/user-item'
let timeInterId = 0; // 为了节流
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
    isShow: false, // 是否显示详情图片
    keyVal: '', // 关键字
  };
  render () {
    const {status, foodList, _id, isManager} = this.props;
    const {fullSrc, isShow, keyVal} = this.state;
    const list = this.listHandle({status, keyVal, _id, foodList});
    return (
      <div style={{marginTop: 50, marginBottom: 60}}>
        <WingBlank>
          <QueueAnim type='scale'>
            {
              status === 0 ? <SearchBar
                placeholder="关键字搜索"
                onChange={keyVal => this.searchChange(keyVal)}
                onCancel={() => this.setState({keyVal: ''})}
                ref={ref => this.search = ref}
              /> : null
            }
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
  };

  listHandle({status, foodList, _id, keyVal}) {
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
    // eslint-disable-next-line
    list.map(item => {
      // eslint-disable-next-line
      Object.keys(item).map(key => {
        // 首先应该清除之前对item的更改;
        if (key === 'lName' || key === 'address' || key === 'desc' || key === 'contact') {
          // item[key] = item[key].replace(/(\S*)<span class="highLight">(\S*)<\/span>(\S*)/gi, '$1$2$3');
          item[key] = item[key].replace(/<span class="highLight">(\S*)<\/span>+/gi, '$1');

        }
      })
    });
    if (keyVal) {
      // eslint-disable-next-line
      list.map(item => {
        let weight = 0;
        let regex = new RegExp(keyVal, 'gi');
        // eslint-disable-next-line
        Object.keys(item).map((key) => {
          let value = item[key];
          if (key === 'lName' || key === 'address' || key === 'desc' || key === 'contact') {
            item[key] = value.replace(regex, function () {
              weight++;
              return '<span class="highLight">' + keyVal + '</span>'
            });
          }
        });
        item.weight = weight;
      });
      list.sort((a, b) => {
        return b.weight - a.weight;
      })
    } else {
      list.sort((a, b) => {
        return b.create_time - a.create_time;
      });
    }
    return list;
  }
/*修改数据源，而不是视图*/
 /* clearHighLight() {
    // eslint-disable-next-line
    console.log('进入清理highLight');
    let highLightNodes = document.getElementsByClassName('highLight');
    for (let i = 0; i < highLightNodes.length; i++) {
      let highNode = highLightNodes[i];
      let highParentNode = highNode.parentNode;
      let value = highParentNode.innerHTML.replace(/(\S*)<span class="highLight">(\S*)<\/span>(\S*)/gi, '$1$2$3');
      // console.log(/(\S*)<span class="highLight">(\S*)<\/span>(\S*)/.test(highParentNode.innerHTML));
      highParentNode.innerHTML = value;
    }
  }*/

  searchChange(keyVal) {
    clearInterval(timeInterId);
    timeInterId = setTimeout(() => {
      this.setState({keyVal});
    }, 200)
  }
}
export default withRouter(UserList)