import api from "@/lib/api";

export const getAllUsers = async () => {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch (error) {
    console.error(error?.response?.data?.error);
    return { error: error?.response.data?.error || "something happened" };
  }
};
