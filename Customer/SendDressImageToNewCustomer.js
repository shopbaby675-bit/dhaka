// import axios from "axios";
// import fs from "fs";
// import FormData from "form-data";
// import path from "path";
// import { fileURLToPath } from "url";
// import { parentPort, workerData } from "worker_threads";
// console.log('its Collby by MuiltiTherd')



// ///// SENDING FUNCTION 
// const sendBatch = async (batch, customerId, ACCESS_TOKEN, __dirname) => {
//   const results = await Promise.allSettled(batch.map(async (filePath) => {
//     const imagePath = path.join(__dirname, filePath);
//     const uploadUrl = "https://graph.facebook.com/v18.0/me/message_attachments";
//     const formData = new FormData();

//     formData.append("message", JSON.stringify({
//       attachment: { type: "image", payload: { is_reusable: true } },
//     }));
//     formData.append("filedata", fs.createReadStream(imagePath));

//     const uploadRes = await axios.post(uploadUrl, formData, {
//       headers: formData.getHeaders(),
//       params: { access_token: ACCESS_TOKEN },
//       timeout: 30000,
//     });

//     const attachmentId = uploadRes.data.attachment_id;
//     const sendUrl = "https://graph.facebook.com/v18.0/me/messages";

//     await axios.post(sendUrl, {
//       recipient: { id: customerId },
//       message: { attachment: { type: "image", payload: { attachment_id: attachmentId } } },
//     }, { params: { access_token: ACCESS_TOKEN } });

//     console.log(`✅ পাঠানো হয়েছে: ${filePath}`);
//   }));

//   results.forEach((res, i) => {
//     if (res.status === "rejected") {
//       console.error(`❌ ${batch[i]} পাঠাতে সমস্যা:`, res.reason.response?.data || res.reason.message);
//     }
//   });
// };








// // const SendDressImageToNewCustomer = async (customerId) => {
//   const { senderId } = workerData;
//   customerId = senderId;
//   const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);

//   const imagePaths = [
//     "./img/1.png",
//     "./img/2.png",
//     "./img/3.png",
//     "./img/4.png",
//     "./img/5.png",
//     "./img/6.png",
//     "./img/7.png",
//     "./img/8.png",
//     "./img/9.jpg",
//     "./img/10.png",
//     "./img/11.png",
//     "./img/12.png",
//     "./img/13.png",
//     "./img/14.png",
//     "./img/15.png",
//     "./img/16.png",
//     "./img/17.png",
//     "./img/18.png",
//     "./img/20.png",
//     "./img/21.png",
//     "./img/22.png",
//   ];

//   const batchSize = 5; // প্রতি ব্যাচে ৫ টা পাঠাবে
//   for (let i = 0; i < imagePaths.length; i += batchSize) {
//     const batch = imagePaths.slice(i, i + batchSize);
//     await sendBatch(batch, customerId, ACCESS_TOKEN, __dirname);
//   }

//   console.log("🎉 সব ইমেজ ব্যাচ আকারে পাঠানো শেষ!");
//   parentPort.postMessage(true)
//   return true
// // };

// // SendDressImageToNewCustomer(workerData)
// // 
// // export default SendDressImageToNewCustomer;







  // return true
// };

// SendDressImageToNewCustomer(workerData)
// 
// export default SendDressImageToNewCustomer;










































////*******************************************************************************************************
// *************************************************************************************************** */



import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import path from "path";
import { fileURLToPath } from "url";
import { parentPort, workerData } from "worker_threads";
console.log('its Collby by MuiltiTherd')



///// SENDING FUNCTION 
const sendBatch = async (batch, customerId, ACCESS_TOKEN, __dirname) => {

  const results = await Promise.allSettled(batch.map(async (filePath) => {
    const imagePath = path.join(__dirname, filePath);



    const uploadUrl = "https://graph.facebook.com/v18.0/me/message_attachments";
    const formData = new FormData();
    
    formData.append("message", JSON.stringify({
      attachment: { type: "image", payload: { is_reusable: true } },
    }));
    formData.append("filedata", fs.createReadStream(imagePath));

    const uploadRes = await axios.post(uploadUrl, formData, {
      headers: formData.getHeaders(),
      params: { access_token: ACCESS_TOKEN },
      timeout: 30000,
    });

    const attachmentId = uploadRes.data.attachment_id;
    const sendUrl = "https://graph.facebook.com/v18.0/me/messages";

    await axios.post(sendUrl, {
      recipient: { id: customerId },
      message: { attachment: { type: "image", payload: { attachment_id: attachmentId } } },
    }, { params: { access_token: ACCESS_TOKEN } });

    console.log(`✅ পাঠানো হয়েছে: ${filePath} ${customerId}`);
  }));








  results.forEach((res, i) => {
    if (res.status === "rejected") {
      console.error(`❌ ${batch[i]} পাঠাতে সমস্যা:`, res.reason.response?.data || res.reason.message);
    }
  });





};










// const SendDressImageToNewCustomer = async (customerId) => {
  const { senderId } = workerData;
  let customerId = senderId;
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const imagePaths = [
    "./img/1.png",
    "./img/2.png",
    "./img/3.png",
    "./img/4.png",
    "./img/5.png",
    "./img/6.png",
    "./img/7.png",
    "./img/8.png",
    "./img/9.jpg",
    "./img/10.png",
    "./img/11.png",
    "./img/12.png",
    "./img/13.png",
    "./img/14.png",
    "./img/15.png",
    "./img/16.png",
    "./img/17.png",
    "./img/18.png",
    "./img/20.png",
    "./img/21.png",
    "./img/22.png",
  ];

  const batchSize = 5; // প্রতি ব্যাচে ৫ টা পাঠাবে
  const sentImages = new Set();

  for (let i = 0; i < imagePaths.length; i += batchSize) {
    const batch = imagePaths.slice(i, i + batchSize);
    await sendBatch(batch, customerId, ACCESS_TOKEN, __dirname);
  }

  console.log("🎉 সব ইমেজ ব্যাচ আকারে পাঠানো শেষ!");
  parentPort.postMessage(true)
  parentPort.close(); 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

