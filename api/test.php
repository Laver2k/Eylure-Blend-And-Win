<?php
	// This file is only called test to stop people targeting it
	
	include_once 'init.php';
	$time = time();
	$username = (!empty($_GET['uid'])) ? $_GET['uid'] : null; // Grab user id from url// If we don't obtain a user from the iframe in the javascript, this file will never be fired.
	
	//	$username = null;
	
	if($username !== null) {

		$user_exists = $dbh->query("SELECT * FROM main WHERE user_id = '$username' ")->fetchAll(PDO::FETCH_OBJ);
	
		// check if user exists
		if ($user_exists) {
		
			// update main table
			$sql = "UPDATE main SET security = $time WHERE user_id = :username";
			$query = $dbh->prepare($sql);
			$query->execute( array (
				'username' => $username
			));

		} else { // if they don't exist, add them
		
			$sql = "INSERT INTO main ( user_id, security ) VALUES ( :username, :security )";
			$query = $dbh->prepare($sql);
			$query->execute( array (
				'username'   => $username,
				'security'   => $time
			));
		}
	
	}
	
