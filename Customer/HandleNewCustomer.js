import axios from 'axios'
import { Worker } from "worker_threads";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(`__dirname : ${__dirname}`)
const activeWorkers = new Map();


const HandleNewCustomer = async(senderId)=>{
  console.log('Call This Function HandleNewCustomer')
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN
  
  
  const worker = new Worker( path.resolve(__dirname, "./SendDressImageToNewCustomer.js"), { workerData: { senderId } });



  worker.on('message',async (data)=>{

    const massage = `দাম জানতে ড্রেসের ছবি/স্ক্রিনশট এবং বেবির বয়স বলুন।`
    if(data){
      try {
        const sendUrl = `https://graph.facebook.com/v18.0/me/messages`;
        await axios.post(sendUrl,{
          recipient: { id: senderId },
          message: { text: massage },
        },{ params: {access_token: ACCESS_TOKEN} } 
      )
      
    } catch (error) {
      console.log(error)
    }
  }
  
})


}
export default HandleNewCustomer;















  // let awaitforsendimag = await SendDressImageToNewCustomer(senderId)
  // const workerfotsendingimg = new Worker( `${__dirname}, "./../SendDressImageToNewCustomer.js`,  {workerData: { senderId }})



  // import SendDressImageToNewCustomer from "../../";
// ./SendDressImageToNewCustomer.js
// "../Customer/SendDressImageToNewCustomer.js"