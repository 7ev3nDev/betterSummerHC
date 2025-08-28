// Pulsante Info
async function hideInfoBanner(force = false) {
    const result = await browser.storage.sync.get(["hideInfoBanner"]);
    console.info("Hide Info Banner result:", result);

    const infoBanner = document.querySelector('.tutorial-help-btn');
    
    if (!force && !result.hideInfoBanner) {
        if (infoBanner) {
            infoBanner.style.display = 'block';
        }
        console.info("Info Banner not hidden as per user preference.");
        return;
    }

    if (infoBanner) {
        infoBanner.style.display = 'none';
    }
}
hideInfoBanner();

// Pulsante mappa

async function hideMap(force = false) {
    const result = await browser.storage.sync.get(["hideMap"]);
    console.info("Hide Map result:", result);
    
    const mapElement = document.querySelector('form[action="/map"]').parentElement;
    
    if (!force && !result.hideMap) {
        if (mapElement) {
            mapElement.style.display = 'block';
        }
        console.info("Map not hidden as per user preference.");
        return;
    }
    
    if (mapElement) {
        mapElement.style.display = 'none';
    }
}
hideMap();

window.addEventListener("custom:navigation", (e) => {
    hideInfoBanner();
    hideMap();
});


browser.runtime.onMessage.addListener((message) => {
    if (message.action === 'hideInfoBanner') {
        hideInfoBanner(message.force);
    }
    if (message.action === 'hideMap') {
        hideMap(message.force);
    }
});
