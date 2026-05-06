function buildVersionSelector(currentSlug, versions) {
    const items = versions.map(v =>
        `<li class="md-version__item">
            <a href="${v.url}" class="md-version__link">${v.slug}</a>
        </li>`
    ).join("");

    const selector = `
        <div class="md-version">
            <button class="md-version__current" aria-label="Select version">
                ${currentSlug}
            </button>
            <ul class="md-version__list">${items}</ul>
        </div>`;

    const topic = document.querySelector(".md-header__topic");
    if (topic && !topic.querySelector(".md-version")) {
        topic.insertAdjacentHTML("beforeend", selector);
    }
}

// Production : événement RTD addon
document.addEventListener("readthedocs-addons-data-ready", function (event) {
    const detail = event.detail;
    if (!detail || !detail.addons || !detail.addons.versions) return;

    const { current, active } = detail.addons.versions;
    if (!current || !active || active.length === 0) return;

    buildVersionSelector(
        current.slug,
        active.map(v => ({ slug: v.slug, url: v.urls.documentation }))
    );
});

// Développement local : fallback via versions.json
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    document.addEventListener("DOMContentLoaded", function () {
        const siteUrl = document.querySelector('meta[name="site-url"]')?.content || "/";
        const basePath = new URL(siteUrl).pathname.replace(/\/?$/, "/");

        fetch(basePath + "versions.json")
            .then(r => r.ok ? r.json() : Promise.reject())
            .then(data => {
                const versions = data.map(v => ({
                    slug: v.version,
                    url: basePath + v.version + "/"
                }));
                const current = versions[0];
                buildVersionSelector(current.slug, versions);
            })
            .catch(() => {});
    });
}
