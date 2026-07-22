import GetUderDataAndAllMassage from "../api/GetUserDataAllMass.api.js";
import HandleNewCustomer from "../Customer/HandleNewCustomer.js";

export const GetNewMassUserInfo = async (req, res)=>{
  const body = req.body;
  if (body.object === "page") {
    res.sendStatus(200);
    for (const entry of body.entry ?? []) {
      for (const event of entry?.messaging ?? []) {
        const senderId = event?.sender?.id;
        const pageId = event?.recipient?.id;
        console.log('event=====================================')

        























        if (senderId === pageId) {
          // console.log('Skipping message from bot itself');
          continue; // Skip this iteration
        }
        if (!event.message || (!event.message.text && !event.message.attachments)) {
          // console.log('Skipping non-message event');
          return 
        }

        // await HandleNewCustomer(senderId)


        if(senderId){
          const {Allmessage,userDatabyfbapi} = await GetUderDataAndAllMassage(senderId)
          if(Allmessage.length < 2  ){
            await HandleNewCustomer(senderId)
          }else{
            console.log(`Calling user is gnder male or female lenght < 10 `)
            const hasAttachment = Allmessage.some(msg => msg?.attachments);
            if(hasAttachment){
              console.log(`Calling user is gnder male or female lenght < 10 have attacement `)
              const found = Allmessage.some(msg => /বেবির বয়স কত\?/.test(msg.message));
              const askage2 = Allmessage.some(msg => /কত বছরের জন্য\?/.test(msg.message));
              const askage3 = Allmessage.some(msg => /বেবির বয়স\?/.test(msg.message));
              console.log('found',found)
              if (found || askage2 || askage3) {
                console.log('match tetx')
              }else{
                console.log(`text not match `)
                // await SendAiResPonseToAi(senderId, `বেবির বয়স কত?`);
                }
              }else{
                console.log(`Calling user is gnder male or female lenght < 10 no attacement `)
                await HandleNewCustomer(senderId)
              }
            }
          }

console.log('event End =====================================')




























      }
    }
  }
}