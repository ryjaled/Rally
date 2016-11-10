<?php
	//check command
	if(!isset($_REQUEST['cmd'])){
		echo "cmd is not provided";
		exit();
	}
	/*get command*/
	//A method is called based on the command
	$cmd=$_REQUEST['cmd'];
	switch($cmd){
		case 1:
			editUserName();
			break;
    case 2:
      editFirstName();
      break;
		case 3:
			editLastName();
			break;
		case 4:
		  deleteUser();
		  break;
		case 5:
			addNewUser();
			break;
		case 6:
			login();
			break;
		default:
			echo "wrong cmd";	//change to json message
			break;
	}

//Edits user's first name
  function editUserName(){
    include_once("../Model/users.php");

		if(!isset($_REQUEST['uc'])){
			echo"No user information";
		}
		$usercode=$_REQUEST['uc'];
		$username=$_REQUEST['username'];

		$user = new users();

		$verify = $user->editName(1,$username,$usercode);
		if($verify==true){
			echo"User Changed";
		}
		else{
			echo"User not changed";
		}
  }

//Edits user's firstname
	function editFirstName(){
    include_once("../Model/users.php");

		if(!isset($_REQUEST['uc'])){
			echo"No user information";
		}
		$usercode=$_REQUEST['uc'];
		$firstname=$_REQUEST['firstname'];

		$user = new users();

		$verify = $user->editName(2,$firstname,$usercode);
		if($verify==true){
			echo"User Changed";
		}
		else{
			echo"User not changed";
		}
  }

//Edits user's lastname
	function editLastName(){
		include_once("../Model/users.php");

		if(!isset($_REQUEST['uc'])){
			echo"No user information";
		}
		$usercode=$_REQUEST['uc'];
		$lastname=$_REQUEST['lastname'];

		$user = new users();

		$verify = $user->editName(3,$lastname,$usercode);
		if($verify==true){
			echo"User Changed";
		}
		else{
			echo"User not changed";
		}
	}

//Deletes User
	  function deleteUser(){
	    if(!isset($_REQUEST['uc'])){
	      echo "usercode is not given";
	      exit();
	    }

	    $Id=$_REQUEST['uc'];
	    include("../Model/users.php");
	    $user=new users();
	    //delete the user
	    if($user->deleteUser($Id)){
	      echo "User deleted";
	    }else{
	      echo "User was not deleted.";
	    }
	  }

//Adds new User
function addNewUser(){
		include("users.php");
		$user=new users();
		if($_REQUEST['username']==""){
			echo'{"result":0,"message":"User info not given"}';
			exit();
		}

		$firstname=$_REQUEST['firstname'];
		$lastname=$_REQUEST['lastname'];
		$username=$_REQUEST['username'];
		$password=$_REQUEST['password'];
		$email=$_REQUEST['email'];
		$paymentmode=$_REQUEST['paymentmode'];
		$telephone=$_REQUEST['telephone'];


		//Checks the length and content of the password
		// $pwordCheck ="/[a-zA-Z0-9]{6,2O}/";
		// if(preg_match($pwordCheck,$password)===false){
		// 	echo'{"result":0,"message":"Password must contain letters and numbers \nLength must be greater than 6 characters"}';
		// 		exit();
		// }

		//Checks Ashesi email
		// $emailCheck="/@ashesi.edu.gh/";
		// if(preg_match($emailCheck,$email)===0){
		// 	echo'{"result":0,"message":"Email must contain Ashesi address"}';
		// 	exit();
		// }

		$verify=$user->addNewUser($firstname,$lastname,$username,$password,$email,$paymentmode,$telephone);
		if($verify==false){
			echo'{"result":0,"message":"User not added"}';
		}
		else{
			$id=$user->getID($username);
			$id=$user->fetch();
			$array=array('result'=>1,'message'=>'User added',
			'firstname'=>$firstname,'lastname'=>$lastname,'username'=>$username
		,'password'=>$password,'email'=>$email,'paymentmode'=>$paymentmode,'telephone'=>$telephone,'userID'=>$id["USER_ID"]);
			echo json_encode($array);
		}
	}

//Logs user into system
		function login(){
			include("users.php");
			$username=$_REQUEST['username'];
			$password=$_REQUEST['password'];
			$user = new users();

			$verify = $user->login($username,$password);

			if($verify==false){
				// $ans= $user->getEmail($username);
				// $ans=$user->fetch();
				// if($ans!=false){
				// 	$array = array('result'=>0,'message'=>'Please enter the right password','email'=>$ans["email"]);
				// 	echo json_encode($array);
				// }
				// else{
					echo '{"result":0,"message":"Wrong User information"}';
				// }

			}
			else{
				session_start();
				$_SESSION['user']=$verify;
				echo'{"result":1,"message":"Welcome to the AIS"}';
			}

		}
?>
