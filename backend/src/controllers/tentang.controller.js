const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const util = require("util");

const prisma = new PrismaClient();
const unlinkAsync = util.promisify(fs.unlink);

const bigImageUploadDir = "./public/tentang/bigImage";
const smallImageloadDir = "./public/tentang/smallImage";

// Controller to handle uploading big image
const uploadBigImage = async (req, res) => {
  try {
    const result = await prisma.tentang.findUnique({
      where: {
        id: 1,
      },
    });

    if (!result) {
      return res.status(404).json({ message: "Tentang not found" });
    }

    const oldBigImagePath = result.imgProfilBig;

    if (oldBigImagePath && fs.existsSync(oldBigImagePath)) {
      await unlinkAsync(oldBigImagePath);
      console.log(`Old file deleted: ${oldBigImagePath}`);
    }

    const { filename } = req.file;
    const newBigImagePath = `${bigImageUploadDir}/${filename}`;

    await prisma.tentang.update({
      where: {
        id: 1,
      },
      data: {
        imgProfilBig: newBigImagePath,
      },
    });

    res.status(200).json({
      message: "Big image updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading file and updating big image",
      error: error.message,
    });
  }
};

// Controller to handle uploading small image
const uploadSmallImage = async (req, res) => {
  try {
    const result = await prisma.tentang.findUnique({
      where: {
        id: 1,
      },
    });

    if (!result) {
      return res.status(404).json({ message: "Tentang not found" });
    }

    const oldSmallImagePath = result.smallImage;

    if (oldSmallImagePath && fs.existsSync(oldSmallImagePath)) {
      await unlinkAsync(oldSmallImagePath);
      console.log(`Old file deleted: ${oldSmallImagePath}`);
    }

    const { filename } = req.file;
    const newSmallImagePath = `${smallImageloadDir}/${filename}`;

    await prisma.tentang.update({
      where: {
        id: 1,
      },
      data: {
        imgProfilSmall: newSmallImagePath,
      },
    });

    res.status(200).json({
      message: "Small image updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading file and updating small image",
      error: error.message,
    });
  }
};

// Controller to fetch the current big image
const getBigImage = async (req, res) => {
  try {
    const response = await prisma.tentang.findUnique({
      where: {
        id: 1,
      },
      select: {
        imgProfilBig: true,
      },
    });

    res.status(200).json(response.imgProfilBig);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching big image",
      error: error.message,
    });
  }
};

// Controller to fetch the current small image
const getSmallImage = async (req, res) => {
  try {
    const response = await prisma.tentang.findUnique({
      where: {
        id: 1,
      },
      select: {
        imgProfilSmall: true,
      },
    });

    res.status(200).json(response.imgProfilSmall);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching small image",
      error: error.message,
    });
  }
};

// Controller to fetch the current visi
const getVisi = async (req, res) => {
  try {
    const response = await prisma.tentang.findUnique({
      where: {
        id: 1,
      },
      select: {
        visi: true,
      },
    });

    res.status(200).json(response.visi);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching small image",
      error: error.message,
    });
  }
};

// Controller to update visi
const updateVisi = async (req, res) => {
  try {
    await prisma.tentang.update({
      where: {
        id: 1,
      },
      data: {
        visi: req.body.visi,
      },
    });

    res.status(200).json({
      message: "Visi updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating visi",
      error: error.message,
    });
  }
};

module.exports = {
  uploadBigImage,
  uploadSmallImage,
  getBigImage,
  getSmallImage,
  getVisi,
  updateVisi,
};