import axios from "axios";

export const getPSentComment = async (spaceId, page, pageSize) => {
    try {
    const path = `https://api-mumul.site/spaces/${spaceId}/sent/get?page=${page}&size=${pageSize}`;
    
    if(spaceId ==''||page ==''||pageSize==''){
        console.log("셋 중 하나 null");
        return false;
    }else{
        const response = await axios.get(`https://api-mumul.site/spaces/${spaceId}/sent/get?page=${page}&size=${pageSize}`,{
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
        });

        console.log("겟피센트코멘트 :" ,response.data);
        return response.data;
    }
    
    } catch(e) {
        console.error('Error retrieving sent comments:', e.message);
        return false;
    }
};