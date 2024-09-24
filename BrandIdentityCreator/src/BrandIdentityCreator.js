// src/components/BrandIdentityCreator/BrandIdentityCreator.js

class BrandIdentityCreator {
  constructor() {
    this.colorSchemes = {
      'Professional': ['#0077BE', '#FFFFFF', '#333333'],
      'Creative': ['#FF4081', '#3DCCCC', '#FFEB3B'],
      'Eco-friendly': ['#4CAF50', '#8BC34A', '#FFC107'],
      'Luxury': ['#212121', '#FFC107', '#FFFFFF'],
      'Tech': ['#2196F3', '#FF5722', '#607D8B']
    };
    this.fonts = {
      'Professional': ['Arial', 'Helvetica', 'Georgia'],
      'Creative': ['Futura', 'Rockwell', 'Brush Script MT'],
      'Eco-friendly': ['Verdana', 'Tahoma', 'Comic Sans MS'],
      'Luxury': ['Didot', 'Baskerville', 'Bodoni MT'],
      'Tech': ['Roboto', 'Open Sans', 'Montserrat']
    };
  }

  createBrandIdentity(companyName, industry, values) {
    const style = this.determineStyle(industry, values);
    const colors = this.colorSchemes[style];
    const fontSuggestions = this.fonts[style];
    const logoIdea = this.generateLogoIdea(companyName, style);

    return {
      companyName,
      style,
      colorScheme: colors,
      fonts: fontSuggestions,
      logoIdea,
      brandPersonality: this.generateBrandPersonality(values)
    };
  }

  determineStyle(industry, values) {
    // Simple logic to determine style based on industry and values
    if (values.includes('Innovative') || industry === 'Technology') return 'Tech';
    if (values.includes('Luxurious') || industry === 'Fashion') return 'Luxury';
    if (values.includes('Eco-friendly') || industry === 'Sustainable') return 'Eco-friendly';
    if (values.includes('Creative') || industry === 'Arts') return 'Creative';
    return 'Professional';
  }

  generateLogoIdea(companyName, style) {
    const firstLetter = companyName.charAt(0).toUpperCase();
    switch (style) {
      case 'Tech':
        return `A minimalist design featuring the letter "${firstLetter}" with circuit board patterns`;
      case 'Luxury':
        return `An elegant, gold-embossed "${firstLetter}" on a dark background`;
      case 'Eco-friendly':
        return `A leaf-shaped design incorporating the letter "${firstLetter}"`;
      case 'Creative':
        return `A colorful, abstract representation of "${firstLetter}" with paint splatters`;
      default:
        return `A clean, modern typeface for "${companyName}" with a simple geometric shape`;
    }
  }

  generateBrandPersonality(values) {
    const personalities = ['Sincere', 'Excited', 'Competent', 'Sophisticated', 'Rugged'];
    return values.length > 0 ? values : personalities.slice(0, 3);
  }
}

export const createBrandIdentity = (companyName, industry, values) => {
  const creator = new BrandIdentityCreator();
  return creator.createBrandIdentity(companyName, industry, values);
};