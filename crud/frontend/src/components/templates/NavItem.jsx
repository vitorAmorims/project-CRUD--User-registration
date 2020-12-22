import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
    // console.log(props);
    return (
        <Link to={props.href}>
          <i className={props.icon}></i>{props.text}
        </Link>
    )
}