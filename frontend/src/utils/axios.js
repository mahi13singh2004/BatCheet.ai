import axios from "axios"

const axiosInstance=axios.create({
    baseURL:"https://batcheet-ai-backend.onrender.com",
    withCredentials:true,
})

export default axiosInstance