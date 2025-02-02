import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export const login = async (username, password) => {
  try {
    const response = await api.post("/login", { username, password });
    return response; // No need to set the cookie in the front-end
  } catch (err) {
    throw new Error(err);
  }
};

export const auth = async () => {
  try {
    const response = await api.post("/auth");
    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    if (err.response && err.response.status === 401) {
      return false;
    } else {
      console.error(err);
      return false;
    }
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/logout");
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const getLogo = async () => {
  try {
    const response = await api.get("/page/logo");
    const logoPath = response.data.replace(
      /^\.\/public/,
      "http://localhost:5000"
    );
    return logoPath;
  } catch (err) {
    throw new Error(err);
  }
};

export const getHeroImage = async () => {
  try {
    const response = await api.get("/page/hero");
    const heroImagePath = response.data.replace(
      /^\.\/public/,
      "http://localhost:5000"
    );
    return heroImagePath;
  } catch (err) {
    throw new Error(err);
  }
};

export const getNavbarImages = async () => {
  try {
    const response = await api.get("/page/navbar");
    const navbarImages = response.data.map((item) => ({
      ...item,
      image: item.image.replace(/^\.\/public/, "http://localhost:5000"),
    }));
    return navbarImages;
  } catch (err) {
    throw new Error(err);
  }
};

export const getInfoImages = async () => {
  try {
    const response = await api.get("/page/info");
    const infoimages = response.data.map((item) => ({
      ...item,
      image: item.image.replace(/^.*\.\/public/, "http://localhost:5000"),
    }));
    return infoimages;
  } catch (err) {
    throw new Error(err);
  }
};

export const getFooterImages = async () => {
  try {
    const response = await api.get("/page/footer");
    const infoimages = response.data.map((item) => ({
      ...item,
      image: item.image.replace(/^.*\.\/public/, "http://localhost:5000"),
    }));
    return infoimages;
  } catch (err) {
    throw new Error(err);
  }
};

export const getBigImage = async () => {
  try {
    const response = await api.get("/tentang/big");
    const heroImagePath = response.data.replace(
      /^\.\/public/,
      "http://localhost:5000"
    );
    return heroImagePath;
  } catch (err) {
    throw new Error(err);
  }
};

export const getSmallImage = async () => {
  try {
    const response = await api.get("/tentang/small");
    const smallImagePath = response.data.replace(
      /^\.\/public/,
      "http://localhost:5000"
    );
    return smallImagePath;
  } catch (err) {
    throw new Error(err);
  }
};

export const getVisi = async () => {
  try {
    const response = await api.get("/tentang/visi");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getMisi = async () => {
  try {
    const response = await api.get("/tentang/misi");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getStruktur = async () => {
  try {
    const response = await api.get("/tentang/struktur");
    const strukturPath = response.data.replace(
      /^\.\/public/,
      "http://localhost:5000"
    );
    return strukturPath;
  } catch (err) {
    throw new Error(err);
  }
};

export const getFasilitasCategory = async () => {
  try {
    const response = await api.get("/tentang/fasilitas-category");
    return response.data;
  } catch (err) {
    console.error("Failed to fetch fasilitas categories:", err);
    throw err;
  }
};


export const getFasilitasCategoryBasedOnId = async (id) => {
  try {
    const response = await api.get(`/tentang/fasilitas-category/${id}`);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch fasilitas category:", err);
    throw err;
  }
};

export const getFasilitasPreviewBasedOnCategoryId = async (id) => {
  try {
    const response = await api.get(
      `/tentang/fasilitas-category/${id}/fasilitas/preview`
    );

    // Replace /public with http://localhost:5000 in images for each fasilitas item
    const updatedFasilitasPreview = response.data.map((fasilitas) => {
      if (
        fasilitas.fasilitasImages &&
        Array.isArray(fasilitas.fasilitasImages)
      ) {
        return {
          ...fasilitas,
          fasilitasImages: fasilitas.fasilitasImages.map((image) => ({
            ...image,
            img: image.img.replace(/^\/public/, "http://localhost:5000"),
          })),
        };
      }
      return fasilitas;
    });

    console.log(
      "Updated Fasilitas Preview by Category ID:",
      updatedFasilitasPreview
    );
    return updatedFasilitasPreview;
  } catch (err) {
    console.error("Failed to fetch fasilitas preview by category:", err);
    throw err;
  }
};


export const getFasilitasBasedOnId = async (id) => {
  try {
    const response = await api.get(`/tentang/fasilitas/${id}`);

    // Replace /public with http://localhost:5000 in fasilitasImages
    const updatedFasilitasImages = response.data.fasilitasImages.map(
      (image) => ({
        ...image,
        img: image.img.replace(/^\/public/, "http://localhost:5000"),
      })
    );

    const updatedResponse = {
      ...response.data,
      fasilitasImages: updatedFasilitasImages,
    };

    console.log("Updated Fasilitas by ID:", updatedResponse);
    return updatedResponse;
  } catch (err) {
    console.error("Failed to fetch fasilitas by ID:", err);
    throw err;
  }
};


export const getSarana = async () => {
  try {
    const response = await api.get("/tentang/sarana");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getPrasarana = async () => {
  try {
    const response = await api.get("/tentang/prasarana");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getDataMonografi = async () => {
  try {
    const response = await api.get("/tentang/data-monografi");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getSdm = async () => {
  try {
    const response = await api.get("/tentang/sdm");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getRegulasi = async () => {
  try {
    const response = await api.get("/tentang/regulasi");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// layanan category
export const getLayananCategory = async () => {
  try {
    const response = await api.get("/layanan/category");
    return response.data;
  } catch (err) {}
};

export const getLayananCategoryBasedOnId = async (id) => {
  try {
    const response = await api.get(`/layanan/category/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getLayananBlogPreviewBasedOnCategoryId = async (id) => {
  try {
    const response = await api.get(`/layanan/category/${id}/blog/preview`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getLayananBlogBasedOnId = async (id) => {
  try {
    const response = await api.get(`/layanan/blog/${id}`);

    // Replace /public with http://localhost:5000/public in fasilitasImages
    const updatedImages = response.data.images.map((image) => {
      return {
        ...image,
        img: image.img.replace(/^\/public/, "http://localhost:5000"),
      };
    });

    const updatedResponse = {
      ...response.data,
      images: updatedImages,
    };

    return updatedResponse;
  } catch (err) {
    throw new Error(err);
  }
};

export const getLayananText = async () => {
  try {
    const response = await api.get(`/layanan/text`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getLayananTextBasedOnId = async (id) => {
  try {
    const response = await api.get(`/layanan/text/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export const getLayananTextBasedOnCategoryId = async (id) => {
  try {
    const response = await api.get(`/layanan/category/${id}/text/preview`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// info category
// Get All Info Categories
export const getInfoCategory = async () => {
  try {
    const response = await api.get("/info/category");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// Get Info Category by ID
export const getInfoCategoryBasedOnId = async (id) => {
  try {
    const response = await api.get(`/info/category/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// info blog
// Get Info Blog by ID
export const getInfoBlogBasedOnId = async (id) => {
  try {
    const response = await api.get(`/info/blog/${id}`);

    // Replace /public with http://localhost:5000/public in infoBlogImages
    const updatedImages = response.data.images.map((image) => {
      return {
        ...image,
        img: image.img.replace(/^\/public/, "http://localhost:5000"),
      };
    });

    const updatedResponse = {
      ...response.data,
      images: updatedImages,
    };

    return updatedResponse;
  } catch (err) {
    throw new Error(err);
  }
};

// Get Info Blog Preview
export const getInfoBlogPreview = async () => {
  try {
    const response = await api.get("/info/blog/preview");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// Get Info Blog Preview by Category ID
export const getInfoBlogPreviewBasedOnCategoryId = async (id) => {
  try {
    const response = await api.get(`/info/category/${id}/blog/preview`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// info text
// Get All Info Texts
export const getInfoText = async () => {
  try {
    const response = await api.get("/info/text");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// Get Info Text by ID
export const getInfoTextBasedOnId = async (id) => {
  try {
    const response = await api.get(`/info/text/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// Get Info Text Preview by Category ID
export const getInfoTextPreviewBasedOnCategoryId = async (id) => {
  try {
    const response = await api.get(`/info/category/${id}/text/preview`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// Fetch all berita categories
export const getBeritaCategories = async () => {
  try {
    const response = await api.get("/berita/category");
    return response.data;
  } catch (err) {
    console.error("Failed to fetch berita categories:", err);
    throw err;
  }
};

// Fetch a single berita category by ID
export const getBeritaCategoryById = async (id) => {
  try {
    const response = await api.get(`/berita/category/${id}`);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch berita category:", err);
    throw err;
  }
};

// Fetch all berita
export const getAllBerita = async () => {
  try {
    const response = await api.get("/berita");
    return response.data;
  } catch (err) {
    console.error("Failed to fetch berita:", err);
    throw err;
  }
};

// Fetch berita preview
export const getBeritaPreview = async () => {
  try {
    const response = await api.get("/berita/preview");

    // Replace /public with http://localhost:5000 in images for each berita item
    const updatedBeritaPreview = response.data.map((berita) => ({
      ...berita,
      images: berita.images.map((image) => ({
        ...image,
        img: image.img.replace(/^\/public/, "http://localhost:5000"),
      })),
    }));

    return updatedBeritaPreview;
  } catch (err) {
    console.error("Failed to fetch berita preview:", err);
    throw err;
  }
};

// Fetch a single berita by ID
export const getBeritaById = async (id) => {
  try {
    const response = await api.get(`/berita/${id}`);

    // Replace /public with http://localhost:5000 in images
    const updatedImages = response.data.images.map((image) => {
      return {
        ...image,
        img: image.img.replace(/^\/public/, "http://localhost:5000"),
      };
    });

    const updatedResponse = {
      ...response.data,
      images: updatedImages,
    };

    return updatedResponse;
  } catch (err) {
    console.error("Failed to fetch berita:", err);
    throw err;
  }
};

// Fetch berita by category
export const getBeritaByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/berita/category/${categoryId}/blog`);

    // Replace /public with http://localhost:5000 in images for each berita item
    const updatedBerita = response.data.map((berita) => ({
      ...berita,
      images: berita.images.map((image) => ({
        ...image,
        img: image.img.replace(/^\/public/, "http://localhost:5000"),
      })),
    }));

    return updatedBerita;
  } catch (err) {
    console.error("Failed to fetch berita by category:", err);
    throw err;
  }
};

// Fetch berita preview by category
export const getBeritaPreviewByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/berita/category/${categoryId}/blog/preview`);

    // Replace /public with http://localhost:5000 in images for each berita item
    const updatedBeritaPreview = response.data.map((berita) => ({
      ...berita,
      images: berita.images.map((image) => ({
        ...image,
        img: image.img.replace(/^\/public/, "http://localhost:5000"),
      })),
    }));

    return updatedBeritaPreview;
  } catch (err) {
    console.error("Failed to fetch berita preview by category:", err);
    throw err;
  }
};

// Fetch berita preview
export const getFasilitasPreview = async () => {
  try {
    const response = await api.get("/tentang/fasilitas/preview");

    // Replace /public with http://localhost:5000 in images for each fasilitas item
    const updatedFasilitasPreview = response.data.map((fasilitas) => {
      // Check if fasilitasImages exists and is an array
      if (
        fasilitas.fasilitasImages &&
        Array.isArray(fasilitas.fasilitasImages)
      ) {
        return {
          ...fasilitas,
          fasilitasImages: fasilitas.fasilitasImages.map((image) => ({
            ...image,
            img: image.img.replace(/^\/public/, "http://localhost:5000"),
          })),
        };
      }
      // If fasilitasImages is not an array, return the original fasilitas object
      return fasilitas;
    });

    console.log(updatedFasilitasPreview);

    return updatedFasilitasPreview;
  } catch (err) {
    console.error("Failed to fetch fasilitas preview:", err);
    throw err;
  }
};