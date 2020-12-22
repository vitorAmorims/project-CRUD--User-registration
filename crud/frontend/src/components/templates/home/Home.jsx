import React from "react";
import Main from "../Main";

export default (props) => {
  return (
    <Main
      icon="home"
      title="Inicio"
      subtitle="Segundo projeto do capítulo de React."
    >
      <div className="display-4">Bem vindo!</div>
      <hr />
      <p className="mb-0">
        Sistema para exemplificar a construção de um cadastro desenvolvido em
        React.
      </p>
    </Main>
  );
};
