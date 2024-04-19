const btn=document.getElementById('privacy')
const text=document.getElementById('password')
btn.addEventListener('click',(event)=>{
    if(btn.value=='hidden'){
        text.type='text';
        btn.value='shown';
    }
    else{
        text.type='password';
        btn.value='hidden';
    }
});
 const loginForm = document.getElementById('login_form');
 const errorElement = document.getElementById('error');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(response => {
      if (response.ok) {
        // Login successful, handle the response as needed
        window.location.href='/home'
        // Optionally, you can redirect the user to a different page or perform additional actions
      } else {
        return response.text().then(error => {
          errorElement.textContent = error;
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      errorElement.textContent = 'An error occurred during login.';
    });
  });