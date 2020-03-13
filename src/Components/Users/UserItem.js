import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({user: {avatar_url, login  }}) => {
        return (
            <div className="card text-center">
                <img className="round-img" style={{ width: '100px' }} src={avatar_url} alt="" />
                <h3>{login}</h3>
                <div>
                    <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">More</Link>
                </div>
            </div>
        )
}

export default UserItem
