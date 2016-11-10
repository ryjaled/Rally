<?php
include_once("adb.php");

	class users extends adb
	{

		/**
		* Creates a new constructor of the class
		*/
		function users(){

		}

		/**
		* adds new user to the database
		* @param [all attributes needed to create a user]
		* @return boolean showing success or failure
		*/

		function addNewUser($firstname,$lastname,$username,$password,$email,$paymentmode,$telephone){
			$strQuery="insert into user set
							FIRSTNAME='$firstname',
							LASTNAME='$lastname',
							USERNAME='$username',
							PASSWORD=MD5('$password'),
							EMAIL='$email',
							PAYMENTMODE='$paymentmode',
							TELEPHONE='$telephone' ";
			return $this->query($strQuery);
		}


		/**
		* edits existing user in the database
		* @param [all attributes of a user]
		* @return boolean repersenting success or failure
		*/

		function editUser($userID,$username,$firstname,$lastname,$password,$email){
			$strQuery= "update userinfo set
								username='$username',
								firstname='$firstname',
								lastname='$lastname',
								password=MD5('$password'),
								email='$email'
							where userID='$userID' ";
			return $this->query($strQuery);
		}


		/**
		* Edits a  user's name in the database
		* @param user's Id, updated name, unique name identifier
		* @return boolean representing success or failure
		*/

		function editName($name,$userID){
			$strQuery="";

				$strQuery= "update userinfo set lastname='$name' where userID='$userID' ";

			return $this->query($strQuery);
		}

		/**
		* delete user from database
		* @param primary key of user's table
		* @return boolean representing success or failure
		*/
		function deleteUser($usercode){
			$strQuery ="Delete from userinfo where userID = '$usercode'";
			return $this->query($strQuery);

		}

		/**
		* get user, with primary key
		* @param primary key of user's table
		* @return row(s) of user's attributes
		*/
		function getUser($usercode=false)
		{
			if($usercode==false){
				$strQuery ="Select * from userinfo";
			}
			else{
				$strQuery ="Select * from userinfo where userID = $usercode ";
			}

			return $this->query($strQuery);
		}

		/**
		* logs the user in, given accurate credentials
		* @param: user's login credentials
		* @return: boolean based on success or failure
		*/
		function login($userName,$password)
		{
			$strQuery = "Select * from userinfo where username = '$userName' and password = MD5('$password')";
			$data = $this->query($strQuery);
			$result=$this->fetch();
			if($result=="")
			{
				$result=false;

			}

			return $result;
		}

		/**
		* toggles the availability of the user whose id is passed as parameter
		* @param: user's id, or other unique identifier
		* @return: the new availability of the user
		*/
		// function toggleAvailability($userID,$login=false){
		// 	if($login==false){
		// 		$available = 1;
		// 	}
		// 	else{
		// 		$available = 0;
		// 	}
		// 	$strQuery="update userinfo set availability ='$available' where userID='$userID' ";
		// 	return $this->query($strQuery);
		// }

		/**
		* returns the user Type of a specific user
		* @return: an array containing a person's user type
		*/
		// function getType($password){
		// 	$strQuery="Select userType,userID from userinfo where password = MD5('$password')";
		// 	return $this->query($strQuery);
		// }

		/**
		* get user email, with primary key
		* @param user's name
		* @return user's email
		*/
		function getEmail($userName)
		{
				$strQuery ="Select email from userinfo where username = '$userName' ";
			return $this->query($strQuery);
		}

		/**
		* get user id
		* @param user's name
		* @return user's Id
		*/
		function getID($userName){
			$strQuery="Select USER_ID from user where username = '$userName'";
			return $this->query($strQuery);
		}


	}
?>
