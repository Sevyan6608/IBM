/**
 * Multilingual Translation System
 * Supports Bulgarian (bg) and English (en)
 */

const translations = {
    bg: {
        // Meta & SEO
        meta: {
            title: "IBM решения за бизнеса от A1 България",
            description: "IBM решения за растеж и устойчивост на Вашия бизнес от A1 България",
            keywords: "IBM Storage, IBM Maximo IT, IBM Watsonx, A1 България, IT решения",
            ogTitle: "IBM решения от A1 България",
            ogDescription: "Технологични решения за сигурност, ефективност и интелигентна автоматизация"
        },

        // Navigation
        nav: {
            whyChooseUs: "Защо да изберете нас",
            businessSolutions: "Решения за бизнеса",
            contacts: "Контакти",
            darkMode: "Тъмен режим",
            requestConsultation: "Заявете консултация",
            skipToContent: "Към основното съдържание",
            menuAriaLabel: "Меню"
        },

        // Hero Section
        hero: {
            mainTitle: "IBM решения за растеж и устойчивост",
            mainTitleHighlight: "на Вашия бизнес от A1 България",
            ctaButton: "Заявете консултация сега",
            storageTitle: "IBM Storage",
            storageDesc: "Сигурно съхранение на данни",
            maximoTitle: "IBM Maximo IT",
            maximoDesc: "Управление на IT активи",
            watsonxTitle: "IBM WatsonX",
            watsonxDesc: "Генеративен AI за Вашия бизнес",
            learnMore: "Научете повече"
        },

        // Tech Solutions Section
        techSolutions: {
            title: "Технологични решения",
            titleHighlight: " за сигурност, ефективност и интелигентна автоматизация.",

            // USP Cards
            usp1Title: "Професионално внедряване",
            usp1Desc: "Експертна имплементация на решения, адаптирани към Вашите нужди",
            usp2Title: "SLA-ориентиран подход",
            usp2Desc: "Гарантирано качество на услугите с ясно дефинирани нива на обслужване",
            usp3Title: "Локална <br>експертиза",
            usp3Desc: "Специалисти с дълбоко познаване на местния пазар",

            ctaButton: "Заявете консултация сега",

            // Challenges
            challengesTitle: "Предизвикателства, които срещаме често:",
            challenge1: "Растящи разходи и комплексност на инфраструктурата",
            challenge2: "Липса на достатъчна видимост върху критични активи и процеси",
            challenge3: "Неяснота около генеративния AI, сигурността на данните и регулациите",

            // Solutions
            solutionsTitle: "Как намираме решение и добавяме стойност за Вас:",
            solution1: "Консолидирано и защитено съхранение на Вашите данни",
            solution2: "Единна платформа за управление на активи, поддръжка и надеждност",
            solution3: "Генеративен AI с контрол на данните и управление на риска"
        },

        // Products Section
        products: {
            sectionTitle: "IBM решения за бизнеса от A1 България",
            featuresTitle: "Основни характеристики и USP:",
            ctaButton: "Заявете консултация сега",

            // IBM Storage
            storage: {
                title: "IBM Storage",
                tagline: "Сигурно и ефективно съхранение на данни, оптимизирано за съвременните кибер заплахи",
                description: "IBM Storage предоставя висока производителност и киберустойчивост, за да защити бизнес-критичните ви системи и данни. Консолидирате натоварванията и улеснявате управлението на мащаби от данни.",
                feature1: "Непроменяеми копия и ускорено възстановяване при инциденти",
                feature2: "Консолидация на блок/файл/обект в една архитектура",
                feature3: "Гъвкави модели на внедряване (on-prem, хибридни среди)"
            },

            // IBM Maximo
            maximo: {
                title: "IBM Maximo IT",
                tagline: "Професионално управление на Вашите IT активи с актуални данни в реално време",
                description: "IBM Maximo обединява EAM/APM/мониторинг, за да увеличи наличността и да намали непланираните прекъсания. Вземете решения на база реални данни и оптимизирайте ресурсите по целия жизнен цикъл на Вашите активи.",
                feature1: "Централизирана система за управление на всички видове IT актив - хардуер и софтуер",
                feature2: "Предиктивна поддръжка и оптимизиране на ресурсите",
                feature3: "Постигане на съответствие със стандарти и регулации"
            },

            // IBM Watsonx
            watsonx: {
                title: "IBM Watsonx",
                tagline: "Генеративен AI за Вашия бизнес за ефективна комуникация и управление на сигурността",
                description: "Внедряване и управление на генеративни AI агенти, които автоматизират работни процеси с лесен за употреба интерфейс, предварително създадени шаблони за разговори и drag & drop функционалност.",
                feature1: "Внедряване и стартиране на AI агенти за минути, а не за месеци",
                feature2: "Предварително изградени AI агенти с вградена логика",
                feature3: "Интегриране на AI агенти в приложенията, работните процеси и системите, които вече използвате"
            }
        },

        // Contact Section
        contact: {
            sectionTitle: "Заявете консултация с експерт",
            nextStepsTitle: "Следващи стъпки",
            step1: "1. След като подадете заявката, нашият екип от експерти ще се свърже с Вас в рамките на 24 часа.",
            step2: "2. Ще обсъдим Вашите специфични нужди и ще предложим персонализирано решение, адаптирано към Вашия бизнес.",
            freeConsultation: "Всяка консултация е напълно безплатна и без ангажименти.",

            // Form
            form: {
                companyLabel: "Компания",
                nameLabel: "Имена",
                phoneLabel: "Номер за връзка",
                phonePlaceholder: "+359 888 123 456",
                emailLabel: "Email",
                serviceLabel: "За коя услуга",
                serviceDefault: "Изберете услуга",
                serviceStorage: "IBM Storage",
                serviceMaximo: "IBM Maximo IT",
                serviceWatsonx: "IBM Watsonx",
                serviceMultiple: "Повече от една",
                consentText: "Съгласен съм с обработката на моите лични данни съгласно",
                privacyLink: "Политиката за поверителност",
                consentSuffix: "на A1 България",
                submitButton: "Заявете консултация сега",
                required: "*"
            }
        },

        // Footer
        footer: {
            aboutA1: "За А1",
            aboutUs: "За нас",
            network5g: "5G мрежа",
            awards: "Награди",

            careers: "Кариери",
            careerPortal: "Кариерен портал",
            becomePartner: "Стани партньор на А1",

            mediaCenter: "Медия център",
            news: "Новини",
            sponsorships: "Спонсорства",

            help: "Помощ",
            stores: "Магазини",
            terms: "Общи условия",
            dataManagement: "Управление на лични данни",

            devices: "Устройства",
            smartphones: "Смартфони",
            tvs: "Телевизори",
            laptops: "Лаптопи",
            accessories: "Аксесоари",

            copyright: "© 2025 А1 България. Всички права запазени.",
            backToTop: "Обратно нагоре"
        }
    },

    en: {
        // Meta & SEO
        meta: {
            title: "IBM Business Solutions from A1 Bulgaria",
            description: "IBM solutions for growth and sustainability of your business from A1 Bulgaria",
            keywords: "IBM Storage, IBM Maximo IT, IBM Watsonx, A1 Bulgaria, IT solutions",
            ogTitle: "IBM Solutions from A1 Bulgaria",
            ogDescription: "Technology solutions for security, efficiency and intelligent automation"
        },

        // Navigation
        nav: {
            whyChooseUs: "Why Choose Us",
            businessSolutions: "Business Solutions",
            contacts: "Contact",
            darkMode: "Dark Mode",
            requestConsultation: "Request Consultation",
            skipToContent: "Skip to main content",
            menuAriaLabel: "Menu"
        },

        // Hero Section
        hero: {
            mainTitle: "IBM solutions for growth and sustainability",
            mainTitleHighlight: "of your business from A1 Bulgaria",
            ctaButton: "Request Consultation Now",
            storageTitle: "IBM Storage",
            storageDesc: "Secure data storage",
            maximoTitle: "IBM Maximo IT",
            maximoDesc: "IT asset management",
            watsonxTitle: "IBM WatsonX",
            watsonxDesc: "Generative AI for your business",
            learnMore: "Learn More"
        },

        // Tech Solutions Section
        techSolutions: {
            title: "Technology solutions",
            titleHighlight: " for security, efficiency and intelligent automation.",

            // USP Cards
            usp1Title: "Professional Implementation",
            usp1Desc: "Expert implementation of solutions tailored to your needs",
            usp2Title: "SLA-Oriented Approach",
            usp2Desc: "Guaranteed service quality with clearly defined service levels",
            usp3Title: "Local <br>Expertise",
            usp3Desc: "Specialists with deep knowledge of the local market",

            ctaButton: "Request Consultation Now",

            // Challenges
            challengesTitle: "Common challenges we encounter:",
            challenge1: "Growing costs and infrastructure complexity",
            challenge2: "Lack of sufficient visibility into critical assets and processes",
            challenge3: "Uncertainty about generative AI, data security and regulations",

            // Solutions
            solutionsTitle: "How we find solutions and add value for you:",
            solution1: "Consolidated and secure storage of your data",
            solution2: "Unified platform for asset management, maintenance and reliability",
            solution3: "Generative AI with data control and risk management"
        },

        // Products Section
        products: {
            sectionTitle: "IBM Business Solutions from A1 Bulgaria",
            featuresTitle: "Key Features and USP:",
            ctaButton: "Request Consultation Now",

            // IBM Storage
            storage: {
                title: "IBM Storage",
                tagline: "Secure and efficient data storage, optimized for modern cyber threats",
                description: "IBM Storage provides high performance and cyber resilience to protect your business-critical systems and data. Consolidate workloads and simplify management of data at scale.",
                feature1: "Immutable copies and accelerated recovery from incidents",
                feature2: "Consolidation of block/file/object in one architecture",
                feature3: "Flexible deployment models (on-prem, hybrid environments)"
            },

            // IBM Maximo
            maximo: {
                title: "IBM Maximo IT",
                tagline: "Professional management of your IT assets with real-time data",
                description: "IBM Maximo unifies EAM/APM/monitoring to increase availability and reduce unplanned outages. Make decisions based on real data and optimize resources throughout the entire lifecycle of your assets.",
                feature1: "Centralized system for managing all types of IT assets - hardware and software",
                feature2: "Predictive maintenance and resource optimization",
                feature3: "Achieving compliance with standards and regulations"
            },

            // IBM Watsonx
            watsonx: {
                title: "IBM Watsonx",
                tagline: "Generative AI for your business for effective communication and security management",
                description: "Deploy and manage generative AI agents that automate workflows with an easy-to-use interface, pre-built conversation templates and drag & drop functionality.",
                feature1: "Deploy and launch AI agents in minutes, not months",
                feature2: "Pre-built AI agents with embedded logic",
                feature3: "Integrate AI agents into the applications, workflows and systems you already use"
            }
        },

        // Contact Section
        contact: {
            sectionTitle: "Request a Consultation with an Expert",
            nextStepsTitle: "Next Steps",
            step1: "1. After you submit your request, our team of experts will contact you within 24 hours.",
            step2: "2. We will discuss your specific needs and offer a personalized solution tailored to your business.",
            freeConsultation: "Every consultation is completely free and without obligations.",

            // Form
            form: {
                companyLabel: "Company",
                nameLabel: "Name",
                phoneLabel: "Contact Number",
                phonePlaceholder: "+359 888 123 456",
                emailLabel: "Email",
                serviceLabel: "Service of Interest",
                serviceDefault: "Select service",
                serviceStorage: "IBM Storage",
                serviceMaximo: "IBM Maximo IT",
                serviceWatsonx: "IBM Watsonx",
                serviceMultiple: "More than one",
                consentText: "I agree to the processing of my personal data according to the",
                privacyLink: "Privacy Policy",
                consentSuffix: "of A1 Bulgaria",
                submitButton: "Request Consultation Now",
                required: "*"
            }
        },

        // Footer
        footer: {
            aboutA1: "About A1",
            aboutUs: "About Us",
            network5g: "5G Network",
            awards: "Awards",

            careers: "Careers",
            careerPortal: "Career Portal",
            becomePartner: "Become an A1 Partner",

            mediaCenter: "Media Center",
            news: "News",
            sponsorships: "Sponsorships",

            help: "Help",
            stores: "Stores",
            terms: "Terms & Conditions",
            dataManagement: "Personal Data Management",

            devices: "Devices",
            smartphones: "Smartphones",
            tvs: "TVs",
            laptops: "Laptops",
            accessories: "Accessories",

            copyright: "© 2025 A1 Bulgaria. All rights reserved.",
            backToTop: "Back to Top"
        }
    }
};

