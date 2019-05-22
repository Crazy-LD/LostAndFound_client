import React,{Component} from 'react'
import {connect} from 'react-redux'
import {
  NavBar,
  InputItem,
  Button,
  Toast,
  Icon
} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/action'
class CompleteInfo extends Component{
  state = {
    header: '',
    signature: '',
    name: '',
  };

  setHeader = (header) => {
    this.setState({
      header
    })
  };

  handleChange = (name, val) => {
    this.setState({
      [name]:val
    })
  };

  handleClick = () => {
    const {header, signature, name} = this.state;
    if (!header || !signature || !name) {
      Toast.offline('有选项漏掉了哦', 1);
    } else {
      this.props.updateUser(this.state);
      this.props.history.replace('/home');
    }
  };

  componentDidMount() {
    const {header, name, signature} = this.props.user;
    if (header || name || signature) {
      this.setState({header, name, signature});

    }
  }
  render () {
    // const {header} = this.props.user;
    // if (header) {
    //   return <Redirect to='/home'/>
    // }
    const {header, name, signature} = this.props.user;
    return (
      <div style={{marginTop: 50}}>
        <NavBar className='sticky-header' icon={<Icon type="left" size='lg'/>}
                onLeftClick={this.goBack}>信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader} header={header}/>
        <InputItem placeholder={name ? name : '请输入昵称'} onChange={(val) => {this.handleChange('name', val)}}>昵称:</InputItem>
        <InputItem placeholder={signature ? signature : '请输入个性签名'} onChange={(val) => {this.handleChange('signature', val)}}>个性签名:</InputItem>
        <Button type='primary' onClick={this.handleClick}>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    )
  }

  goBack = () => {
    this.props.history.goBack();
  }
}
export default connect(
  state => ({user: state.user}),
  {updateUser}
)(CompleteInfo)