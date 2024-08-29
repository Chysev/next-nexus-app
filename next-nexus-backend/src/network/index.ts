import { Router } from "express";
import { ExpressRouter } from "@/types/express-types";

import auth from "./routes/auth.route";
import users from "./routes/users.route";
import config from "./routes/config.route";
import cloud from "./routes/cloud-services.route";
import verifyApiKey from "@/middleware/verifyApiKey";

const router: ExpressRouter = Router();

router.use(verifyApiKey);
router.use("/auth", auth);
router.use("/users", users);
router.use("/cloud-services", cloud);
router.use("/config", config);

export default router;
