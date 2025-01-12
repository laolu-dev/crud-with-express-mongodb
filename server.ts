import express from "express";
import fs from "node:fs";

interface User {
    name: string;
    age: number;
}

const server = express();
server.use(express.json());

server.get("/users", (req, res) => {
    fs.readFile("user.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(data);
    });
});

server.post("/users/create", (request, response) => {
    const body = request.body
    const name: string = body.fullname;
    const age: number = body.age;

    const newUser: User = {
        name,
        age
    }

    fs.readFile("user.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const users: Array<User> = JSON.parse(data)
        users.push(newUser);

        fs.writeFile("user.json", JSON.stringify(users), (error) => {
            if (error) {
                console.log(error);
                response.send("Unable to add user!");
                return;
            }
            response.status(201).send(users);
        });
    });
});


server.patch("/users/:id", (request, response) => {
    const body = request.body;
    const id: any = request.params.id;
    const name: string = body.name;

    fs.readFile("user.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const users: Array<User> = JSON.parse(data)
        users[id].name = name

        fs.writeFile("user.json", JSON.stringify(users), (error) => {
            if (error) {
                console.log(error);
                response.send("Unable to change user name!");
                return;
            }
            response.status(201).send(users[id]);
        });
    });
});

server.delete("/users", (request, response) => {
    fs.readFile("user.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const users: Array<User> = JSON.parse(data);
        users.pop();
 
        fs.writeFile("user.json", JSON.stringify(users), (error) => {
            if (error) {
                console.log(error);
                response.send("Unable to change user name!");
                return;
            }
            response.status(201).send(users);
        });
    });
});


server.listen(3000, () => {
    console.log("Server is running on port 3000");
});