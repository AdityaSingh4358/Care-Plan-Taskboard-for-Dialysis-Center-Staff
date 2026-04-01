import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://care-plan-taskboard-for-dialysis-center.onrender.com',
})

export default axiosClient

