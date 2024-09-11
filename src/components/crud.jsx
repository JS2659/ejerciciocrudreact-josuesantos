import { useState } from "react";

function CRUD(){
     const [id, setId] = useState(0);
     const [email, setEmail] = useState(0);
     const [password, setPassword] = useState(0);
     const [name, setName] = useState(0);
     const [role, setRole] = useState(0);
     const [avatar, setAvatar] = useState(0);

    return(
        <div className="container">
            <div className="row">
                <h1>Usuarios</h1>
            </div>
            <div className="row">
                <div className="col-3">
                    <div className="form-floating">
                        <img src="" alt="" />
                        <label htmlFor="floatingInputValue">Input with value</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CRUD;