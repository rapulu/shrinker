console.log("JS loaded")

var inputForm = document.getElementById("inputForm");

const url = "http://localhost:9090/";

inputForm.addEventListener("submit", (e)=>{
  e.preventDefault()

  var inputUrl = document.getElementById("urlid").value;

  const data = { long_url: inputUrl };

  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => response.json()).then(response => {
    console.log('Success:', response["short_url"]);
    document.getElementById("response").innerHTML = '<a href='+response["short_url"]+' target="_blank">'+response["short_url"]+'</a>'
  }).catch((error) => {
    console.error('Error:', error);
  });

})