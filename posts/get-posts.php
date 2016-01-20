<?php 
	error_reporting(E_ALL); ini_set('display_errors', '1');
	$posts = glob("*.html");
	$json = [];
	foreach ($posts as $post) {
		$file = ["title" => $post, "content" => file_get_contents($post), "data" => filemtime($post)]
		array_push($json, $file);
	}
	echo json_encode($json);
 ?>