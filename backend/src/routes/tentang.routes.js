const express = require("express");
const uploadBigImageMiddleware = require("../middlewares/uploadBigImageMiddleware");
const uploadSmallImageMiddleware = require("../middlewares/uploadSmallImageMiddleware");
const uploadStrukturImageMiddleware = require("../middlewares/uploadStrukturImageMiddleware");
const uploadMultipleImagesMiddleware = require("../middlewares/uploadMultipleImagesMiddleware");
const {
  uploadBigImage,
  uploadSmallImage,
  getBigImage,
  getSmallImage,
  getVisi,
  updateVisi,
  getMisi,
  postMisi,
  deleteMisi,
  updateMisi,
  uploadStruktur,
  getStruktur,
  getFasilitasCategory,
  postFasilitasCategory,
  updateFasilitasCategory,
  deleteFasilitasCategory,
  getFasilitas,
  getFasilitasByCategory,
  postFasilitas,
  putFasilitas,
  deleteFasilitas,
  getSarana,
  postSarana,
  updateSarana,
  deleteSarana,
  getDataMonografi,
  createDataMonografi,
  updateDataMonografi,
  deleteDataMonografi,
} = require("../controllers/tentang.controller");
const router = express.Router();

router.get("/tentang/big", getBigImage);

router.post("/tentang/big", uploadBigImageMiddleware, uploadBigImage);

router.get("/tentang/small", getSmallImage);

router.post("/tentang/small", uploadSmallImageMiddleware, uploadSmallImage);

router.get("/tentang/visi", getVisi);

router.put("/tentang/visi", updateVisi);

router.get("/tentang/misi", getMisi);

router.post("/tentang/misi", postMisi);

router.put("/tentang/misi/:id", updateMisi);

router.delete("/tentang/misi/:id", deleteMisi);

router.post("/tentang/struktur", uploadStrukturImageMiddleware, uploadStruktur);

router.get("/tentang/struktur", getStruktur);

router.get("/tentang/fasilitas-category", getFasilitasCategory);

router.post("/tentang/fasilitas-category", postFasilitasCategory);

router.put("/tentang/fasilitas-category/:id", updateFasilitasCategory);

router.delete("/tentang/fasilitas-category/:id", deleteFasilitasCategory);

router.get("/tentang/fasilitas-category/:id/fasliitas", getFasilitasByCategory);

router.get("/tentang/fasilitas", getFasilitas);

router.post("/tentang/fasilitas", uploadMultipleImagesMiddleware, postFasilitas);

router.put("/tentang/fasilitas/:id", uploadMultipleImagesMiddleware, putFasilitas);

router.delete("/tentang/fasilitas/:id", deleteFasilitas);

router.get("/tentang/sarana", getSarana);

router.post("/tentang/sarana", postSarana);

router.put("/tentang/sarana/:id", updateSarana);

router.delete("/tentang/sarana/:id", deleteSarana);

router.get("/tentang/data-monografi", getDataMonografi);

router.post("/tentang/data-monografi", createDataMonografi);

router.put("/tentang/data-monografi/:id", updateDataMonografi);

router.delete("/tentang/data-monografi/:id", deleteDataMonografi);

module.exports = router;