var Name;
function checkInput(){
    Name = document.getElementById('Name').value;
    if(Name === ""){
        alert("Vui lòng nhập tên !!!");
    }
    else {
        document.getElementById("log_in").setAttribute("style", "display : none");
        document.getElementById("main_game").setAttribute("style","display : flex");
        document.getElementById("infor").textContent = "Name : " + Name;
    }
}

