import { customAxios } from "./../customAxios";

export const deleteAnswer = async (spaceId, answerId, userId) => {
    const path = `/spaces/${spaceId}/${answerId}/${userId}/answer/delete`;

    try {
        const response = await customAxios.delete(
          path,{         
            data:{
                userId: userId,
                spaceId: spaceId,
                answerId: answerId
              },
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
              },
          }
      );

        return response.data;
    } catch (e) {
        console.error('Error deleting answer:', e.message);
        return false;
    }
};
