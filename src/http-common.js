import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:4000/employees",
    headers: {
        "Content-type": "application/json"
    }
});