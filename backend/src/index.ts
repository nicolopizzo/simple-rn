import * as express from "express";
import { AppDataSource } from "./data-source"
import bodyParser = require("body-parser");
import { UserRouter } from "./controller/user.controller";
import { User } from "./entity/User";

const app = express();
const PORT = 8080;

function config() {
    app.use(bodyParser.json());
}

async function main() {
    config();
    app.use("/", UserRouter);
    await AppDataSource.initialize();

    // Admin user
    let user = new User();
    user.username = "admin"
    user.password = "admin"
    user.role = "admin"

    AppDataSource.getRepository(User).save(user);

    app.listen(PORT, async () => {
        console.log('Data source initialized.')
        console.log("Server listening on port " + PORT);
    })
}

main();

