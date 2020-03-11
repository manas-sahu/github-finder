import React, { Component } from 'react'

class Search extends Component {

    state = {
        text: ''
    }
    onChange = (e) =>{
        console.log(e.target.value);
        this.setState({text: e.target.value});
    }
    onSubmit = (e) =>
    {
        e.preventDefault();
        if (this.state.text === "") {
            this.props.setAlert('Please enter something', 'light');
        } else {
            this.props.searchUsers(this.state.text)
            console.log(this.state.text);            
        }
    }
    render() {
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    <input type="text" name="text" placeholder="Search Users..." onChange={this.onChange} value={this.state.text} />
                    <input type="submit" value="search" className="btn btn-dark btn-block" />
                </form>
                {this.props.showClear && <button className="btn btn-light btn-block" onClick={this.props.clearUsers}>Clear</button>}
                
            </div>
        )
    }
}

export default Search
