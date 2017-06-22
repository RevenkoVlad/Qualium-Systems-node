var deletingElement = document.getElementById('delete')

deletingElement.addEventListener('click', function () {
  fetch('users', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'AAAA'
    })
  }).then(function (response) {
    window.location.reload()
  })
})
