import axios from "axios"

const GetUderDataAndAllMassage = async(senderId)=>{
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN
 try {
        
   const customerId = senderId;

   // Facebook Graph API থেকে conversation পাওয়া
    const conversationUrl = `https://graph.facebook.com/v18.0/me/conversations`;
    const conversationResponse = await axios.get(conversationUrl, {
        params: {access_token: ACCESS_TOKEN,fields: 'participants,messages{message,from,created_time,attachments}'}
    });

    // নির্দিষ্ট customer এর conversation খুঁজে বের করা
        const conversations = conversationResponse.data.data;
        let targetConversation = null;
        let basicuserdata ;

    for (let conversation of conversations) {
        const participants = conversation.participants.data;
        const hasCustomer = participants.some(p => p.id === customerId);
        basicuserdata =conversation.participants.data.filter(p=>p.id ==customerId) 
        
        if (hasCustomer) {
            targetConversation = conversation;
            break;
        }
    }

    // Conversation এর সব messages পাওয়া
        const messagesUrl = `https://graph.facebook.com/v18.0/${targetConversation.id}/messages`;
        const messagesResponse = await axios.get(messagesUrl, {
            params: {
              access_token: ACCESS_TOKEN,
              fields: 'message,from,created_time,attachments',
              limit: 100
            }
        });


    return {Allmessage:messagesResponse.data.data.reverse(), userDatabyfbapi:basicuserdata}

    } catch (error) {
         console.log({Erro:"Get Error for Get User Convertion", error:error, path:"'/api/GetUderDataAndAllMassage'"})
    }

}
export default GetUderDataAndAllMassage;