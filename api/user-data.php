<?php 

	include_once 'init.php';

	$username = (!empty($_POST['username'])) ? $_POST['username'] : null; // Grab user id from url

	//Data collection - Put the values receieved here
	$fname = strip_tags(trim($_POST["fname"]));
	$lname = strip_tags(trim($_POST["lname"]));
	$email = strip_tags(trim($_POST["email"]));
	$address1 = strip_tags(trim($_POST["address1"]));
	$address2 = strip_tags(trim($_POST["address2"]));

	$dobDay = strip_tags(trim($_POST["dobDay"]));
	$dobMonth = strip_tags(trim($_POST["dobMonth"]));
	$dobYear = strip_tags(trim($_POST["dobYear"]));

	$dob = $dobDay."-".$dobMonth."-".$dobYear;

	$city = strip_tags(trim($_POST["city"]));
	$postcode = strip_tags(trim($_POST["postcode"]));

	if(isset($_POST["newsletter"])) {
		$newsletter = 1;
	} else {
		$newsletter = 0;
	}

	if(isset($_POST["offers"])) {
		$offers = 1;
	} else {
		$offers = 0;
	}

	if(isset($_POST["tac"])) {
		$tac = 1;
	} else {
		$tac = 0;
	} 



	if($username !== null) { // we have a username
		// $user_exists
		$user_exists = $dbh->query("SELECT * FROM main WHERE user_id = '{$username}'")->fetchAll(PDO::FETCH_OBJ);	
	} else {
		$feedback = validateForm();
	}

	$emailAlreadyRegistered = isEmailRegistered($email);

	if($emailAlreadyRegistered === false ) {

		if($feedback) {
			$userID = null;
		} else {
			$userID = addNewUser();
		}

		// array to pass data back to game
		// NOTE this will be visible
		$data = array(
			"feedback" => $feedback,
			"userID" => $userID
		);
	} else {
		$data = array(
			"feedback" => "",
			"userID" => $emailAlreadyRegistered
		);
	}



	// echo out json so we can grab it with ajax
	echo json_encode($data);


	function validateForm() {
		global $dbh, $fname, $lname, $email, $address1, $address2, $dob, $city, $postcode, $offers, $newsletter, $tac;



		$feedback = "";
		if (strlen($fname)==0 || strlen($fname)>35) {
			$feedback = "Please enter a valid first name<br/>";  
		}
		if (strlen($lname)==0 || strlen($lname)>35) {
			$feedback = "Please enter a valid last name<br/>";  
		}
		if (strlen($dob)>50) {
			$feedback = "Please enter a valid date of birth<br/>";  
		}
		if (strlen($email)==0 || strlen($email)>100) {
			$feedback = "Please enter a valid email name<br/>";  
		}
		if (strlen($address1)==0 || strlen($address1)>100) {
			$feedback = "Please enter a valid address<br/>";  
		}
		if (strlen($address2)>100) {
			$feedback = "Please enter a valid address<br/>";  
		}
		if (strlen($dob)>10) {
			$feedback = "Please enter a valid birthday<br/>";  
		}
		if (strlen($city)>50) {
			$feedback = "Please enter a valid city<br/>";  
		}
		if (strlen($postcode)==0 ||strlen($postcode)>10) {
			$feedback = "Please enter a valid postcode<br/>";  
		}


		if ($tac == 0) {
			$feedback = "You must accept the terms and conditions<br/>";  
		}
		return $feedback;
	}


	function addNewUser() {


		global $dbh, $fname, $lname, $email, $address1, $address2, $dob, $city, $postcode, $offers, $newsletter, $tac;

		// Add user
		$sql = "INSERT INTO users (firstName, lastName, email, address1, address2, dob, city, postcode, offers, newsletters, timeCreated) VALUES (:fname, :lname, :email, :address1, :address2, :dob, :city, :postcode, :offers, :newsletter, UTC_TIMESTAMP())";
		$query = $dbh->prepare($sql);
		$query->execute( array (
			'fname' => $fname,
			'lname' => $lname,
			'email' => $email,
			'address1' => $address1,
			'address2' => $address2,
			'dob' => $dob,
			'city' => $city,
			'postcode' => $postcode,
			'offers' => $offers,
			'newsletter' => $newsletter
		));
		$newid = $dbh->lastInsertId();
		return $newid;
	}


	//Takes an email address, checks if its in the database and returns the user ID if it is, else returns false.
	function isEmailRegistered($email) {
	  global $dbh;
	    $sql = "SELECT email, userID FROM users WHERE email='{$email}'";
	    $query = $dbh->prepare($sql);
	    $query->execute();
	    if ($query->rowCount()>0) {
	      foreach ($query as $row) { 
	        return $row['userID'];
	      }
	    } else {
	      return false;
	    }
	}


	//Stop specific users from winning
	function isUserBanned($userid){
		//139208
		if ($userid == 139208 || $userid == "139208" ) {
			return true;
		}
		return false;
	}