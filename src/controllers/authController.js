import { prisma } from "../config/db.js"
import bcrypt from "bcryptjs";

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

export { register };