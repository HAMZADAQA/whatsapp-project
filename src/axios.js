import axios from 'axios';

const instance =axios.create({
    baseURL: "https://whats-backend.herokuapp.com",
})

export default instance;