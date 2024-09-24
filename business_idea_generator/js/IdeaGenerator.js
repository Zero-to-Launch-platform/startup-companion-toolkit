// Mock data for market trends (simulating Exploding Topics-like methodology)
const marketTrends = [
    { name: "Sustainable Fashion", score: 0.9 },
    { name: "Plant-based Meat Alternatives", score: 0.85 },
    { name: "Remote Work Solutions", score: 0.8 },
    { name: "Mental Health Apps", score: 0.75 },
    { name: "Augmented Reality Education", score: 0.7 },
];

// Function to analyze user input and generate ideas
function generateIdeas(userInput) {
    // 2.1. User preferences and expertise input
    const preferences = userInput.toLowerCase().split(',').map(item => item.trim());

    // 2.2. Market trend analysis
    const relevantTrends = marketTrends.filter(trend => 
        preferences.some(pref => trend.name.toLowerCase().includes(pref))
    );

    // 2.3. AI-driven idea generation (simulated)
    const generatedIdeas = [
        { name: "Eco-friendly Fashion Rental Platform", description: "A platform where users can rent sustainable and ethically-made clothing." },
        { name: "Virtual Reality Meditation App", description: "An app that combines VR technology with guided meditation for immersive relaxation experiences." },
        { name: "AI-powered Personal Nutrition Coach", description: "An app that uses AI to analyze users' dietary habits and provide personalized nutrition advice." },
        { name: "Augmented Reality Language Learning Tool", description: "An AR app that helps users learn new languages by overlaying translations and pronunciations on real-world objects." },
        { name: "Sustainable Home Decor Marketplace", description: "An online marketplace for eco-friendly and sustainably sourced home decor items." },
    ];

    // 2.4. Idea scoring and ranking system
    const scoredIdeas = generatedIdeas.map(idea => {
        let score = 0;
        // Score based on relevance to user preferences
        preferences.forEach(pref => {
            if (idea.name.toLowerCase().includes(pref) || idea.description.toLowerCase().includes(pref)) {
                score += 0.2;
            }
        });
        // Score based on market trends
        relevantTrends.forEach(trend => {
            if (idea.name.toLowerCase().includes(trend.name.toLowerCase())) {
                score += trend.score;
            }
        });
        return { ...idea, score };
    });

    // Sort ideas by score in descending order
    const rankedIdeas = scoredIdeas.sort((a, b) => b.score - a.score);

    // 2.5. Presentation of top ideas with explanations
    return rankedIdeas.slice(0, 3); // Return top 3 ideas
}

// Event listener for the generate ideas button
document.getElementById('generate-ideas').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    const topIdeas = generateIdeas(userInput);
    
    const ideaList = document.getElementById('idea-list');
    ideaList.innerHTML = ''; // Clear previous results
    
    topIdeas.forEach(idea => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${idea.name}</strong> (Score: ${idea.score.toFixed(2)})<br>${idea.description}`;
        ideaList.appendChild(li);
    });
});