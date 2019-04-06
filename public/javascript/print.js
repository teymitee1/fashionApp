
let printBtn = document.getElementById("print-btn");
printBtn.addEventListener('click', () => {
    var prtContent = document.getElementById("userInfo");
    var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
})


var delBtn = document.getElementById("del");
 delBtn.addEventListener("click", function(e){
    var userName = delBtn.getAttribute("name");
    var con = confirm("Are You Sure You Want To Delete The User: "+ userName+  "?\nThis Action Can not be reversed");
    if(con){
        alert("User Deleted");
    }else{
        e.preventDefault()
    }
 })