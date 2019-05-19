/*包含多个用于生成新的state的reducer函数模块*/

import {combineReducers} from 'redux'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  RECEIVE_PATH,
  MSG_READ,
  RECEIVE_USER_UPDATE,
  RECEIVE_FOOD,
  REFUSE_FOOD,
  RESET_SEND_REDIRECT,
  RECEIVE_ARTIVLE_LIST,
  CHANGE_STATUS
} from './action-type'
/*用户*/
const initUser = {
  username: '',
  msg: ''
};
function user(state = initUser, action) {
  let redirectTo = '';
  switch (action.type) {
    case AUTH_SUCCESS:
      redirectTo = action.data.header ? 'home' : 'completeinfo';
      return {...action.data, redirectTo};
    case ERROR_MSG:
      return {...state, msg: action.data};
    case RECEIVE_USER:
      return action.data;
    case RECEIVE_USER_UPDATE:
      redirectTo = state.header ? 'home' : 'completeinfo';
      return {...state, redirectTo};
    case RESET_USER:
      return {...initUser, msg:action.data};
    default:
      return state
  }
}
/*当前路径*/
const initCurrentPath = '';
function currentPath(state = initCurrentPath, action) {
  switch (action.type) {
    case RECEIVE_PATH:
      state = action.data;
      return action.data;
    default:
      return state
  }
}
/*消息列表*/
const initMsgList = {
  users: {},
  chatMsgs: [],
  unReadCount: 0
};
function chat (state = initMsgList, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:
      const {users, chatMsgs,userid} = action.data;
      state = {
        users,
        chatMsgs,
        unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && (msg.to === userid) ? 1 : 0),0)
      };
      return state;

    case RECEIVE_MSG:
      const {chatMsg} = action.data;
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: state.unReadCount + (action.data.userid === chatMsg.to ? 1 : 0)
      };
    case MSG_READ:
      const {count, from, to} = action.data;
      return {
        users: state.users,
        chatMsgs: state.chatMsgs.map(chat => {
          if (chat.from === from && chat.to === to && !chat.read) {
            return {...chat, read: true}
          } else {
            return chat
          }
        }),
        unReadCount: state.unReadCount - count
      };
    default:
      return state
  }
}
/*失物列表*/
const initFoodList = {
  foodList: [],
  msg: '',
  redirect: ''
};
function lostFood(state = initFoodList, action) {
  switch (action.type) {
    case RECEIVE_FOOD:
      const redirect = '/personal/news';
      state = {
        foodList: [...state.foodList, action.data],
        redirect
      };
      return state;
    case REFUSE_FOOD:
      state = {
        foodList: [...state.foodList],
        msg: action.data
      };
      return state;
    case RESET_SEND_REDIRECT:
      state = {
        foodList: [...state.foodList]
      };
      return state;
    case RECEIVE_ARTIVLE_LIST:
      state = {
        foodList: [...action.data]
      };
      return state;
    case CHANGE_STATUS:
      const {_lostId, status} = action.data;
      const temp = [...state.foodList];
      const foodList = temp.reduce((foodList, food) => {
        if (food._lostId === _lostId) {
          food.status = status;
        }
        foodList.push(food);
        return foodList
      }, []);
      return {
        foodList
      };
    default:
      return state;
  }
}
/*暴露合并多个reducer函数*/
export default combineReducers({
  user,
  currentPath,
  chat,
  lostFood
})