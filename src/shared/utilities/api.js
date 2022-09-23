import axios from "axios";


export default axios.create({
    baseURL: 'http://localhost:3000/reminders',
    headers:{
        "Content-type": "application/json",
    },
})