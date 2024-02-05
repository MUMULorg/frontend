import axios from "axios";

export const getPSentComment = async (spaceId, page, pageSize) => {
    try {
    const path = `https://api-mumul.site/spaces/${spaceId}/sent/get?page=${page}&size=${pageSize}`;
    console.log(`spaceId는 ${spaceId}, page는 ${page} pageSize는 ${pageSize}`);

    if(spaceId ===''){
        console.log("spaceId null");
       
    }
    else if(page ===''){
        console.log("page null");
       
    }
    else if(pageSize===''){
        console.log("pageSize null");
      
    }
    else{
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