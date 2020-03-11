import React, { Component } from 'react';
import Navbar from './Components/Layout/Navbar'
import './App.css';
import Users from './Components/Users/Users';
import Axios from 'axios';


class App extends Component {
  state = {
    users: [],
    loading: false
  }
  async componentDidMount(){
    this.setState({loading: true});
    const res = await Axios.get(`https://api.github.com/users`);
    console.log(res);
    this.setState({
      loading: false,
      users: res.data
    })
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="conatiner">
          <Users users={this.state.users} loading={this.state.loading}/>
        </div>
      </div>
    );
  }
}

export default App;
