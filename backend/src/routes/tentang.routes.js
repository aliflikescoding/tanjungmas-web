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
  getSdm,
  updateSdm,
  getRegulasi,
  updateRegulasi,
} = require("../controllers/tentang.controller");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");

router.get("/tentang/big", getBigImage);

router.post("/tentang/big", verifyJWT, uploadBigImageMiddleware, uploadBigImage);

router.get("/tentang/small", getSmallImage);

router.post("/tentang/small", verifyJWT, uploadSmallImageMiddleware, uploadSmallImage);

router.get("/tentang/visi", getVisi);

router.put("/tentang/visi", verifyJWT, updateVisi);

router.get("/tentang/misi", getMisi);

router.post("/tentang/misi", verifyJWT, postMisi);

router.put("/tentang/misi/:id", verifyJWT, updateMisi);

router.delete("/tentang/misi/:id", verifyJWT, deleteMisi);

router.post("/tentang/struktur", verifyJWT, uploadStrukturImageMiddleware, uploadStruktur);

router.get("/tentang/struktur", getStruktur);

router.get("/tentang/fasilitas-category", getFasilitasCategory);

router.post("/tentang/fasilitas-category", verifyJWT, postFasilitasCategory);

router.put("/tentang/fasilitas-category/:id", verifyJWT, updateFasilitasCategory);

router.delete("/tentang/fasilitas-category/:id", verifyJWT, deleteFasilitasCategory);

router.get("/tentang/fasilitas-category/:id/fasliitas", getFasilitasByCategory);

router.get("/tentang/fasilitas", getFasilitas);

router.post("/tentang/fasilitas", verifyJWT, uploadMultipleImagesMiddleware, postFasilitas);

router.put("/tentang/fasilitas/:id", verifyJWT, uploadMultipleImagesMiddleware, putFasilitas);

router.delete("/tentang/fasilitas/:id", verifyJWT, deleteFasilitas);

router.get("/tentang/sarana", getSarana);

router.post("/tentang/sarana", verifyJWT, postSarana);

router.put("/tentang/sarana/:id", verifyJWT, updateSarana);

router.delete("/tentang/sarana/:id", verifyJWT, deleteSarana);

router.get("/tentang/data-monografi", getDataMonografi);

router.post("/tentang/data-monografi", verifyJWT, createDataMonografi);

router.put("/tentang/data-monografi/:id", verifyJWT, updateDataMonografi);

router.delete("/tentang/data-monografi/:id", verifyJWT, deleteDataMonografi);

router.get("/tentang/sdm", getSdm);

router.put("/tentang/sdm", verifyJWT, updateSdm);

router.get("/tentang/regulasi", getRegulasi);

router.put("/tentang/regulasi", verifyJWT, updateRegulasi);

module.exports = router;