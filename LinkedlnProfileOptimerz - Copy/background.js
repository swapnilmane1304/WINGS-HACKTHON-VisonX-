chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "profileData") {
        console.log("✅ Received profile data:", message.data);

        
        ApiCall(message.jobRole).then((response) => {
            sendResponse({ success: true, data: response });
        });

        return true; // Keeps the response channel open for async calls
    }
});

function ApiCall(jobRole) {
    console.log(`🌐 Sending data to API for role: ${jobRole}...`);

    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("✅ API response received!");

            const roleSuggestions = {
                "Full Stack Developer": {
                    headline: "Consider updating your headline to include React.js, Node.js, and MongoDB.",
                    skills: ["JavaScript", "React.js", "Node.js", "MongoDB", "Express.js"],
                    projects: ["E-commerce website", "Task management app", "Chat application"],
                    softSkills: ["Problem-solving", "Team collaboration", "Time management"],
                    finalScore: 92
                },
                "AI Developer": {
                    headline: "Improve your headline by mentioning AI frameworks like TensorFlow or PyTorch.",
                    skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning"],
                    projects: ["Image classification model", "Chatbot using NLP", "Fraud detection system"],
                    softSkills: ["Analytical thinking", "Creativity", "Attention to detail"],
                    finalScore: 88
                },
                "Data Scientist": {
                    headline: "Make your headline stand out by adding ‘Data Science Enthusiast’ or ‘Machine Learning Expert’.",
                    skills: ["Python", "Pandas", "SQL", "Data Visualization", "Statistics"],
                    projects: ["Stock price prediction", "Customer segmentation", "Sales forecasting"],
                    softSkills: ["Curiosity", "Critical thinking", "Communication"],
                    finalScore: 85
                },
                "Java Developer": {
                    headline: "Add key skills like ‘Spring Boot’ and ‘Microservices’ in your headline.",
                    skills: ["Java", "Spring Boot", "Hibernate", "REST API", "Microservices"],
                    projects: ["Library management system", "Banking application", "Blogging platform"],
                    softSkills: ["Attention to detail", "Persistence", "Leadership"],
                    finalScore: 90
                },
                "DevOps Engineer": {
                    headline: "Mention ‘CI/CD’, ‘AWS’, or ‘Kubernetes’ in your headline for better visibility.",
                    skills: ["Docker", "Kubernetes", "Jenkins", "AWS", "CI/CD"],
                    projects: ["CI/CD pipeline setup", "Kubernetes cluster deployment", "Cloud monitoring dashboard"],
                    softSkills: ["Collaboration", "Adaptability", "Resilience"],
                    finalScore: 87
                }
            };

            const response = roleSuggestions[jobRole] || {
                headline: "Ensure your headline reflects your expertise and career goals.",
                skills: ["Adaptability", "Communication", "Technical proficiency"],
                projects: ["Portfolio website", "Open-source contribution", "Automated task bot"],
                softSkills: ["Growth mindset", "Empathy", "Creativity"],
                finalScore: 80
            };

            resolve({
                suggestions: `
                    <strong>📌 Headline Suggestion:</strong> ${response.headline}<br><br>
                    <strong>💡 Recommended Skills:</strong> ${response.skills.join(", ")}<br><br>
                    <strong>🚀 Suggested Projects:</strong> ${response.projects.join(", ")}<br><br>
                    <strong>✨ Soft Skills to Highlight:</strong> ${response.softSkills.join(", ")}
                `,
                finalScore: response.finalScore
            });
        }, 5000); // Simulate 2-second API delay
    });
}
