import api from "@/lib/api";

export const getMyProfile = async () => {
  try {
    const res = await api.get("/dashboard/me");
    return { userData: res.data.user || null };
  } catch (error) {
    console.error(error.response?.data?.error || error?.message);
    return { error: error.response?.data?.error };
  }
};
