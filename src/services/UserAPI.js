import APIClient from './APIClient';

var API = new APIClient();

const UserAPI = {
    Post: async (userObject) => {
        return await API.post(`/v1/User`,userObject);
    }
}

export default UserAPI;
