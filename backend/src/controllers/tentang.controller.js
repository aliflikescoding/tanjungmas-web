const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const util = require("util");

const prisma = new PrismaClient();
const unlinkAsync = util.promisify(fs.unlink);

const bigImageUploadDir = "./public/tentang/bigImage";
const smallImageloadDir = "./public/tentang/smallImage";
const strukturImageloadDir = "./public/tentang/struktur";

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

// controller to fetch misi
const getMisi = async (req, res) => {
  try {
    const response = await prisma.misi.findMany();

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching misi",
      error: error.message,
    });
  }
};

// controller to post misi
const postMisi = async (req, res) => {
  try {
    await prisma.misi.create({
      data: {
        title: req.body.title,
      },
    });

    res.status(200).json({
      message: "Misi added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding misi",
      error: error.message,
    });
  }
};

// controller to update misi
const updateMisi = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.misi.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: req.body.title,
      },
    });

    res.status(200).json({
      message: "Misi updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating misi",
      error: error.message,
    });
  }
};

// controller to delete misi
const deleteMisi = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.misi.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Misi deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting misi",
      error: error.message,
    });
  }
};

// Controller to handle uploading struktur image
const uploadStruktur = async (req, res) => {
  try {
    const result = await prisma.tentang.findUnique({
      where: {
        id: 1,
      },
    });

    if (!result) {
      return res.status(404).json({ message: "Tentang not found" });
    }

    const oldStrukturImagePath = result.strukturPemerintahImage;

    // Check if the old image file exists and delete it
    if (oldStrukturImagePath && fs.existsSync(oldStrukturImagePath)) {
      await unlinkAsync(oldStrukturImagePath); // Delete the old file, not the directory
      console.log(`Old file deleted: ${oldStrukturImagePath}`);
    }

    const { filename } = req.file;
    const newStrukturImagePath = `${strukturImageloadDir}/${filename}`;

    await prisma.tentang.update({
      where: {
        id: 1,
      },
      data: {
        strukturPemerintahImage: newStrukturImagePath,
      },
    });

    res.status(200).json({
      message: "Struktur image updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading file and updating struktur image",
      error: error.message,
    });
  }
};

// Controller to fetch the current small image
const getStruktur = async (req, res) => {
  try {
    const response = await prisma.tentang.findUnique({
      where: {
        id: 1,
      },
      select: {
        strukturPemerintahImage: true,
      },
    });

    res.status(200).json(response.strukturPemerintahImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching small image",
      error: error.message,
    });
  }
};

// Controller to get all fasilitas cateogry
const getFasilitasCategory = async (req, res) => {
  try {
    const response = await prisma.fasilitasCategory.findMany();

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching fasilitas category",
      error: error.message,
    });
  }
};

// controller to post fasilitas category
const postFasilitasCategory = async (req, res) => {
  try {
    await prisma.fasilitasCategory.create({
      data: {
        title: req.body.title,
      },
    });

    res.status(200).json({
      message: "Fasilitas category added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding fasilitas category",
      error: error.message,
    });
  }
};

// controller to update fasilitas category
const updateFasilitasCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.fasilitasCategory.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: req.body.title,
      },
    });

    res.status(200).json({
      message: "Fasilitas category updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating fasilitas category",
      error: error.message,
    });
  }
};

// controlelr to delete fasilitas category
const deleteFasilitasCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.fasilitasCategory.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Fasilitas category deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting fasilitas category",
      error: error.message,
    });
  }
};

