import { useEffect, useState } from "react";
import axios from "axios";

function CRUD() {
  const [id, setId] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  const url = "https://api.escuelajs.co/api/v1/users";

  const getUsuarios = async () => {
    const response = await axios.get(url);
    setUsuarios(response.data);
  };

  useEffect(() => {
    getUsuarios();
  });

  return (
    <div className="container">
      <div className="row">
        <h1>Usuarios</h1>
      </div>
      {usuarios.map((usuario, i) => (
        <div className="row mt-5 align-items-center">
          <div className="col-6 col-lg-2 ms-auto">
            <img
              src={usuario.avatar}
              className="img-thumbnail form-control"
              alt=""
            />
            <label htmlFor="">
              <p>{usuario.name}</p>
            </label>
          </div>
          <div className="col-6 col-lg-4 me-auto">
            <ul className="list-group">
              <li className="list-group-item">{usuario.role}</li>
              <li className="list-group-item">{usuario.email}</li>
              <li className="list-group-item">{usuario.password}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CRUD;
