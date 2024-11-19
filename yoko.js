gsap.registerPlugin(ScrollTrigger);
const container = document.querySelector(".scroll-container");

if (container) {
	const inner = document.querySelector(".scroll-list");
	gsap.to(inner, {
		x: () => -(inner.scrollWidth - document.documentElement.clientWidth) + "px",
		ease: "none",
		scrollTrigger: {
			start: "top",
			trigger: container,
			duration: 10,
			pin: true,
			scrub: 1,
			invalidateOnRefresh: true,
			end: () => `+=${inner.offsetWidth}`,
		},
	});
}
