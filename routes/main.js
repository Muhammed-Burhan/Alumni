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
const {
  getBlogs,
  createBlog,
  getBlog,
} = require("../controllers/BlogController");

//News Controller
const {
  getNews,
  createNews,
  getNew,
} = require("../controllers/NewsController");

//Event Controllers
const {
  createEvent,
  getEvents,
  getEvent,
} = require("../controllers/EventController");

//Community Controllers
const {
  createCommunity,
  getCommunities,
} = require("../controllers/CommunityController");

//Auth routes
router.route("/login").post(login);
router.route("/verify").post(verify);

//News route
router.route("/news").get(getNews).post(createNews);
router.route("/news/:id").get(getNew);
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
router.route("/blog/:id").get(getBlog);

//Event route
router.route("/event").get(getEvents).post(createEvent);
router.route("/event/:id").get(getEvent);
//Community route
router
  .route("/community")
  .get(authnticationMiddleware, getCommunities)
  .post(authnticationMiddleware, createCommunity);

module.exports = router;
