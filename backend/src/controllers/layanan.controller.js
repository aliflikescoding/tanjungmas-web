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

const getLayananCategoryBasedOnID = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await prisma.layananCategory.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.stsatus(500).json({
      message: "Error fetching layanan category",
      error: err.message,
    })
  }
}

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

const getLayananTextBasedOnCategoryPreview = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch entries based on the categoryId from req.params
    const response = await prisma.layananText.findMany({
      where: {
        categoryId: parseInt(id), // Ensure categoryId is parsed as an integer
      },
      select: {
        id: true,
        title: true,
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

// controller to get all layananBlog
const getLayananBlog = async (req, res) => {
  try {
    const response = await prisma.layananBlog.findMany({
      include: {
        images: true, // Include the related images
      },
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching layananBlog",
      error: error.message,
    });
  }
};


// controller to get all layananBlog based on category
const getLayananBlogByCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await prisma.layananBlog.findMany({
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
      message: "Error fetching layananBlog",
      error: error.message,
    });
  }
};

const getLayananBlogPreview = async (req, res) => {
  try {
    const response = await prisma.layananBlog.findMany({
      select: {
        id: true,
        title: true,
        sinopsis: true,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching fasilitas",
      error: error.message,
    });
  }
}

const getLayananBlogBasedOnId = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await prisma.layananBlog.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        images: true, // Include the related images
      },
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching fasilitas category",
      error: error.message,
    });
  }
};

const getLayananBlogByCategoryPreview = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await prisma.layananBlog.findMany({
      where: {
        categoryId: parseInt(id),
      },
      select: {
        id: true,
        title: true,
        sinopsis: true,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching fasilitas",
      error: error.message,
    });
  }
};

// controler to create layananBlog
const postLayananBlog = async (req, res) => {
  try {
    const { title, sinopsis, layananContent, categoryId } = req.body;

    // Create the layananBlog entry
    const layananBlog = await prisma.layananBlog.create({
      data: {
        title,
        sinopsis,
        layananContent,
        categoryId: parseInt(categoryId),
      },
    });

    // If images are uploaded, link them to the layananBlog
    if (req.files && req.files.length > 0) {
      const imageRecords = req.files.map((file) => ({
        img: `/public/layananBlogImages/${file.filename}`, // Adjust path if needed
        layananBlogId: layananBlog.id, // Link to the created layananBlog
      }));

      // Save images in the layananBlog_images table
      await prisma.layananImage.createMany({
        data: imageRecords,
      });
    }

    res.status(200).json({
      message: "LayananBlog and images added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding layananBlog",
      error: error.message,
    });
  }
};

// controler to update layananBlog
const putLayananBlog = async (req, res) => {
  try {
    const { id } = req.params; // Get the LayananBlog ID from the URL params
    const { title, sinopsis, layananContent, categoryId } = req.body;

    // Build the data object dynamically for partial updates
    const dataToUpdate = {};
    if (title) dataToUpdate.title = title;
    if (sinopsis) dataToUpdate.sinopsis = sinopsis;
    if (layananContent) dataToUpdate.layananContent = layananContent;
    if (categoryId) dataToUpdate.categoryId = parseInt(categoryId);

    // Update the LayananBlog record
    const updatedLayananBlog = await prisma.layananBlog.update({
      where: { id: parseInt(id) },
      data: dataToUpdate,
    });

    // Handle image updates if new files are uploaded
    if (req.files && req.files.length > 0) {
      // Map new images to the LayananBlogImages format
      const newImages = req.files.map((file) => ({
        img: `/public/layananBlogImages/${file.filename}`, // Update path if needed
        layananBlogId: updatedLayananBlog.id, // Link to the updated LayananBlog
      }));

      // Delete existing images if required (optional)
      await prisma.layananImage.deleteMany({
        where: { layananBlogId: updatedLayananBlog.id },
      });

      // Add new images to the database
      await prisma.layananImage.createMany({
        data: newImages,
      });
    }

    res.status(200).json({
      message: "LayananBlog updated successfully",
      data: updatedLayananBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating layananBlog",
      error: error.message,
    });
  }
};

// controler to delete layananBlog
const deleteLayananBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the layananBlog record
    await prisma.layananBlog.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      message: "LayananBlog deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting layananBlog",
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
  getLayananBlog,
  getLayananBlogByCategory,
  postLayananBlog,
  putLayananBlog,
  deleteLayananBlog,
  getLayananCategoryBasedOnID,
  getLayananBlogPreview,
  getLayananBlogBasedOnId,
  getLayananBlogByCategoryPreview,
  getLayananTextBasedOnCategoryPreview,
};