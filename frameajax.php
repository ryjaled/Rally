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
			addNewPool();
			break;
    case 2:
      getJoinPools();
      break;
		case 3:
			joinAPool();
			break;
		case 4:
		  checkFull();
		  break;
		case 5:
			addNewUser();
			break;
		case 6:
			login();
			break;
		case 7:
			generateReport();
			break;
		case 8:
			getNews();
			break;
		default:
			echo "wrong cmd";	//change to json message
			break;
	}

//Edits user's first name
function addNewPool(){
		include("users.php");
		$user=new users();
		if($_REQUEST['poolname']==""){
			echo'{"result":0,"message":"User info not given"}';
			exit();
		}

		$poolname=$_REQUEST['poolname'];
		$poolcapacity=$_REQUEST['poolcapacity'];
		$pooldeparture=$_REQUEST['pooldeparture'];
		$poolcreateid=$_REQUEST['poolcreateid'];
		$pooldestination=$_REQUEST['pooldestination'];


		$verify=$user->addNewPool($poolname,$poolcapacity,$poolcreateid,$pooldestination,$pooldeparture);
		if($verify==false){
			echo'{"result":0,"message":"Pool not added"}';
		}
		else{
			echo'{"result":1,"message":"Pool added"}';
		}
	}

//Edits user's firstname
	function getJoinPools(){
    include_once("users.php");

		$user = new users();

		$verify = $user->getPools();


		$array = array();
		while($one = $user->fetch())
		{
			$array[] = $one;
		}

		echo json_encode($array);
  }

//Edits user's lastname
	function joinAPool(){
		include_once("users.php");

			$user = new users();

			$ownerid=$_REQUEST['ownerid'];
			$passengerid=$_REQUEST['passengerid'];
			$poolid=$_REQUEST['poolid'];

			echo $ownerid;
			echo $passengerid;
			echo $poolid;

		$verify = $user->joinapool($ownerid,$passengerid,$poolid);
		if($verify==true){

			echo'{"result":1,"message":"Pool join successful"}';
			$sender = "Rally";

			$message = "Joining the pool was successful! You will be notified of payments and departure times";
			$smsmessage = str_replace(' ','%20',$message);
			$tel = "233201320188";
			$ch = curl_init("http://52.89.116.249:13013/cgi-bin/sendsms?username=mobileapp&password=foobar&to=$tel&from=$sender&smsc=smsc&text=$smsmessage");
			//session_write_close();
			curl_exec($ch);
		}
		else{
			echo'{"result":0,"message":"Pool join unsuccessful"}';
		}
	}

//Deletes User
	  function checkFull(){

	    include("users.php");
	    $user=new users();


			// echo json_encode($myarray);
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
				$_SESSION=$verify;
				$id=$user->getID($username);
				$id=$user->fetch();
				$array=array('result'=>1,'message'=>'User logged in',
			'username'=>$username,'password'=>$password,'userID'=>$id["USER_ID"]);
				echo json_encode($array);
			//	echo'{"result":1,"message":"Welcome to the Rally"}';
			}

		}

		function generateReport()
		{
			include("users.php");
			$user=new users();
			$user_id=$_REQUEST['id'];

			$verify = $user->pullReport($user_id);

			$array = array();
			while($one = $user->fetch())
			{
				$array[] = $one;
			}

			echo json_encode($array);
		}

		function getNews()
		{
			include("users.php");
			$user=new users();


			$verify = $user->pullNews();

			$array = array();
			while($one = $user->fetch())
			{
				$array[] = $one;
			}

			echo json_encode($array);
		}

?>
