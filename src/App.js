import React, { Component, Fragment } from 'react';
import Navbar from './Components/Layout/Navbar'
import './App.css';
import Users from './Components/Users/Users';
import Axios from 'axios';
import Search from './Components/Users/Search';
import { Alert } from './Components/Layout/Alert';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from './Components/Pages/About';

class App extends Component {
  state = {
    users: [],
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
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await Axios.get(`https://api.github.com/search/users?q=${text}`);
    this.setState({ users: res.data.items, loading: false });
  }
  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null })
    }, 2000);
  }
  render() {
    const { users, loading } = this.state;
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
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
