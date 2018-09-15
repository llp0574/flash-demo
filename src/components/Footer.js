import React from 'react'
import css from './footer.css'

class Footer extends React.Component {
  handleFooterLink = (path) => {
    window.location.pathname = path
  }
  render() {
    return <div className='footer'>
      <div onClick={this.handleFooterLink.bind(this, '/discover')} className={window.location.pathname === '/discover' ? 'footer-item active' : 'footer-item'}>
        <i className="material-icons">explore</i>
        <span>发现</span>
      </div>
      <div onClick={this.handleFooterLink.bind(this, '/publish')} className={window.location.pathname === '/publish' ? 'footer-item active' : 'footer-item'}>
        <i className="material-icons">add_circle_outline</i>
        <span>发布</span>
      </div>
      <div onClick={this.handleFooterLink.bind(this, '/user-center')} className={window.location.pathname === '/user-center' ? 'footer-item active' : 'footer-item'}>
        <i className="material-icons">person</i>
        <span>我的</span>
      </div>
    </div>
  }
}

export default Footer