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