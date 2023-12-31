import React from 'react';
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';


const PrivetRoute = ({ children, permissions }) => {
    const cookies = new Cookies();
    let user = null;
    user = cookies.get('user');

    if (user) {
        if (permissions.includes(user.role)) {
            return children;
        } else {
            if (user.role === 'pdv') {
                return <Navigate replace to='/packs' />
            } else {
                return <Navigate replace to='/' />
            }

        }
    } else {

        return <Navigate replace to='/' />

    }

}

export default PrivetRoute