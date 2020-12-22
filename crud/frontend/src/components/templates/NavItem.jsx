import React from 'react';

export default props => {
    // console.log(props);
    return (
        <a href={props.href}>
          <i className={props.icon}></i>{props.text}
        </a>
    )
}