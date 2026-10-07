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


    // generate JWT token
    const token = generateToken(user.id, res);

    res.status(201).json({
        status: "Success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email,
            },
            token,
        }, 
    });
    
};



// check if user email exists in the table
const login = async (req, res) => {
    console.log("1. login recibido", req.body);
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    console.log("2. user encontrado:", user ? user.id : null);

    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("3. password válida:", isPasswordValid);

    if (!isPasswordValid) return res.status(401).json({ error: "Invalid email or password" });

    const token = generateToken(user.id, res);
    console.log("4. token generado");


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


const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0), // establece la cookie para que expire inmediatamente
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
};

export { register, login, logout };