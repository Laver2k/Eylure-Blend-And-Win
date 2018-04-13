<?php
/**
*	Daily prize draw
*	
*	Adds a user to the daily grand_prize table. If the user already exists it checks to see
*	if that user has already been entered for that day
*
*/
	include_once 'init.php';

	$username = (!empty($_GET['uid'])) ? $_GET['uid'] : null; // Grab user id from url// If we don't obtain a user from the iframe in the javascript, this file will never be fired.
	

	
//	$username = null;
		
	if($username !== null) { // we have a username

		// Update the total played in the main database.
		// Helps identify how many times each individual player has played the game
		
		$current_user = $dbh->query("SELECT * FROM main WHERE user_id = '{$username}'")->fetchAll(PDO::FETCH_OBJ);
		
		if ($current_user) { // user exists
			
			$sql = "UPDATE main SET total_played = total_played + 1 WHERE user_id = :username";
			$query = $dbh->prepare($sql);
			$query->execute ( array (
				'username' => $username
			));	
		} else {
			// Add to main table
			$sql = "INSERT INTO main ( username, total_played ) VALUES (:username, 1)";
			$query = $dbh->prepare($sql);
			$query->execute( array (
				'username' => $username
			));
		} 
	
		// array to pass back data to game
		$data = array(
			'request' => 'totalling script ran',
			'username' => $username
		);
		
		// echo out json so we can grab it with ajax, if needed
		//echo json_encode($data);	
	
	} else { // we didnt' obtain a username so kill it
		echo 'Request killed';
		die();
	}
	

	
	