// controller to get fasilitas cateogry based on id
const getFasilitasCategoryBasedOnId = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await prisma.fasilitasCategory.findUnique({
      where: {
        id: parseInt(id),
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

// controller to get all fasilitas
const getFasilitas = async (req, res) => {
  try {
    const response = await prisma.fasilitas.findMany({
      include: {
        fasilitasImages: true, // Include the related images
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

const getFasilitasPreview = async (req, res) => {
  try {
    const response = await prisma.fasilitas.findMany({
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

const getFasilitasBasedOnId = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await prisma.fasilitas.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        fasilitasImages: true, // Include the related images
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

// controller to get all fasilitas based on category
const getFasilitasByCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await prisma.fasilitas.findMany({
      where: {
        categoryId: parseInt(id),
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

const getFasilitasByCategoryPreview = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await prisma.fasilitas.findMany({
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


// controler to create fasilitas
const postFasilitas = async (req, res) => {
  try {
    const { title, sinopsis, content, categoryId } = req.body;

    // Create the fasilitas entry
    const fasilitas = await prisma.fasilitas.create({
      data: {
        title,
        sinopsis,
        content,
        categoryId: parseInt(categoryId),
      },
    });

    // If images are uploaded, link them to the fasilitas
    if (req.files && req.files.length > 0) {
      const imageRecords = req.files.map((file) => ({
        img: `/public/tentang/fasilitasImages/${file.filename}`, // Adjust path if needed
        fasilitasId: fasilitas.id, // Link to the created fasilitas
      }));

      // Save images in the fasilitas_images table
      await prisma.fasilitasImages.createMany({
        data: imageRecords,
      });
    }

    res.status(200).json({
      message: "Fasilitas and images added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding fasilitas",
      error: error.message,
    });
  }
};

// controler to update fasilitas
const putFasilitas = async (req, res) => {
  try {
    const { id } = req.params; // Get the Fasilitas ID from the URL params
    const { title, sinopsis, content, categoryId } = req.body;

    // Build the data object dynamically for partial updates
    const dataToUpdate = {};
    if (title) dataToUpdate.title = title;
    if (sinopsis) dataToUpdate.sinopsis = sinopsis;
    if (content) dataToUpdate.content = content;
    if (categoryId) dataToUpdate.categoryId = parseInt(categoryId);

    // Update the Fasilitas record
    const updatedFasilitas = await prisma.fasilitas.update({
      where: { id: parseInt(id) },
      data: dataToUpdate,
    });

    // Handle image updates if new files are uploaded
    if (req.files && req.files.length > 0) {
      // Map new images to the FasilitasImages format
      const newImages = req.files.map((file) => ({
        img: `/public/tentang/fasilitasImages/${file.filename}`, // Update path if needed
        fasilitasId: updatedFasilitas.id, // Link to the updated Fasilitas
      }));

      // Delete existing images if required (optional)
      await prisma.fasilitasImages.deleteMany({
        where: { fasilitasId: updatedFasilitas.id },
      });

      // Add new images to the database
      await prisma.fasilitasImages.createMany({
        data: newImages,
      });
    }

    res.status(200).json({
      message: "Fasilitas updated successfully",
      data: updatedFasilitas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating fasilitas",
      error: error.message,
    });
  }
};

// controler to delete fasilitas
const deleteFasilitas = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the fasilitas record
    await prisma.fasilitas.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      message: "Fasilitas deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting fasilitas",
      error: error.message,
    });
  }
};

// controller to fetch sarana
const getSarana = async (req, res) => {
  try {
    const response = await prisma.sarana.findMany();

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching sarana",
      error: error.message,
    });
  }
};

// controller to post sarana
const postSarana = async (req, res) => {
  try {
    await prisma.sarana.create({
      data: {
        title: req.body.title,
      },
    });

    res.status(200).json({
      message: "Sarana added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding sarana",
      error: error.message,
    });
  }
};

// controller to update sarana
const updateSarana = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.sarana.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: req.body.title,
      },
    });

    res.status(200).json({
      message: "Sarana updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating sarana",
      error: error.message,
    });
  }
};

// controller to delete sarana
const deleteSarana = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.sarana.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Sarana deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting sarana",
      error: error.message,
    });
  }
};

// controller to fetch dataMonografi
const getDataMonografi = async (req, res) => {
  try {
    const response = await prisma.dataMonografi.findMany();

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching data monografi",
      error: error.message,
    });
  }
};

// controller to create dataMonografi
const createDataMonografi = async (req, res) => {
  try {
    const { title, link } = req.body;

    await prisma.dataMonografi.create({
      data: {
        title,
        link,
      },
    });

    res.status(200).json({
      message: "Data Monografi created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating data monografi",
      error: error.message,
    });
  }
};

// controller to update dataMonografi
const updateDataMonografi = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.dataMonografi.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: req.body.title,
        link: req.body.link,
      },
    });

    res.status(200).json({
      message: "Data Monografi updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating data monografi",
      error: error.message,
    });
  }
};

// controller to delete data monografi
const deleteDataMonografi = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.dataMonografi.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Data Monografi deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting data monografi",
      error: error.message,
    });
  }
};

// Controller to fetch the current sdm
const getSdm = async (req, res) => {
  try {
    const response = await prisma.tentang.findUnique({
      where: {
        id: 1,
      },
      select: {
        sdm: true,
      },
    });

    res.status(200).json(response.sdm);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching sdm",
      error: error.message,
    });
  }
};

// Controller to update sdm
const updateSdm = async (req, res) => {
  try {
    await prisma.tentang.update({
      where: {
        id: 1,
      },
      data: {
        sdm: req.body.sdm,
      },
    });

    res.status(200).json({
      message: "SDM updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating sdm",
      error: error.message,
    });
  }
};

// Controller to fetch the current sdm
const getRegulasi = async (req, res) => {
  try {
    const response = await prisma.tentang.findUnique({
      where: {
        id: 1,
      },
      select: {
        regulasi: true,
      },
    });

    res.status(200).json(response.regulasi);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching regulasi",
      error: error.message,
    });
  }
};

// Controller to update sdm
const updateRegulasi = async (req, res) => {
  try {
    await prisma.tentang.update({
      where: {
        id: 1,
      },
      data: {
        regulasi: req.body.regulasi,
      },
    });

    res.status(200).json({
      message: "regulasi updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating regulasi",
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
};
