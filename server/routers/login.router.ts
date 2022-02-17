import express from "express";
import path from "path";

const router = express.Router();

router.get("/", (_req, res): void => {
  res.sendFile(
    /* currently in the build/server dir */
    path.join(__dirname, "..", "..", "..", "client", "public", "index2.html")
  );
});

export default router;
