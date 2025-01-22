const express = require("express");
const multer = require("multer");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const port = process.env.port || 5000;
const fs = require("fs");
const util = require("util");

const prisma = new PrismaClient();
const unlinkAsync = util.promisify(fs.unlink);

const uploadDir = "./public/page/logo";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileNameWithDashes = file.originalname.replace(/\s+/g, "-");
    cb(null, fileNameWithDashes);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadPageImageMiddleware = (req, res, next) => {
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB in bytes
    },
  }).single("logo");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File size too large. Maximum size is 10MB",
        });
      }
      return res.status(400).json({
        message: "Error uploading file",
        error: err.message,
      });
    } else if (err) {
      return res.status(400).json({
        message: "Error uploading file",
        error: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Invalid file type. File must be jpg, jpeg, or png",
      });
    }

    next();
  });
};

const app = express();
app.use(express.json());

app.post("/page/logo", uploadPageImageMiddleware, async (req, res) => {
  try {
    // Fetch the page data using Prisma
    const result = await prisma.page.findUnique({
      where: {
        id: 1,
      },
    });

    // If no page was found, return 404 error
    if (!result) {
      return res.status(404).json({ message: "Page not found" });
    }

    // Get the old logo path
    const oldLogoPath = result.logo;

    // If the old logo exists, delete it
    if (oldLogoPath && fs.existsSync(oldLogoPath)) {
      await unlinkAsync(oldLogoPath);
      console.log(`Old file deleted: ${oldLogoPath}`);
    }

    // Get the new logo path from the uploaded file
    const { filename } = req.file;
    const newLogoPath = `${uploadDir}/${filename}`;

    // Update the logo in the database
    const updateResult = await prisma.page.update({
      where: {
        id: 1,
      },
      data: {
        logo: newLogoPath,
      },
    });

    // Send success response
    res.status(200).json({
      message: `Logo updated successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading file and updating logo",
      error: error.message,
    });
  }
});

app.get("/page/logo", async (req, res) => {
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
    res
      .status(500)
      .json({ message: "Error fetching logo", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
