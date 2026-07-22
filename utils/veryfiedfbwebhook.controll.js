const VERIFY_TOKEN = "myverifytoken"; 


const veryfiedfbwebhook =(req,res)=>{
  console.log("Incoming Webhook verification request");
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified!");
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  } else {
    return res.sendStatus(400); // Bad Request
  }

}

export default veryfiedfbwebhook;