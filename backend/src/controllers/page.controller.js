const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const util = require("util");

const prisma = new PrismaClient();
const unlinkAsync = util.promisify(fs.unlink);

const logoUploadDir = "./public/page/logo";
const heroUploadDir = "./public/page/hero";
const navbarUploadDir = "./public/page/navbar";

// Controller to handle uploading page logo
const uploadPageLogo = async (req, res) => {
  try {
    const result = await prisma.page.findUnique({
      where: {
        id: 1,
      },
    });

    if (!result) {
      return res.status(404).json({ message: "Page not found" });
    }

    const oldLogoPath = result.logo;

    if (oldLogoPath && fs.existsSync(oldLogoPath)) {
      await unlinkAsync(oldLogoPath);
      console.log(`Old file deleted: ${oldLogoPath}`);
    }

    const { filename } = req.file;
    const newLogoPath = `${logoUploadDir}/${filename}`;

    await prisma.page.update({
      where: {
        id: 1,
      },
      data: {
        logo: newLogoPath,
      },
    });

    res.status(200).json({
      message: "Logo updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading file and updating logo",
      error: error.message,
    });
  }
};

// Controller to handle uploading the hero page image
const uploadHeroImage = async (req, res) => {
  try {
    const result = await prisma.page.findUnique({
      where: {
        id: 1,
      },
    });

    if (!result) {
      return res.status(404).json({ message: "Page not found" });
    }

    const oldLogoPath = result.heroImage;

    if (oldLogoPath && fs.existsSync(oldLogoPath)) {
      await unlinkAsync(oldLogoPath);
      console.log(`Old file deleted: ${oldLogoPath}`);
    }

    const { filename } = req.file;
    const newHeroImagePath = `${heroUploadDir}/${filename}`;

    await prisma.page.update({
      where: {
        id: 1,
      },
      data: {
        heroImage: newHeroImagePath,
      },
    });

    res.status(200).json({
      message: "Logo updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading file and updating logo",
      error: error.message,
    });
  }
};

// Controller to fetch the current logo
const getPageLogo = async (req, res) => {
  try {
    const response = await prisma.page.findUnique({
      where: {
        id: 1,
      },
      select: {
        logo: true,
      },
    });

    res.status(200).json(response.logo);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching logo",
      error: error.message,
    });
  }
};

// Controller to fetch the hero image
const getHeroImage = async (req, res) => {
  try {
    const response = await prisma.page.findUnique({
      where: {
        id: 1,
      },
      select: {
        heroImage: true,
      },
    });

    res.status(200).json(response.heroImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching logo",
      error: error.message,
    });
  }
};

const getNavbarImages = async (req, res) => {
  try {
    const response = await prisma.navbarImages.findMany();

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching navbar images",
      error: error.message,
    });
  }
}

const postNavbarImages = async (req, res) => {
  try {
    const { filename } = req.file;
    const newImagePath = `${navbarUploadDir}/${filename}`;

    const newImage = await prisma.navbarImages.create({
      data: {
        image: newImagePath,
      },
    });

    res.status(201).json({
      message: "Navbar image uploaded successfully",
      data: newImage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching navbar images",
      error: err.message,
    })
  }
}

const putNavbarImages = async (req, res) => {
  try {
    const { id } = req.params;
    const { filename } = req.file;
    const newImagePath = `${navbarUploadDir}/${filename}`;

    const updatedImage = await prisma.navbarImages.update({
      where: {
        id: parseInt(id),
      },
      data: {
        image: newImagePath,
      },
    });

    res.status(200).json({
      message: "Navbar image updated successfully",
      data: updatedImage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error updating navbar images",
      error: err.message,
    });
  }
}

module.exports = {
  uploadPageLogo,
  getPageLogo,
  getHeroImage,
  uploadHeroImage,
  getNavbarImages,
  postNavbarImages,
  putNavbarImages,
};
