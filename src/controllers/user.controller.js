// _____________________________________________________________________________________________
// Importacion de Modulos
    import jwt from "jsonwebtoken"
    
    // SERVICES
    import * as userService from "../services/user.service.js";
// _____________________________________________________________________________________________

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// INICIO DE CRUD

// OBTENER TODOS LOS USUARIOS
    export const getUsers = async (req,res) => {
        try{
            const users = await userService.getUsers();
            res.status(200).json(users)
        } catch(err) {
            res.status(500).json({message: err.message})
        }
    }

// OBTENER UN USUARIO
    export const getUser = async (req,res) => {
        try{
            const user = await userService.getUser(req.params.id);
            if (!user) return res.status(404).json({message:"Usuario no encontrado"})
            res.status(200).json(user)
        } catch(err){
            res.status(500).json({message: err.message})
        }
    }

// CREAR UN USUARIO
    export const createUser = async (req,res) => {
        try{
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser)
        }catch (err) {
            res.status(400).json({message: err.message})
        }
    }

// ACTUALIZAR UN USUARIO
    export const updateUser = async (req,res) => {
        try{
            const updated = await userService.updateUser(req.params.id, req.body)
            if(!updated) return res.status(404).json({msj: "usuario no encontrado"})
            res.status(200).json(updated)
        } catch(err) {
            res.status(400).json({msj: err.message})
        }
    }


// ELIMINAR UN USUARIO
    export const deleteUser = async (req,res) => {
        try{
            const deleted = await userService.deleteUser(req.params.id, req.body)
            if(!deleted) return res.status(404).json({msj: "usuario no encontrado"})
            res.status(200).json(deleted)
        } catch(err) {
            res.status(400).json({msj: err.message})
        }
    }

// FIN CRUD
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// INICIAR SESION DE USUARIO
    export const loginUser = async (req,res) => {
        try{
            const {email, password} =  req.body;
            if(!email || !password) {
                res.status(401).json({msj:"No se han informado las credenciales (email y password)"})
            } else {
                const user = await userService.VerifyCredentials(email,password);
                const tokenPayload = {
                    id: user.id,
                    email: user.email,
                    rol:user.rol
                };
                const token = jwt.sign(tokenPayload,process.env.JWT_SECRET,{expiresIn:'1h'});

                res.status(200).json({msj:"login exitoso",token, user});
            }
        }
        catch (err) {
            res.status(401).json({msj:err.message})
        }
    }