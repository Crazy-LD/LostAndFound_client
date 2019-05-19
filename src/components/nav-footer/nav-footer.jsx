import React, {Component} from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item;
class NavFooter extends Component {
  static propsType = {
    navList: PropTypes.array.isRequired,
    unReadCount: PropTypes.number.isRequired,
    callback: PropTypes.func
  };
  render () {
    const path = this.props.location.pathname;
    let {navList, unReadCount, tintColor} = this.props;
    return (
      <TabBar
        tintColor={tintColor}
      >
        {
          navList.map(nav =>(
            <Item key={nav.path}
                  badge={nav.path === '/message' ? unReadCount : 0}
                  title={nav.text}
                  icon={{uri: require(`./images/${nav.icon}.png`)}}
                  selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                  selected={path.indexOf(nav.path) > -1}
                  onPress={() => this.changeTab(nav.path)}/>

          ))
        }
      </TabBar>
    )
  }
  changeTab(path) {
    let {callback} = this.props;
    if (callback) {
      callback(path);
    } else {
      if (!(this.props.location.pathname.indexOf('/personal') !== -1 && path === '/personal')) {
        this.props.history.replace(path);
      }
    }
  }

}
// 向外暴露一些withRouter包装产生的组件
// 内部的组件会传入一些组件特有的属性history,location
export default withRouter(NavFooter)