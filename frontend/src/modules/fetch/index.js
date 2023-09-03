import { instance } from "../axios/index";

async function registerUser(name, email, password) {
  try {
    const response = await instance.post("/register", {
      name,
      email,
      password,
    });
    console.log(response);
  } catch (error) {
    throw new Error(error.response || "something wrong");
  }
}

async function loginUser(email, password) {
  try {
    const response = await instance.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllBooks() {
  try {
    const response = await instance.get("/books");
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function getBookDetail(id) {
  try {
    const response = await instance.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function editBook(id, title, author, publisher, year, pages) {
  try {
    const response = await instance.put(`/books/${id}`, {
      title,
      author,
      publisher,
      year,
      pages,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteBook(id) {
  try {
    const response = await instance.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function createBook(formData) {
  try {
    const response = await instance.post("/books", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

export {
  getBookDetail,
  getAllBooks,
  registerUser,
  loginUser,
  editBook,
  deleteBook,
  createBook,
};
