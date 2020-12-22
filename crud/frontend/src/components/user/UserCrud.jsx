import React from "react";
import Main from "../templates/Main";

const headerProps = {
  icon: "users",
  title: "usuários",
  subtitle: "Cadastro de usuários: Incluir, Listar, Alterar e Excluir",
};

class UserCrud extends React.Component {
  render() {
    return <Main {...headerProps}>Cadastro de usuários</Main>;
  }
}

export default UserCrud;
