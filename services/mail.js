const request = require('request');

const mailer =async(nnameeame,email,otp)=>{
  const yy=request.post('https://script.google.com/macros/s/AKfycbw737wxBwy3YA4tu4Ql4lahfDQW8fqGA2TdfN8dn-omyTdtrlSsM-MNHrKQJNL70wI/exec').form({
    name: nnameeame,
    otp: otp,
    email:email
  });
  console.log(yy.body);
}
module.exports = mailer;