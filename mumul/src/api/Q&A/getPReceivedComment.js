import axios from "axios";

export const getPReceivedComment = async (spaceId, page, pageSize) => {
    try {
        const path = `https://api-mumul.site/spaces/${spaceId}/received/get?page=${page}&size=${pageSize}`;

        const response = await axios.get(`https://api-mumul.site/spaces/${spaceId}/received/get?page=${page}&size=${pageSize}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        console.log("get_p_received_com 응답데이터: ",response.data);
        return response.data;
    } catch (e) {
        console.error('Error retrieving received comments:', e.message);
        return false;
    }
};
