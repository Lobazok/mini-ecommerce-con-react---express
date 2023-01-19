// necesitamos crear un contexto para que los demas componentes puedan acceder a ciertas variable y funciones
import { createContext } from "react";
import { useState, useEffect, useContext } from "react";

//creamos contexto
export const PageContex = createContext()

//creamos el componente que provera contexto
export const PageContexProvider = (props) => {


    //guardamos el user en una sessionStorage
    const guardarUser = (u) => {
        console.log(u);
        sessionStorage.setItem("user", u.user);
        sessionStorage.setItem("password", u.password);
    }

    //buscamos la sessionStorage donde esta el user
    const pedirUser = () => {
        return ({
            user: sessionStorage.getItem("user"),
            password: sessionStorage.getItem("password")
        })
    }
    //value es el valor del contexto
    return <PageContex.Provider value={{ guardarUser, pedirUser }}>
        <button onClick={() => console.log(pedirUser())}>click</button>
        {/* props.children es donde iran todos los hijos de este elemento */}
        {props.children}
    </PageContex.Provider>

}
