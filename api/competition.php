<?php 
/**
*	Main game logic
*	
*	First checks if we have a user that would of been entered into the database the first time the player clicks play.
*	
*	we then check that a 40 second timelapse has occured since clicking play and getting to here.
*	
*	randomly pick if the user is a winner from a set amount of prizes, £50, £25, £10, £5, £1
*	
*	If they have won, check if prize is available.
*
*	assign 1 to the user keeping a tally of the users total prize won and a prize breakdown
*	
*	We also set $outcome to determine the game state redirection 
*
*/
	include_once 'init.php';
	
	$game_odds = 10000; // Easier place to change the odds.  
	/*
	100 = every player wins.  
	200 = 1 in 2 players wins.  
	1000 =  1 in 10.  
	10000 = 1 in 100.  
	50000 = 1 in 500.
	100000 = 1 in 1,000. 
	*/



	$time = time(); // grab unix timestamp
	$username = (!empty($_POST['userid'])) ? $_POST['userid'] : null; // Grab user id from url
	$winner = false;
	$outcome = 0; // Used for game state direction	

		
	if($username !== null) { // we have a username
		
		$user_exists = $dbh->query("SELECT * FROM users WHERE userID = '{$username}'")->fetchAll(PDO::FETCH_OBJ);

		
		// Technically the user should always exist as they are created in the test.php when they click playgame.
		// If not we can assume the user is targeting this file directly.
		if ($user_exists) { 

			//If the current time is less than 10 seconds since they last entered, they are spamming, so ban them.
			if ($time < $user_exists[0]->security+10) {
				banUser($username);
			}

			// check to see if logic code was triggered 2 minutes after the last time.
			// if not direct to lose page. Helps prevent ajax auto run requests
			if ($time > $user_exists[0]->security + 120 && isUserBanned($username)==false && getUsersPrizesWon($username)<5 ) {			

				// GAME LOGIC
				$random_number = mt_rand(1, $game_odds);
			
				if ( $random_number >= 1 && $random_number <= 15 ){ // WINNER Blend & Care
					$prizeID = 1;

				
					// grab the remaining prizes from prize
					$total_remaining = getTotalRemaining($prizeID);
					
					if ( $total_remaining > 0 ) { // We have prizes	
						updateTables($prizeID);
						$winner  = true; 
						$outcome = $prizeID; // for redirection in game	
									
					} 
						
				} else if ( $random_number >= 6 && $random_number <= 30 ) { // WINNER texture 117
					$prizeID = 2;

				
					// grab the remaining prizes from prize
					$total_remaining = getTotalRemaining($prizeID);
				
					if ( $total_remaining > 0 ) { // We have prizes
						updateTables($prizeID);
						$winner  = true;
						$outcome = $prizeID; // for redirection in game
						
					} 
				
				} else if ( $random_number >= 31 && $random_number <= 45 ) { // WINNER Volume 101

					$prizeID = 3;



					// grab the remaining prizes from prize
					$total_remaining = getTotalRemaining($prizeID);
				
					if ( $total_remaining > 0 ) { // We have prizes
								
						updateTables($prizeID);
						$winner  = true;
						$outcome = $prizeID; // for redirection in game
						
					} 
				
				} else if ( $random_number >= 46 && $random_number <= 60 ) { // WINNER Accents 003
					$prizeID = 4;


					// grab the remaining prizes from prize
					$total_remaining = getTotalRemaining($prizeID);
				
					if ( $total_remaining > 0 ) { // We have prizes
							
						updateTables($prizeID);
						$winner  = true;
						$outcome = $prizeID; // for redirection in game
						
					} 
				
				} else if ( $random_number >= 61 && $random_number <= 70 ) { // WINNER Exaggerate 141
				
					$prizeID = 5;


					// grab the remaining prizes from prize
					$total_remaining = getTotalRemaining($prizeID);
				
					if ( $total_remaining > 0 ) { // We have prizes
							
						updateTables($prizeID);
						$winner  = true;
						$outcome = $prizeID; // for redirection in game
						
					} 
				
				} else if ( $random_number >= 71 && $random_number <= 100 ) { // WINNER Definition 126

					$prizeID = 6;


					// grab the remaining prizes from prize
					$total_remaining = getTotalRemaining($prizeID);
				
					if ( $total_remaining > 0 ) { // We have prizes
							
						updateTables($prizeID);
						
						$winner  = true;
						$outcome = $prizeID; // for redirection in game
						
					}
				
				}
		

			} // $time > $user_exists[0]->security + 40 ends
		
		}// $user_exists


		// update the secutiy column with the latest timestamp
		// otherwise the timestamp is out of date and will always be greater
		$sql = "UPDATE users SET security = $time WHERE userID = :username";
		$query = $dbh->prepare($sql);
		$query->execute( array (
			
			'username' => $username
			
		));

		
	} else {

		echo 'Request killed';
		die();
		
	}
	
		
	// array to pass data back to game
	// NOTE this will be visible
	$data = array(
		
		'winner'  => $winner,
		'outcome' => $outcome
		
	);
	
	// echo out json so we can grab it with ajax
	echo json_encode($data);


	//
	function getTotalRemaining($prizeID){
		global $dbh;
		$total_remaining = $dbh->query("SELECT total_remaining FROM prize where prize_id = ".$prizeID)->fetchColumn(0);
		return $total_remaining;
	}

	function updateTables($prizeID) {
		global $dbh;
		global $username;
		
		// update prize table
		$sql = "UPDATE prize SET total_remaining = total_remaining - 1 WHERE prize_id = ".$prizeID;
		$query = $dbh->prepare($sql);
		$query->execute();

		// update log table
		$sql = "INSERT INTO log (user_id, prize_id, wintime) VALUES (:username, :prize, UTC_TIMESTAMP())";
		$query = $dbh->prepare($sql);
		$query->execute( array (
			'username' => $username,
			'prize' => $prizeID
		));
	}

	function getUsersPrizesWon($userid){
		global $dbh;
		$totalPrizesWon = $dbh->query("SELECT count(user_id) FROM log where user_id = ".$userid)->fetchColumn(0);
		return $totalPrizesWon;
	}


	function banUser($userid) {
		global $dbh;
		$sql = "UPDATE users SET banned = 1 WHERE userID = ".$userid;
		$query = $dbh->prepare($sql);
		$query->execute();
	}


	//Stop specific users from winning
	function isUserBanned($userid){
		global $dbh;
		$isBanned = $dbh->query("SELECT banned FROM users where userID = ".$userid)->fetchColumn(0);
		if($isBanned == 1) {
			return true;
		} else {
			return false;
		}
	}