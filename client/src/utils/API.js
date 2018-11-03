import axios from "axios";

export default {


  scrape: () => axios.get("/api/articles/scrape"),

  getAllArticles: () => axios.get("/api/articles/"),

  getArticleById: articleId => axios.get(`/api/articles/${articleId}`),

  createNoteAndAssociateWithArticle: (articleId, data) => axios.post(`/api/articles/${articleId}`, data),

  removeArticle: id => axios.delete(`/api/article/${id}`),

  getSavedArticles: userId => axios.get(`/api/users/saved-article/${userId}`),

  addSavedArticle: (userId, data) => axios.put(`/api/users/saved-article/${userId}`, data),

  removeSavedArticle: (userId, data) => axios.put(`/api/users/saved-article/remove/${userId}`, data),

  getAllNotes: () => axios.get("/api/notes"),

  getNoteById: noteId => axios.get(`/api/notes/${noteId}`),

  removeNote: (articleId, data) => axios.put(`/api/articles/notes/${articleId}`, data)
};
