const request = require('request');

const mailer =async(nnameeame,email,otp)=>{
  const yy=request.post('https://script.google.com/macros/s/AKfycbzubKtKGR1IwivNDeF41KFLQLZUdBXRi4SB9_teGSxEQzECAJl0ARb8nekWy7PO6uA/exec').form({
    name: nnameeame,
    otp: otp,
    email:email
  });
  console.log(yy.body);
}
module.exports = mailer;