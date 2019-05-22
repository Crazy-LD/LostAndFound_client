/* 包含所有action的type常量名称的模块*/
export const AUTH_SUCCESS = 'auth_success'; // 授权成功的常量
export const ERROR_MSG = 'error_msg'; // 错误提示信息
export const RECEIVE_USER = 'receive_user'; //  接受更改过后的user
export const RECEIVE_USER_UPDATE = 'receive_user_update';
export const RESET_USER = 'reset_user'; // 重置用户的数据
export const RECEIVE_MSG_LIST = 'receive_msg_list' ;// 获取消息列表
export const RECEIVE_MSG = 'receive_msg';// 用户接受到消息
export const MSG_READ = 'msg_read'; // 阅读消息
export const RECEIVE_PATH = 'receive_path'; // 接受当前路径，用于个人主页，二级路由跳转
export const RECEIVE_FOOD = 'receive_food'; // 发布失物成功
export const REFUSE_FOOD = 'refuse_food'; // 发布失物失败
export const RECEIVE_ARTIVLE_LIST = 'receive_artivle_list'; // 接受所有的失物信息
export const RESET_SEND_REDIRECT = 'reset_send_redirect'; // 重置sendMSG页面的重定向
export const CHANGE_STATUS = 'change_status'; // 状态修改成功
export const RESET_USER_REDIRECT = 'reset_user_redirect'; // 重置用户登录时的重定向