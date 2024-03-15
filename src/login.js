var privacy=document.getElementById('privacy');
privacy.addEventListener('click',function(event){
    var pass=document.getElementById('password');
    if(privacy.value=='hidden'){
        pass.type='text';
        privacy.value='visible';
    }
    else{
        pass.type='password';
        privacy.value='hidden';
    }
});