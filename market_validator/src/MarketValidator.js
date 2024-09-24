// src/components/MarketValidator/MarketValidator.js

class MarketValidator {
  constructor() {
    this.industries = ['Technology', 'Healthcare', 'Education', 'Finance', 'Retail', 'Entertainment', 'Food', 'Travel'];
    this.marketSizes = {
      'Technology': { min: 1000000000, max: 5000000000 },
      'Healthcare': { min: 500000000, max: 3000000000 },
      'Education': { min: 200000000, max: 1000000000 },
      'Finance': { min: 800000000, max: 4000000000 },
      'Retail': { min: 500000000, max: 2500000000 },
      'Entertainment': { min: 300000000, max: 1500000000 },
      'Food': { min: 400000000, max: 2000000000 },
      'Travel': { min: 300000000, max: 1500000000 }
    };
  }

  validate(idea) {
    const industry = this.identifyIndustry(idea);
    const marketSize = this.estimateMarketSize(industry);
    const growthRate = this.predictGrowthRate();
    const competitionLevel = this.assessCompetition();
    const consumerSentiment = this.analyzeSentiment();
    const validationScore = this.calculateValidationScore(marketSize, growthRate, competitionLevel, consumerSentiment);

    return {
      industry,
      marketSize,
      growthRate,
      competitionLevel,
      consumerSentiment,
      validationScore
    };
  }

  identifyIndustry(idea) {
    // Simple keyword matching to identify the industry
    for (let industry of this.industries) {
      if (idea.toLowerCase().includes(industry.toLowerCase())) {
        return industry;
      }
    }
    return 'Other';
  }

  estimateMarketSize(industry) {
    const range = this.marketSizes[industry] || { min: 100000000, max: 1000000000 };
    return Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
  }

  predictGrowthRate() {
    return +(Math.random() * (0.25 - 0.01) + 0.01).toFixed(2);
  }

  assessCompetition() {
    const levels = ['Low', 'Medium', 'High'];
    return levels[Math.floor(Math.random() * levels.length)];
  }

  analyzeSentiment() {
    const sentimentScore = Math.random();
    if (sentimentScore > 0.66) return 'Positive';
    if (sentimentScore > 0.33) return 'Neutral';
    return 'Negative';
  }

  calculateValidationScore(marketSize, growthRate, competitionLevel, sentiment) {
    let score = 0;
    
    // Market size score (0-4 points)
    score += Math.min(marketSize / 250000000, 4);
    
    // Growth rate score (0-3 points)
    score += growthRate * 12;
    
    // Competition level score (0-2 points)
    score += {'Low': 2, 'Medium': 1, 'High': 0}[competitionLevel];
    
    // Sentiment score (0-1 point)
    score += {'Positive': 1, 'Neutral': 0.5, 'Negative': 0}[sentiment];
    
    return +(score / 10).toFixed(2);  // Normalize to 0-1 scale
  }
}

export const validateMarket = (idea) => {
  const validator = new MarketValidator();
  return validator.validate(idea);
};