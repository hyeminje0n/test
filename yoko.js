document.addEventListener("DOMContentLoaded", function () {
	// GSAP 및 ScrollTrigger가 정상적으로 로드된 후 실행
	if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
		gsap.registerPlugin(ScrollTrigger);

		const $scrollContainer = document.querySelectorAll(".scroll-container");

		if ($scrollContainer) {
			$scrollContainer.forEach((wrapper) => {
				const inner = wrapper.querySelector(".scroll-list");
				gsap.to(inner, {
					x: () =>
						-(inner.scrollWidth - document.documentElement.clientWidth) + "px",
					ease: "none",
					scrollTrigger: {
						start: "top",
						trigger: wrapper,
						duration: 10,
						pin: true,
						scrub: 1,
						invalidateOnRefresh: true,
						end: () => `+=${inner.offsetWidth}`,
					},
				});
			});
		}
	} else {
		console.error("GSAP or ScrollTrigger is not loaded");
	}
});
