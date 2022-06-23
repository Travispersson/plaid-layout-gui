
// TODO: add production variables
const prod = {}
   
const dev = {
    url: {
     API_URL: "http://localhost:5000"
    }
   };
   
   
export const config = process.env.NODE_ENV === "development" ? dev : prod;
