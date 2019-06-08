import axios from 'axios'
axios.defaults.withCredentials=true;
export default function ajax(url, data = {}, type = 'GET') {
 if (type === 'GET') {
   let paramStr = '';
   Object.keys(data).forEach((key, index) => {
     paramStr = key + '=' + data[key] + '&'
   });
   if (paramStr) {
     paramStr = paramStr.substring(0, paramStr.lastIndexOf('&'));
     url = url + '?' + paramStr
   }
   return axios.get(url)
 } else {
   if (data.images) {
     let param = new FormData();
     param.append('imgCount', data.images.length);
     Object.keys(data).map(item => param.append(item, data[item]));
     data.images.map((item, index) => param.append('images'+index, item, item.name));
     let config = {
       headers: {
         'Content-Type': 'multipart/form-data'
       }
     };
     return axios.post(url, param, config)
   } else {
     return axios.post(url, data)
   }
 }
}