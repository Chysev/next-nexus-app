import { Router } from "express";
import { ExpressRouter } from "@/types/express-types";

import auth from "./routes/auth.route";
import users from "./routes/users.route";

const router: ExpressRouter = Router();

router.use("/auth", auth);
router.use("/users", users);

export default router;
