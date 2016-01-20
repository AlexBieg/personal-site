<?php 
	header("Content-type: text/plain"); 
	$name = "";
	$gender = "";

	if (isset($_GET["name"])) {
		$name = $_GET["name"];
	}

	if (isset($_GET["gender"])) {
		$gender = $_GET["gender"];
	}

	$babynames = file("names.txt");
	$meanings = file("meanings.txt");

	$matched = "Name not found";
	$meaning = "No meaning found";

	foreach ($babynames as $line) {
		if(preg_match("/^".$name."\s".$gender."/i", $line)){
			$matched = $line;
		}
	}

	foreach ($meanings as $meanline) {
		if (preg_match("/^".$name."\s".$gender."/i", $meanline)) {
			$meaning = $meanline;
		}
	}

	if($matched == "Name not found"){
		header('HTTP/1.1 500 Internal Server Booboo');
	}else{
		list($name, $gender, $years) = explode(" ", $matched, 3);
		$data = array(
			"name" => $name,
			"meaning" => $meaning,
			"start" => 1890,
			"rank" => explode(" ", $years)
		);
	}

	print json_encode($data);
 ?>