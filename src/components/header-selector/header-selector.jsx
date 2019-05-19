import React,{Component} from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

class HeaderSelector extends Component{
  static propTypes = {
    setHeader: PropTypes.func.isRequired,
    header: PropTypes.string
  };
  state = {
    icon: null
  };
  constructor (props) {
    super(props);
    this.headerList = [];
    for (let i = 0; i < 20; i++) {
      this.headerList.push(
        {
          icon: require(`../../assets/images/头像${i + 1}.png`),
          text: '头像'+(i+1)
        }
      )
    }
  }
  handleClick = ({text, icon}) => {
    this.setState({
      icon
    });
    this.props.setHeader(text)
  };
  componentDidMount() {
    const header = this.props.header;
    if (header) {
      const icon = require(`../../assets/images/${header}.png`);
      const text = header;
      this.handleClick({text, icon});
    }
  }
  render () {
    const {icon} = this.state;
    const gridHeader = icon ? (
      <div>
        已选择头像:<img src={icon} alt=''/>
      </div>
    ) : '请选择头像';
    return (
      <List renderHeader = {() => gridHeader}>
        <Grid data={this.headerList}columnNum={5} onClick={this.handleClick}/>
      </List>
    )
  }
}
export default HeaderSelector;