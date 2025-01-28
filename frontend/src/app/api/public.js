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
    throw new Error(err);
  }
};

export const getFasilitasCategoryBasedOnId = async (id) => {
  try {
    const response = await api.get(`/tentang/fasilitas-category/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getFasilitasPreviewBasedOnCategoryId = async (id) => {
  try {
    const response = await api.get(
      `/tentang/fasilitas-category/${id}/fasilitas/preview`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getFasiliitasBasedOnId = async (id) => {
  try {
    const response = await api.get(`/tentang/fasilitas/${id}`);

    // Replace /public with http://localhost:5000/public in fasilitasImages
    const updatedFasilitasImages = response.data.fasilitasImages.map(
      (image) => {
        return {
          ...image,
          img: image.img.replace(/^\/public/, "http://localhost:5000"),
        };
      }
    );
  
    return {
      ...response.data,
      fasilitasImages: updatedFasilitasImages,
    };
  } catch (err) {
    throw new Error(err);
  }
};

export const getSarana = async () => {
  try {
    const response = await api.get("/tentang/sarana");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}
