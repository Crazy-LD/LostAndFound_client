/*
包含多个ajax的请求函数
*/
import ajax from './ajax'
// 请求注册
export const reqRegister = user => ajax('/register', user, 'POST');
// 请求登录
export const reqLogin = ({username,password}) => ajax('/login', {username,password}, 'POST');
// 更新用户信息
export const reqUpdate = user => ajax('/update', user, 'POST');
// 获取用户信息
export const reqUser = () => ajax('/user');
// 获取当前用户的聊天消息列表
export const reqMsgList = () => ajax('/msglist');
// 修改指定消息为已读
export const reqReadMsg = (from) => ajax('/readmsg', {from}, 'POST');
// 修改密码
export const reqUpdatePassword = ({oldPassword, password}) => ajax('/updatepassword', {oldPassword,password}, 'POST');
// 发布失物信息
export const reqSendArticle = (data) => ajax('/sendarticle', data, 'POST') //, {headers: {'Content-Type': 'multipart/form-data'}}
export const reqArticleList = () => ajax('/article');
// 改变消息的状态
export const reqChangeStatus = ({_lostId, status}) => ajax('/changestatus', {_lostId, status}, 'POST');