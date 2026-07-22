import axios from "axios";

const SendAiResPonseToAi = async(senderId,massage)=>{
 const ACCESS_TOKEN = process.env.ACCESS_TOKEN
  try {
    console.log('call Send Massage')
    const sendUrl = `https://graph.facebook.com/v18.0/me/messages`;
      await axios.post(sendUrl, {
        recipient: { id: senderId },
        message: { text: massage },
      }, {
      params: {access_token: ACCESS_TOKEN}
      });
  } catch (error) {
          console.log(error)
      }
}
export default SendAiResPonseToAi