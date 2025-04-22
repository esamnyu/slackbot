// Add this component definition
// Option 1: Add to the bottom of src/components/EnhancedSlackAlertSystem.jsx
// Option 2: Create a new file src/components/SystemExplanation.jsx and add this code

//===============================================
// Component 3: SystemExplanation (Explanation View)
//===============================================
const SystemExplanation = () => {
    // Reusing text styles for consistency
    const headingStyle = "text-2xl font-bold text-gray-800 mb-4 mt-6";
    const subHeadingStyle = "text-xl font-semibold text-gray-700 mb-3 mt-4";
    const paragraphStyle = "text-gray-700 leading-relaxed mb-4";
    const termStyle = "font-semibold text-indigo-700";
    const definitionStyle = "ml-4 mb-2 text-gray-600";
  
    return (
      <div className="p-6 md:p-8 bg-white rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto font-sans">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">System Explanation</h1>
  
        {/* Section 1: Core Use Case for Automation */}
        <section>
          <h2 className={headingStyle}>Core Automation Use Case</h2>
          <p className={paragraphStyle}>
            The primary goal of this system is to <span className={termStyle}>automate the monitoring and initial analysis of marketing campaign performance</span>. Instead of analysts manually checking numerous metrics across various platforms daily, this system automatically:
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700 space-y-1">
            <li>Ingests campaign data from different sources (as shown in the Pipeline view).</li>
            <li>Calculates key performance indicators (KPIs).</li>
            <li>Compares current performance against historical averages or benchmarks.</li>
            <li>Detects statistically significant deviations (anomalies) using methods like Z-scores.</li>
            <li>Generates alerts for anomalies that exceed predefined thresholds.</li>
            <li>Presents these alerts in a centralized, actionable format (like the simulated Slack view).</li>
          </ul>
          <p className={paragraphStyle}>
            This automation <span className={termStyle}>saves significant analyst time</span>, reduces the risk of missing critical performance shifts, enables <span className={termStyle}>faster responses</span> to issues (like budget overspending or underperforming ads), and allows teams to focus on strategic decision-making rather than routine monitoring.
          </p>
        </section>
  
        {/* Section 2: Role of AI/ML */}
        <section>
          <h2 className={headingStyle}>Importance of AI/ML</h2>
          <p className={paragraphStyle}>
            Artificial Intelligence (AI) and Machine Learning (ML) are crucial for enhancing this automated system beyond simple threshold checks:
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700 space-y-1">
            <li>
              <span className={termStyle}>Intelligent Anomaly Detection (ML):</span> While the current simulation uses Z-scores (a statistical method), more advanced ML models (e.g., ARIMA, Prophet, Isolation Forests) could be trained to understand complex seasonal patterns, multi-metric correlations, and identify more nuanced anomalies that simple stats might miss, reducing false positives.
            </li>
            <li>
              <span className={termStyle}>Contextual Summarization & Recommendations (AI - GPT):</span> As simulated, Large Language Models (LLMs) like GPT are vital for translating raw data deviations and statistical scores into <span className="italic">human-readable language</span>. They explain *what* happened, *why* it likely matters in a business context, and suggest potential *actionable recommendations*, significantly reducing the cognitive load on the user. This involves sophisticated prompt engineering.
            </li>
            <li>
              <span className={termStyle}>Smart Prioritization (ML/AI):</span> AI could help prioritize alerts based not just on statistical significance but also on predicted business impact (e.g., potential revenue loss/gain) or learned patterns from past user interactions.
            </li>
            <li>
              <span className={termStyle}>Adaptive Learning (ML):</span> The user feedback mechanism ("Useful," "False Positive") is critical. This feedback can be used to <span className="italic">retrain or fine-tune</span> the ML models used for anomaly detection, making the system smarter and more accurate over time (the "closed-loop" aspect).
            </li>
          </ul>
        </section>
  
        {/* Section 3: Key Metrics & Jargon Breakdown */}
        <section>
          <h2 className={headingStyle}>Metrics & Jargon Explained</h2>
  
          <h3 className={subHeadingStyle}>Core Performance Metrics</h3>
          <dl>
            <dt className={termStyle}>Spend:</dt>
            <dd className={definitionStyle}>Total money spent on a campaign.</dd>
            <dt className={termStyle}>CPM (Cost Per Mille):</dt>
            <dd className={definitionStyle}>Cost for 1,000 ad impressions (views). Measures reach cost-efficiency.</dd>
            <dt className={termStyle}>CTR (Click-Through Rate):</dt>
            <dd className={definitionStyle}>Percentage of impressions that resulted in a click (`Clicks / Impressions`). Measures ad engagement.</dd>
            <dt className={termStyle}>Impressions:</dt>
            <dd className={definitionStyle}>Total times an ad was displayed.</dd>
             <dt className={termStyle}>Clicks:</dt>
            <dd className={definitionStyle}>Total times an ad was clicked.</dd>
            <dt className={termStyle}>Conversion Rate:</dt>
            <dd className={definitionStyle}>Percentage of clicks that resulted in a desired action (e.g., purchase) (`Conversions / Clicks`). Measures effectiveness.</dd>
          </dl>
  
          <h3 className={subHeadingStyle}>Anomaly Detection Terms</h3>
           <dl>
            <dt className={termStyle}>Anomaly:</dt>
            <dd className={definitionStyle}>A significant deviation from the expected pattern or average.</dd>
            <dt className={termStyle}>Mean Value:</dt>
            <dd className={definitionStyle}>The average value of a metric over a recent period, used as a baseline.</dd>
            <dt className={termStyle}>Percent Change:</dt>
            <dd className={definitionStyle}>How much the current value differs from the mean, as a percentage.</dd>
            <dt className={termStyle}>Z-Score (σ):</dt>
            <dd className={definitionStyle}>A statistical score measuring how many standard deviations (σ) a data point is from the mean. Higher absolute values indicate rarer deviations.</dd>
          </dl>
  
          <h3 className={subHeadingStyle}>Alert Management</h3>
           <dl>
            <dt className={termStyle}>Priority:</dt>
            <dd className={definitionStyle}>Urgency level (High, Medium, Low).</dd>
            <dt className={termStyle}>Status:</dt>
            <dd className={definitionStyle}>Current state of the alert (Unresolved, Investigating, Resolved, Positive).</dd>
             <dt className={termStyle}>False Positive:</dt>
            <dd className={definitionStyle}>An alert flagged by the system that doesn't represent a real issue upon review.</dd>
          </dl>
  
           <h3 className={subHeadingStyle}>Advertising Context</h3>
           <dl>
            <dt className={termStyle}>Platform:</dt>
            <dd className={definitionStyle}>The advertising system (e.g., Google Ads, Facebook).</dd>
             <dt className={termStyle}>Creative Fatigue:</dt>
            <dd className={definitionStyle}>When ad performance declines because the audience has seen the ad creatives too often.</dd>
             <dt className={termStyle}>Audience Saturation:</dt>
            <dd className={definitionStyle}>Showing ads too frequently to the same audience, reducing effectiveness.</dd>
             <dt className={termStyle}>ROI (Return on Investment):</dt>
            <dd className={definitionStyle}>Measure of profitability for the ad spend.</dd>
          </dl>
        </section>
  
      </div>
    );
  };
  
  // If you created a new file, make sure to add this export line at the bottom:
  // export default SystemExplanation;
  
  // Add this export line at the bottom of src/components/EnhancedSlackAlertSystem.jsx
  // if you added SystemExplanation there AND also make sure SlackInsightBot and
  // EnhancedSlackAlertSystem are also exported if they aren't already.
  // Example:
  export { SlackInsightBot, EnhancedSlackAlertSystem, SystemExplanation };
  // Adjust based on how you structure exports. If only EnhancedSlackAlertSystem was
  // exported by default before, you might need named exports now.