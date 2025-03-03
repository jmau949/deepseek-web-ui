import { api } from "../api";
import { logError } from "../../utils/errorHandling";

export const getDeepseekAnswer = async ({ textInput }) => {
  try {
    console.log("textInput", textInput);
    const response = await api.post(
      "/api/v1/deepseek/getAnswer",
      { textInput },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    logError("Deepseek error", error);
    throw new Error(error.response?.data?.message || "deepseek error");
  }
};
