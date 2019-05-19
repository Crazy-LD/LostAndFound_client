import io from 'socket.io-client'

const socket = io('ws://localhost:4000')
socket.emit('sendMsg', {name: 'abc'})
console.log('客户端向服务器发送一条消息', {name: 'bac'})
socket.on('receiveMsg', function (data) {
  console.log('客户端接受到服务器发送的一条消息', data)
})