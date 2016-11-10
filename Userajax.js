
var currentObject = null;
var userID;

//Displays email alert message
function email(){
  alert("An email has been sent to the admin to reset your password");
}

/**
*@param server response, status
*Redirects to the home page after login
**/
function LoginComplete(xhr,status){
  console.log(xhr.responseText);

  var obj = JSON.parse(xhr.responseText);

  if(obj.result==1){
    sessionStorage.id=obj.userID;
    alert(sessionStorage.id+"2");
    // sessionStorage.id=obj.username;

    window.location="dashboard.html";
  }
  else{
    alert("here3");
      alert(obj.message);
    }

}

//Passes the users information to be logged in
function LoginUser(){
  var username=$("#Username").val();
  var password=$("#Password").val();
  var theUrl="usersajax.php?cmd=6&username="+username+"&password="+password;
//  prompt("url", theUrl);
  $.ajax(theUrl,{
    async:true,
    complete:LoginComplete
  });
}

/**
*@param id of the user
*Saves the edited username
**/
function saveUserName(id){
  currentObject.innerHTML=$("#UserName").val();
  var username=currentObject.innerHTML;
  var theUrl="../Controller/usersajax.php?cmd=1&uc="+id+"&username="+username;
  $.ajax(theUrl,
  {async:true,
   complete:editNameComplete}
 );
}


/**
*@param server response, status
*Displays a popup of whether
*the user information was updated
**/
function editNameComplete(xhr,status){
  alert(xhr.responseText);
}


/**
*@param table data object, id of the user
*Allows the user to edit usernames
**/
function editUserName(obj,id){
  var currentName=obj.innerHTML;
  obj.innerHTML="<input id='UserName' type='text' > <button class='clickspot' onclick='saveUserName("+id+")' >save</button>";
  $("#UserName").val(currentName);
  currentObject=obj;
}


/**
*@param id of the user
*Saves the edited firstname
**/
function saveFirstName(id){
  currentObject.innerHTML=$("#FirstName").val();
  var firstname=currentObject.innerHTML;
  var theUrl="../Controller/usersajax.php?cmd=2&uc="+id+"&firstname="+firstname;
  $.ajax(theUrl,
  {async:true,
   complete:editNameComplete}
 );
}

/**
*@param table data object, id of the user
*Allows the user to edit firstnames
**/
function editFirstName(obj,id){
  var currentName=obj.innerHTML;
  obj.innerHTML="<input id='FirstName' type='text' > <button class='clickspot' onclick='saveFirstName("+id+")' >save</button>";
  $("#FirstName").val(currentName);
  currentObject=obj;
}

/**
*@param id of the user
*Saves the edited lastname
**/
function saveLastName(id){
  currentObject.innerHTML=$("#LastName").val();
  var lastname=currentObject.innerHTML;
  var theUrl="../Controller/usersajax.php?cmd=3&uc="+id+"&lastname="+lastname;
  $.ajax(theUrl,
  {async:true,
   complete:editNameComplete}
 );
}

/**
*@param table data object, id of the user
*Allows the user to edit lastnames
**/
function editLastName(obj,id){
  var currentName=obj.innerHTML;
  obj.innerHTML="<input id='LastName' type='text' > <button class='clickspot' onclick='saveLastName("+id+")' >save</button>";
  $("#LastName").val(currentName);
  currentObject=obj;
}

/**
*@param server responses
*Displays messages concerning
*whether user was deleted
**/
function deleteUserComplete(xhr,status){
  if(status!="success"){
    alert("Error whiles deleting user");
  }
  if (typeof(currentObject) == "object") {
        $(currentObject).closest("tr").remove();
    } else {
        alert("Could not delete user");
    }
  alert(xhr.responseText);

}

/**
*@param table data object, id of the user
*Allows the an Admin to delete a user
**/
function deleteUser(object,id){
  var ajaxPageUrl="../Controller/usersajax.php?cmd=4&uc="+id;
  $.ajax(ajaxPageUrl,
    {async:true,
      complete:deleteUserComplete	});
  currentObject=object;
}

/**
*Displays message concerning whether user
* was added or not
**/
function addUserComplete(xhr,status){
console.log(xhr.responseText);
var obj = $.parseJSON(xhr.responseText);
    if(obj.result==1){
    userID=obj.userID;

    alert("Welcome to Rally! "+$("#firstname").val());
    /*Fields emptied after adding User*/

    $("#firstname").val("");
    $("#lastname").val("");
    $("#username").val("");
    $("#password").val("");
    $("#email").val("");
    $("#paymentmode").val("");
    $("#telephone").val("");
    window.location="index.html";
    }
    else{
    alert(obj.message);
    }

}

/**
*Allows the admin to add users
**/
function addUser(){
  var firstname = $("#firstname").val();
  var lastname = $("#lastname").val();
  var username=$("#username").val();
  var password=$("#password").val();
  var email=$("#email").val();
  var paymentmode=$("#paymentmode").val();
  var telephone = $("#telephone").val();


  var theUrl="usersajax.php?cmd=5&firstname="+firstname+
  "&lastname="+lastname+"&username="+username+"&password="
  +password+"&email="+email+"&paymentmode="+paymentmode+"&telephone="+telephone;

  $.ajax(theUrl,
    {async:true,
      complete:addUserComplete	});
}



function addPoolComplete(xhr,status){
console.log(xhr.responseText);
var obj = $.parseJSON(xhr.responseText);
    if(obj.result==1){
    //userID=obj.userID;

    alert("Pool successfully created!");
    /*Fields emptied after adding User*/

    // $("#firstname").val("");
    // $("#lastname").val("");
    // $("#username").val("");
    // $("#password").val("");
    // $("#email").val("");
    // $("#paymentmode").val("");
    // $("#telephone").val("");
    $("#poolname").val("");
    $("#poolcapacity").val("");
    $("#pooldestination").val("");
    $("#pooldeparture").val("");
    //window.location="dashboard.html";
    }
    else{
    alert(obj.message);
    }

}


function addPool(){
  var poolname = $("#poolname").val();
  var poolcapacity = $("#poolcapacity").val();
  var pooldestination=$("#pooldestination").val();
  var pooldeparture=$("#pooldeparture").val();
  var poolcreateid = sessionStorage.id;
  // var email=$("#email").val();



  var theUrl="usersajax.php?cmd=1&poolname="+poolname+
  "&poolcapacity="+poolcapacity+"&poolcreateid="+poolcreateid+"&pooldestination="+pooldestination+"&pooldeparture="
  +pooldeparture;

  $.ajax(theUrl,
    {async:true,
      complete:addUserComplete	});
}


//Tool tip for editing information
$(function() {
  $('.content').hover(function() {
    $('#edit_info').css('display', 'block');
  }, function() {
    $('#edit_info').css('display', 'none');
  });
});
