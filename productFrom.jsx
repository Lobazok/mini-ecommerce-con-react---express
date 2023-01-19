//mecesitamos acceder al contexto
import { useContext, useState, useEffect } from "react";
import { PageContex } from "../context/pageContex.jsx";


//formulario para añadir tareas
export const ProductoFrom = () => {

    const { pedirUser } = useContext(PageContex)

    //datos resividos por el server
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    //enviamos datos al server
    const enviarDataToServer = () => {
        //el productos nuevo
        let newProduct = {
            title: title,
            description: description,
            price: price
        }
        let u = pedirUser(); //pedimos el usuario para seguridad
        //el body de la peticion
        let info = [
            newProduct,
            u
        ]
        let url = "http://localhost:3005/product"
        let opy = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        }

        fetch(url, opy)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }
    return <section className="TasksFrom">
        <h2>Añadir Producto</h2>
        <form>
            <input placeholder="Nombre del Producto"
                onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="descripcion del Producto" className="texto"
                onChange={(s) => setDescription(s.target.value)} />
            <input placeholder="precio del Producto" className="texto"
                onChange={(p) => setPrice(p.target.value)} />
            <button onClick={() => enviarDataToServer()}>Crear Producto</button>
        </form>
    </section>
}


const ProductoCard = ({ produc }) => {
    let producto = produc
    const { pedirUser } = useContext(PageContex)
    
    const enviarDataToServer = () => {
        let u = pedirUser(); //pedimos el usuario para seguridad
        let info = [
            producto,
            u
        ]
        let url = "http://localhost:3005/product"
        let opy = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        }
        fetch(url, opy)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }
    return <section>
        <h2>{produc.title}</h2>
        <p>{produc.description}</p>
        <p>{produc.price}</p>
        <button onClick={() => { enviarDataToServer() }}>Eliminar</button>
    </section>
}

export const Productos = () => {
    const [productosData, setProductosData] = useState([])

    useEffect(() => {
        let url = "http://localhost:3005/product"
        fetch(url)
            .then(response => response.json())
            .then(data => setProductosData(data))
            .catch(error => console.log(error))
    }, [])

    //mostramos los productos
    return <article>
        {
            productosData.map(produc => {
                return <ProductoCard produc={produc} key={produc.id} />
            })
        }
    </article>
}

export const ProductAdmin = () => {
    return <>
        <ProductoFrom />
        <Productos />
    </>
}

export default ProductAdmin
