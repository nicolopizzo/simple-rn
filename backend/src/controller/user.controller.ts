import { Request, Response, Router } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

const router = Router();
const userRepository = AppDataSource.getRepository(User);

router.get("/", async (req: Request, res: Response) => {
    const users = await userRepository.find();
    if (users == undefined) {
        return res.status(400).send({ error: "Error encountered." })
    }

    return res.status(200).send(users)
})

router.get("/interests/:username", async (req: Request, res: Response) => {
    const username = req.params.username;
    const interests = (await userRepository.findOneBy({ username })).interests;

    return res.status(200).send(interests)
})

router.put("/", async (req: Request, res: Response) => {
    const user = req.body;
    if (user.role == undefined) {
        user.role = "user";
    }

    try {
        let foundUser = await userRepository.findOneBy({ username: user.username });
        if (foundUser != undefined) {
            return res.status(400).send({ error: "User already found" })
        }
        const savedUser = await userRepository.save(user);

        return res.status(201).send(savedUser)
    } catch (error) {
        return res.status(400).send({ error })
    }
})

router.post("/role", async (req: Request, res: Response) => {
    const username = req.query.username as string;
    const role = req.query.role as string;

    const foundUser = await userRepository.findOneBy({ username })
    if (foundUser == undefined) {
        return res.status(404).send({ error: "User not found" })
    }

    foundUser.role = role;

    const user = await userRepository.save(foundUser);
    return res.status(200).send(user);
})

router.post("/interests", async (req: Request, res: Response) => {
    const username = req.query.username as string;
    const interest = req.query.interest as string;

    const foundUser = await userRepository.findOneBy({ username });
    if (foundUser == undefined) {
        return res.status(404).send({ error: "User not found" })
    }

    if (foundUser.interests == undefined) { foundUser.interests = [interest] }
    else {
        foundUser.interests.push(interest)
    }

    const user = await userRepository.save(foundUser);
    return res.status(200).send(user);
})

router.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const foundUser = await userRepository.findOneBy({ username, password });
    if (foundUser == undefined) {
        return res.status(404).send({ error: "One or more of your credentials are not correct." });
    }

    return res.status(200).send(foundUser)
})

export { router as UserRouter };