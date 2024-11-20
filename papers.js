document.addEventListener("DOMContentLoaded", function () {
	const $papers = document.querySelectorAll(".paper");
	$papers.forEach((paper) => {
		let isClicked = false;
		const hoverTl = gsap.timeline({ paused: true });
		const clickTl = gsap.timeline({ paused: true });
		const hoverAnimation = hoverTl.to(paper, {
			y: -30,
		});
		const clickAnimation = clickTl.to(paper, {
			top: 0,
			width: "100vw",
			height: "105vh",
			zIndex: 10000,
			boxShadow: "",
		});

		paper.addEventListener("mouseover", () => {
			if (!isClicked) {
				hoverAnimation.play();
			}
		});

		paper.addEventListener("mouseleave", () => {
			if (!isClicked) {
				hoverAnimation.reverse();
			}
		});

		paper.addEventListener("click", () => {
			isClicked = !isClicked;
			if (isClicked) {
				clickAnimation.play();
			} else {
				clickAnimation.reverse();
			}
		});
	});
});
