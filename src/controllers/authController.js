import { prisma } from "../config/db.js"
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // check if user already exists
    const userExists = await prisma.user.findUnique({
        where: { email: email }, // this email exists?
    });

    if(userExists) {
        return res.status(400).json({error: "User already exists with that email"});
    }

    // hash password
    // no guardamos la contraseña como texto
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    res.status(201).json({
        status: "Success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email,
            },
        }, 
    });
    
};



// check if user email exists in the table
const login = async (req, res) => {
    const { email, password } = req.body; // login solo necesita email y contraseña

    const user = await prisma.user.findUnique({
        where: { email: email }, // busca algun user con el email
    });

    if (!user){ // si el user no existe
        return res.status(401).json({ error: "Invalid email or password" });
    }

    // verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(401).json({ error: "Invalid email or password" });
    }


    // generate JWT token
    const token = generateToken


    // para que el postman devuelva los datos del que se logeo
    res.status(201).json({
        status: "Success",
        data: {
            user: {
                id: user.id,
                email: email,
            },
        }, 
    });
};


export { register, login };