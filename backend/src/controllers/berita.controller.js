const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const util = require("util");

const prisma = new PrismaClient();
const unlinkAsync = util.promisify(fs.unlink);

// Controller to get all berita category
const getBeritaCategory = async (req, res) => {
  try {
    const response = await prisma.beritaCategory.findMany();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching berita category",
      error: error.message,
    });
  }
};

// Controller to get berita category by ID
const getBeritaCategoryBasedOnID = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.beritaCategory.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching berita category",
      error: err.message,
    });
  }
};

// Controller to post berita category
const postBeritaCategory = async (req, res) => {
  try {
    await prisma.beritaCategory.create({
      data: {
        title: req.body.title,
      },
    });
    res.status(200).json({
      message: "Berita category added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding berita category",
      error: error.message,
    });
  }
};

// Controller to update berita category
const updateBeritaCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.beritaCategory.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: req.body.title,
      },
    });
    res.status(200).json({
      message: "Berita category updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating berita category",
      error: error.message,
    });
  }
};

// Controller to delete berita category
const deleteBeritaCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.beritaCategory.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      message: "Berita category deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting berita category",
      error: error.message,
    });
  }
};

// Controller to get all berita
const getBerita = async (req, res) => {
  try {
    const response = await prisma.berita.findMany({
      include: {
        images: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching berita",
      error: error.message,
    });
  }
};

// Controller to get berita by category
const getBeritaByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.berita.findMany({
      where: {
        categoryId: parseInt(id),
      },
      include: {
        images: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching berita",
      error: error.message,
    });
  }
};

// Controller to get berita preview
const getBeritaPreview = async (req, res) => {
  try {
    const response = await prisma.berita.findMany({
      select: {
        id: true,
        title: true,
        sinopsis: true,
        images: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching berita preview",
      error: error.message,
    });
  }
};

// Controller to get berita by ID
const getBeritaBasedOnId = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.berita.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        images: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching berita",
      error: error.message,
    });
  }
};

// Controller to get berita by category (preview)
const getBeritaByCategoryPreview = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.berita.findMany({
      where: {
        categoryId: parseInt(id),
      },
      select: {
        id: true,
        title: true,
        sinopsis: true,
        images: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching berita preview",
      error: error.message,
    });
  }
};

// Controller to post berita
const postBerita = async (req, res) => {
  try {
    const { title, sinopsis, beritaContent, categoryId } = req.body;
    const berita = await prisma.berita.create({
      data: {
        title,
        sinopsis,
        beritaContent,
        categoryId: parseInt(categoryId),
      },
    });

    if (req.files && req.files.length > 0) {
      const imageRecords = req.files.map((file) => ({
        img: `/public/beritaImages/${file.filename}`,
        beritaId: berita.id,
      }));
      await prisma.beritaImage.createMany({
        data: imageRecords,
      });
    }

    res.status(200).json({
      message: "Berita and images added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding berita",
      error: error.message,
    });
  }
};

// Controller to update berita
const putBerita = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, sinopsis, beritaContent, categoryId } = req.body;

    const dataToUpdate = {};
    if (title) dataToUpdate.title = title;
    if (sinopsis) dataToUpdate.sinopsis = sinopsis;
    if (beritaContent) dataToUpdate.beritaContent = beritaContent;
    if (categoryId) dataToUpdate.categoryId = parseInt(categoryId);

    const updatedBerita = await prisma.berita.update({
      where: { id: parseInt(id) },
      data: dataToUpdate,
    });

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => ({
        img: `/public/beritaImages/${file.filename}`,
        beritaId: updatedBerita.id,
      }));

      await prisma.beritaImage.deleteMany({
        where: { beritaId: updatedBerita.id },
      });

      await prisma.beritaImage.createMany({
        data: newImages,
      });
    }

    res.status(200).json({
      message: "Berita updated successfully",
      data: updatedBerita,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating berita",
      error: error.message,
    });
  }
};

// Controller to delete berita
const deleteBerita = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.berita.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({
      message: "Berita deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting berita",
      error: error.message,
    });
  }
};

module.exports = {
  getBeritaCategory,
  getBeritaCategoryBasedOnID,
  postBeritaCategory,
  updateBeritaCategory,
  deleteBeritaCategory,
  getBerita,
  getBeritaByCategory,
  getBeritaPreview,
  getBeritaBasedOnId,
  getBeritaByCategoryPreview,
  postBerita,
  putBerita,
  deleteBerita,
};
