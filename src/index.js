var dog=document.getElementById('dog_btn');
dog.addEventListener('click',function(event){
    console.log("Woof!");
    open('../public/dog.html','_self');
});