import React, { Component, Fragment } from 'react';
import { Spinner } from '../Layout/Spinner';
import { Link } from 'react-router-dom';

class User extends Component {
    componentDidMount(){
        this.props.getUser(this.props.match.params.login);
    }
    render() {
        const {
            name, avatar_url, location, bio, blog, login, html_url, followers, following, publi_repos, public_gists, hireable 
        } = this.props.user;
        const {loading} = this.props;
        if(loading) return <Spinner />
        return (
            <Fragment>
                <Link to='/' className="btn btn-light">
                    Back to Search
                </Link>
                Hireable: {' '}
                {hireable ? 
                <i className="fas fa-check text-success" /> :
                <i className="fas fa-check text-danger" />}
            </Fragment>
        )
    }
}

export default User
