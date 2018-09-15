import React from 'react'
import Footer from './Footer'
import css from './publish.css'
import 'rc-input-number/assets/index.css'
import InputNumber from 'rc-input-number'
import http from '../utils/http'

require('jquery')
require('cropper')

class Publish extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      img: '',
      minPerson: 5,
      startPrice: 0,
      normalPrice: 0,
      time: 10,
      freeChance: 5,
    }
  }

  handleNameChange = (e) => {
    this.onChange('name', e.target.value)
  }
  
  onUploadPic = (e) => {
    const file = e.target.files[0]
    if (!/image/.test(file.type)) {
      return;
    };
    let reader = new FileReader()
    reader.readAsDataURL(file)         //读取图片文件
    reader.onload = (e) => {
      this.onChange('img', e.target.result)
    }
  }

  handleStartPriceChange = (val) => {
    this.onChange('startPrice', val)
  }

  handleNormalPriceChange = (val) => {
    this.onChange('normalPrice', val)
  }

  handleMinPersonChange = (e) => {
    this.onChange('minPerson', e.target.value)
  }

  onChange = (name, value) => {
    this.setState(state => {
      state[name] = value
    })
  }

  sendPublish = () => {
    const {name, img, minPerson, startPrice, normalPrice, time, freeChance } = this.state
    const param = {
      name,
      img,
      minPerson,
      startPrice,
      normalPrice,
      time,
      freeChance
    }
    http.post(`http://47.105.54.102:3000/api/goods/publish`, param)
      .then(res => {
        if (res.success) {
          window.location.pathname = '/discover'
        }
      })
  }

  render() {
    const { img, startPrice, normalPrice, minPerson } = this.state
    return <div className='publish'>
      <div className="publish-header">发布</div>
      <div className='form'>
        <div className="top">
          <input type="text" placeholder='请填写宝贝的名称' onChange={this.handleNameChange}/>
          {
            img ? <img src={img} /> : <button
              onClick={() => { this.refs.picUpLoad.click() }}
            >
              <i className="material-icons">add</i>
              <span>添加图片</span>
            </button>
          }
          <input ref='picUpLoad' type='file' onChange={this.onUploadPic} />
        </div>
        <div className="bottom">
          <div className='price-setting'>
            <span>闪拍价格</span>
            <InputNumber
              min={0}
              value={startPrice}
              precision={2}
              formatter={value => `￥ ${value}`}
              style={{ width: 100 }}
              placeholder='￥0.00'
              onChange={this.handleStartPriceChange}
            />
            <span>实际价格</span>
            <InputNumber
              min={0}
              value={normalPrice}
              precision={2}
              formatter={value => `￥ ${value}`}
              placeholder='￥0.00'
              style={{ width: 100 }}
              onChange={this.handleNormalPriceChange}
            />
          </div>
          <div className='select-setting'>
            <span>开拍最少人数</span>
            <select className='selector' onChange={this.handleMinPersonChange} value={minPerson}>
              <option value="5">5人</option>
              <option value="10">10人</option>
              <option value="15">15人</option>
            </select>
          </div>
          <div className="bottom-button">
            <a href="javascript:;" onClick={this.sendPublish}>确认发布</a>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  }
}

export default Publish