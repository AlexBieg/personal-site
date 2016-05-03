'use strict';
$(function(){
	var $win = $(window),
		$html = $('html'),
        $up = $('#up'),
		$down = $('#down'),
		$cube = $('#cube'),
		$bcList = $('.breadcrumbs li'),
		$faces = $cube.find('div.face'),
		facesLength = $faces.length,
		activeFaceIndex = 0,
		$faceContent = $('div.face-content'),
		theta = 360 / Math.max(4, facesLength),
		radius,
		transformOrigin = prefix.css + 'transform-origin',
		transform = prefix.css + 'transform',
		transition = prefix.css + 'transition',
		clientY,
		cubeRotation = 0,
		cubeYRotation = 0,
		cubeZRotation = 0,
		cubeZTranslation,
		scrollDirection,
		canScroll = true,
		autoRotateTimeout,
		isTouch = 'ontouchstart' in document,
		pointerStart = isTouch ? 'touchstart' : 'mousedown',
		pointerEnd = isTouch ? 'touchend' : 'mouseup',
		pointerMove = isTouch ? 'touchmove' : 'mousemove',
		faceCounter = 0,
		startCubeRotation = cubeRotation;

	function setFaceTransforms() {
		radius = Math.floor(($win.height() / 2) / Math.tan(Math.PI / facesLength));
		cubeZTranslation = radius;
		for (var f = 0; f < facesLength; f++) {
			var angle = prefix.lowercase !== 'ms' ? theta * -f : 360 - theta * f;

			$faces
				.eq(f)
				.css({
					transform: 'rotateX(' + angle + 'deg) translateZ(' + radius + 'px)'
				});
		}

		$cube.css({
			transformOrigin: '50% 50% -' + radius + 'px'
		});

        setCubeTransform();
	}

	function rotateToFace() {
		canScroll = false;

		if (scrollDirection == -1) {
			cubeRotation = Math.floor(cubeRotation / theta) * theta;
			faceCounter--;
		} else {
			cubeRotation = Math.ceil(cubeRotation / theta) * theta;
			faceCounter++;
		}

		if (faceCounter > 3) {
			faceCounter = 0;
		} else if (faceCounter < 0) {
			faceCounter = 3;
		}

		changeBreadcrumbs();

		var url = window.location.href.substr(0, window.location.href.length-1);
		window.location.href = url + faceCounter;

        if (prefix.lowercase !== 'ms') {
            $cube.css({
                transition: 'all 1s'
            });
		} else {
            $faces.css({
                transition: 'all 1s'
            });
        }
		activeFaceIndex = Math.abs((cubeRotation / theta + $faces.length * 100) % $faces.length);

		$faces
			.removeClass('active')
			.eq(activeFaceIndex)
				.addClass('active');

		setCubeTransform();

		setTimeout(removeTransition, 1400);
	}

	function removeTransition() {
		canScroll = true;

        if (prefix.lowercase !== 'ms') {
            $cube.css({
                transition: 'none'
            });
        } else {
            $faces.css({
                transition: 'none'
            });
        }
   	}

	function getClientY(e) {
		var originalEvent = e.originalEvent ? e.originalEvent : e,
			currentClientY = isTouch ? e.originalEvent.touches[0].clientY : e.clientY;
		return currentClientY;
	}

	function rotateCubeToMouse(e) {
		cubeYRotation = e.pageX / $win.width() * 4 - 2;
		cubeZRotation = e.pageY / $win.height() * 4 - 2;
		setCubeTransform();
	}

	function rotateContentToMouse(e) {
		var contentYRotation = e.pageX / $win.width() * 2 - 1,
			contentXRotation = e.pageY / $win.height() * -2 + 1;

		setContentTransform(contentXRotation, contentYRotation);
	}

	function dragHandler(e) {
		var newClientY = getClientY(e);

		e.preventDefault();

		if (canScroll) {
			if (newClientY > clientY) {
				cubeRotation -= (newClientY - clientY) / 8;
				scrollDirection = -1;
			} else {
				cubeRotation += (clientY - newClientY) / 8;
				scrollDirection = 1;
			}


			setCubeTransform();
		}

		clientY = newClientY;
	}

	function setupDraghandler(e) {
		if (canScroll && e.target.id != 'up' && e.target.id != 'down') {
			startCubeRotation = cubeRotation;
            clientY = getClientY(e);
            $win.bind(pointerMove, $.throttle(10, dragHandler));
        } else if (!canScroll) {
			e.preventDefault();
		}
	}

	function destroyDraghandler(e) {
		if (canScroll && e.target.id != 'up' && e.target.id != 'down') {
            $win.unbind(pointerMove, dragHandler);
			if (startCubeRotation != cubeRotation) {
				rotateToFace();
			}
            scrollDirection = null;
        } else if (!canScroll) {
			e.preventDefault();
		}
	}

	function wheelHandler(e) {
		if (canScroll) {
			if (e.deltaY < 0) {
				scrollDirection = 1;
			} else {
				scrollDirection = -1;
			}

            cubeRotation += scrollDirection;

			setCubeTransform();

			rotateToFace();
		}
	}

    function keyHandler(e) {
        var which = e.which;

        if (canScroll) {
            if (which === 38) {
                scrollDirection = -1;
                cubeRotation--;
            } else if (which === 40) {
                scrollDirection = 1;
                cubeRotation++;
            }

            setCubeTransform();

			rotateToFace();
        }
    }

	function setCubeTransform() {
        if (prefix.lowercase !== 'ms') {
            $cube.css({
                transform: 'rotateX(' + cubeRotation + 'deg) rotateY(' + cubeYRotation + 'deg) rotateZ(' + cubeZRotation + 'deg) translateZ(-' + cubeZTranslation + 'px)'
            });
        } else {
            $faces.each(function(){
                var $this = $(this);
                $this.css({
                    transform: 'rotateX(' + (360 - cubeRotation + (90 * $faces.index($this))) + 'deg) rotateY(' + cubeYRotation + 'deg) rotateZ(' + cubeZRotation + 'deg) translateZ(-' + radius + 'px)'
                });
            });
        }
	}

	function setContentTransform(contentXRotation, contentYRotation) {
		$faceContent.css({
			transform: 'rotateX(' + contentXRotation + 'deg) rotateY(' + contentYRotation + 'deg) translateX(-50%) translateY(-50%) translateZ(100px)'
		});
	}

	function up() {
        if (canScroll) {
            scrollDirection = -1;
            cubeRotation--;
            setCubeTransform();
            rotateToFace();
        }
	}

	function down() {
        if (canScroll) {
            scrollDirection = 1;
            cubeRotation++;
            setCubeTransform();
            rotateToFace();
        }
	}

	function setupEventHandlers() {
		$win.resize($.throttle(250, setFaceTransforms));
		$win.bind(pointerStart, setupDraghandler);
		$win.bind(pointerEnd, destroyDraghandler);
		if (pointerStart.indexOf('touch') === -1) {
			$win.bind('mousemove', $.throttle(20, rotateContentToMouse));
		}
		$win.bind('mousewheel', wheelHandler);
		$win.bind('keydown', keyHandler);
		// $up.bind('click', up);
		// $down.bind('click', down);
	}

	function changeBreadcrumbs() {
		$bcList.css("color", "gray");
		$($bcList.get(faceCounter)).css("color", "white")
	}

	function init() {
		setupEventHandlers();
		setFaceTransforms();

		if (window.location.href.endsWith("#0") ||
			window.location.href.endsWith("#1") ||
			window.location.href.endsWith("#2") ||
			window.location.href.endsWith("#3")) {
			//go to that face
			faceCounter = parseInt(window.location.href.substr(-1));
			scrollDirection = 1;
			var temp = faceCounter;
			for (var i = 0; i < temp; i++) {
				cubeRotation += 90;
			}
			setCubeTransform();
            rotateToFace();

			faceCounter = temp;
			var url = window.location.href.substr(0, window.location.href.length-1);
			window.location.href = url + faceCounter;
		} else {
			//start on regular face
			window.location.href = window.location.href + "#0"
		}
		changeBreadcrumbs();
	}

	init();
});
