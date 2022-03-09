firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    var email_id = user.email;


    if(email_id=="mariosskoufi@gmail.com"){
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "none";
      document.getElementById("master_user").style.display = "block";
      document.getElementById("register_user").style.display = "none";
      FetchaAllDataAllll();


    }
    else {
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
      document.getElementById("master_user").style.display = "none";
      document.getElementById("register_user").style.display = "none";
      FetchaAllData();
    }






    if(user != null){

        document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;


    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("master_user").style.display = "none";
    document.getElementById("register_user").style.display = "none";

  }
});


function adddItemsToList(dieuthinsh,name,tk,flag){
  var tbl=document.getElementById("mytable2");

  var row = tbl.insertRow();

  var cell1 = row.insertCell();
  var cell2 = row.insertCell();
  var cell3 = row.insertCell();
  var cell4 = row.insertCell();
  var cell5 = row.insertCell();
  var cell6 = row.insertCell();


  cell1.innerHTML=name;
  cell2.innerHTML=dieuthinsh;
  cell3.innerHTML=tk;
  let btn = document.createElement("button");
		btn.innerHTML = "αποριψη";
		cell4.appendChild(btn);
		btn.onclick =function() {diskal(this)};

    let btn2 = document.createElement("button");
		btn2.innerHTML = "αποδοχη";
		cell5.appendChild(btn2);
		btn2.onclick =function() {accept(this)};

    let btn3 = document.createElement("button");
		btn3.innerHTML = "προβολη";
		cell6.appendChild(btn3);
		btn3.onclick =function() {provoli(this)};

    if(flag=="NO" || flag=="yes"){
      btn.disabled = true;
      btn2.disabled = true;

    }



}

function diskal(r){
  var i = r.parentNode.parentNode.rowIndex;
  var r=i;
  firebase.database().ref("send").on("value", function(snap) {

  snap.forEach(function(i) {
    let diadikasia = i.val().diadikasia;
    if(diadikasia=="null"){
        var database_ref = database.ref()

        database_ref.child("send/"+r+"/diadikasia").set("NO")
        database_ref.child('send/'+r+'/diadikasias'+ '/diadikasi').set("NO")

    }

  });
});
}

function accept(r){
  var i = r.parentNode.parentNode.rowIndex;
  var r=i;
  firebase.database().ref("send").on("value", function(snap) {

  snap.forEach(function(i) {
    let diadikasia = i.val().diadikasia;
    if(diadikasia=="null"){
        var database_ref = database.ref()

        database_ref.child("send/"+r+"/diadikasia").set("yes")
        database_ref.child('send/'+r+'/diadikasias'+ '/diadikasi').set("yes")

    }

  });
});

}
var tra=0;
function provoli(r){
    var i = r.parentNode.parentNode.rowIndex;
    var r=i;
    firebase.database().ref("send").child(r).child("paraggelia").on("value", function(snap) {
    snap.forEach(function(Child) {
      let onoma = Child.val().onoma;
      let poso = Child.val().poso;
      let posothta = Child.val().posothta;

      var myWindow = window.open("", "MsgWindow", "width=1500,height=400");
      if(tra==0){
        tra=tra+1;
          myWindow.document.write('<html><head><title>Print it!</title><link rel="stylesheet" type="text/css" href="index.css"><table><tr><td>+onoma</td><td>poso</td><td>posothta</td></tr></table></head><body>');
      }


      myWindow.document.write('<html><head><title>Print it!</title><link rel="stylesheet" type="text/css" href="index.css"><table><tr><td>'+onoma+"</td>"+"<td>"+poso+"</td>"+"<td>"+posothta+'</td></tr></table></head><body>');
      myWindow.document.write();
      console.log("epppppppp "+onoma+poso+posothta);


    });
  });
}

function FetchaAllData(){
    var tbl=document.getElementById("mytable2");


		firebase.database().ref("send").on("value", function(snap) {
      tbl.innerHTML="";

		snap.forEach(function(Child) {

			let dieuthinsh = Child.val().full_name;
			let name = Child.val().email;
			let tk = Child.val().code_para;
      let flag = Child.val().diadikasia;


			adddItemsToList(dieuthinsh,name,tk,flag);

	  });
	});

}


function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){

  firebase.auth().signOut();
}
