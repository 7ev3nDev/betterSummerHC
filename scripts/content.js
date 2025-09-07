// Pulsante Info
async function hideInfoBanner(force = false) {
    const result = await browser.storage.sync.get([ "hideInfoBanner" ]);
    console.info("Hide Info Banner result:", result);

    const infoBanner = document.querySelector('.tutorial-help-btn');

    if ( !force && !result.hideInfoBanner ) {
        if ( infoBanner ) {
            infoBanner.style.display = 'block';
        }
        console.info("Info Banner not hidden as per user preference.");
        return;
    }

    if ( infoBanner ) {
        infoBanner.style.display = 'none';
    }
}

try {
    hideInfoBanner();
} catch (e) {
    console.error("Error hiding info banner on initial load:", e);
}

// Pulsante mappa

async function hideMap(force = false) {
    const result = await browser.storage.sync.get([ "hideMap" ]);
    console.info("Hide Map result:", result);

    const mapElement = document.querySelector('a[href="/map"]').parentElement;

    if ( !force && !result.hideMap ) {
        if ( mapElement ) {
            mapElement.style.display = 'block';
        }
        console.info("Map not hidden as per user preference.");
        return;
    }

    if ( mapElement ) {
        mapElement.style.display = 'none';
    }
}

try {
    hideMap();
} catch (e) {
    console.error("Error hiding map on initial load:", e);
}

// Pulsante survey

async function hideSurvey(force = false) {
    const result = await browser.storage.sync.get([ "hideSurvey" ]);
    console.info("Hide Survey result:", result);
    
    const surveyElement = document.querySelector('a[href="/s"]').parentElement;
    
    if ( !force && !result.hideSurvey ) {
        if ( surveyElement ) {
            surveyElement.style.display = 'block';
        }
        console.info("Survey not hidden as per user preference.");
        return;
    }
    if ( surveyElement ) {
        surveyElement.style.display = 'none';
    }
}

try {
    hideSurvey();
} catch (e) {
    console.error("Error hiding survey on initial load:", e);
}

window.addEventListener("custom:navigation", (e) => {
    try {
        hideInfoBanner();
        hideMap();
        hideSurvey();
    } catch (e) {
        console.error("Error hiding elements on navigation:", e);
    }
});


browser.runtime.onMessage.addListener((message) => {
    if ( message.action === 'hideInfoBanner' ) {
        hideInfoBanner(message.force);
    }
    if ( message.action === 'hideMap' ) {
        hideMap(message.force);
    }
    if ( message.action === 'hideSurvey' ) {
        hideSurvey(message.force);
    }
});
