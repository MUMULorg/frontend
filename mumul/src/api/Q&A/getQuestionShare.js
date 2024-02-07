import axios from "axios";

export const getQuestionShare = async (questionId) => {
    try {

        const response = await axios.get(`https://api-mumul.site/spaces/${questionId}/get`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });

        return response.data;
    } catch (e) {
        console.error('Error retrieving Comment to share :', e.message);
        return false;
    }
};
