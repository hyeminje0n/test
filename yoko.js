gsap.registerPlugin(ScrollTrigger);
const container = document.querySelectorAll(".scroll-container");

if (container) {
	container.forEach((wrapper) => {
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
