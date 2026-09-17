const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
const scrollTop = document.querySelector('.scroll-top');

menuToggle?.addEventListener('click', () => {
	const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
	menuToggle.setAttribute('aria-expanded', String(!isOpen));
	menuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
	primaryNav?.classList.toggle('is-open', !isOpen);
});

document.querySelectorAll('.primary-nav a').forEach((link) => link.addEventListener('click', () => {
	menuToggle?.setAttribute('aria-expanded', 'false');
	primaryNav?.classList.remove('is-open');
}));

const updateScrollState = () => {
	header?.classList.toggle('is-scrolled', window.scrollY > 16);
	scrollTop?.classList.toggle('is-visible', window.scrollY > 500);
};
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();
scrollTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const revealObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('is-visible');
			revealObserver.unobserve(entry.target);
		}
	});
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const form = document.querySelector('#appointment-form');
form?.addEventListener('submit', (event) => {
	event.preventDefault();
	const status = form.querySelector('.form-status');
	const requiredFields = [...form.querySelectorAll('[required]')];
	const missing = requiredFields.find((field) => !field.value.trim());
	if (missing) {
		status.textContent = 'Please complete the required fields before submitting.';
		status.className = 'form-status error';
		missing.focus();
		return;
	}
	status.textContent = 'Thank you. Your request has been recorded for hospital confirmation.';
	status.className = 'form-status success';
	form.reset();
});
