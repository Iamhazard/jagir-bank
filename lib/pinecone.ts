 
 import { Pinecone } from '@pinecone-database/pinecone';

 const apiKey=process.env.PINECONE_API_KEY;
const environment= process.env.PINECONE_ENVIRONMENT

 if(!apiKey){
    throw Error("PINECONE_API_KEY is not a key")
 }



const pinecone = new Pinecone({
apiKey,

});


export const jobsIndex=pinecone.Index("jagirbank")