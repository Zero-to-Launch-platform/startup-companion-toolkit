// src/components/FinancialProjector/FinancialProjector.js

class FinancialProjector {
  constructor() {
    this.years = 3; // Projections for 3 years
    this.months = 12; // Monthly breakdown
  }

  generateProjections(inputs) {
    const revenue = this.projectRevenue(inputs.revenueModel, inputs.initialCustomers, inputs.growthRate);
    const expenses = this.estimateExpenses(inputs.expenses, inputs.employeeGrowth);
    const cashFlow = this.calculateCashFlow(revenue, expenses);
    
    return {
      revenue,
      expenses,
      cashFlow,
      summary: this.generateSummary(revenue, expenses, cashFlow)
    };
  }

  projectRevenue(revenueModel, initialCustomers, growthRate) {
    let revenue = [];
    let customers = initialCustomers;

    for (let year = 0; year < this.years; year++) {
      let yearlyRevenue = [];
      for (let month = 0; month < this.months; month++) {
        let monthlyRevenue = customers * revenueModel.averageRevenue;
        yearlyRevenue.push(monthlyRevenue);
        customers *= (1 + growthRate / 12); // Monthly growth
      }
      revenue.push(yearlyRevenue);
      customers *= (1 + growthRate); // Yearly growth
    }

    return revenue;
  }

  estimateExpenses(initialExpenses, employeeGrowth) {
    let expenses = [];
    let employees = initialExpenses.employees;

    for (let year = 0; year < this.years; year++) {
      let yearlyExpenses = [];
      for (let month = 0; month < this.months; month++) {
        let monthlyExpenses = 
          initialExpenses.fixedCosts +
          initialExpenses.variableCosts +
          (employees * initialExpenses.salaryPerEmployee);
        yearlyExpenses.push(monthlyExpenses);
      }
      expenses.push(yearlyExpenses);
      employees *= (1 + employeeGrowth); // Yearly employee growth
    }

    return expenses;
  }

  calculateCashFlow(revenue, expenses) {
    let cashFlow = [];

    for (let year = 0; year < this.years; year++) {
      let yearlyCashFlow = [];
      for (let month = 0; month < this.months; month++) {
        yearlyCashFlow.push(revenue[year][month] - expenses[year][month]);
      }
      cashFlow.push(yearlyCashFlow);
    }

    return cashFlow;
  }

  generateSummary(revenue, expenses, cashFlow) {
    let summary = [];

    for (let year = 0; year < this.years; year++) {
      let yearlyRevenue = revenue[year].reduce((a, b) => a + b, 0);
      let yearlyExpenses = expenses[year].reduce((a, b) => a + b, 0);
      let yearlyProfit = yearlyRevenue - yearlyExpenses;
      let yearlyCashFlow = cashFlow[year].reduce((a, b) => a + b, 0);

      summary.push({
        year: year + 1,
        revenue: yearlyRevenue,
        expenses: yearlyExpenses,
        profit: yearlyProfit,
        cashFlow: yearlyCashFlow
      });
    }

    return summary;
  }
}

export const generateFinancialProjections = (inputs) => {
  const projector = new FinancialProjector();
  return projector.generateProjections(inputs);
};