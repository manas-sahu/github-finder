import React, { Component, Fragment } from 'react';
import Navbar from './Components/Layout/Navbar'
import './App.css';
import Users from './Components/Users/Users';
import Axios from 'axios';
import Search from './Components/Users/Search';
import { Alert } from './Components/Layout/Alert';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from './Components/Pages/About';
import User from './Components/Pages/User';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }
  // async componentDidMount(){
  //   this.setState({loading: true});
  //   const res = await Axios.get(`https://api.github.com/users`);
  //   console.log(res);
  //   this.setState({
  //     loading: false,
  //     users: res.data
  //   })
  // }
  //Search users
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await Axios.get(`https://api.github.com/search/users?q=${text}`);
    this.setState({ users: res.data.items, loading: false });
  }
  //Clear entire user data
  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }
  //Showing alerts
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null })
    }, 2000);
  }
  //Get single user data
  getUser = async username =>{
    console.log(`getUser got called`);
    this.setState({loading: true})
    const res = await Axios.get(`https://api.github.com/users/${username}`);
    this.setState({user: res.data, loading: false})
  }

  render() {
    const { users, user ,loading } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="conatiner">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert} />
                  <Users users={users} loading={loading} />
                </Fragment>
              )} />
              <Route exact path='/about'>
              <About />
              </Route>
              <Route exact path='/user/:login' 
              render={props => (
              <User {...props} getUser={this.getUser} user={user} loading={loading} />)}
              >
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
