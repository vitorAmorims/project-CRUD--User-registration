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
    // this.renderTable();
  }

  clear = () => {
    this.setState({ user: initialState.user });
  };

  // 7 - criar fn getUpdateList
  getUpdateList = (user, add = true) => {
    //user que obteve do backend
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

  // 9 - criar fn renderForm para renderizar os campos do formulário
  // renderForm() {
  //   return (
  //     <div className="form">
  //       <div className="row">
  //         <div className="col-12 col-md-6">
  //           <div className="form group">
  //             <label htmlFor="name">Nome</label>
  //             <input
  //               type="text"
  //               name="name"
  //               className="form-control"
  //               placeholder="Digite o nome..."
  //               id="name"
  //               value={this.state.user.name}
  //               onChange={this.updateField}
  //             />
  //           </div>
  //         </div>
  //         <div className="col-12 col-md-6">
  //           <div className="form group">
  //             <label htmlFor="email">Email</label>
  //             <input
  //               type="text"
  //               name="email"
  //               className="form-control"
  //               id="email"
  //               placeholder="Digite o e-mail..."
  //               value={this.state.user.email}
  //               onChange={this.updateField}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       <hr />
  //       <div className="row">
  //         <div className="col-12 d-flex justify-content-end">
  //           <button className="btn btn-primary" onClick={this.save}>
  //             Salvar
  //           </button>
  //           <button className="btn btn-secundary ml-2" onClick={this.clear}>
  //             Cancelar
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // fn load vai atualizar o estado do objeto com user
  load = (user) => {
    this.setState({ user });
  }

  // fn que remove user do backend e da lista do estado do objeto
  remove = (user) => {
    axios.delete(`${baseUrl}/${user.id}`).then((reponse) => {
      const list = this.getUpdateList(user, false);
      this.setState({ list });
    });
  }

  // renderRows() {
  //   return this.state.list.map((user) => {
  //     return (
  //       <tr key={user.id}>
  //         <td>{user.id}</td>
  //         <td>{user.name}</td>
  //         <td>{user.email}</td>
  //         <td>
  //           <button onClick={() => this.load(user)} className="btn btn-warning">
  //             <i className="fa fa-pencil"></i>
  //           </button>
  //           <button
  //             onClick={() => this.remove(user)}
  //             className="btn btn-danger ml-2"
  //           >
  //             <i className="fa fa-trash"></i>
  //           </button>
  //         </td>
  //       </tr>
  //     );
  //   });
  // }

  // // fn para criar tabela
  // renderTable() {
  //   return (
  //     <table className="table mt-4">
  //       <thead>
  //         <tr>
  //           <th>ID</th>
  //           <th>Nome</th>
  //           <th>E-mail</th>
  //           <th>Ações</th>
  //         </tr>
  //       </thead>
  //       <tbody>{this.renderRows()}</tbody>
  //     </table>
  //   );
  // }

  render() {
    // console.log(this.state.list);
    return (
      <Main {...headerProps}>
        <RenderForm
          updateField={this.updateField}
          save={this.save}
          clear={this.clear}
          name={this.state.user.name}
          email={this.state.user.email}
        />
        {/* {this.renderForm()} */}
        <RenderTable
          list={this.state.list}
          load={this.load}
          remove={this.remove}
        />
        {/* {this.renderTable()} */}
        <strong>{`Total de usuários: ${this.state.list.length}`}</strong>
      </Main>
    );
  }
}

export default UserCrud;
