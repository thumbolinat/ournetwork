const express = require("express");
const {
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser
} = require("../controllers/user");
const { requireLogin } = require("../controllers/auth");

const router = express.Router();

router.get("/users", allUsers);
router.get("/user/:userId", requireLogin, getUser);
router.put("/user/:userId", requireLogin, updateUser);
router.delete("/user/:userId", requireLogin, deleteUser);

router.param("userId", userById);

module.exports = router;