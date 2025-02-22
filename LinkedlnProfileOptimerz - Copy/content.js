chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "scrapeProfile") {
        scrapeLinkedInProfile(message.jobRole);
    }
});

async function scrapeLinkedInProfile(jobRole) {
    console.log("🔎 Scraping LinkedIn profile...");

    // Wait until the page loads using MutationObserver
    await waitForElement(".text-heading-xlarge");

    function getText(selector) {
        let element = document.querySelector(selector);
        return element ? element.innerText.trim() : "N/A";
    }

    let profileData = {
        name: getText(".text-heading-xlarge"),
        headline: getText(".text-body-medium.break-words"),
        about: getText('section.summary p'),
        experience: Array.from(document.querySelectorAll('.pvs-entity__summary-title')).map(e => e.innerText),
        skills: Array.from(document.querySelectorAll('.pvs-entity__skill-pill')).map(e => e.innerText),
        certifications: Array.from(document.querySelectorAll('.pvs-entity__degree')).map(e => e.innerText)
    };

    console.log("📌 Extracted Profile Data:", profileData);

    // Send profile data to background script for processing
    chrome.runtime.sendMessage({ type: "profileData", data: profileData, jobRole });
}

// Function to wait for an element to appear
function waitForElement(selector) {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve();
        }

        const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    });
}
