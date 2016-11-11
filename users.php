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

		function addNewPool($poolname,$poolcapacity,$poolcreateid,$pooldestination,$pooldeparture){
			$strQuery="insert into create_pool set
							POOL_NAME='$poolname',
							MAX_CAPACITY='$poolcapacity',
							USER_ID='$poolcreateid',
							POOL_DESTINATION='$pooldestination',
							POOL_DEPARTURE='$pooldeparture' ";
			return $this->query($strQuery);
		}

		function joinapool($ownerid,$passengerid,$poolid){
			$strQuery="insert into join_pool set
							OWNER_ID='$ownerid',
							PASSENGER_ID='$passengerid',
							JOINEDPOOL_ID='$poolid' ";

			return $this->query($strQuery);
		}

		/**
		* delete user from database
		* @param primary key of user's table
		* @return boolean representing success or failure
		*/
		function getFull(){
			// $strQuery ="SELECT COUNT(PASSENGER_ID),join_pool.JOINEDPOOL_ID,create_pool.POOL_ID FROM join_pool,create_pool WHERE join_pool.JOINEDPOOL_ID=create_pool.POOL_ID";
			// $strQuery = "Select COUNT(PASSENGER_ID),join_pool.JOINEDPOOL_ID,create_pool.MAX_CAPACITY from join_pool,create_pool where join_pool.JOINEDPOOL_ID=4";
			return $this->query($strQuery);

		}

		/**
		* get user, with primary key
		* @param primary key of user's table
		* @return row(s) of user's attributes
		*/
		function getUser($userID)
		{

				$strQuery ="Select USERNAME from user where USER_ID ="+$userID;
			return $this->query($strQuery);

		}

		function getPools()
		{
				$strQuery ="Select create_pool.POOL_ID, create_pool.POOL_NAME, create_pool.MAX_CAPACITY, create_pool.USER_ID, create_pool.POOL_DESTINATION, create_pool.POOL_DEPARTURE, user.FIRSTNAME, user.LASTNAME
				 from create_pool,user WHERE create_pool.USER_ID = user.USER_ID";
			return $this->query($strQuery);
		}

		/**
		* logs the user in, given accurate credentials
		* @param: user's login credentials
		* @return: boolean based on success or failure
		*/
		function login($userName,$password)
		{
			$strQuery = "Select * from user where USERNAME = '$userName' and PASSWORD = '$password'";

			$data = $this->query($strQuery);
			$result=$this->fetch();
			if($result=="")
			{
				$result=false;
			}

			return $result;
		}


		function pullReport($userid)
		{
			$strQuery = "Select * from create_pool where USER_ID = '$userid'";

			return $this->query($strQuery);

		}

		function pullNews()
		{
			$strQuery = "Select * from news_stories";

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
