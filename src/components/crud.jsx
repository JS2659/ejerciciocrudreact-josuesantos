import { useEffect, useState } from "react";
import axios from "axios";
import { alertaSuccess, alertaError, alertaWarning } from "../funciones";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function CRUD() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [operation, setOperation] = useState(1);
  const [titleModal, setTitleModal] = useState("");

  const url = "https://api.escuelajs.co/api/v1/users";

  const getUsuarios = async () => {
    const response = await axios.get(url);
    setUsuarios(response.data);
  };

  useEffect(() => {
    getUsuarios();
  });

  const openModal = (operation, id, email, name, password, role, avatar) => {
    setId("");
    setEmail("");
    setName("");
    setPassword("");
    setRole("");
    setAvatar("");

    if (operation === 1) {
      setTitleModal("Registrar Usuario");
      setOperation(1);
    } else if (operation === 2) {
      setTitleModal("Editar usuario");
      setOperation(2);
      setId(id);
      setEmail(email);
      setName(name);
      setPassword(password);
      setRole(role);
      setAvatar(avatar);
    }
  };

  const enviarSolicitud = async (url, metodo, parametros = []) => {
    let obj = {
      method: metodo,
      url: url,
      data: parametros,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    await axios(obj)
      .then(() => {
        let mensaje;

        if (metodo === "POST") {
          mensaje = "Se guardo el usuario";
        } else if (metodo === "PUT") {
          mensaje = "Se ha editado el usuario";
        } else if (metodo === "DELETE") {
          mensaje = "Se ha eliminado el usuario";
        }
        alertaSuccess(mensaje);
        document.getElementById("btnCerrarModal").click();
        getUsuarios();
      })
      .catch((error) => {
        alertaError(error.response.data.message);
      });
  };

  const validar = () => {
    let payload;
    let metodo;
    let urlAxios;

    if (name === "") {
      alertaWarning("Nombre en blanco", "name");
    } else if (role === "") {
      alertaWarning("Rol del usuario en blanco", "role");
    } else if (email === "") {
      alertaWarning("Email del usuario en blanco", "email");
    } else if (password === "") {
      alertaWarning("La contraseña esta en blanco", "password");
    } else if (avatar === "") {
      alertaWarning("Debe Agregar una imagen", "avatar");
    } else {
      payload = {
        name: name,
        role: role,
        email: email,
        password: password,
        avatar: avatar,
      };

      if (operation === 1) {
        metodo = "POST";
        urlAxios = "https://api.escuelajs.co/api/v1/users/";
      } else {
        metodo = "PUT";
        urlAxios = `https://api.escuelajs.co/api/v1/users/${id}`;
      }

      enviarSolicitud(urlAxios, metodo, payload);
    }
  };

  const deleteUsuario = (id) => {
    let urlDelete = `https://api.escuelajs.co/api/v1/users/${id}`;

    const mySwal = withReactContent(Swal);

    mySwal
      .fire({
        title: "¿Seguro quieres eliminar este usuario?",
        icon: "question",
        text: "no hay marcha atras",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          setId(id);
          enviarSolicitud(urlDelete, "DELETE");
        }
      })
      .catch((error) => {
        alertaError(error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Usuarios</h1>

        <div className="col-md-4 offset-md-4">
          <div className="d-grid mx-auto">
            <button
              onClick={() => openModal(1)}
              className="btn btn-dark"
              data-bs-toggle="modal"
              data-bs-target="#modalUsuario"
            >
              <i className="fa-solid fa-circle-plus" /> Añadir
            </button>
          </div>
        </div>
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

              <button type="button" className="btn btn-warning m-1" onClick={() => openModal(2, usuario.id, usuario.email, usuario.name, usuario.password, usuario.role, usuario.avatar) } data-bs-toggle="modal" data-bs-target="#modalUsuario">Editar</button>
              <button type="button" className="btn btn-danger m-1" onClick={() => deleteUsuario(usuario.id)}>Eliminar</button>
            
            </ul>
          </div>
        </div>
      ))}

      <div id="modalUsuario" className="modal fade" area-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{titleModal}</label>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              />
            </div>
            <div className="modal-body">
              <input type="hidden" id="id" />
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift" />
                </span>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift" />
                </span>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift" />
                </span>
                <input
                  type="text"
                  id="password"
                  className="form-control"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift" />
                </span>
                <input
                  type="text"
                  id="role"
                  className="form-control"
                  placeholder="Rol"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift" />
                </span>
                <input
                  type="text"
                  id="avatar"
                  className="form-control"
                  placeholder="url Imagen"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => validar()} className="btn btn-success">
                <i className="fa solid fa-floppy-disk" /> Guardar
              </button>
              <button
                id="btnCerrarModal"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                {" "}
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CRUD;
