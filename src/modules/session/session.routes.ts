import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { tokenValidate } from "../../middlewares/tokenValidate";
import { sessionValidator } from "./session.validation";
import { sessionController } from "./session.controller";

const router = Router();

router
  .route("/")
  .post(
    tokenValidate,
    validate(sessionValidator),
    sessionController.createSession
  )
  .get(tokenValidate);

router.get("/api/sessions/student/:studentId", tokenValidate);

router.route("/api/sessions/:id").get(tokenValidate).delete(tokenValidate);

export default router;
