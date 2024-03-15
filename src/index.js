var dog=document.getElementById('dog_btn');
dog.addEventListener('click',function(event){
    console.log("Woof!");
    open('../public/dog.html','_self');
});
var cat=document.getElementById('cat_btn');
cat.addEventListener('click',function(event){
    console.log("Meow!");
    open('../public/cat.html','_self');
});