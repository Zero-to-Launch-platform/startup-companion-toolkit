import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SelfAssessmentComponent from './components/SelfAssessment/SelfAssessmentComponent';
import IdeaGeneratorComponent from './components/IdeaGenerator/IdeaGeneratorComponent';
import MarketValidatorComponent from './components/MarketValidator/MarketValidatorComponent';
import SWOTAnalyzerComponent from './components/SWOTAnalyzer/SWOTAnalyzerComponent';
import BrandIdentityCreatorComponent from './components/BrandIdentityCreator/BrandIdentityCreatorComponent';
import CompetitorAnalyzerComponent from './components/CompetitorAnalyzer/CompetitorAnalyzerComponent';
import FinancialProjectorComponent from './components/FinancialProjector/FinancialProjectorComponent';
import MarketingStrategyPlannerComponent from './components/MarketingStrategyPlanner/MarketingStrategyPlannerComponent';
import LaunchTimelineManagerComponent from './components/LaunchTimelineManager/LaunchTimelineManagerComponent';
import BusinessPlanGeneratorComponent from './components/BusinessPlanGenerator/BusinessPlanGeneratorComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/self-assessment">Self Assessment</Link></li>
            <li><Link to="/idea-generator">Idea Generator</Link></li>
            <li><Link to="/market-validator">Market Validator</Link></li>
            <li><Link to="/swot-analyzer">SWOT Analyzer</Link></li>
            <li><Link to="/brand-identity-creator">Brand Identity Creator</Link></li>
            <li><Link to="/competitor-analyzer">Competitor Analyzer</Link></li>
            <li><Link to="/financial-projector">Financial Projector</Link></li>
            <li><Link to="/marketing-strategy-planner">Marketing Strategy Planner</Link></li>
            <li><Link to="/launch-timeline-manager">Launch Timeline Manager</Link></li>
            <li><Link to="/business-plan-generator">Business Plan Generator</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/self-assessment" component={SelfAssessmentComponent} />
          <Route path="/idea-generator" component={IdeaGeneratorComponent} />
          <Route path="/market-validator" component={MarketValidatorComponent} />
          <Route path="/swot-analyzer" component={SWOTAnalyzerComponent} />
          <Route path="/brand-identity-creator" component={BrandIdentityCreatorComponent} />
          <Route path="/competitor-analyzer" component={CompetitorAnalyzerComponent} />
          <Route path="/financial-projector" component={FinancialProjectorComponent} />
          <Route path="/marketing-strategy-planner" component={MarketingStrategyPlannerComponent} />
          <Route path="/launch-timeline-manager" component={LaunchTimelineManagerComponent} />
          <Route path="/business-plan-generator" component={BusinessPlanGeneratorComponent} />
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Startup Companion Toolkit</h1>
      <p>Welcome to the Startup Companion Toolkit. Choose a tool from the navigation menu to get started on your entrepreneurial journey.</p>
    </div>
  );
}

export default App;