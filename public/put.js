var updating = document.getElementById('update')

updating.addEventListener('click', function () {
  fetch('users', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'ZZZZZZ',
      'number': '321'
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
  })
})
