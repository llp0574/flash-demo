import React from 'react'
import css from './home.css'
// import { Input } from 'antd'

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

  handleRegisterBtn = (e) => {
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
        }, 700)
        $(this.refs.addBtn).removeClass('material-button')
      }
      if ($(this.refs.addBtn).hasClass('material-buton')) {
        $(this.refs.addBtn).removeClass('material-buton');
        $(this.refs.addBtn).addClass('material-button');
      } 
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
          'width': '140px',
          'height': '140px'
        }, 500, () => {
          $(this.refs.box).removeClass('back');
          $(this.refs.addBtn).removeClass('active')
        });

        $('.overbox .title').fadeOut(300);
        $('.overbox .input').fadeOut(300);
        $('.overbox .button').fadeOut(300);

        $(this.refs.addBtn).addClass('material-buton');
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
          <button><span>GO</span> <i className='fa fa-check'></i></button>
        </div>
        <a href='' className='pass-forgot'>Forgot your password?</a>
      </div>
      <div className='overbox' ref='overBox'>
        <div className='material-button alt-2' ref='addBtn' onClick={this.handleRegisterBtn}><span className='shape' ref='shape'></span></div>
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
          <button><span>NEXT</span></button>
        </div>
      </div>
    </div>)
  }
}

export default Home
