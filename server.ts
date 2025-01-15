import express from 'express';
import mongoose from "mongoose";
import UserModel from "./user-schema";

const server = express();

server.use(express.json());

async function getAllUsers() {
    const users = await UserModel.find();
    return users;
}

server.get("/users", async (req, response) => {
    const databaseUsers = await getAllUsers();
    response.send(databaseUsers);
});

server.get("/users/:id", async (request, response) => {
    const id: any = request.params.id;
    const user = await UserModel.findById(id);
    response.send(user);
});

server.post("/users/create", async (request, response) => {
    const body = request.body
    const name: string = body.fullname;
    const age: number = body.age;

    const newUser = await UserModel.create({ name: name, age: age });
    response.status(201).send(newUser);
});


server.patch("/users/:id", async (request, response) => {
    const body = request.body;
    const id: any = request.params.id;
    const name: string = body.name;

    await UserModel.updateOne({ id: id }, { name: name });

    const user = await UserModel.findById(id);
    response.send(user);
});

server.delete("/users", (request, response) => {
    // fs.readFile("user.json", "utf8", (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }

    //     const users: Array<User> = JSON.parse(data);
    //     users.pop();

    //     fs.writeFile("user.json", JSON.stringify(users), (error) => {
    //         if (error) {
    //             console.log(error);
    //             response.send("Unable to change user name!");
    //             return;
    //         }
    //         response.status(201).send(users);
    //     });
    // });
});

mongoose.connect("mongodb+srv://laolu:dLC8Qq5CAOIkx04H@userdatabase.ewhaw.mongodb.net/?retryWrites=true&w=majority&appName=UserDatabase").then(() => {
    console.log("Connected to MongoDB")
});


server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
