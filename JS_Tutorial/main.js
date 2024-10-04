var Name;
function checkInput(){
    Name = document.getElementById('Name').value;
    if(Name === ""){
        alert("Vui lòng nhập tên !!!");
    }
    else {
        console.log(Name);
    }
}

