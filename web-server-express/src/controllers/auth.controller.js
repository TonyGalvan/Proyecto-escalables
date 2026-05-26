const { response, request } = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req = request, res = response) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            msg: "Datos invalidos"
        });
    }

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(401).json({
                msg: "Datos invalidos"
            });
        }


        //Validar contraseña encriptada
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                msg: "Datos invalidos"
            });
        }


        //Generar JWT
        jwt.sign({
            uid: user._id,
            username,
            role: user.role
        }, process.env.SECRET_KEY, { 
            expiresIn: '1h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    msg: "Error en el servidor"
                });
            }

            res.status(200).json({
                msg: "Login exitoso",
                token: token
            });
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }


}   

const register = async (req = request, res = response) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            msg: "Datos invalidos"
        });
    }

    try {

        const user = await User.findOne({ username: username });
        if (user) {
            return res.status(400).json({
                msg: "El nombre de usuario ya existe"
            });
        }

        //Encriptar la contraseña

        const hashedPassword = await bcrypt.hash(password, 10);
        

        const newUser = new User({
            username,
            password: hashedPassword,
            role: "user"        
        });

        await newUser.save();
        res.status(200).json({
            msg: "Registro exitoso"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
}

module.exports = {
    login,
    register
}