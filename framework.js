
var currentObject = null;
var userID;
var array = [];
// var objArray;

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
    // sessionStorage.id=obj.username;

    window.location="dashboard.html";
  }
  else{

      alert(obj.message);
    }

}

//Passes the users information to be logged in
function LoginUser(){
  var username=$("#Username").val();
  var password=$("#Password").val();
  var theUrl="frameajax.php?cmd=6&username="+username+"&password="+password;
//  prompt("url", theUrl);
  $.ajax(theUrl,{
    async:true,
    complete:LoginComplete
  });
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

    alert("Welcome to Rally! ");
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


  var theUrl="frameajax.php?cmd=5&firstname="+firstname+
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
  // alert(sessionStorage.id);
  var poolcreateid = sessionStorage.id;
  // alert(poolcreateid);
  // var email=$("#email").val();



  var theUrl="frameajax.php?cmd=1&poolname="+poolname+
  "&poolcapacity="+poolcapacity+"&poolcreateid="+poolcreateid+"&pooldestination="+pooldestination+"&pooldeparture="+pooldeparture;

  $.ajax(theUrl,
    {async:true,
      complete:addPoolComplete	});
}


function getPoolComplete(xhr,status){
  console.log(xhr.responseText);
  var obj = JSON.parse(xhr.responseText);


if(obj!=null){
  // window.location="join_pool.html";
  $('.displaypools').html("");
    for (var i = 0; i < obj.length; i++)
    {

      objArray = {poolid:obj[i].POOL_ID, userid:obj[i].USER_ID};
      array.push(objArray);
      //console.log(objArray);
      console.log(array);

      $('.displaypools').append("<a href='#'id='"+i+"' class='pools'>"+
                                                "<div style='font-size: 90%;' class='row'>"+
                                                "<div class='col s12 m6'>"+
                                                "<div class='card black'>"+
                                                "<div class='card-content orange-text'>"+
                                                "<span><u>Destination</u>: "+obj[i].POOL_DESTINATION+"</span>"+"<span style='padding-left: 3%;'><u>Departure time: </u>"+obj[i].POOL_DEPARTURE+"</span>"+
                                                "<p><u>Unique Pool ID</u>: "+obj[i].POOL_ID+"</p>"+
                                                "<span><u>Name of Pool Creator</u>: "+obj[i].FIRSTNAME+"</span>"+"<span> "+obj[i].LASTNAME+"</span>"+
                                                "<p><u>Pool Name</u>: "+obj[i].POOL_NAME+"</p>"+
                                                "<p><u>Pool Max. Capacity</u>: "+obj[i].MAX_CAPACITY+"</p>"+
                                                "</div>"+
                                                "</div>"+
                                                "</div>"+
                                                "</div>"+
                                                "</a>");

    }
    $(".pools").click(function() {

    // isFull();
    var confirm = prompt("Y or N to confirm.");


    if (confirm != null) {
   joinPool($(".pools").attr("id"));
    }
    else {
  alert("Error executing instruction");
      }
     });


} else {
  alert("Bad instruction");
}

}

function getPool(){

  var theUrl="frameajax.php?cmd=2";

  $.ajax(theUrl,{
    async:true,
    complete:getPoolComplete
  });
}


function joinPoolComplete(xhr,status){
  console.log(xhr.responseText);
  var obj = xhr.responseText;

  if(obj!=null){
    alert("Pool joined successfully");
  }
  else {
      alert("Pool join failed");
  }

}



function joinPool(i){


  var joinerid = sessionStorage.id;

  var theUrl="frameajax.php?cmd=3&ownerid="+array[i].userid+
  "&passengerid="+joinerid+"&poolid="+array[i].poolid;

//  prompt("url", theUrl);
  $.ajax(theUrl,{
    async:true,
    complete:joinPoolComplete
  });
}

function isFullComplete(xhr,response){
  console.log(xhr.responseText);

}

function isFull(){

  var theUrl="frameajax.php?cmd=4";

  $.ajax(theUrl,{
    async:true,
    complete:isFullComplete
  });
}



function getReportComplete(xhr,status){
  console.log(xhr.responseText);
  var obj = JSON.parse(xhr.responseText);

  if(obj!=null){
    // window.location="join_pool.html";
    $('.displayreports').html("");

    for (var i = 0; i < obj.length; i++)
    {
      $('.displayreport').append("<a href='#'id='"+i+"' class='pools'>"+
                                                "<div style='font-size: 90%;' class='row'>"+
                                                "<div class='col s12 m6'>"+
                                                "<div class='card black'>"+
                                                "<div class='card-content orange-text'>"+
                                                +"<span>"+obj[i].DATE_CREATED+"</span><br>"+
                                                "<span><u>Your Pool ID's</u>: "+obj[i].POOL_ID+"<br></span>"+"<span style='padding-left: 0%;'><u>Names of your pool</u>: "+obj[i].POOL_NAME+"<br></span>"+
                                                "<p><u>Max Capacity: </u>: "+obj[i].MAX_CAPACITY+"<br></p>"+
                                                "<span><u>Your desintation was/is: </u>: "+obj[i].POOL_DESTINATION+"<br></span>"+"<span><u>Your departure time was/is</u>: "+obj[i].POOL_DEPARTURE+"<br></span>"+
                                                "</div>"+
                                                "</div>"+
                                                "</div>"+
                                                "</div>"+
                                                "</a>");

    }


}
}





function getReport(){
    var i = sessionStorage.id;
    var theUrl="frameajax.php?cmd=7&id="+i;

    $.ajax(theUrl,
      {async:true,
        complete:getReportComplete});

}

function getNewsComplete(xhr,status){
  // alert("here");
  console.log(xhr.responseText);
  var obj = JSON.parse(xhr.responseText);
// alert('obj');
  if(obj!=null){
    // window.location="join_pool.html";
    $('.newsstories').html("");

    for (var i = 0; i < obj.length; i++)
    {
      $('.newsstories').append("<a href='#'id='"+i+"' class='pools'>"+
                                                "<div style='font-size: 90%;' class='row'>"+
                                                "<div class='col s12 m6'>"+
                                                "<div class='card black'>"+
                                                "<div class='card-content orange-text'>"+
                                                +"<span><u>Poster</u>: "+obj[i].POSTER+"</p><br>"+
                                                "<span><u>Story</u>: <br>: "+obj[i].NEWS_STORY+"<br></span>"+
                                                "<p><u>Date posted</u>: : "+obj[i].DATE_POSTED+"<br></p>"+
                                                "</div>"+
                                                "</div>"+
                                                "</div>"+
                                                "</div>"+
                                                "</a>");

    }


}
}



function getNews(){

    var theUrl="frameajax.php?cmd=8";
alert("here");
    $.ajax(theUrl,
      {async:true,
        complete:getNewsComplete});

}

//Tool tip for editing information
$(function() {
  $('.content').hover(function() {
    $('#edit_info').css('display', 'block');
  }, function() {
    $('#edit_info').css('display', 'none');
  });
});
