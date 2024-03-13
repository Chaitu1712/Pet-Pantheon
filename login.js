var form=document.getElementById('login_form');
form.addEventListener('submit',function(event){
    event.preventDefault();
    var usr=document.getElementById('username');
    var pass=document.getElementById('password');
console.log("Username: "+usr.value+"\nPassword: "+pass.value);
});
var show=document.getElementById('privacy');
show.addEventListener('click',function(event){
    var pass=document.getElementById('password');
    if(show.value=='hidden'){
        pass.type='text';
        show.value='visible';
    }
    else{
        pass.type='password';
        show.value='hidden';
    }
});
show.addEventListener('hover',function(event){
    var pass=document.getElementById('password');
    if(show.value=='hidden'){
        pass.type='text';
        show.value='visible';
    }
    else{
        pass.type='password';
        show.value='hidden';
    }
});