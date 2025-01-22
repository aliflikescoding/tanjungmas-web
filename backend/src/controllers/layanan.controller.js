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

const getLayananTextBasedOnCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch entries based on the categoryId from req.params
    const response = await prisma.layananText.findMany({
      where: {
        categoryId: parseInt(id), // Ensure categoryId is parsed as an integer
      },
    });

    if (response.length === 0) {
      return res.status(404).json({
        message: "No layanan text found for the specified category",
      });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching layanan category",
      error: error.message,
    });
  }
};

const getLayananText = async (req, res) => {
  try {
    const response = await prisma.layananText.findMany();

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching layanan category",
      error: error.message,
    });
  }
};


const postLayananText = async (req, res) => {
  try {
    await prisma.layananText.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        categoryId: req.body.categoryId,
      },
    });

    res.status(200).json({
      message: "Layanan text added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding layanan text",
      error: error.message,
    });
  }
};

const updateLayananText = async (req, res) => {
  const { id } = req.params;

  try {
    // Initialize an empty data object
    const data = {};

    // Conditionally add properties if they are provided in the request body
    if (req.body.title !== undefined) {
      data.title = req.body.title;
    }
    if (req.body.content !== undefined) {
      data.content = req.body.content;
    }
    if (req.body.categoryId !== undefined) {
      data.categoryId = req.body.categoryId;
    }

    // If no valid fields are provided, return an error
    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided to update",
      });
    }

    await prisma.layananText.update({
      where: {
        id: parseInt(id),
      },
      data, // Dynamically constructed data object
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


const deleteLayananText = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.layananText.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Layanan text deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting layanan text",
      error: error.message,
    });
  }
};

module.exports = {
  getLayananCategory,
  postLayananCategory,
  updateLayananCategory,
  deleteLayananCategory,
  getLayananTextBasedOnCategory,
  getLayananText,
  postLayananText,
  updateLayananText,
  deleteLayananText,
};