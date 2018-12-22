//The client information function is made for getting values from database
function clientInfo(clientName, clientJob, clientWords){
    this.name = clientName;
    this.job = clientJob;
    this.words = clientWords;
}

let clientWords = `Nubia Design really helped me get my own e-commerce brand, logos, website custom pictures, and very nice other services. Nubia Team are awesome and I truly like'em, for so far they are my Designers`;

//Create a new clients objects from clientInfo constructor 
const client1 = new clientInfo('Mr. Khalid', 'Developer', clientWords)
const client2 = new clientInfo('Mr. Ahmed', 'CEO', clientWords)
const client3 = new clientInfo('Mr. Ali', 'CEO', clientWords)

//Exporting the module objects
module.exports = {
    clientInfo_1: client1,
    clientInfo_2: client2,
    clientInfo_3: client3
}