import React from "react";
import axios from "axios"; //1- importar axios lib hhtp
import Main from "../templates/Main";

const headerProps = {
  icon: "users",
  title: "usuários",
  subtitle: "Cadastro de usuários: Incluir, Listar, Alterar e Excluir",
};

// 2- criar o estado inicial desse componente, caso usuário clicar em cancelar, será restabelecido estado inicial
const initialState = {
  user: { name: "", email: "" },
  list: [],
};
// 3 - endpoint
const baseUrl = "http://localhost:3001/users";

class UserCrud extends React.Component {
  // 4 - atribuição do estado inicial
  state = { ...initialState } 

  // 5 - fn resp por limpar formulario é estabelecer estado inicial de usuário
  clear() { 
    this.setState({ user: initialState.user });
  }

  // 7 - criar fn getUpdateList
  getUpdateList(user) { //user que obteve do backend
    //gerar lista sem o usuário que passei como parâmetro
    const list = this.state.list.filter(u => u.id !== user.id);
    //inserindo o usuário que veio do back, como primeiro elemento do array
    list.unshift(user);
    return list;
  }

  // 6 - fn save para put 'alterar' e post 'incluir'
  // ********Nota importante: 
  // quando queremos incluir, o usuário não possui id
  // quando queremos alterar, o id do usuário está setado
  save() {
    const user = this.state.user;
    const method = user.id ? 'put' : 'post';
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
    axios[method](url, user)
      .then(response => {
        const list = this.getUpdateList(response.data);
        this.setState({
          user: initialState.user,
          list
        })
      })
  }
  render() {
    return <Main {...headerProps}>Cadastro de usuários</Main>;
  }
}

export default UserCrud;
