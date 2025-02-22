document.getElementById("analyzeBtn").addEventListener("click", async () => {
    try {
        const tabs = await getActiveTab();

        if (!tabs || !tabs.url.includes("linkedin.com/in/")) {
            document.getElementById("results").innerHTML = "<p>❌ Open a LinkedIn profile first!</p>";
            return;
        }

        const tabId = tabs.id;
        const jobRole = document.getElementById("jobRole").value || "General";

        document.getElementById("results").innerHTML = "<p>🔍 Analyzing...</p>";

        console.log("📤 Sending profile data for analysis...");
        chrome.runtime.sendMessage(
            { type: "profileData", data: { name: "John Doe", headline: "Software Engineer" }, jobRole },
            (response) => {
                if (response && response.success) {
                    document.getElementById("results").innerHTML = `
                        <h4>✅ Suggestions</h4>
                        <p>${response.data.suggestions}</p>
                        <h4>⭐ Final Score</h4>
                        <p><strong>${response.data.finalScore}/100</strong></p>
                    `;
                } else {
                    document.getElementById("results").innerHTML = "<p>❌ Analysis failed.</p>";
                }
            }
        );

    } catch (error) {
        console.error("❌ Error running content script:", error);
        document.getElementById("results").innerHTML = "<p>❌ Could not run script.</p>";
    }
});

// Function to get the active tab
function getActiveTab() {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            resolve(tabs.length ? tabs[0] : null);
        });
    });
}
