const axios = require('axios');

async function cartAbandonado(shopifydata) {
  // Asegúrate de que los datos sean correctos y no envíes arrays innecesarios
  console.log(shopifydata);
  let data = JSON.stringify([
    {
      "id": shopifydata.id,
      "name":shopifydata.first_name,
      "last_name":shopifydata.last_name, 
      "email":shopifydata.email,
      "price":shopifydata.price,
      "phone":shopifydata.phone
    }
  ]);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://rickprogram.kommo.com/api/v4/leads',
    headers: { 
      'Accept': 'text/plain', 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjFlNTU0YWYyMGY5ODk1M2UxMGVkNWViYmJiZTRiZGJlMmY1MjhmYjdiMTg2OTY1M2E0ODIwNmU4YTkyYjFiN2VjYzY4MzEwYjQ3ZTEyZDAxIn0.eyJhdWQiOiJkM2ZjOTAxMS0yMTQ3LTRkNmItYjE2Ni1kYzEyMTlmMTE5MTciLCJqdGkiOiIxZTU1NGFmMjBmOTg5NTNlMTBlZDVlYmJiYmU0YmRiZTJmNTI4ZmI3YjE4Njk2NTNhNDgyMDZlOGE5MmIxYjdlY2M2ODMxMGI0N2UxMmQwMSIsImlhdCI6MTcxNTU0NjI4NSwibmJmIjoxNzE1NTQ2Mjg1LCJleHAiOjE3NTUzMDI0MDAsInN1YiI6IjExMjkyOTk5IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMyODc4Nzc1LCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiNzg5OGUxNWItYTRhZC00ODhlLWI5NDEtYjJmZDAyYjAxYzFjIn0.V8EOsbg3J_Kvr7eXPQh5XkZ7lDoYHvWyCsmLhiblFnHT9Be9plM5eaWRK9YDJCDGq7eRMJseZ2t6TMY4jyNa2sdezEaJdr8iMz4i9J2l6ubgYSMXRaNoGeF6BP2VTaM0hBNUIdAzVIlHiGXJ5Sn3MIWzhhr4d4x-sJSPIECFRyUSshw0WGPRHQq5bqe74QVynJZKTXqLfojy4oNKklPIrld0mu6itVHIzTJ7BZPvANIUlloQx-3IvobdH8XCddJDvmKDCcNQhJxdx9F7m71YMFiHF-Vm7ck-CUJisXzLhcw69z8s4a4_E4Tm6RLMg48Jnd2l7aMcL0HV8D75PO_ptw', 
      'Cookie': 'session_id=niqbv38imhrgc5hm5ec5a4fruq; user_lang=en'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}  
module.exports = {
  cartAbandonado
};
