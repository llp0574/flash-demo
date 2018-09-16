import React from 'react'
import css from './discover.css'
import http from '../utils/http'
import Footer from './Footer'
import ReactSwipe from 'react-swipe';
import moment from 'moment'
import Timer from 'react-timer-wrapper'

const socket = require('socket.io-client')('http://47.105.54.102:3000/');

const style = {
  container: {
    overflow: 'hidden',
    visibility: 'hidden',
    position: 'relative'
  },

  wrapper: {
    overflow: 'initial',
    position: 'relative'
  },

  child: {
    float: 'left',
    width: '100%',
    position: 'relative',
    transitionProperty: 'transform'
  }
}

class Discover extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      avatar: '',
      loading: true,
      goodsList: [],
      currentAvatar: '',
      currentPrice: '',
      currentName: '',
      timerProgress: {
        loop: {
          progress: 0.3
        },
      },
      time: 0,
    }
    this.onTimerFinish = this.onTimerFinish.bind(this)
  }
  
  componentDidMount() {
    this.getList()
    const { timerProgress } = this.state;
    socket.on('updatePage', (data) => {
      this.setState({
        currentAvatar: data.img,
        currentName: data.name,
        currentPrice: this.state.currentPrice + 0.1,
        time: 0,
      })
    });
  }

  componentWillUnmount() {

  }

  onTimerStart({ duration, progress, time }) {

  }

  onTimerStop({ duration, progress, time }) {

  }

  onTimerUpdate = (instance, data) => {
    const {
      timerProgress,
    } = this.state;

    this.setState({
      timerProgress: Object.assign({}, timerProgress, {
        [instance]: data,
      }),
    });
  }

  onTimerFinish(instance, data) {
    // const {
    //   timerProgress,
    // } = this.state;
    // if (instance === 'progress' || instance === 'time') {
    //   this.setState({
    //     timerProgress: Object.assign({}, timerProgress, {
    //       [instance]: 0,
    //     }),
    //   });
    // }
    // console.log(duration);
    // console.log(progress);
    // console.log(time);
    // console.log(this.state.timerProgress)
  }

  join = () => {
    socket.emit('join', this.state.goodsList[this.reactSwipe.getPos()]._id)
  }

  handleSwipeChange = (e) => {
    this.join()
  }

  getList = () => {
    http.get(`http://47.105.54.102:3000/api/goods`, {}).then(res => {
      if (res.success) {
        console.log(res.message)
        this.setState({
          loading: false,
          avatar: window.localStorage.getItem('avatar'),
          goodsList: res.message,
        }, () => {
          this.join()
          http.get(`http://47.105.54.102:3000/api/goods/userList/` + this.state.goodsList[this.reactSwipe.getPos()]._id)
            .then(res => {
              if (res.success) {
                this.setState({
                  currentAvatar: window.localStorage.getItem('avatar'),
                  currentPrice: this.state.goodsList[this.reactSwipe.getPos()].startPrice,
                  currentName: res.message[0].userName,
                })
              }
              
            })
        })
      } else {
        alert('请求失败，请重试')
      }
    })
  }

  bingoBuy = () => {
    // alert('抢拍成功，静待页面变化')
    socket.emit(`bingo`, {
      img: this.state.avatar,
      name: window.localStorage.getItem('username'),
      id: this.state.goodsList[this.reactSwipe.getPos()]._id
    })
    // http.post(`http://47.105.54.102:3000/api/goods/bingo`, {
    //   goodId: this.state.goodsList[this.reactSwipe.getPos()]._id
    // }).then(res => {
    //   if (res.success) {
    //     alert('抢拍成功，静待页面变化')
    //   }
    // })
  }

  render() {
    const { avatar, goodsList, loading, timerProgress, currentAvatar, currentName, currentPrice, time } = this.state
    const swipeOptions = {
      startSlide: 0,
      auto: 0,
      speed: 300,
      disableScroll: false,
      continuous: false,
      callback: this.handleSwipeChange
    }
    // console.log(goodsList)
    return <div className='discover'>
      <div className='discover-header'>发现</div>
      {
        loading ? <div style={{height: '100vh', width: '100vw', lineHeight: '100vh', fontSize: '20px', textAlign: 'center'}}>加载中...</div>
          : <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe} className='card-list' swipeOptions={swipeOptions} style={style} callback={this.handleSwipeChange}>
            {
              goodsList.map((good, index) => {
                return <div key={index} className='card'>
                  <div className='header'>
                    <img src={'data:image/jpeg;base64,' + avatar} />
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
                    <span className='num'>￥{parseFloat(currentPrice).toFixed(2)}</span>
                  </div>
                  {
                    currentAvatar ? <div className='currentBider'>
                      <span>当前出价者：</span>
                      <img src={'data:image/jpeg;base64,' + currentAvatar} alt="" />
                      <span>{currentName}</span>
                    </div> : null
                  }
                  <p className='countdown-title'>十秒倒计时！</p>
                  <div className='progress-bar'>
                    <Timer
                      active
                      time={time}
                      loop
                      onFinish={this.onTimerFinish}
                      onStart={this.onTimerStart}
                      onStop={this.onTimerStop}
                      onTimeUpdate={this.onTimerUpdate.bind(this, 'loop')}
                    />
                    <div className="percent-wrapper" data-percent={`${Math.round(timerProgress.loop.progress * 100)}%`}>
                      <p className="percent">
                        {`${Math.round(timerProgress.loop.progress * 100)}%`}
                      </p>
                      <div className="percent-bar" style={{ width: `${timerProgress.loop.progress * 100}%` }} />
                      <p
                        className="percent white"
                        style={{
                          clipPath: `inset(0 ${(1 - timerProgress.loop.progress) * 100}% 0 0)`,
                          webkitClipPath: `inset(0 ${(1 - timerProgress.loop.progress) * 100}% 0 0)`,
                        }}
                      >
                        {`${Math.round(timerProgress.loop.progress * 100)}%`}
                      </p>
                    </div>
                  </div>
                  <div className='bottom-button'>
                    <a href="javascript:;" className={good.finished ? 'disabled' : ''} onClick={this.bingoBuy}>
                      {/* {
                        good.finished ?
                          '已结束' :
                          good.state ?
                            '抢拍' :
                            '报名竞拍'
                      } */}
                      抢拍
                    </a>
                  </div>
                </div>
              })
            }
          </ReactSwipe>
      }
      <Footer></Footer>
    </div>
  }
}

export default Discover
