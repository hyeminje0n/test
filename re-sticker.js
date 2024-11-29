console.log("Custom JS loaded");

const stickerList = document.querySelectorAll(".sticker");
const board = document.querySelector("#board");
const clickcursor = document.querySelector(".cursor");

let clickCount = 0;
let isPress = false;
let target = null;
let prevPosX = 0;
let prevPosY = 0;
let z = 100;

function showStickerInBoard(e) {
	if (clickCount < stickerList.length) {
		const sticker = stickerList[clickCount];
		sticker.classList.add("show");
		clickCount++;
	}
}

function start(e) {
	target = e.target;
	prevPosX = e.clientX;
	prevPosY = e.clientY;
	isPress = true;

	target.style.zIndex = z;
	z += 10;
	document.addEventListener("mousemove", move);
	document.addEventListener("mouseup", end);
}

function move(e) {
	if (!isPress) return;

	const posX = e.clientX - prevPosX;
	const posY = e.clientY - prevPosY;

	prevPosX = e.clientX;
	prevPosY = e.clientY;

	// 새로운 위치 계산
	let newLeft = target.offsetLeft + posX;
	let newTop = target.offsetTop + posY;

	// 경계 확인 및 위치 조정
	if (newLeft < 0) newLeft = 0;
	if (newTop < 0) newTop = 0;
	if (newLeft + target.clientWidth > board.clientWidth)
		newLeft = board.clientWidth - target.clientWidth;
	if (newTop + target.clientHeight > board.clientHeight)
		newTop = board.clientHeight - target.clientHeight;

	// 위치 업데이트
	target.style.left = newLeft + "px";
	target.style.top = newTop + "px";
}

function end() {
	isPress = false;
	document.removeEventListener("mousemove", move);
	document.removeEventListener("mouseup", end);
}

board.addEventListener("click", (e) => {
	showStickerInBoard(e);
	// 클릭 시 커서 크기 변경
	clickcursor.style.transform = "scale(0.9)";
	// 0.1초 후에 원래 크기로 돌아옴
	setTimeout(() => {
		clickcursor.style.transform = "scale(1)";
	}, 100);
});

// 커서를 따라다니는 click div
board.addEventListener("mousemove", (e) => {
	// board 요소의 위치를 기준으로 상대 좌표 계산
	const boardRect = board.getBoundingClientRect();
	const mouseX = e.pageX - boardRect.left - window.scrollX;
	const mouseY = e.pageY - boardRect.top - window.scrollY;

	clickcursor.classList.remove("hide");
	if (clickCount === stickerList.length) {
		clickcursor.classList.add("hide");
		board.style.cursor = "pointer";
	}
	clickcursor.style.left = mouseX - 70 + "px";
	clickcursor.style.top = mouseY - 40 + "px";
});

board.addEventListener("mouseleave", () => {
	clickcursor.classList.add("hide"); // 커서 숨김
});

stickerList.forEach((sticker) => {
	sticker.style.backgroundColor = sticker.dataset.color; // 메모지 배경색 지정
	sticker.addEventListener("mousedown", start);
});

document.querySelector(".sticker--title").addEventListener("mouseenter", () => {
	gsap.to(".cursor", {
		scale: 1.6,
		duration: 0.6,
	});
});
document.querySelector(".sticker--title").addEventListener("mouseout", () => {
	gsap.to(".cursor", {
		scale: 1,
		duration: 0.3,
	});
});
