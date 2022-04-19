const express = require("express");
const router = express.Router();

//authntiaction middleware
const authnticationMiddleware = require("../middleware/auth");

//controlles

//Authentication
const { login, verify } = require("../controllers/Authcontrollers");
const {
  getAlumni,
  getAlumnis,
  createAlumni,
  updateAlumni,
  deleteAlumni,
} = require("../controllers/AlumniControllers");

//Blog Controllers
const { getBlogs, createBlog } = require("../controllers/BlogController");

//Event Controllers
const { createEvent, getEvents } = require("../controllers/EventController");

//Auth routes
router.route("/login").post(login);
router.route("/verify").post(verify);

//Alumni routes
router
  .route("/alumnis")
  .get(authnticationMiddleware, getAlumnis)
  .post(authnticationMiddleware, createAlumni);
router
  .route("/alumnis/:id")
  .get(authnticationMiddleware, getAlumni)
  .patch(authnticationMiddleware, updateAlumni)
  .delete(authnticationMiddleware, deleteAlumni);

//Blog route
router.route("/blog").get(getBlogs).post(createBlog);
module.exports = router;

//Event route
router.route("/event").get(getEvents).post(createEvent);
