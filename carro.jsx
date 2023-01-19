//importamos los HOOKs que necesitamos y el contex
import { useContext, useState, useEffect } from "react";
import { CarroContex } from "../context/CarroContext.jsx"


//componente del producto en el carro
const CarroCard = ({ producto, can }) => {
    //importmos deteleProducto
    const { deteleProducto, addProducto } = useContext(CarroContex)

    return <tr className="TaskCard">
        <td>{producto.title}</td>
        <td>{can}</td>
        <td>{producto.price}</td>
        <td><button onClick={() => { addProducto(producto) }}>aumentar</button></td>
        <td><button onClick={() => { deteleProducto(producto.id) }}>Eliminar</button></td>
        <td>{producto.price * can}</td>
    </tr>
}

//componente de lsita de tareas
export const Carrolis = () => {

    
    //importamos la lista de tareas
    const { carro } = useContext(CarroContex)

    if (carro.length == 0) {
        return <h1>no hay</h1>
    } else {
        return <table className="Takslis">
            <thead>
                <th>producto</th>
                <th>cantidad</th>
                <th>precio</th>
                <th></th>
                <th></th>
                <th>total</th>
            </thead>
            {
                //creamos un TaskCard por cada tarea
                carro.map(producto => {

                    //let num = carro.filter((pro) => pro.id == producto.id).length
                    let num = carro.findIndex((pro) => pro.id == producto.id)
                    //console.log(num);
                    //console.log(carro);
                    if (carro[num] == producto) {
                        let can = carro.filter((pro) => pro.id == producto.id).length
                        return <CarroCard producto={producto} can={can} key={producto.id} />

                    }
                })
            }

        </table>
    }
}


const ProductoCard = ({ produc }) => {

    const { addProducto } = useContext(CarroContex)
    return <section>
        <h2>{produc.title}</h2>
        <p>{produc.description}</p>
        <p>{produc.price}</p>
        <button onClick={() => { addProducto(produc) }}>añadir</button>
    </section>
}

export const Productos = () => {
    const [productosData, setProductosData] = useState([])

    useEffect(() => {
        //estrutura de frontend para usar la API
        let url = "http://localhost:3005/product"
            fetch(url)
                .then(response => response.json())
                .then(data => setProductosData(data))
                .catch(error => console.log(error))
    }, [])

    return <article>
        {
            productosData.map(produc => {
                return <ProductoCard produc={produc} key={produc.id} />
            })
        }
    </article>
}

//un "macro" componente agrupa los componentes anteriores, solo usa este componente y tendras una lista de tareas con react :)
export const CarroAdmin = () => {
    return <>
        <Productos />
        <Carrolis />
    </>
}

export default CarroAdmin
