const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const util = require("util");

const prisma = new PrismaClient();
const unlinkAsync = util.promisify(fs.unlink);

const uploadDir = "./public/page/logo";

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
    const newLogoPath = `${uploadDir}/${filename}`;

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

module.exports = { uploadPageLogo, getPageLogo, getHeroImage };
