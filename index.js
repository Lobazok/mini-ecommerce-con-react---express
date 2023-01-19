// se utilizan Express y cors
const express = require("express");
const cors = require("cors")
const app = express();

app.use(express.json());

let puerto = 3005;
//definimos quienes pueden usar la API
const whitelist = ["http://localhost:5173/"]

app.use(cors({ whitelist }))



//las peticiones siempre pasan por esta funcion y despues siguen normal(opcional)
app.use((req, res, next) => {
    console.log("Peticion entrante: Ruta:" + req.url + ", Metodo: " + req.method);
    next();
})

var product = [];

var user = [];

app.get("/product", (req, res) => {
    res.json(product);
});

app.post("/product", (req, res) => {
    //se verifica la identidad de la persona que quieres hacer cambios
    //se resiver el user como el segundo componente del array
    if (req.body[1]) {
        let nameUser = req.body[1].user;
        let passwordUser = req.body[1].password;
        let index = user.findIndex((u) => u.user === nameUser);

        if (user[index].password === passwordUser) {
            let newProduct = { ...req.body[0], id: product.length + 1 };
            product.push(newProduct);
            res.json(newProduct);
        } else {
            console.log("! intento de crear productos sin identificacion");
            res.status(404).json(null);
        }
    } else {
        console.log("!! intento de crear productos sin identificacion");
        res.status(404).json(null);
    }
});
app.delete("/product", (req, res) => {
    //se verifica la identidad de la persona que quieres hacer 
    //se resiver el user como el segundo componente del arraycambios
    if (req.body[1]) {
        let nameUser = req.body[1].user;
        let passwordUser = req.body[1].password;
        let index = user.findIndex((u) => u.user === nameUser);

        if (user[index].password === passwordUser) {
            let newProduct = { ...req.body[0], id: product.length + 1 };
            product.pop(newProduct);
            res.json(newProduct);
        } else {
            console.log("! intento de crear productos sin identificacion");
            res.status(404).json(null)
        }
    } else {
        console.log("!! intento de crear productos sin identificacion");
        res.status(404).json(null)
    }
});

app.post("/SignUp", (req, res) => {
    let newUser = { ...req.body, id: user.length + 1 }
    console.log(newUser);
    user.push(newUser);
    res.json(newUser);
});


app.post("/Login", (req, res) => {
    //se verifica la identidad
    let nameUser = req.body.user
    let passwordUser = req.body.password
    let index = user.findIndex((u) => u.user === nameUser)

    if (user[index].password === passwordUser) {
        res.json(user[index])
        console.log("El usuario: " + user[index].user + " inicio secion");
    } else {
        res.status(404).json(null)
    }
});


app.listen(puerto);
console.log("server in port " + puerto);
