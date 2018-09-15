import React from 'react'
import css from './discover.css'
import http from '../utils/http'
import Footer from './Footer'
import ReactSwipe from 'react-swipe';
import moment from 'moment'

class Discover extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      goodsList: []
    }
  }
  

  componentDidMount() {
    this.getList()
  }

  getList = () => {
    http.get(`http://47.105.54.102:3000/api/goods`, {}).then(res => {
      if (res.success) {
        console.log(res.message)
        this.setState({
          goodsList: res.message
        })
      } else {
        alert('请求失败，请重试')
      }
    })
  }

  render() {
    const { goodsList } = this.state
    return <div className='discover'>
      <div className='discover-header'>发现</div>
      <ReactSwipe className='card-list' swipeOptions={{ continuous: false }}>
      {/* <div className="card">123</div>
        <div className="card">234</div>
        <div className="card">456</div> */}
        {
          goodsList.map(good => {
            return <div className='card'>
              <div className='header'>
                <img src={good.img} />
                <div className='info'>
                  <p>{good.userName}</p>
                  <span>
                    {moment(good.timestamp * 1000).fromNow()}发布
                  </span>
                </div>
              </div>
              <div className='imgField'>
                <img src={good.img} />
                <div className='normal-price'>
                  <span className='tag'>市场价</span>
                  <span className='num'>{parseFloat(good.normalPrice).toFixed(2)}</span>
                </div>
              </div>
              <div className='title'>
                {good.name}
              </div>
              <div className='start-price'>
                <span className='label'>起拍价</span>
                <span className='num'>￥{parseFloat(good.startPrice).toFixed(2)}</span>
              </div>
              <div className='bottom-button'>
                <a href="javascript:;" className={good.finished ? 'disabled' : ''}>
                  {
                    good.finished ? 
                      '已结束' :
                    good.state ? 
                      '抢拍' :
                    '报名竞拍'
                  }
                </a>
              </div>
            </div>
          })
        }
      </ReactSwipe>
      <Footer></Footer>
    </div>
  }
}

export default Discover
