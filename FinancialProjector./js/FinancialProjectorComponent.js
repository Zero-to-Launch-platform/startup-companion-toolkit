// src/components/FinancialProjector/FinancialProjectorComponent.js

import React, { useState } from 'react';
import { generateFinancialProjections } from './FinancialProjector';

const FinancialProjectorComponent = () => {
  const [inputs, setInputs] = useState({
    revenueModel: {
      averageRevenue: 100, // Average revenue per customer per month
    },
    initialCustomers: 100,
    growthRate: 0.1, // 10% yearly growth
    expenses: {
      fixedCosts: 5000, // Monthly fixed costs
      variableCosts: 2000, // Monthly variable costs
      employees: 5,
      salaryPerEmployee: 4000, // Monthly salary per employee
    },
    employeeGrowth: 0.2, // 20% yearly employee growth
  });

  const [projections, setProjections] = useState(null);

  const handleInputChange = (category, field, value) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [category]: {
        ...prevInputs[category],
        [field]: parseFloat(value)
      }
    }));
  };

  const handleGenerateProjections = () => {
    const results = generateFinancialProjections(inputs);
    setProjections(results);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div>
      <h2>Financial Projections Tool</h2>
      
      <div>
        <h3>Revenue Model</h3>
        <label>
          Average Revenue per Customer (Monthly):
          <input
            type="number"
            value={inputs.revenueModel.averageRevenue}
            onChange={(e) => handleInputChange('revenueModel', 'averageRevenue', e.target.value)}
          />
        </label>
      </div>

      <div>
        <h3>Growth</h3>
        <label>
          Initial Customers:
          <input
            type="number"
            value={inputs.initialCustomers}
            onChange={(e) => handleInputChange('', 'initialCustomers', e.target.value)}
          />
        </label>
        <label>
          Yearly Growth Rate:
          <input
            type="number"
            value={inputs.growthRate}
            onChange={(e) => handleInputChange('', 'growthRate', e.target.value)}
          />
        </label>
      </div>

      <div>
        <h3>Expenses</h3>
        <label>
          Monthly Fixed Costs:
          <input
            type="number"
            value={inputs.expenses.fixedCosts}
            onChange={(e) => handleInputChange('expenses', 'fixedCosts', e.target.value)}
          />
        </label>
        <label>
          Monthly Variable Costs:
          <input
            type="number"
            value={inputs.expenses.variableCosts}
            onChange={(e) => handleInputChange('expenses', 'variableCosts', e.target.value)}
          />
        </label>
        <label>
          Initial Number of Employees:
          <input
            type="number"
            value={inputs.expenses.employees}
            onChange={(e) => handleInputChange('expenses', 'employees', e.target.value)}
          />
        </label>
        <label>
          Monthly Salary per Employee:
          <input
            type="number"
            value={inputs.expenses.salaryPerEmployee}
            onChange={(e) => handleInputChange('expenses', 'salaryPerEmployee', e.target.value)}
          />
        </label>
        <label>
          Yearly Employee Growth Rate:
          <input
            type="number"
            value={inputs.employeeGrowth}
            onChange={(e) => handleInputChange('', 'employeeGrowth', e.target.value)}
          />
        </label>
      </div>

      <button onClick={handleGenerateProjections}>Generate Projections</button>

      {projections && (
        <div>
          <h3>Financial Projections</h3>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Revenue</th>
                <th>Expenses</th>
                <th>Profit</th>
                <th>Cash Flow</th>
              </tr>
            </thead>
            <tbody>
              {projections.summary.map((year) => (
                <tr key={year.year}>
                  <td>{year.year}</td>
                  <td>{formatCurrency(year.revenue)}</td>
                  <td>{formatCurrency(year.expenses)}</td>
                  <td>{formatCurrency(year.profit)}</td>
                  <td>{formatCurrency(year.cashFlow)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FinancialProjectorComponent;