import React from 'react'
import css from './home.css'
import http from '../utils/http'

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      status: 'login',
      focusInput: '',
      loginEmail: '',
      loginPwd: '',
      registerName: '',
      registerEmail: '',
      registerPwd: '',
    }
  }
  
  handleInputClick = (data) => {
    this.setState({
      focusInput: data.name
    })
  }

  handleInputBlur = (data) => {
    this.setState({
      focusInput: ''
    })
  }

  handleLoginEmail = (val) => {
    this.onChange('loginEmail', val.target.value)
  }

  handleLoginPwd = (val) => {
    this.onChange('loginPwd', val.target.value)
  }

  handleRegisterName = (val) => {
    this.onChange('registerName', val.target.value)
  }

  handleRegisterEmail = (val) => {
    this.onChange('registerEmail', val.target.value)
  }

  handleRegisterPwd = (val) => {
    this.onChange('registerPwd', val.target.value)
  }

  onChange = (name, value) => {
    this.setState(state => {
      state[name] = value
    })
  }

  handleAddBtn = (e) => {
    const { status } = this.state;
    this.setState({
      status: status === 'login' ? 'register' : 'login'
    }, () => {
      if (this.state.status === 'register') {
        setTimeout(() => {
          $(this.refs.overBox).css({
            'overflow': 'hidden'
          })
          $(this.refs.box).addClass('back')
        }, 200)
        $(this.refs.addBtn).addClass('active').animate({
          width: '700px',
          height: '700px'
        })

        setTimeout(() => {
          $(this.refs.shape).css({
            width: '50%',
            height: '50%',
            transform: 'rotate(45deg)'
          })
          $(".overbox .title").fadeIn(300);
          $(".overbox .input").fadeIn(300);
          $(".overbox .button").fadeIn(300);
          $(this.refs.addBtn).removeClass('material-button')
        }, 700)
      }
      // if ($(this.refs.addBtn).hasClass('material-buton')) {
      //   $(this.refs.addBtn).removeClass('material-buton');
      //   $(this.refs.addBtn).addClass('material-button');
      // } 
      if (this.state.status === 'login') {
        $(this.refs.shape).css({
          width: '100%',
          height: '100%',
          transform: 'rotate(0deg)'
        })
        setTimeout(() => {
          $(this.refs.overBox).css({
              'overflow': 'initial'
          })
        }, 600)

        $(this.refs.addBtn).animate({
          'width': '80px',
          'height': '80px'
        }, 500, () => {
          $(this.refs.box).removeClass('back');
          $(this.refs.addBtn).removeClass('active')
        });

        $('.overbox .title').fadeOut(300);
        $('.overbox .input').fadeOut(300);
        $('.overbox .button').fadeOut(300);

        $(this.refs.addBtn).addClass('material-button');
      }
    })
  }

  sendLogin = () => {
    const { loginEmail, loginPwd } = this.state
    const param = {
      email: loginEmail,
      password: loginPwd
    }
    http.post(`http://47.105.54.102:3000/api/users/login`, param).then(res => {
      if(res.success) {
        // message.success('登录成功')
        // 写入token
        if (!window.localStorage) {
          alert('浏览器不支持localstorage，无法使用该网站')
        } else {
          let storage = window.localStorage
          storage.setItem('auth_token', 'Bearer ' + res.message.token)
          storage.setItem('avatar', res.message.avatar)
          // verify
          http.get(`http://47.105.54.102:3000/api/users/verify`).then(res => {
            if (res.success) {
              storage.setItem('username', res.message.name)
              window.location.pathname = '/discover'
            }
          })
        }
      } else {
        alert('登录失败，请重试')
      }
    })
  }

  sendRegister = () => {
    const { registerName, registerEmail, registerPwd } = this.state
    const param = {
      name: registerName,
      email: registerEmail,
      password: registerPwd
    }
    http.post(`http://47.105.54.102:3000/api/users/registe`, param).then(res => {
      if (res.success) {
        // message.success('注册成功')
        window.location.reload()
      } else {
        alert('注册失败，请重试')
      }
    })
  }

  render() {
    const { status, focusInput, loginEmail, loginPwd, registerName, registerEmail, registerPwd } = this.state
    return (<div className='materialContainer'>
      <div className='box' ref='box'>
        <div className='title'>LOGIN</div>
        <div className='input' ref='login_email'>
          <label className={(focusInput === 'login_email' || loginEmail) ? 'focus' : ''}>Email</label>
          <input type='text' name='name' id='name' onChange={this.handleLoginEmail} onFocus={this.handleInputClick.bind(this, { name: 'login_email' })} onBlur={this.handleInputBlur.bind(this, {name: 'login_email'})}/>
          <span className={(focusInput === 'login_email' || loginEmail) ? 'spin focus' : 'spin'}></span>
        </div>
        <div className='input' ref='login_pwd'>
          <label className={(focusInput === 'login_pwd' || loginPwd) ? 'focus' : ''}>Password</label>
          <input type='password' name='pass' id='pass' onChange={this.handleLoginPwd} onFocus={this.handleInputClick.bind(this, { name: 'login_pwd' })} onBlur={this.handleInputBlur.bind(this, { name: 'login_pwd' })}/>
          <span className={(focusInput === 'login_pwd' || loginPwd) ? 'spin focus' : 'spin'}></span>
        </div>
        <div className='button login'>
          <button onClick={this.sendLogin}><span>GO</span> <i className='fa fa-check'></i></button>
        </div>
        <a href='' className='pass-forgot'>Forgot your password?</a>
      </div>
      <div className='overbox' ref='overBox'>
        <div className='material-button alt-2' ref='addBtn' onClick={this.handleAddBtn}><span className='shape' ref='shape'></span></div>
        <div className='title'>REGISTER</div>
        <div className='input' ref='register_name'>
          <label className={(focusInput === 'register_name' || registerName) ? 'focus' : ''}>Username</label>
          <input type='text' name='regname' id='regname' onChange={this.handleRegisterName} onFocus={this.handleInputClick.bind(this, { name: 'register_name' })} onBlur={this.handleInputBlur.bind(this, { name: 'register_name' })}/>
          <span className={(focusInput === 'register_name' || registerName) ? 'spin focus' : 'spin'}></span>
        </div>
        <div className='input' ref='register_email'>
          <label className={(focusInput === 'register_email' || registerEmail) ? 'focus' : ''}>Email</label>
          <input type='text' name='regpass' id='regpass' onChange={this.handleRegisterEmail} onFocus={this.handleInputClick.bind(this, { name: 'register_email' })} onBlur={this.handleInputBlur.bind(this, { name: 'register_email' })}/>
          <span className={(focusInput === 'register_email' || registerEmail) ? 'spin focus' : 'spin'}></span>
        </div>
        <div className='input' ref='register_pwd'>
          <label className={(focusInput === 'register_pwd' || registerPwd) ? 'focus' : ''}>Password</label>
          <input type='password' name='reregpass' id='reregpass' onChange={this.handleRegisterPwd} onFocus={this.handleInputClick.bind(this, { name: 'register_pwd' })} onBlur={this.handleInputBlur.bind(this, { name: 'register_pwd' })}/>
          <span className={(focusInput === 'register_pwd' || registerPwd) ? 'spin focus' : 'spin'}></span>
        </div>
        <div className='button'>
          <button onClick={this.sendRegister}><span>NEXT</span></button>
        </div>
      </div>
    </div>)
  }
}

export default Home
