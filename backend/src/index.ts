import * as express from "express";
import { AppDataSource } from "./data-source"
import bodyParser = require("body-parser");
import { UserRouter } from "./controller/user.controller";

const app = express();
const PORT = 8080;

function config() {
    app.use(bodyParser.json());
}

async function main() {
    config();
    app.use("/", UserRouter);
    await AppDataSource.initialize();
    app.listen(PORT, async () => {
        console.log('Data source initialized.')
        console.log("Server listening on port " + PORT);
    })
}

main();

