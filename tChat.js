var uid = localStorage.getItem('uid')
if (localStorage.getItem('sOrT') === "student") {
    document.getElementById("tooltiptext").innerHTML = localStorage.getItem('Name') + "<br>"  +"Grade:"+ localStorage.getItem('Grade')
    document.getElementById("navbar").innerHTML = "<li><a href='AfterSignin.html' id='Chats'>Questions</a></li><li><a href='YourQuestions.html' id='Chats'>Your Questions</a></li><li class='active'><a href='tChat.html' id='Chats' >Chats</a></li><li><a href='Teacher.html' id='Chats'>Teachers</a></li><li><a href='Community.html' id='Chats'>Community</a></li>"}
    else{
        document.getElementById("tooltiptext").innerHTML = localStorage.getItem('Name') + "<br>" + "Teacher"
        document.getElementById("navbar").innerHTML = "<li><a href='AfterSignin.html' id='Chats'>Questions</a></li><li><a href='YourQuestions.html' id='Chats'>Your Questions</a></li><li class='active'><a href='tChat.html' id='Chats'>Chats</a></li><li><a href='Community.html' id='Chats'>Community</a></li>"   
    }         

db.collection('users').doc(uid).get().then((snapshot)=>{
    var Name=snapshot.data().Name
    document.getElementById("tooltiptext").innerHTML=Name+"<br>"+"Teacher"
    console.log(snapshot.data().Chats)
    if(snapshot.data().Chats==undefined){
        document.getElementById("message").innerHTML="All you ongoing chats will appear here-<br><br><br>You have no ongoing chats."
    }
    for(var i=0;i<snapshot.data().Chats.length;i++){
        document.getElementById("message").innerHTML="All you ongoing chats will appear here-<br><br><br>"
        db.collection('users').doc(snapshot.data().Chats[i]).get().then(snapshot=>{
            console.log(snapshot.data().Name)
            document.getElementById("buttons").innerHTML+="<button id="+ snapshot.id+" onclick='clicked(this.id)' >"+snapshot.data().Name+"("+snapshot.data().studOrTeach+")"+"</button>"
        })
        
         
    }
  
})
function clicked(clicked_id){
    localStorage.setItem('sId', clicked_id)
    location.href="Chat.html"
}  
function Signout(){
    firebase.auth().signOut().then(()=>{
     location.href="HomePage2.html"
        })
}
