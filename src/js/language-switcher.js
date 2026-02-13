import translations from './translations.js';

class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || 'fr';
        this.init();
    }

    init() {
        // Apply initial language
        this.applyLanguage(this.currentLang);

        // Wait for DOM to be ready to attach event listeners
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.attachSwitcher());
        } else {
            this.attachSwitcher();
        }
    }

    attachSwitcher() {
        const switcherBtn = document.getElementById('langSwitcher');
        if (switcherBtn) {
            switcherBtn.addEventListener('click', () => {
                this.toggleLanguage();
            });
            this.updateSwitcherUI(switcherBtn);
        }
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'fr' ? 'en' : 'fr';
        localStorage.setItem('preferredLanguage', this.currentLang);
        this.applyLanguage(this.currentLang);

        const switcherBtn = document.getElementById('langSwitcher');
        if (switcherBtn) {
            this.updateSwitcherUI(switcherBtn);
        }
    }

    updateSwitcherUI(btn) {
        btn.textContent = this.currentLang.toUpperCase() === 'FR' ? 'EN' : 'FR';
        // Optional: add a class for active language if you have multiple buttons
    }

    applyLanguage(lang) {
        document.documentElement.lang = lang;
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Special handling for placeholders or attributes if needed
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.placeholder) el.placeholder = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        // Handle title update if needed
        const pageTitleKey = `title-${window.location.pathname.split('/').pop().replace('.html', '') || 'home'}`;
        if (translations[lang] && translations[lang][pageTitleKey]) {
            document.title = translations[lang][pageTitleKey];
        }
    }
}

// Global instance
window.langSwitcher = new LanguageSwitcher();
