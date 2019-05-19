import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store'
import Register from './containers/register/register'
import Login from './containers/login/login'
import ChangePassword from './containers/changePassword/changePassword'
import Main from './containers/main/main'
import Admin from './containers/admin/admin'
import './assets/css/index.less'

ReactDOM.render(
  (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path='/register' component={Register}/>
          <Route path='/login' component={Login}/>
          <Route path='/changepassword' component={ChangePassword}/>
          <Route path='/admin' component={Admin}/>
          <Route component={Main}/>
        </Switch>
      </HashRouter>
    </Provider>
  ),
  document.getElementById('root')
)