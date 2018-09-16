import React from 'react'
import Footer from './Footer'
import css from './usercenter.css'

class UserCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      name: ''
    }
  }

  componentDidMount() {
    this.setState({
      avatar: window.localStorage.getItem('avatar'),
      name: window.localStorage.getItem('username')
    })
  }
  
  render() {
    const { avatar, name } = this.state
    return <div className='user-center'>
      <div className='header'>
        {/* <span className="img"></span> */}
        <img src={'data:image/jpeg;base64,' + avatar}/>
        <span className='name'>{name}</span>
        <div className="order-container">
          <div className="order-title">
            <span className='left'>我的订单</span>
            <span className="right">查看全部订单<i className="material-icons">chevron_right</i></span>
          </div>
          <div className="order-status">
            <div className="status">
              <i className="material-icons">credit_card</i>
              <span>待付款</span>
            </div>
            <div className="status">
              <i className="material-icons">card_travel</i>
              <span>待发货</span>
            </div>
            <div className="status">
              <i className="material-icons">local_shipping</i>
              <span>待收货</span>
            </div>
          </div>
        </div>
      </div>
      <div className="list">
        <div className="list-title">我的仙拍</div>
        <div className="list-item">我的拍品<i className="material-icons">chevron_right</i></div>
        <div className="list-item">我参与过的仙拍<i className="material-icons">chevron_right</i></div>
        <div className="list-item">我正在拍的<i className="material-icons">chevron_right</i></div>
        <div className="list-item">我报名的仙拍<i className="material-icons">chevron_right</i></div>
      </div>
      <div className="list">
        <div className="list-title">我的账户</div>
        <div className="list-item">
          我的仙贝<i className="material-icons">chevron_right</i>
        </div>
      </div>
      <Footer></Footer>
    </div>
  }
}

export default UserCenter