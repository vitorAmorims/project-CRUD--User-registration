import React from "react";

function renderRows(props) {
  return props.list.map((user) => {
    return (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <button onClick={() => props.load(user)} className="btn btn-warning">
            <i className="fa fa-pencil"></i>
          </button>
          <button
            onClick={() => props.remove(user)}
            className="btn btn-danger ml-2"
          >
            <i className="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    );
  });
}

export default renderRows;