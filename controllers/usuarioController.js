
// para usar talvez un "npm install jsonwebtoken" en commandos
const jwt= require('jsonwebtoken');
// para usar talvez un "npm install bcrypt" en commandos
// const bcrypt = require("bcrypt");

const usuarios = [{id:'1', nombres:'Luis Enrique',apellidos:'Fernandez Bardales' ,email:'luis@gmail.com' ,password:'1234'}];
const jwt_secret='grupo-4'

exports.isLoggedIn=async(req,res,next)=>{
    if(req.cookies.jwt){
        try{
        const token= req.cookies.jwt;
        const decoded = jwt.verify(token, jwt_secret);
        const user=usuarios.find(x=>x.id==decoded.id);
        if (user) {
            const currentUser = user;
            res.locals.user = currentUser;
            return next();
        }
        return next();
        } catch(err){
            return next()
        }
    }
    return next();
}
exports.login = async (req, res, next) => {
    const {email,password}=req.body;
    if (!(email && password)) {
        return res.status(404).json({ error: "Se requiere todos los campos llenos" });
    }
    const user=usuarios.find(x=>x.password==password && x.email==email);
    if(user) {
        const token= jwt.sign({id: user.id},jwt_secret,{expiresIn: "120d"})
        const cookieOptions={
            expires: new Date(Date.now() + 86400000), // Cookie expira en un dia
            httpOnly: true,
        }
        res.cookie(`jwt`, token, cookieOptions);
        // res.status(200).json({token,data:{user}})
        res.redirect('/')
    }
    else{
        return res.status(400).json({ error: "usuario no encontrado" });
    }
}
exports.logout = async (req, res, next) => {
    // console.log('getout')
    res.cookie(`jwt`, `loggedout`, {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });
    //   res.status(200).json({ status: `success` });
      res.redirect('/')
}
exports.signup = async (req, res, next) => {
    const {nombres,apellidos,email,password,password2}=req.body;
    if (!(nombres && apellidos && email && password && password2)) {
        return res.status(404).json({ error: "Se requiere todos los campos llenos" });
    }
    if(password!=password2){
        return res.status(404).json({ error: "Se requiere que las contraseñas sean iguales" });
    }
    const new_user={id:usuarios.length+1, nombres,apellidos,email,password}
    usuarios.push(new_user)
    res.redirect('/')
}