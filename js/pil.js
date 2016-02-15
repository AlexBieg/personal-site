function showImgs(img, div) {
	return function() {
		img.show();
		div.remove();
	}
}

function getImageSize(img, callback) {
	var $img = $(img);
	var wait = setInterval(function() {
		var w = $img.width();
		var h = $img.height();
		if (w && h) {
			clearInterval(wait);
			callback($img, w, h);
		}
	}, 30);
}

function createPlaceholder(img, width, height) {
	$div = $("<div>");

	//Set width
	if (img.attr("pil-width") == null) {
		$div.width(width);
	} else {
		$div.width(img.attr("pil-width"));
	}

	//Set height
	if (img.attr("pil-height") == null){
		$div.height(height);
	} else {
		$div.height(img.attr("pil-height"));
	}

	//Add Styles
	if (img.attr("pil-style") == null || img.attr("pil-style").toLowerCase() != "false" ) {
		$div.css({
			"display" : "inline-block"
		});
	}

	//Add Classes
	$div.addClass("pil-placeholder");
	if(img.attr("pil-class") == null) {
		$div.addClass(img.attr("class"));
	} else {
		$div.addClass(img.attr("pil-class"));
	}
	return $div;
}

$(function() {
	var $imgs = $(".pil-load");
	console.log("loaded pil");
	$imgs.each(function() {
		$img = $(this);
		if (!$img[0].complete) {
			$img.hide();
			getImageSize($img, function($img, width, height) {
				createPlaceholder($img, width, height).insertAfter($img);
				$img.load(showImgs($img, $div));
			});
		}
	});
});
