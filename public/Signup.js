const btn=document.getElementById('privacy')
const btn1=document.getElementById('privacy1')
const text=document.getElementById('password')
const text1=document.getElementById('confirm_password')
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
btn1.addEventListener('click',(event)=>{
    if(btn1.value=='hidden'){
        text1.type='text';
        btn1.value='shown';
    }
    else{
        text1.type='password';
        btn1.value='hidden';
    }
});

const signupForm = document.getElementById('signup_form');
  const errorElement = document.getElementById('error');

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const email = document.getElementById('email').value;

    if (password !== confirmPassword) {
      errorElement.textContent = 'Passwords do not match';
      return;
    }

    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        email
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then(error => {
          errorElement.textContent = error;
        });
      }
    })
    .then(data => {
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert('Registration successful!');
        signupForm.reset();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      errorElement.textContent = 'An error occurred during registration.';
    });
  });
