// src/components/SWOTAnalyzer/SWOTAnalyzer.js

class SWOTAnalyzer {
  constructor() {
    this.categories = ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'];
    this.suggestions = {
      Strengths: [
        'Unique product features',
        'Strong brand reputation',
        'Skilled workforce',
        'Proprietary technology',
        'Strong financial position'
      ],
      Weaknesses: [
        'Limited market presence',
        'High production costs',
        'Lack of skilled personnel',
        'Outdated technology',
        'Limited financial resources'
      ],
      Opportunities: [
        'Emerging market needs',
        'Technological advancements',
        'Changes in regulations',
        'New market segments',
        'Strategic partnerships'
      ],
      Threats: [
        'Intense competition',
        'Changing customer preferences',
        'Economic downturn',
        'New regulations',
        'Disruptive technologies'
      ]
    };
  }

  analyze(userInput, marketData) {
    const analysis = {};
    this.categories.forEach(category => {
      analysis[category] = this.generateCategoryItems(category, userInput[category], marketData);
    });
    return analysis;
  }

  generateCategoryItems(category, userItems, marketData) {
    const items = userItems.filter(item => item.trim() !== '');
    
    // Add suggestions based on market data
    if (category === 'Opportunities' && marketData) {
      if (marketData.growthRate > 0.1) {
        items.push('High market growth rate');
      }
      if (marketData.competitionLevel === 'Low') {
        items.push('Low competition in the market');
      }
    }
    if (category === 'Threats' && marketData) {
      if (marketData.competitionLevel === 'High') {
        items.push('High market competition');
      }
      if (marketData.consumerSentiment === 'Negative') {
        items.push('Negative consumer sentiment');
      }
    }

    // Add generic suggestions if needed
    while (items.length < 3) {
      const suggestion = this.getRandomSuggestion(category);
      if (!items.includes(suggestion)) {
        items.push(suggestion);
      }
    }

    return items;
  }

  getRandomSuggestion(category) {
    const suggestions = this.suggestions[category];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }
}

export const performSWOTAnalysis = (userInput, marketData) => {
  const analyzer = new SWOTAnalyzer();
  return analyzer.analyze(userInput, marketData);
};