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
  state = { ...initialState };

  // 5 - fn resp por limpar formulario é estabelecer estado inicial de usuário
  clear = () => {
    this.setState({ user: initialState.user });
  };

  // 7 - criar fn getUpdateList
  getUpdateList = (user) => {
    //user que obteve do backend
    //gerar lista sem o usuário que passei como parâmetro
    const list = this.state.list.filter((u) => u.id !== user.id);
    //inserindo o usuário que veio do back, como primeiro elemento do array
    list.unshift(user);
    return list;
  };

  // 8 - criar fn para atualizar os campos do formulário
  updateField = (event) => {
    const user = { ...this.state.user }; //clonagem de usuário
    user[event.target.name] = event.target.value;
    this.setState({ user });
  };

  // 9 - criar fn renderForm para renderizar os campos do formulário
  renderForm() {
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
                value={this.state.user.name}
                onChange={this.updateField}
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
                value={this.state.user.email}
                onChange={this.updateField}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={this.save}>
              Salvar
            </button>
            <button className="btn btn-secundary ml-2" onClick={this.clear}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

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
  }
  render() {
    return <Main {...headerProps}>{this.renderForm()}</Main>;
  }
}

export default UserCrud;
