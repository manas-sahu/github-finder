import React, { Component } from 'react';
import Navbar from './Components/Layout/Navbar'
import './App.css';
import Users from './Components/Users/Users';
import Axios from 'axios';
import Search from './Components/Users/Search';


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
  searchUsers = async text =>{
    this.setState({loading:true});
    console.log(text + 'From App.js');
    const res = await Axios.get(`https://api.github.com/search/users?q=${text}`);
    this.setState({users: res.data.items, loading:false});
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="conatiner">
          <Search searchUsers={this.searchUsers}/>
          <Users users={this.state.users} loading={this.state.loading}/>
        </div>
      </div>
    );
  }
}

export default App;
