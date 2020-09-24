import APIClient from './APIClient';

var API = new APIClient();

const OrderAPI = {
    Save: async (orderObject, userId) => {
        return await API.post(`/v1/Order`,{
            userId: userId,
            orderMetaData: orderObject
        });
    },
    Get: async (userId) => {
        return await API.get(`/v1/Order/${userId}`);
    }
}

export default OrderAPI;