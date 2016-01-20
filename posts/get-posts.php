<?php 
	$posts = glob("*.html");
	$json = [];
	foreach ($posts as $post) {
		$file = ["title" => $post, "content" => file_get_contents($post), "data" => date ("F d Y", filemtime($post))]
		array_push($json, $file);
	}
	echo json_encode($json);
 ?>