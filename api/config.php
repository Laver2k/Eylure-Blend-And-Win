<?php
	if ($_SERVER['SERVER_NAME'] == 'eyluregame.localhost') {

		try {
			$dbh = new PDO ('mysql:host=localhost;dbname=eylureGame', 'root', 'root');
			$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
		} catch(PDOException $e) {
			echo $e->getMessage();
			die();
		}
		
	} else {

		try {
			
			$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
		} catch(PDOException $e) {
			
			echo $e->getMessage();
			die();
		
		}
		
	}