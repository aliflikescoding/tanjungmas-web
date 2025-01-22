const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const util = require("util");

const prisma = new PrismaClient();
const unlinkAsync = util.promisify(fs.unlink);

// Controller to get all layanan cateogry
const getLayananCategory = async (req, res) => {
  try {
    const response = await prisma.layananCategory.findMany();

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching layanan category",
      error: error.message,
    });
  }
};

// controller to post layanan category
const postLayananCategory = async (req, res) => {
  try {
    await prisma.layananCategory.create({
      data: {
        title: req.body.title,
      },
    });

    res.status(200).json({
      message: "Layanan category added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding layanan category",
      error: error.message,
    });
  }
};

// controller to update layanan category
const updateLayananCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.layananCategory.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: req.body.title,
      },
    });

    res.status(200).json({
      message: "Layanan category updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating layanan category",
      error: error.message,
    });
  }
};

// controlelr to delete layanan category
const deleteLayananCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.layananCategory.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Layanan category deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting layanan category",
      error: error.message,
    });
  }
};

module.exports = {
  getLayananCategory,
  postLayananCategory,
  updateLayananCategory,
  deleteLayananCategory,
};