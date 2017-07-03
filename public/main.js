var update = document.getElementById('update')

update.addEventListener('click', function () {
// Send PUT Request here
  fetch('nelsons', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'name': 'Shigaraki',
    'position': document.getElementById("value").value
  })
})
//document.location.href="http://127.0.0.1:80/"
//window.location.assign("http://127.0.0.1:3000/")
})
