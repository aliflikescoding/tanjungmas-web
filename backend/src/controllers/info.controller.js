const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const util = require("util");

const prisma = new PrismaClient();
const unlinkAsync = util.promisify(fs.unlink);

// Controller to get all info category
const getInfoCategory = async (req, res) => {
  try {
    const response = await prisma.infoCategory.findMany();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching info category",
      error: error.message,
    });
  }
};

// Controller to get info category by ID
const getInfoCategoryBasedOnID = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.infoCategory.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching info category",
      error: err.message,
    });
  }
};

// Controller to post info category
const postInfoCategory = async (req, res) => {
  try {
    await prisma.infoCategory.create({
      data: {
        title: req.body.title,
      },
    });
    res.status(200).json({
      message: "Info category added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding info category",
      error: error.message,
    });
  }
};

// Controller to update info category
const updateInfoCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.infoCategory.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: req.body.title,
      },
    });
    res.status(200).json({
      message: "Info category updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating info category",
      error: error.message,
    });
  }
};

// Controller to delete info category
const deleteInfoCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.infoCategory.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      message: "Info category deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting info category",
      error: error.message,
    });
  }
};

// Controller to get info text based on category
const getInfoTextBasedOnCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.infoText.findMany({
      where: {
        categoryId: parseInt(id),
      },
    });
    if (response.length === 0) {
      return res.status(404).json({
        message: "No info text found for the specified category",
      });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching info text",
      error: error.message,
    });
  }
};

// Controller to get info text based on category (preview)
const getInfoTextBasedOnCategoryPreview = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.infoText.findMany({
      where: {
        categoryId: parseInt(id),
      },
      select: {
        id: true,
        title: true,
      },
    });
    if (response.length === 0) {
      return res.status(404).json({
        message: "No info text found for the specified category",
      });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching info text",
      error: error.message,
    });
  }
};

// Controller to get all info text
const getInfoText = async (req, res) => {
  try {
    const response = await prisma.infoText.findMany();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching info text",
      error: error.message,
    });
  }
};

// Controller to get info text by ID
const getInfoTextBasedOnId = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.infoText.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!response) {
      return res.status(404).json({
        message: "Info text not found",
      });
    }
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching info text",
      error: err.message,
    });
  }
};

// Controller to post info text
const postInfoText = async (req, res) => {
  try {
    await prisma.infoText.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        categoryId: req.body.categoryId,
      },
    });
    res.status(200).json({
      message: "Info text added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding info text",
      error: error.message,
    });
  }
};

// Controller to update info text
const updateInfoText = async (req, res) => {
  const { id } = req.params;
  try {
    const data = {};
    if (req.body.title !== undefined) data.title = req.body.title;
    if (req.body.content !== undefined) data.content = req.body.content;
    if (req.body.categoryId !== undefined)
      data.categoryId = req.body.categoryId;

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided to update",
      });
    }

    await prisma.infoText.update({
      where: {
        id: parseInt(id),
      },
      data,
    });
    res.status(200).json({
      message: "Info text updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating info text",
      error: error.message,
    });
  }
};

// Controller to delete info text
const deleteInfoText = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.infoText.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      message: "Info text deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting info text",
      error: error.message,
    });
  }
};

// Controller to get all info blog
const getInfoBlog = async (req, res) => {
  try {
    const response = await prisma.infoBlog.findMany({
      include: {
        images: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching info blog",
      error: error.message,
    });
  }
};

// Controller to get info blog by category
const getInfoBlogByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.infoBlog.findMany({
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
      message: "Error fetching info blog",
      error: error.message,
    });
  }
};

// Controller to get info blog preview
const getInfoBlogPreview = async (req, res) => {
  try {
    const response = await prisma.infoBlog.findMany({
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
      message: "Error fetching info blog preview",
      error: error.message,
    });
  }
};

// Controller to get info blog by ID
const getInfoBlogBasedOnId = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.infoBlog.findUnique({
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
      message: "Error fetching info blog",
      error: error.message,
    });
  }
};

// Controller to get info blog by category (preview)
const getInfoBlogByCategoryPreview = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.infoBlog.findMany({
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
      message: "Error fetching info blog preview",
      error: error.message,
    });
  }
};

// Controller to post info blog
const postInfoBlog = async (req, res) => {
  try {
    const { title, sinopsis, infoBlogContent, categoryId } = req.body;
    const infoBlog = await prisma.infoBlog.create({
      data: {
        title,
        sinopsis,
        infoBlogContent,
        categoryId: parseInt(categoryId),
      },
    });

    if (req.files && req.files.length > 0) {
      const imageRecords = req.files.map((file) => ({
        img: `/public/infoBlogImages/${file.filename}`,
        infoBlogId: infoBlog.id,
      }));
      await prisma.infoBlogImage.createMany({
        data: imageRecords,
      });
    }

    res.status(200).json({
      message: "Info blog and images added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding info blog",
      error: error.message,
    });
  }
};

// Controller to update info blog
const putInfoBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, sinopsis, infoBlogContent, categoryId } = req.body;

    const dataToUpdate = {};
    if (title) dataToUpdate.title = title;
    if (sinopsis) dataToUpdate.sinopsis = sinopsis;
    if (infoBlogContent) dataToUpdate.infoBlogContent = infoBlogContent;
    if (categoryId) dataToUpdate.categoryId = parseInt(categoryId);

    const updatedInfoBlog = await prisma.infoBlog.update({
      where: { id: parseInt(id) },
      data: dataToUpdate,
    });

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => ({
        img: `/public/infoBlogImages/${file.filename}`,
        infoBlogId: updatedInfoBlog.id,
      }));

      await prisma.infoBlogImage.deleteMany({
        where: { infoBlogId: updatedInfoBlog.id },
      });

      await prisma.infoBlogImage.createMany({
        data: newImages,
      });
    }

    res.status(200).json({
      message: "Info blog updated successfully",
      data: updatedInfoBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating info blog",
      error: error.message,
    });
  }
};

// Controller to delete info blog
const deleteInfoBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.infoBlog.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({
      message: "Info blog deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting info blog",
      error: error.message,
    });
  }
};

module.exports = {
  getInfoCategory,
  getInfoCategoryBasedOnID,
  postInfoCategory,
  updateInfoCategory,
  deleteInfoCategory,
  getInfoTextBasedOnCategory,
  getInfoTextBasedOnCategoryPreview,
  getInfoText,
  getInfoTextBasedOnId,
  postInfoText,
  updateInfoText,
  deleteInfoText,
  getInfoBlog,
  getInfoBlogByCategory,
  getInfoBlogPreview,
  getInfoBlogBasedOnId,
  getInfoBlogByCategoryPreview,
  postInfoBlog,
  putInfoBlog,
  deleteInfoBlog,
};
