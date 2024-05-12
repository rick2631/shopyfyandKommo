const axios = require('axios');
 function addCustomers(shopifydata)  {


let data = JSON.stringify([
  {
    "name":shopifydata.first_name + " " + shopifydata.last_name,
    "email":shopifydata.email,
    "phone":shopifydata.phone,
    "created_by": 0
  }
]);

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://richartmend9.kommo.com/api/v4/customers',
  headers: { 
    'Accept': 'text/plain', 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI1NzJmZTE5YzE0NzM5NjE3ODgyMzY2NDI1N2NhMWM3OTI5YjUyMTM5NWZmMzU5ZDYyYTQyMTQ5YjkwYjQxOTllNWVjMjRlNDAxZjk4ZDA0In0.eyJhdWQiOiJmZjM1NDIzMi03Y2NmLTRkM2YtODM5YS1mYWI3ZjMwZjY4YWMiLCJqdGkiOiJiNTcyZmUxOWMxNDczOTYxNzg4MjM2NjQyNTdjYTFjNzkyOWI1MjEzOTVmZjM1OWQ2MmE0MjE0OWI5MGI0MTk5ZTVlYzI0ZTQwMWY5OGQwNCIsImlhdCI6MTcxNTIwNTMyMCwibmJmIjoxNzE1MjA1MzIwLCJleHAiOjE3MjkzODI0MDAsInN1YiI6IjExMjQ4NTQzIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMyODM1MjU1LCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMGY4ZTE3OTMtYmUyMC00MzZmLWE1MGEtY2U4NGRkMjM1NzJmIn0.n3LIof2C7U_bsp8pACEtv6Z8KYc2fHPiSPEDShoLar0jlPHzQlEqJFiMbApMlV5YgzvTM9_74N9whOco14dQh1BBAathNzO4uALziCJ5q5BUS4DYzd9g5ass98S4h7ZW6YXtz_RmsDVvrRlj0KqzMhTMjwJIsPLLTUxUXbpWrl3ndMXB7Yim7LyeMMW2PJWl7f6gTkptWAPc1hNvFQ_Xvp92SRkry7CwYQiO-6h9cu-bYcQCZFYFhOGy6N0uMQKxIcF4U1o0IDesf1wyCDwzST1yERbDJ_RpZpGgdA1g5N7Es4ywPlbITUqRBJuv8-eZu-rzZcaJqJtHcDuq6Yc0mg', 
    'Cookie': 'session_id=7iptthjg7i1chh4usu21g9im46; user_lang=en'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  return response.data
})
.catch((error) => {
  console.log(error);
});
}
module.exports = {
    addCustomers: addCustomers
};