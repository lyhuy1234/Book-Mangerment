function func(){
    var email = document.getElementById("user").value;
    var pass = document.getElementById('password').value;
    if (email == 'we are group5' && pass == '22012025'){
        alert("Login Success Full !")
        window.location.assign("total.html")
    }
    else{
        alert('Wrong Passwords')
    }
}
var a;
function pass(){
    if(a==1){
        document.getElementById('password').type='password';
        document.getElementById('password1').src='img/lock-regular-24.png';
        a=0;
    }
    else{
        document.getElementById('password').type='text';
        document.getElementById('password1').src='img/lock-open-regular-24.png';
        a=1;
    }
}