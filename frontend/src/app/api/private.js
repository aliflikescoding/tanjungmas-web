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

export const updateLogo = async (file) => {
  const formData = new FormData();
  formData.append("logo", file);

  try {
    const response = await api.post("/page/logo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Adjust based on backend response format
  } catch (err) {
    console.error("Failed to upload logo:", err);
    throw err;
  }
};

export const updateHeroImage = async (file) => {
  const formData = new FormData();
  formData.append("heroImage", file);

  try {
    const response = await api.post("/page/hero", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Adjust based on backend response format
  } catch (err) {
    console.error("Failed to upload logo:", err);
    throw err;
  }
};

// navbar
export const createNavbarImage = async (file) => {
  const formData = new FormData();
  formData.append("navbarImage", file);

  try {
    const response = await api.post("/page/navbar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Adjust based on backend response format
  } catch (err) {
    console.error("Failed to upload logo:", err);
    throw err;
  }
};

export const deleteNavbarImage = async (id) => {
  try {
    const response = await api.delete(`/page/navbar/${id}`);
    return response;
  } catch (err) {
    console.error("Failed to upload logo:", err);
    throw err;
  }
};

// info images
export const createInfoImage = async (file) => {
  const formData = new FormData();
  formData.append("infoImage", file);

  try {
    const response = await api.post("/page/info", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Adjust based on backend response format
  } catch (err) {
    console.error("Failed to upload logo:", err);
    throw err;
  }
};

export const deleteInfoImage = async (id) => {
  try {
    const response = await api.delete(`/page/info/${id}`);
    return response;
  } catch (err) {
    console.error("Failed to upload logo:", err);
    throw err;
  }
};

export const createFooterImage = async (file) => {
  const formData = new FormData();
  formData.append("footerImage", file);

  try {
    const response = await api.post("/page/footer", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Adjust based on backend response format
  } catch (err) {
    console.error("Failed to upload logo:", err);
    throw err;
  }
};

export const deleteFooterImage = async (id) => {
  try {
    const response = await api.delete(`/page/footer/${id}`);
    return response;
  } catch (err) {
    console.error("Failed to upload logo:", err);
    throw err;
  }
};

export const updateBigImage = async (file) => {
  const formData = new FormData();
  formData.append("bigImage", file);

  try {
    const response = await api.post("/tentang/big", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Adjust based on backend response format
  } catch (err) {
    console.error("Failed to upload logo:", err);
    throw err;
  }
};

export const updateSmallImage = async (file) => {
  const formData = new FormData();
  formData.append("smallImage", file);

  try {
    const response = await api.post("/tentang/small", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Adjust based on backend response format
  } catch (err) {
    console.error("Failed to upload logo:", err);
    throw err;
  }
};

// visi
export const updateVisi = async (visi) => {
  try {
    const response = await api.put("/tentang/visi", { visi });
    return response.data; // Adjust based on backend response format
  } catch (err) {
    console.error("Failed to update visi:", err);
    throw err;
  }
};

// misi
export const createMisi = async (title) => {
  try {
    const response = await api.post("/tentang/misi", { title }); // Use 'title' instead of 'misi'
    return response.data; // Adjust based on backend response format
  } catch (err) {
    console.error("Failed to create misi:", err); // Updated error message for clarity
    throw err;
  }
};

export const deleteMisi = async (id) => {
  try {
    const response = await api.delete(`/tentang/misi/${id}`);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

// struktur
export const updateStruktur = async (file) => {
  const formData = new FormData();
  formData.append("strukturImage", file);

  try {
    const response = await api.post("/tentang/struktur", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Adjust based on backend response format
  } catch (err) {
    console.error("Failed to upload logo:", err);
    throw err;
  }
};

// fasilitas category
export const createFasilitasCategory = async (title) => {
  try {
    const response = await api.post("/tentang/fasilitas-category", { title }); // Use 'title' instead of 'misi'
    return response.data; // Adjust based on backend response format
  } catch (err) {
    console.error("Failed to create misi:", err); // Updated error message for clarity
    throw err;
  }
};

export const deleteFasilitasCategory = async (id) => {
  try {
    const response = await api.delete(`/tentang/fasilitas-category/${id}`);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateFasilitasCategory = async (title, id) => {
  try {
    const response = await api.put(`/tentang/fasilitas-category/${id}`, {
      title,
    }); // Use 'title' instead of 'misi'
    return response.data; // Adjust based on backend response format
  } catch (err) {
    console.error("Failed to create misi:", err); // Updated error message for clarity
    throw err;
  }
};

// fasilitas (blog)
export const createFasilitas = async (formData) => {
  try {
    const response = await api.post(`/tentang/fasilitas`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateFasilitas = async (id, formData) => {
  try {
    const response = await api.put(`/tentang/fasilitas/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (err) {
    console.error(
      "Error updating fasilitas:",
      err.response?.data || err.message
    );
    throw err; // Don't wrap in new Error() as it loses the original error details
  }
};

export const deleteFasilitas = async (id) => {
  try {
    const response = await api.delete(`/tentang/fasilitas/${id}`);
    return response;
  } catch (err) {
    throw new Error(err);
  }
}

// sarana
export const createSarana = async (title) => {
  try {
    const response = await api.post("/tentang/sarana", { title }); // Use 'title' instead of 'sarana'
    return response.data; // Adjust based on backend response format
  } catch (err) {
    console.error("Failed to create sarana:", err); // Updated error message for clarity
    throw err;
  }
};

export const deleteSarana = async (id) => {
  try {
    const response = await api.delete(`/tentang/sarana/${id}`);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

// prasarana
export const createPrasarana = async (title) => {
  try {
    const response = await api.post("/tentang/prasarana", { title });
    return response.data;
  } catch (err) {
    console.error("Failed to create prasarana:", err);
    throw err;
  }
};

export const deletePrasarana = async (id) => {
  try {
    const response = await api.delete(`/tentang/prasarana/${id}`);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

// data monografi
export const createDataMonografi = async (title, link) => {
  try {
    const response = await api.post("/tentang/data-monografi", { title, link });
    return response.data;
  } catch (err) {
    console.error("Failed to create data monografi:", err);
    throw err;
  }
};

export const deleteDataMonografi = async (id) => {
  try {
    const response = await api.delete(`/tentang/data-monografi/${id}`);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

// In your api/private.js
export const updateDataMonografi = async (id, title, link) => {
  try {
    const response = await api.put(`/tentang/data-monografi/${id}`, {
      title,
      link,
    });
    return response.data;
  } catch (err) {
    console.error("Failed to update data monografi:", err);
    throw err;
  }
};

// sdm
export const updateSdm = async (sdm) => {
  try {
    const response = await api.put("/tentang/sdm", { sdm });
    return response.data;
  } catch (err) {
    console.error("Failed to update SDM:", err);
    throw err;
  }
};

// regulasi
export const updateRegulasi = async (regulasi) => {
  try {
    const response = await api.put("/tentang/regulasi", { regulasi });
    return response.data;
  } catch (err) {
    console.error("Failed to update Regulasi:", err);
    throw err;
  }
};

// layanan category
export const createLayananCategory = async (title) => {
  try {
    const response = await api.post("/layanan/category", { title }); // Use 'title' instead of 'misi'
    return response.data; // Adjust based on backend response format
  } catch (err) {
    console.error("Failed to create misi:", err); // Updated error message for clarity
    throw err;
  }
};

export const deleteLayananCategory = async (id) => {
  try {
    const response = await api.delete(`/layanan/category/${id}`);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateLayananCategory = async (title, id) => {
  try {
    const response = await api.put(`/layanan/category/${id}`, {
      title,
    }); // Use 'title' instead of 'misi'
    return response.data; // Adjust based on backend response format
  } catch (err) {
    console.error("Failed to create misi:", err); // Updated error message for clarity
    throw err;
  }
};

// layanan blog
export const createLayananBlog = async (formData) => {
  try {
    const response = await api.post(`/layanan/blog`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateLayananBlog = async (id, formData) => {
  try {
    const response = await api.put(`/layanan/blog/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (err) {
    console.error(
      "Error updating fasilitas:",
      err.response?.data || err.message
    );
    throw err; // Don't wrap in new Error() as it loses the original error details
  }
};

export const deleteLayananBlog = async (id) => {
  try {
    const response = await api.delete(`/layanan/blog/${id}`);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

// layanan text
export const deleteLayanantext = async (id) => {
  try {
    const response = await api.delete(`/layanan/text/${id}`);
    return response;
  } catch (err) {
    throw new Error(err);
  }
}

export const postLayananText = async (title, content, categoryId) => {
  try {
    const response = await api.post(
      `/layanan/text`,
      {
        title,
        content,
        categoryId,
      },
      {
        headers: {
          "Content-Type": "application/json", // Use JSON for sending plain text data
        },
      }
    );
    return response.data; // Return the response data
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to create blog"); // Handle errors
  }
};

export const updateLayananText = async (title, content, id) => {
  try {
    const response = await api.put(
      `/layanan/text/${id}`,
      {
        title,
        content,
      },
      {
        headers: {
          "Content-Type": "application/json", // Use JSON for sending plain text data
        },
      }
    );
    return response.data; // Return the response data
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update blog"); // Handle errors
  }
};
