export const getClientProfile=async(userId: any)=>{

    try {
        const response = await fetch(`/api/profile/clientProfile/${userId}}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
    } catch (error) {
        
    }
}