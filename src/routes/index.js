import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home'
import Discover from '../components/Discover'
import Publish from '../components/Publish'
import UserCenter from '../components/UserCenter'
import Counter from '../components/Counter'
import NoMatch from '../components/NoMatch'


const routes = (
  <div>
    {/* <NavBar /> */}
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/discover" component={Discover} />
      <Route path="/publish" component={Publish} />
      <Route path="/user-center" component={UserCenter} />
      <Route path="/counter" component={Counter} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default routes
