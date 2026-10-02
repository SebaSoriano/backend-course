import express from "express";

const router = express.Router();

/* CRUD */
router.get("/hello", (req, res) => {
    res.json({httpMethod: "get"});
});
router.post("/hello", (req, res) => {
    res.json({httpMethod: "post"});
});
router.put("/hello", (req, res) => {
    res.json({httpMethod: "put"});
});
router.delete("/hello", (req, res) => {
    res.json({httpMethod: "delete"});
});


export default router;