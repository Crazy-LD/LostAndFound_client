/*
对话聊天的路由组件
*/
import React, {Component} from 'react'
import {NavBar,InputItem, Grid, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg, readMsg} from '../../redux/action'
import './css/chat.less'
class Chat extends Component {
  state = {
    content: '',
    isShow: false
  };
  handleClick = () => {
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    const content = this.state.content.trim();
    if (content) {
      this.props.sendMsg({from, to, content})
    }
    this.setState({
      content: '',
      isShow: false
    });
  };
  changeShow = () => {
    const isShow = !this.state.isShow;
    this.setState({
      isShow
    });
    if (isShow) {
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  };
  componentWillMount () {
    const emojis = [
      '😀', '🤣', '😂', '🤑', '🙂','😄', '🙃', '😉', '😊', '😇',
      '😍', '🤩', '😘', '😗', '☺','😚', '😋', '😛', '😜', '🤪',
      '😝', '😏', '😪', '💀', '☠','🤡', '💩', '👹', '💋', '👌',
      '✌', '🤞', '🤟', '🤘', '🤙','☝', '👍', '🖕', '👀', '💍',
    ];
    this.emojis = emojis.map(emoji => ({text: emoji}))
  }
  componentDidMount () {
    window.scrollTo(0, document.body.scrollHeight)
  }
  componentDidUpdate () {
    window.scrollTo(0, document.body.scrollHeight)
  }
  componentWillUnmount () {
    const from = this.props.match.params.userid;
    const to = this.props.user._id;
    this.props.readMsg({from, to})
  }
  render() {
    const {user} = this.props;
    const {users, chatMsgs} = this.props.chat;
    const userid = user._id;
    const targetId = this.props.match.params.userid;
    const chatId = [userid, targetId].sort().join('_');
    const msgs = chatMsgs.filter(chat => chat.chat_id === chatId);
    if (!users[userid]) {
      return null
    }
    const header = users[targetId].header;
    // const targetIcon = require(`../../assets/images/${header}.png`);
    return (
      <div id='chat-page'>
        <NavBar
          className='sticky-header'
          icon={<Icon type='left' size='lg'/>}
          onClick={() => this.props.history.goBack()}
        >
          {users[targetId].name}
          </NavBar>
        <div style={{marginBottom: 50, marginTop: 50}}>
          {/*<QueueAnim type='left'> /!*delay={100}*!/*/}
            {
              msgs.map(msg => {
                if (userid === msg.to) {
                  return (
                    <div className="chat chat_left clearfix" key={msg._id}>
                      <img src={require('../../assets/images/' + header + '.png')} alt=""/>
                      <div className="left_msg">
                        {msg.content}
                      </div>
                      {/*<Item*/}
                      {/*thumb={targetIcon}*/}
                      {/*key={msg._id}*/}
                      {/*>*/}
                      {/*{msg.content}*/}
                      {/*</Item>*/}
                    </div>
                  )
                } else {
                  return (
                    <div className="chat chat_right clearfix" key={msg._id}>
                      <img src={require('../../assets/images/' + users[userid].header + '.png')} alt=""/>
                      <div className="right_msg">
                        {msg.content}
                      </div>
                      {/*<Item*/}
                        {/*className='chat-me'*/}
                        {/*extra=' 我'*/}
                        {/*key={msg._id}*/}
                      {/*>*/}
                        {/*{msg.content}*/}
                      {/*</Item>*/}
                    </div>
                  )
                }
              })
            }
          {/*</QueueAnim>*/}
        </div>
        <div className='am-tab-bar' ref='imoj'>
          <InputItem
            placeholder=" 请输入"
            onChange={val => {this.setState({content: val})}}
            value={this.state.content}
            onFocus={() => this.setState({isShow: false})}
            extra={
             <span>
                <span role='img'aria-label="emoji" onClick={this.changeShow} style={{marginRight: 5}}>😂</span>
                <span onClick={this.handleClick}>发送</span>
             </span>
            }
          />
          <div id='grid'>
            {
              this.state.isShow ? (
                <Grid
                  data={this.emojis}
                  columnNum={8}
                  carouselMaxRow={4}
                  isCarousel={true}
                  onClick={(item) => {
                    this.setState({content: this.state.content + item.text})
                  }}
                />
              ) : null
            }
          </div>
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg, readMsg}
)(Chat)