/** Original JS credit: https://web.dev/patterns/theming/theme-switch/#js */

class ThemeSwitch extends HTMLElement {
	static disabledFeatures = ["shadow"];

	constructor() {
		super();
		this.storageKey = "theme-preference";
		this.theme = {
			value: this.getColorPreference(),
		};

		// Create the button element
		this.button = document.createElement("button");
		this.button.setAttribute("type", "button");
		this.button.setAttribute("id", "theme-toggle");
		this.button.setAttribute("title", "Toggle theme");
		this.button.innerHTML = "";

		// Attach the button to the shadow DOM
		// this.attachShadow({ mode: "open" });
		// this.shadowRoot.appendChild(this.button);
		this.appendChild(this.button);

		// Bind methods
		this.onClick = this.onClick.bind(this);
		this.reflectPreference();

		console.log(this.theme);
	}

	connectedCallback() {
		// Add event listeners when the element is added to the DOM
		this.button.addEventListener("click", this.onClick);
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", ({ matches: isDark }) => {
				this.theme.value = isDark ? "dark" : "light";
				this.setPreference();
			});
	}

	disconnectedCallback() {
		// Clean up event listeners when the element is removed
		this.button.removeEventListener("click", this.onClick);
	}

	onClick() {
		// flip current value
		this.theme.value = this.theme.value === "light" ? "dark" : "light";
		this.setPreference();
	}

	getColorPreference() {
		if (localStorage.getItem(this.storageKey)) {
			return localStorage.getItem(this.storageKey);
		}
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}

	setPreference() {
		localStorage.setItem(this.storageKey, this.theme.value);
		this.reflectPreference();
	}

	reflectPreference() {
		document.firstElementChild.setAttribute("data-theme", this.theme.value);
		this.button.setAttribute("aria-label", this.theme.value);
		this.button.innerHTML = this.theme.value === "light" ? "☀️" : "🌙";
	}
}

// Register the custom element
customElements.define("theme-switch", ThemeSwitch);
