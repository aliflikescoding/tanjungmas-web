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
}

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
}

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
}