/**
 * Language Manager
 * Handles language switching and content updates
 */
class LanguageManager {
    constructor() {
        // Detect language from URL first, then localStorage, then default to 'bg'
        this.currentLang = this.getLanguageFromURL() || 'bg';
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLang, false);

        // Add event listeners for language switcher
        document.addEventListener('DOMContentLoaded', () => {
            this.attachEventListeners();
        });
    }

    getLanguageFromURL() {
        const path = window.location.pathname;
        // Check if we're in the /en directory
        if (path.includes('/en/') || path.endsWith('/en')) {
            return 'en';
        }
        return 'bg'; // Default to Bulgarian for root
    }

    getStoredLanguage() {
        try {
            return localStorage.getItem('preferredLanguage');
        } catch (e) {
            return null;
        }
    }

    setStoredLanguage(lang) {
        try {
            localStorage.setItem('preferredLanguage', lang);
        } catch (e) {
            console.warn('Could not save language preference');
        }
    }

    attachEventListeners() {
        const langButtons = document.querySelectorAll('[data-lang]');
        langButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetLang = button.getAttribute('data-lang');

                // Don't redirect if already on the correct language
                if (targetLang === this.currentLang) {
                    return;
                }

                // Get the current path and origin
                const origin = window.location.origin;
                const currentPath = window.location.pathname;

                // Determine the base path (remove /en if present)
                let basePath = currentPath.replace(/\/en\/?/, '/');
                // Remove trailing slashes except for root
                if (basePath !== '/') {
                    basePath = basePath.replace(/\/+$/, '');
                }
                // Ensure it starts with /
                if (!basePath.startsWith('/')) {
                    basePath = '/' + basePath;
                }

                // Navigate to the appropriate URL
                if (targetLang === 'en') {
                    // If basePath is root, go to /en/
                    // Otherwise, insert /en before the rest of the path
                    const newPath = basePath === '/' ? '/en/' : basePath.replace(/^\//, '/en/');
                    window.location.href = origin + newPath;
                } else if (targetLang === 'bg') {
                    // Go to root or the path without /en
                    window.location.href = origin + basePath;
                }
            });
        });
    }

    setLanguage(lang, updateStorage = true) {
        if (!translations[lang]) {
            console.error(`Language ${lang} not found`);
            return;
        }

        this.currentLang = lang;

        if (updateStorage) {
            this.setStoredLanguage(lang);
        }

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update all translatable content
        this.updateContent();

        // Update meta tags
        this.updateMetaTags();

        // Update active state on language buttons
        this.updateLanguageSwitcher();

        // Dispatch custom event for other scripts
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    updateContent() {
        const t = translations[this.currentLang];

        // Navigation
        this.setText('[data-i18n="nav.whyChooseUs"]', t.nav.whyChooseUs);
        this.setText('[data-i18n="nav.businessSolutions"]', t.nav.businessSolutions);
        this.setText('[data-i18n="nav.contacts"]', t.nav.contacts);
        this.setText('[data-i18n="nav.darkMode"]', t.nav.darkMode);
        this.setText('[data-i18n="nav.requestConsultation"]', t.nav.requestConsultation);
        this.setText('[data-i18n="nav.skipToContent"]', t.nav.skipToContent);
        this.setAttr('[data-i18n="nav.menuAriaLabel"]', 'aria-label', t.nav.menuAriaLabel);

        // Hero Section
        this.setText('[data-i18n="hero.mainTitle"]', t.hero.mainTitle);
        this.setText('[data-i18n="hero.mainTitleHighlight"]', t.hero.mainTitleHighlight);
        this.setText('[data-i18n="hero.ctaButton"]', t.hero.ctaButton);
        this.setText('[data-i18n="hero.storageTitle"]', t.hero.storageTitle);
        this.setText('[data-i18n="hero.storageDesc"]', t.hero.storageDesc);
        this.setText('[data-i18n="hero.maximoTitle"]', t.hero.maximoTitle);
        this.setText('[data-i18n="hero.maximoDesc"]', t.hero.maximoDesc);
        this.setText('[data-i18n="hero.watsonxTitle"]', t.hero.watsonxTitle);
        this.setText('[data-i18n="hero.watsonxDesc"]', t.hero.watsonxDesc);
        this.setText('[data-i18n="hero.learnMore"]', t.hero.learnMore);

        // Tech Solutions
        this.setText('[data-i18n="techSolutions.title"]', t.techSolutions.title);
        this.setHTML('[data-i18n="techSolutions.titleHighlight"]', t.techSolutions.titleHighlight);
        this.setText('[data-i18n="techSolutions.usp1Title"]', t.techSolutions.usp1Title);
        this.setText('[data-i18n="techSolutions.usp1Desc"]', t.techSolutions.usp1Desc);
        this.setText('[data-i18n="techSolutions.usp2Title"]', t.techSolutions.usp2Title);
        this.setText('[data-i18n="techSolutions.usp2Desc"]', t.techSolutions.usp2Desc);
        this.setHTML('[data-i18n="techSolutions.usp3Title"]', t.techSolutions.usp3Title);
        this.setText('[data-i18n="techSolutions.usp3Desc"]', t.techSolutions.usp3Desc);
        this.setText('[data-i18n="techSolutions.ctaButton"]', t.techSolutions.ctaButton);
        this.setText('[data-i18n="techSolutions.challengesTitle"]', t.techSolutions.challengesTitle);
        this.setText('[data-i18n="techSolutions.challenge1"]', t.techSolutions.challenge1);
        this.setText('[data-i18n="techSolutions.challenge2"]', t.techSolutions.challenge2);
        this.setText('[data-i18n="techSolutions.challenge3"]', t.techSolutions.challenge3);
        this.setText('[data-i18n="techSolutions.solutionsTitle"]', t.techSolutions.solutionsTitle);
        this.setText('[data-i18n="techSolutions.solution1"]', t.techSolutions.solution1);
        this.setText('[data-i18n="techSolutions.solution2"]', t.techSolutions.solution2);
        this.setText('[data-i18n="techSolutions.solution3"]', t.techSolutions.solution3);

        // Products
        this.setText('[data-i18n="products.sectionTitle"]', t.products.sectionTitle);
        this.setText('[data-i18n="products.featuresTitle"]', t.products.featuresTitle);
        this.setText('[data-i18n="products.ctaButton"]', t.products.ctaButton);

        // IBM Storage
        this.setText('[data-i18n="products.storage.title"]', t.products.storage.title);
        this.setText('[data-i18n="products.storage.tagline"]', t.products.storage.tagline);
        this.setText('[data-i18n="products.storage.description"]', t.products.storage.description);
        this.setText('[data-i18n="products.storage.feature1"]', t.products.storage.feature1);
        this.setText('[data-i18n="products.storage.feature2"]', t.products.storage.feature2);
        this.setText('[data-i18n="products.storage.feature3"]', t.products.storage.feature3);

        // IBM Maximo
        this.setText('[data-i18n="products.maximo.title"]', t.products.maximo.title);
        this.setText('[data-i18n="products.maximo.tagline"]', t.products.maximo.tagline);
        this.setText('[data-i18n="products.maximo.description"]', t.products.maximo.description);
        this.setText('[data-i18n="products.maximo.feature1"]', t.products.maximo.feature1);
        this.setText('[data-i18n="products.maximo.feature2"]', t.products.maximo.feature2);
        this.setText('[data-i18n="products.maximo.feature3"]', t.products.maximo.feature3);

        // IBM Watsonx
        this.setText('[data-i18n="products.watsonx.title"]', t.products.watsonx.title);
        this.setText('[data-i18n="products.watsonx.tagline"]', t.products.watsonx.tagline);
        this.setText('[data-i18n="products.watsonx.description"]', t.products.watsonx.description);
        this.setText('[data-i18n="products.watsonx.feature1"]', t.products.watsonx.feature1);
        this.setText('[data-i18n="products.watsonx.feature2"]', t.products.watsonx.feature2);
        this.setText('[data-i18n="products.watsonx.feature3"]', t.products.watsonx.feature3);

        // Contact
        this.setText('[data-i18n="contact.sectionTitle"]', t.contact.sectionTitle);
        this.setText('[data-i18n="contact.nextStepsTitle"]', t.contact.nextStepsTitle);
        this.setText('[data-i18n="contact.step1"]', t.contact.step1);
        this.setText('[data-i18n="contact.step2"]', t.contact.step2);
        this.setText('[data-i18n="contact.freeConsultation"]', t.contact.freeConsultation);

        // Form
        this.setHTML('[data-i18n="contact.form.companyLabel"]', t.contact.form.companyLabel + ' <span class="required">*</span>');
        this.setHTML('[data-i18n="contact.form.nameLabel"]', t.contact.form.nameLabel + ' <span class="required">*</span>');
        this.setHTML('[data-i18n="contact.form.phoneLabel"]', t.contact.form.phoneLabel + ' <span class="required">*</span>');
        this.setAttr('[data-i18n="contact.form.phonePlaceholder"]', 'placeholder', t.contact.form.phonePlaceholder);
        this.setHTML('[data-i18n="contact.form.emailLabel"]', t.contact.form.emailLabel + ' <span class="required">*</span>');
        this.setHTML('[data-i18n="contact.form.serviceLabel"]', t.contact.form.serviceLabel + ' <span class="required">*</span>');
        this.setText('[data-i18n="contact.form.serviceDefault"]', t.contact.form.serviceDefault);
        this.setText('[data-i18n="contact.form.serviceStorage"]', t.contact.form.serviceStorage);
        this.setText('[data-i18n="contact.form.serviceMaximo"]', t.contact.form.serviceMaximo);
        this.setText('[data-i18n="contact.form.serviceWatsonx"]', t.contact.form.serviceWatsonx);
        this.setText('[data-i18n="contact.form.serviceMultiple"]', t.contact.form.serviceMultiple);
        this.setText('[data-i18n="contact.form.consentText"]', t.contact.form.consentText);
        this.setText('[data-i18n="contact.form.privacyLink"]', t.contact.form.privacyLink);
        this.setText('[data-i18n="contact.form.consentSuffix"]', t.contact.form.consentSuffix);
        this.setText('[data-i18n="contact.form.submitButton"]', t.contact.form.submitButton);

        // Footer
        this.setText('[data-i18n="footer.aboutA1"]', t.footer.aboutA1);
        this.setText('[data-i18n="footer.aboutUs"]', t.footer.aboutUs);
        this.setText('[data-i18n="footer.network5g"]', t.footer.network5g);
        this.setText('[data-i18n="footer.awards"]', t.footer.awards);
        this.setText('[data-i18n="footer.careers"]', t.footer.careers);
        this.setText('[data-i18n="footer.careerPortal"]', t.footer.careerPortal);
        this.setText('[data-i18n="footer.becomePartner"]', t.footer.becomePartner);
        this.setText('[data-i18n="footer.mediaCenter"]', t.footer.mediaCenter);
        this.setText('[data-i18n="footer.news"]', t.footer.news);
        this.setText('[data-i18n="footer.sponsorships"]', t.footer.sponsorships);
        this.setText('[data-i18n="footer.help"]', t.footer.help);
        this.setText('[data-i18n="footer.stores"]', t.footer.stores);
        this.setText('[data-i18n="footer.terms"]', t.footer.terms);
        this.setText('[data-i18n="footer.dataManagement"]', t.footer.dataManagement);
        this.setText('[data-i18n="footer.devices"]', t.footer.devices);
        this.setText('[data-i18n="footer.smartphones"]', t.footer.smartphones);
        this.setText('[data-i18n="footer.tvs"]', t.footer.tvs);
        this.setText('[data-i18n="footer.laptops"]', t.footer.laptops);
        this.setText('[data-i18n="footer.accessories"]', t.footer.accessories);
        this.setText('[data-i18n="footer.copyright"]', t.footer.copyright);
        this.setAttr('[data-i18n="footer.backToTop"]', 'aria-label', t.footer.backToTop);
        this.setAttr('[data-i18n="footer.backToTop"]', 'title', t.footer.backToTop);
    }

    updateMetaTags() {
        const t = translations[this.currentLang].meta;

        // Update title
        document.title = t.title;

        // Update meta description
        this.updateMetaTag('name', 'description', t.description);
        this.updateMetaTag('name', 'keywords', t.keywords);

        // Update Open Graph tags
        this.updateMetaTag('property', 'og:title', t.ogTitle);
        this.updateMetaTag('property', 'og:description', t.ogDescription);
        this.updateMetaTag('property', 'og:locale', this.currentLang === 'bg' ? 'bg_BG' : 'en_US');

        // Update Twitter tags
        this.updateMetaTag('name', 'twitter:title', t.ogTitle);
        this.updateMetaTag('name', 'twitter:description', t.ogDescription);
    }

    updateMetaTag(attrName, attrValue, content) {
        let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
        if (tag) {
            tag.setAttribute('content', content);
        }
    }

    updateLanguageSwitcher() {
        const langButtons = document.querySelectorAll('[data-lang]');
        langButtons.forEach(button => {
            const lang = button.getAttribute('data-lang');
            if (lang === this.currentLang) {
                button.classList.add('active');
                button.setAttribute('aria-current', 'true');
            } else {
                button.classList.remove('active');
                button.removeAttribute('aria-current');
            }
        });
    }

    setText(selector, text) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.textContent = text;
        });
    }

    setHTML(selector, html) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.innerHTML = html;
        });
    }

    setAttr(selector, attr, value) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.setAttribute(attr, value);
        });
    }
}

// Initialize language manager
const langManager = new LanguageManager();
