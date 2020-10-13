import http from "../http-common";

const getAll = () => {
    return http.get("/");
};

const get = id => {
    return http.get(`/edit-employee/${id}`);
};

const create = data => {
    return http.post("/create-employee", data);
};

const update = (id, data) => {
    return http.put(`/update-employee/${id}`, data);
};

const remove = id => {
    return http.delete(`/delete-employee/${id}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove
};