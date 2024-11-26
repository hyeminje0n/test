const container = document.querySelector(".swipe");

container.addEventListener("wheel", (event) => {
	event.preventDefault();
	const scrollAmount = event.deltaY * 2; // 휠 스크롤 속도 조절
	gsap.to(container, {
		scrollLeft: container.scrollLeft + scrollAmount,
		duration: 0.5,
	});
});
