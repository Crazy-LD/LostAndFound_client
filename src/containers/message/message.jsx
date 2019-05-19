/*
对话消息列表组件
*/
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge, NavBar} from 'antd-mobile'
const Item = List.Item;
const Brief = Item.Brief;

function getLastMsgs(chatMsgs, userid) {
  const lastMsgObjs = {};
  chatMsgs.forEach(chat => {
    if (chat.to === userid && !chat.read) {
      chat.unReadCount = 1
    } else {
      chat.unReadCount = 0
    }
    const {chat_id} = chat;
    if (!lastMsgObjs[chat_id]) {
      lastMsgObjs[chat_id] = chat
    } else {
      const {unReadCount} = lastMsgObjs[chat_id];
      if (lastMsgObjs[chat_id].create_time < chat.create_time) {
        lastMsgObjs[chat_id] = chat
      }
      lastMsgObjs[chat_id].unReadCount = unReadCount + chat.unReadCount
    }
  });
  const lastMsgs = Object.values(lastMsgObjs);
  lastMsgs.sort((m1, m2) => {
    return m2.create_time - m1.create_time
  });
  return lastMsgs
}
class Message extends Component {
  render() {
    const {user} = this.props;
    const {users, chatMsgs} = this.props.chat;
    const lastMsgs = getLastMsgs(chatMsgs, user._id);
    return (
      <div>
        <NavBar className='sticky-header'>
          消息列表
        </NavBar>
        <List style={{marginBottom: 60, marginTop: 50}}>
          {
            lastMsgs.map(msg => {
              const targetId = msg.to === user._id ? msg.from : msg.to;
              const targetUser = users[targetId];
              return (
                <Item
                  extra={<Badge text={msg.unReadCount}/>}
                  thumb={require(`../../assets/images/${targetUser.header}.png`)}
                  arrow='horizontal'
                  key={msg._id}
                  onClick={() => this.props.history.push(`/chat/${targetId}`)}
                >
                  {msg.content}
                  <Brief>{targetUser.name}</Brief>
                </Item>
              )
            })
          }
        </List>
      </div>
    )
  }
}
export default connect(
  state => ({user: state.user, chat: state.chat}),
  {}
)(Message)