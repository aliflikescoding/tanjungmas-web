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
    const navbarImages = response.data.map(item => ({
      ...item,
      image: item.image.replace(/^\.\/public/, "http://localhost:5000")
    }));
    return navbarImages;
  } catch (err) {
    throw new Error(err);
  }
}
