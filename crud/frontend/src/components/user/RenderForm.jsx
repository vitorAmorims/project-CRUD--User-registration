import React from "react";

export default (props) => {
  console.log(props);
  return (
    <div className="form">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="form group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Digite o nome..."
              id="name"
              value={props.name}
              onChange={props.updateField}
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="form-control"
              id="email"
              placeholder="Digite o e-mail..."
              value={props.email}
              onChange={props.updateField}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <button className="btn btn-primary" onClick={props.save}>
            Salvar
          </button>
          <button className="btn btn-secundary ml-2" onClick={props.clear}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
