console.log("JS loaded")

var inputForm = document.getElementById("inputForm");

inputForm.addEventListener("submit", (e)=>{
  e.preventDefault()

  var url = document.location

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
    document.getElementById("response").innerHTML = '<a href='+response["short_url"]+' target="_blank">'+url+response["short_url"]+'</a>'
  }).catch((error) => {
    console.error('Error:', error);
  });

})