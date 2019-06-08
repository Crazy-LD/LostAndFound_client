/*
包含多个ajax的请求函数
*/
import ajax from './ajax'
import configObj from '../config/index'
const BASE_URL = configObj.protocol + '://' +  configObj.host + ':' +  configObj.port;
// const BASE_URL = "";
// 请求注册
export const reqRegister = user => ajax(BASE_URL + '/register', user, 'POST');
// 请求登录
export const reqLogin = (data) => ajax(BASE_URL + '/login', data, 'POST');
// 更新用户信息
export const reqUpdate = user => ajax(BASE_URL + '/update', user, 'POST');
// 获取用户信息
export const reqUser = () => ajax(BASE_URL + '/user');
// 获取当前用户的聊天消息列表
export const reqMsgList = () => ajax(BASE_URL + '/msglist');
// 修改指定消息为已读
export const reqReadMsg = (from) => ajax(BASE_URL + '/readmsg', {from}, 'POST');
// 修改密码
export const reqUpdatePassword = ({oldPassword, password}) => ajax(BASE_URL + '/updatepassword', {oldPassword,password}, 'POST');
// 发布失物信息
export const reqSendArticle = (data) => ajax(BASE_URL + '/sendarticle', data, 'POST'); //, {headers: {'Content-Type': 'multipart/form-data'}}
export const reqArticleList = () => ajax(BASE_URL + '/article');
// 改变消息的状态
export const reqChangeStatus = ({_lostId, status}) => ajax(BASE_URL + '/changestatus', {_lostId, status}, 'POST');
// 得到短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode', phone);
// 添加手机号
export const reqAddPhone = (data) => ajax(BASE_URL + '/addphone', data, 'POST');
// 短信登录
export const reqSmsLogin = (data) => ajax(BASE_URL + '/login_sms', data, 'POST');