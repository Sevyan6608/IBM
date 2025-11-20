#!/usr/bin/env python3
"""
Script to add data-i18n attributes to HTML elements for multilingual support
"""

import re

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Define replacements as tuples of (search_pattern, replacement)
replacements = [
    # Navigation
    (r'<li><a href="#solutions">Защо да изберете нас<svg',
     r'<li><a href="#solutions"><span data-i18n="nav.whyChooseUs">Защо да изберете нас</span><svg'),

    (r'<li><a href="#products">Решения за бизнеса<svg',
     r'<li><a href="#products"><span data-i18n="nav.businessSolutions">Решения за бизнеса</span><svg'),

    (r'<li><a href="#contact-form">Контакти<svg',
     r'<li><a href="#contact-form"><span data-i18n="nav.contacts">Контакти</span><svg'),

    (r'<span class="dark-mode-label">Тъмен режим</span>',
     r'<span class="dark-mode-label" data-i18n="nav.darkMode">Тъмен режим</span>'),

    # Hero Section
    (r'<h1 class="banner-title">IBM решения за растеж и устойчивост <span\s+class="text-red">на Вашия бизнес от A1 България</span></h1>',
     r'<h1 class="banner-title"><span data-i18n="hero.mainTitle">IBM решения за растеж и устойчивост</span> <span class="text-red" data-i18n="hero.mainTitleHighlight">на Вашия бизнес от A1 България</span></h1>'),

    (r'<a href="#contact-form" class="btn btn-primary">Заявете консултация сега</a>\s*</div>\s*</div>\s*<!-- Banner 2',
     r'<a href="#contact-form" class="btn btn-primary" data-i18n="hero.ctaButton">Заявете консултация сега</a>\n                                </div>\n                            </div>\n\n                            <!-- Banner 2'),

    (r'<h2>IBM Storage</h2>\s*<p>Сигурно съхранение на данни</p>\s*<a href="#ibm-storage" class="btn btn-primary btn-small">Научете повече</a>',
     r'<h2 data-i18n="hero.storageTitle">IBM Storage</h2>\n                                <p data-i18n="hero.storageDesc">Сигурно съхранение на данни</p>\n                                <a href="#ibm-storage" class="btn btn-primary btn-small" data-i18n="hero.learnMore">Научете повече</a>'),

    (r'<h2>IBM Maximo IT</h2>\s*<p>Управление на IT активи</p>\s*<a href="#ibm-maximo" class="btn btn-primary btn-small">Научете повече</a>',
     r'<h2 data-i18n="hero.maximoTitle">IBM Maximo IT</h2>\n                                <p data-i18n="hero.maximoDesc">Управление на IT активи</p>\n                                <a href="#ibm-maximo" class="btn btn-primary btn-small" data-i18n="hero.learnMore">Научете повече</a>'),

    (r'<h2>IBM WatsonX</h2>\s*<p>Генеративен AI за Вашия бизнес</p>\s*<a href="#ibm-watsonx" class="btn btn-primary btn-small">Научете повече</a>',
     r'<h2 data-i18n="hero.watsonxTitle">IBM WatsonX</h2>\n                                <p data-i18n="hero.watsonxDesc">Генеративен AI за Вашия бизнес</p>\n                                <a href="#ibm-watsonx" class="btn btn-primary btn-small" data-i18n="hero.learnMore">Научете повече</a>'),

    # Tech Solutions Section
    (r'<h2 class="section-title"><span class="text-red">Технологични решения</span> за сигурност,\s+ефективност и интелигентна автоматизация.</h2>',
     r'<h2 class="section-title"><span class="text-red" data-i18n="techSolutions.title">Технологични решения</span><span data-i18n="techSolutions.titleHighlight"> за сигурност, ефективност и интелигентна автоматизация.</span></h2>'),

    (r'<h3>Професионално внедряване</h3>\s*<p>Експертна имплементация на решения, адаптирани към Вашите нужди</p>',
     r'<h3 data-i18n="techSolutions.usp1Title">Професионално внедряване</h3>\n                                <p data-i18n="techSolutions.usp1Desc">Експертна имплементация на решения, адаптирани към Вашите нужди</p>'),

    (r'<h3>SLA-ориентиран подход</h3>\s*<p>Гарантирано качество на услугите с ясно дефинирани нива на обслужване</p>',
     r'<h3 data-i18n="techSolutions.usp2Title">SLA-ориентиран подход</h3>\n                                <p data-i18n="techSolutions.usp2Desc">Гарантирано качество на услугите с ясно дефинирани нива на обслужване</p>'),

    (r'<h3>Локална <br>експертиза</h3>\s*<p>Специалисти с дълбоко познаване на местния пазар</p>',
     r'<h3 data-i18n="techSolutions.usp3Title">Локална <br>експертиза</h3>\n                                <p data-i18n="techSolutions.usp3Desc">Специалисти с дълбоко познаване на местния пазар</p>'),

    (r'<div class="cta-center">\s*<a href="#contact-form" class="btn btn-primary">Заявете консултация сега</a>\s*</div>',
     r'<div class="cta-center">\n                            <a href="#contact-form" class="btn btn-primary" data-i18n="techSolutions.ctaButton">Заявете консултация сега</a>\n                        </div>'),

    (r'<h3>Предизвикателства, които срещаме често:</h3>',
     r'<h3 data-i18n="techSolutions.challengesTitle">Предизвикателства, които срещаме често:</h3>'),

    (r'<li>Растящи разходи и комплексност на инфраструктурата</li>',
     r'<li data-i18n="techSolutions.challenge1">Растящи разходи и комплексност на инфраструктурата</li>'),

    (r'<li>Липса на достатъчна видимост върху критични активи и процеси</li>',
     r'<li data-i18n="techSolutions.challenge2">Липса на достатъчна видимост върху критични активи и процеси</li>'),

    (r'<li>Неяснота около генеративния AI, сигурността на данните и регулациите\s*</li>',
     r'<li data-i18n="techSolutions.challenge3">Неяснота около генеративния AI, сигурността на данните и регулациите</li>'),

    (r'<h3>Как намираме решение и добавяме стойност за Вас:</h3>',
     r'<h3 data-i18n="techSolutions.solutionsTitle">Как намираме решение и добавяме стойност за Вас:</h3>'),

    (r'<li>Консолидирано и защитено съхранение на Вашите данни</li>',
     r'<li data-i18n="techSolutions.solution1">Консолидирано и защитено съхранение на Вашите данни</li>'),

    (r'<li>Единна платформа за управление на активи, поддръжка и надеждност</li>',
     r'<li data-i18n="techSolutions.solution2">Единна платформа за управление на активи, поддръжка и надеждност</li>'),

    (r'<li>Генеративен AI с контрол на данните и управление на риска</li>',
     r'<li data-i18n="techSolutions.solution3">Генеративен AI с контрол на данните и управление на риска</li>'),

    # Products Section Title
    (r'<h2 class="section-title">IBM решения за бизнеса от A1 България</h2>',
     r'<h2 class="section-title" data-i18n="products.sectionTitle">IBM решения за бизнеса от A1 България</h2>'),

    # IBM Storage Product
    (r'<h3 class="product-title">IBM Storage</h3>',
     r'<h3 class="product-title" data-i18n="products.storage.title">IBM Storage</h3>'),

    (r'<p class="product-tagline">Сигурно и ефективно съхранение на данни, оптимизирано за\s+съвременните кибер заплахи</p>',
     r'<p class="product-tagline" data-i18n="products.storage.tagline">Сигурно и ефективно съхранение на данни, оптимизирано за съвременните кибер заплахи</p>'),

    (r'<p class="product-description">IBM Storage предоставя висока производителност и\s+киберустойчивост, за да защити бизнес-критичните ви системи и данни.\s+Консолидирате натоварванията и улеснявате управлението на мащаби от данни.</p>',
     r'<p class="product-description" data-i18n="products.storage.description">IBM Storage предоставя висока производителност и киберустойчивост, за да защити бизнес-критичните ви системи и данни. Консолидирате натоварванията и улеснявате управлението на мащаби от данни.</p>'),

    (r'<h4>Основни характеристики и USP:</h4>',
     r'<h4 data-i18n="products.featuresTitle">Основни характеристики и USP:</h4>'),

    # Contact Section
    (r'<h2 class="section-title">Заявете консултация с експерт</h2>',
     r'<h2 class="section-title" data-i18n="contact.sectionTitle">Заявете консултация с експерт</h2>'),

    (r'<h3>Следващи стъпки</h3>',
     r'<h3 data-i18n="contact.nextStepsTitle">Следващи стъпки</h3>'),

    # Footer
    (r'<h4>За А1</h4>',
     r'<h4 data-i18n="footer.aboutA1">За А1</h4>'),

    (r'<li><a href="https://www.a1.bg/za-a1" target="_blank">За нас</a></li>',
     r'<li><a href="https://www.a1.bg/za-a1" target="_blank" data-i18n="footer.aboutUs">За нас</a></li>'),

    (r'<li><a href="https://www.a1.bg/5g" target="_blank">5G мрежа</a></li>',
     r'<li><a href="https://www.a1.bg/5g" target="_blank" data-i18n="footer.network5g">5G мрежа</a></li>'),

    (r'<li><a href="https://www.a1.bg/nagradi-pr" target="_blank">Награди</a></li>',
     r'<li><a href="https://www.a1.bg/nagradi-pr" target="_blank" data-i18n="footer.awards">Награди</a></li>'),

    (r'<h4>Кариери</h4>',
     r'<h4 data-i18n="footer.careers">Кариери</h4>'),

    (r'<h4>Медия център</h4>',
     r'<h4 data-i18n="footer.mediaCenter">Медия център</h4>'),

    (r'<h4>Помощ</h4>',
     r'<h4 data-i18n="footer.help">Помощ</h4>'),

    (r'<h4>Устройства</h4>',
     r'<h4 data-i18n="footer.devices">Устройства</h4>'),

    (r'<p>&copy; 2025 А1 България\. Всички права запазени\.</p>',
     r'<p data-i18n="footer.copyright">&copy; 2025 А1 България. Всички права запазени.</p>'),

    (r'<button id="backToTop" class="back-to-top" aria-label="Обратно нагоре" title="Обратно нагоре">',
     r'<button id="backToTop" class="back-to-top" aria-label="Обратно нагоре" title="Обратно нагоре" data-i18n="footer.backToTop">'),
]

# Apply all replacements
for search, replace in replacements:
    html = re.sub(search, replace, html, flags=re.DOTALL)

# Write the updated HTML
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Successfully added data-i18n attributes to index.html")
