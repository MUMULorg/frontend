import axios from "axios";

export const getReceivedComment = async (spaceId) => {
    try {
    const path = `https://api-mumul.site/spaces/${spaceId}/received/get`;

 
        const response = await axios.get(`https://api-mumul.site/spaces/${spaceId}/received/get`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });

        return response.data;
    } catch (e) {
        console.error('Error retrieving received comments:', e.message);
        return false;
    }
};
