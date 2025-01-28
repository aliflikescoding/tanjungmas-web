const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
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
  getFasilitasCategoryBasedOnId,
  getFasilitasPreview,
  getFasilitasBasedOnId,
  getFasilitasByCategoryPreview,
  getPrasarana,
  postPrasarana,
  updatePrasarana,
  deletePrasarana,
} = require("../controllers/tentang.controller");

// Routes for big image
router.get("/tentang/big", getBigImage);
router.post(
  "/tentang/big",
  verifyJWT,
  uploadBigImageMiddleware,
  uploadBigImage
);

// Routes for small image
router.get("/tentang/small", getSmallImage);
router.post(
  "/tentang/small",
  verifyJWT,
  uploadSmallImageMiddleware,
  uploadSmallImage
);

// Routes for visi
router.get("/tentang/visi", getVisi);
router.put("/tentang/visi", verifyJWT, updateVisi);

// Routes for misi
router.get("/tentang/misi", getMisi);
router.post("/tentang/misi", verifyJWT, postMisi);
router.put("/tentang/misi/:id", verifyJWT, updateMisi);
router.delete("/tentang/misi/:id", verifyJWT, deleteMisi);

// Routes for struktur image
router.post(
  "/tentang/struktur",
  verifyJWT,
  uploadStrukturImageMiddleware,
  uploadStruktur
);
router.get("/tentang/struktur", getStruktur);

// Routes for fasilitas category
router.get("/tentang/fasilitas-category", getFasilitasCategory);
router.get("/tentang/fasilitas-category/:id", getFasilitasCategoryBasedOnId);
router.post("/tentang/fasilitas-category", verifyJWT, postFasilitasCategory);
router.put(
  "/tentang/fasilitas-category/:id",
  verifyJWT,
  updateFasilitasCategory
);
router.delete(
  "/tentang/fasilitas-category/:id",
  verifyJWT,
  deleteFasilitasCategory
);

// Routes for fasilitas
router.get("/tentang/fasilitas", getFasilitas);
router.get("/tentang/fasilitas/preview", getFasilitasPreview);
router.get("/tentang/fasilitas/:id", getFasilitasBasedOnId);
router.get("/tentang/fasilitas-category/:id/fasilitas", getFasilitasByCategory);
router.get(
  "/tentang/fasilitas-category/:id/fasilitas/preview",
  getFasilitasByCategoryPreview
);
router.post(
  "/tentang/fasilitas",
  verifyJWT,
  uploadMultipleImagesMiddleware,
  postFasilitas
);
router.put(
  "/tentang/fasilitas/:id",
  verifyJWT,
  uploadMultipleImagesMiddleware,
  putFasilitas
);
router.delete("/tentang/fasilitas/:id", verifyJWT, deleteFasilitas);

// Routes for sarana
router.get("/tentang/sarana", getSarana);
router.post("/tentang/sarana", verifyJWT, postSarana);
router.put("/tentang/sarana/:id", verifyJWT, updateSarana);
router.delete("/tentang/sarana/:id", verifyJWT, deleteSarana);

// Routes for Prasarana
router.get("/tentang/prasarana", getPrasarana);
router.post("/tentang/prasarana", verifyJWT, postPrasarana);
router.put("/tentang/prasarana/:id", verifyJWT, updatePrasarana);
router.delete("/tentang/prasarana/:id", verifyJWT, deletePrasarana);

// Routes for data monografi
router.get("/tentang/data-monografi", getDataMonografi);
router.post("/tentang/data-monografi", verifyJWT, createDataMonografi);
router.put("/tentang/data-monografi/:id", verifyJWT, updateDataMonografi);
router.delete("/tentang/data-monografi/:id", verifyJWT, deleteDataMonografi);

// Routes for SDM
router.get("/tentang/sdm", getSdm);
router.put("/tentang/sdm", verifyJWT, updateSdm);

// Routes for regulasi
router.get("/tentang/regulasi", getRegulasi);
router.put("/tentang/regulasi", verifyJWT, updateRegulasi);

module.exports = router;
