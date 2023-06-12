const express = require("express")
const app = express()

//5
var {usuarios} = require("./models/usuarios")
var {productos} = require("./models/productos")

//9 Middleware
app.use(express.json())

//7$$$$
app.get("/usuarios", (req, res)=>{
    return res.status(200).json(usuarios)
})
//7$$$$
app.get("/productos", (req, res)=>{
    return res.status(200).json(productos)
})

//8$$$$
app.get("/usuarios/:id", (req, res)=>{
    const id = req.params.id
    const filtro = usuarios.filter((usr)=> usr.id == id)
    if (filtro.length>0)
        return res.json(filtro)
    else
        return res.status(404).json({status:"Usuario no encontrado"})
})
//8$$$$
app.get("/productos/:id_producto", (req, res)=>{
    const id_producto = req.params.id_producto
    const filtro = productos.filter((producto)=>producto.id_producto == id_producto)
    if(filtro.length>0)
        return res.status(201).json(filtro)
    else
        return res.status(404).json({status:"Producto no encontrado"})
})

//9$$$$
app.post("/usuarios", (req, res)=>{
    var body = req.body
    //console.log(body)
    body.id = usuarios.length+1
    usuarios.push(body)
    return res.status(201).json(body)
})
//9$$$$
app.post("/productos", (req, res)=>{
    var elemento = req.body
    elemento.id_producto = productos.length+1
    productos.push(elemento)
    return res.status(201).json(elemento)
})

//10$$$$
app.put("/usuarios/:id", (req, res)=>{
    var id = req.params.id
    var body = req.body
    const filtro = usuarios.filter((usr)=>usr.id == id)
    if (filtro.length>0){
        usuarios = usuarios.filter((usr)=>usr.id != id)
        body.id = id
        usuarios.push(body)
        return res.status(201).json(body)
    }else
        return res.status(404).json({status:"Usuario no encontrado"})
})
//10$$$$
app.put("/productos/:id_producto", (req, res)=>{
    const id_producto = req.params.id_producto
    var body = req.body
    const filtro = productos.filter((producto)=> producto.id_producto == id_producto)
    if(filtro.length>0){
        productos = productos.filter((producto)=> producto.id_producto != id_producto)
        body.id_producto = id_producto
        productos.push(body)
        return res.status(201).json(body)
    }else
        return res.status(404).json({status:"Producto no encontrado"})
})

//11$$$$
app.delete("/usuarios/:id", (req, res)=>{
    var id = req.params.id
    const filtro = usuarios.filter((usr)=>usr.id == id)
    if (filtro.length>0){
        usuarios = usuarios.filter((usr)=>usr.id != id)
        return res.status(201).json(filtro)
    }else
        return res.status(404).json({status:"Usuario no encontrado"})
})
//11$$$$
app.delete("/productos/:id_producto", (req, res)=>{
    const id_producto = req.params.id_producto
    const filtro = productos.filter((producto)=> producto.id_producto == id_producto)
    if (filtro.length>0){
        productos = productos.filter((producto)=> producto.id_producto != id_producto)
        return res.status(201).json(filtro)
    }
    else
        return res.status(404).json({status:"Producto no encontrado"})
})

//13$$$$
app.get("/productos/bymarca/:marca", (req, res)=>{
    const marca = req.params.marca
    const filtro = productos.filter((producto)=> producto.marca == marca)
    if (filtro.length>0)
        return res.status(200).json(filtro)
    else
        return res.status(404).json({status:"Sin productos de esta marca"})
})

//14$$$$
app.get("/productos/min_price/:min_price", (req, res)=>{
    const min_price = req.params.min_price
    const filtro = productos.filter((producto)=> producto.precio >= min_price)
    if(filtro.length>0)
        return res.json(filtro)
    else
        return res.status(404).json({status:"Sin productos por arriba de este precio"})
})

//15$$$$
//COSTO MAXIMO
app.get("/productos/max_price/:max_price", (req, res)=>{
    const max_price = req.params.max_price
    const filtro = productos.filter((producto)=> producto.precio <= max_price)
    if (filtro.length>0)
        return res.json(filtro)
    else
        return res.status(404).json({status:"Sin productos por debajo de este precio"})
})


//6
app.listen(8080, ()=>{
    console.log("Servidor iniciado desde el puerto 8080")
})