import React from "react";
import axios from "axios";
import Main from "../templates/Main";
import RenderForm from "./RenderForm";
import RenderTable from "./RenderTable";

const headerProps = {
  icon: "users",
  title: "usuários",
  subtitle: "Cadastro de usuários: Incluir, Listar, Alterar e Excluir",
};

const initialState = {
  user: { name: "", email: "" },
  list: [],
};

const baseUrl = "http://localhost:3001/users";

class UserCrud extends React.Component {
  state = { ...initialState };

  componentDidMount() {
    axios(baseUrl).then((response) => {
      this.setState({ list: response.data });
    });
  }

  clear = () => {
    this.setState({ user: initialState.user });
  };

  // 7 - criar fn getUpdateList
  getUpdateList = (user, add = true) => {
    //param user que obteve do backend
    //param add flag para atualização
    //gerar lista sem o usuário que passei como parâmetro
    const list = this.state.list.filter((u) => u.id !== user.id);
    //inserindo o usuário que veio do back, como primeiro elemento do array
    if (add) list.unshift(user);
    return list;
  };

  // 8 - criar fn para atualizar os campos do formulário
  updateField = (event) => {
    const user = { ...this.state.user }; //clonagem de usuário
    user[event.target.name] = event.target.value;
    this.setState({ user });
  };

  // 6 - fn save para put 'alterar' e post 'incluir'
  // ********Nota importante:
  // quando queremos incluir, o usuário não possui id
  // quando queremos alterar, o id do usuário está setado
  save = () => {
    const user = this.state.user;
    const method = user.id ? "put" : "post";
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
    axios[method](url, user).then((response) => {
      const list = this.getUpdateList(response.data);
      this.setState({
        user: initialState.user,
        list,
      });
    });
  };

  // fn load vai atualizar o estado do objeto com user
  load = (user) => {
    this.setState({ user });
  };

  // fn que remove user do backend e da lista do estado do objeto
  remove = (user) => {
    axios.delete(`${baseUrl}/${user.id}`).then((reponse) => {
      const list = this.getUpdateList(user, false);
      this.setState({ list });
    });
  };

  render() {
    return (
      <Main {...headerProps}>
        <RenderForm
          updateField={this.updateField}
          save={this.save}
          clear={this.clear}
          name={this.state.user.name}
          email={this.state.user.email}
        />
        <RenderTable
          list={this.state.list}
          load={this.load}
          remove={this.remove}
        />
        <strong>{`Total de usuários: ${this.state.list.length}`}</strong>
      </Main>
    );
  }
}

export default UserCrud;
