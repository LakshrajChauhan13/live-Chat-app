
const getOrGenerateUserId = (): string => {
    const savedUserId = localStorage.getItem('userId')
    if(savedUserId){
        return savedUserId
    }
    
    const randomId = Math.random().toString(36) + Date.now().toString(36)
    const userId = "Anonymous-user-" + randomId.substring(3,10)
    localStorage.setItem("userId", userId)
    return userId;
}

export default getOrGenerateUserId;