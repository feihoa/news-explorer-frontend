import { MainApi } from "../api/MainApi.js";

export const mainApi = new MainApi({
  baseUrl: `https://api.news-explorer-pr.tk`,
  headers: {
    "Content-Type": "application/json",
  },
});
