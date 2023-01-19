import { useContext, useState } from "react";
import { PageContex } from "../context/pageContex";

//componente de crear cuenta
export const SignUp = () => {

    
    const [userName, setUserName] = useState("")
    const [userpassword, setUserPassword] = useState("")

    const { guardarUser } = useContext(PageContex)

    //enviamos datos al server
    const enviarDataToServer = () => {
        //el body de la peticion
        let jsonData = {
            user: userName,
            password: userpassword
        }

        let url = "http://localhost:3005/SignUp" //la URL
        let opy = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        }

        fetch(url, opy)
            .then(response => response.json())
            .then(data => guardarUser(data))
            .catch(error => console.log(error))
    }
    return <section>
        <h1>Craer cuenta</h1>
        <form >
            <input placeholder="User"onChange={(e) => setUserName(e.target.value)} />
            <input type={"password"} placeholder="Contraseña" className="texto" onChange={(s) => setUserPassword(s.target.value)} />
        </form>
        <button onClick={() => enviarDataToServer()}>Crear cuenta</button>
    </section>
}

//componente de iniciar secion
export const Login = () => {

    const [userName, setUserName] = useState("")
    const [userpassword, setUserPassword] = useState("")

    const { guardarUser } = useContext(PageContex)

    //enviamos datos al server
    const enviarDataToServer = () => {
        //el body de la peticion
        let jsonData = {
            user: userName,
            password: userpassword
        }

        let url = "http://localhost:3005/Login" //la URL
        let opy = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        }

        fetch(url, opy)
            .then(response => response.json())
            .then(data => guardarUser(data))
            .catch(error => console.log(error))
    }

    return <section>
        <h1>iniciar sesión</h1>
        <form >
            <input placeholder="User"onChange={(e) => setUserName(e.target.value)} />
            <input type={"password"} placeholder="Contraseña" className="texto" onChange={(s) => setUserPassword(s.target.value)} />
        </form>
        <button onClick={() => enviarDataToServer()}>iniciar sesión</button>
    </section>
}
