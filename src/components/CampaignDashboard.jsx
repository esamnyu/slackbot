import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, ComposedChart // Removed Scatter
} from 'recharts';
import {
  ArrowLeft, Calendar, Clock, DollarSign, // Removed Users, MousePointer
  // Removed Target, BarChart2, PieChartIcon
  TrendingUp, TrendingDown,
  ExternalLink, Download, // Removed Filter
  RefreshCw, AlertTriangle, CheckCircle, Info,
  ChevronUp, ChevronDown // Added ChevronUp and ChevronDown
} from 'lucide-react';

const CampaignDashboard = ({ campaignId, onBackClick }) => {
  // State for date range filter
  const [dateRange, setDateRange] = useState('last7days');
  // State for selected metric tab
  const [activeMetricTab, setActiveMetricTab] = useState('overview');
  // State for toggled sections
  const [expandedSections, setExpandedSections] = useState({
    performance: true,
    audience: true,
    recommendations: true
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // --- Mock Data ---
  // (Keep existing mock data: campaignDetails, summaryMetrics, generateTimeSeriesData, etc.)
  // Campaign details
  const campaignDetails = {
    id: campaignId || 'C12345',
    name: 'Summer Sale 2025',
    startDate: '2025-03-15',
    endDate: '2025-05-31',
    budget: 15000,
    spent: 9876.45,
    status: 'Active',
    platforms: ['Facebook', 'Instagram', 'Google Ads'],
    targetAudience: 'Returning Customers',
    primaryObjective: 'Conversions',
    owner: 'Sarah P.',
    lastUpdated: '2025-04-22T09:15:00'
  };

  // Summary metrics
  const summaryMetrics = {
    impressions: 1458972,
    clicks: 68254,
    conversions: 2741,
    ctr: 4.68,
    conversionRate: 4.02,
    cpa: 3.60,
    cpm: 6.77,
    spend: 9876.45,
    revenue: 54820,
    roi: 455.07
  };

  // Time series data for charts (daily for 30 days)
  const generateTimeSeriesData = (metric, baseValue, volatility, trend = 0, anomalyDay = null) => {
    const dates = [];
    const now = new Date();

    // Generate dates for the last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    // Generate values with some randomness, trend, and optional anomaly
    return dates.map((date, index) => {
      // Base calculation with random volatility
      let value = baseValue + (Math.random() * 2 - 1) * volatility;

      // Apply trend (increase/decrease over time)
      value += (index / 29) * trend;

      // Apply anomaly if specified
      if (anomalyDay !== null && index === anomalyDay) {
        value *= (anomalyDay % 2 === 0) ? 1.8 : 0.4; // Dramatic increase or decrease
      }

      return {
        date,
        [metric]: Number(value.toFixed(2)),
        // For some metrics, add a benchmark line
        benchmark: metric === 'cpm' || metric === 'ctr' || metric === 'conversionRate'
          ? Number((baseValue * 0.9).toFixed(2))
          : undefined
      };
    });
  };

  // Actual data generation for each metric
  const spendData = generateTimeSeriesData('spend', 300, 50, 100, 22);
  const cpmData = generateTimeSeriesData('cpm', 6.5, 1.2, 0.5, 18);
  const ctrData = generateTimeSeriesData('ctr', 4.2, 0.6, -0.2, 25);
  const impressionsData = generateTimeSeriesData('impressions', 45000, 8000, 2000, 15);
  const clicksData = generateTimeSeriesData('clicks', 2200, 300, 50, 20);
  const conversionsData = generateTimeSeriesData('conversions', 95, 15, 5, 23);
  const revenueData = generateTimeSeriesData('revenue', 1800, 400, 300, 23);

  // Hourly data for the current day
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    impressions: Math.round(Math.random() * 2000 + 1000),
    clicks: Math.round(Math.random() * 100 + 20),
    spend: Number((Math.random() * 40 + 10).toFixed(2))
  }));

  // Audience breakdown data
  const audienceData = [
    { name: 'Mobile', value: 68 },
    { name: 'Desktop', value: 24 },
    { name: 'Tablet', value: 8 }
  ];

  const geoData = [
    { name: 'United States', value: 45 },
    { name: 'United Kingdom', value: 18 },
    { name: 'Canada', value: 12 },
    { name: 'Australia', value: 8 },
    { name: 'Germany', value: 6 },
    { name: 'Other', value: 11 }
  ];

  const ageData = [
    { name: '18-24', value: 15 },
    { name: '25-34', value: 32 },
    { name: '35-44', value: 28 },
    { name: '45-54', value: 14 },
    { name: '55+', value: 11 }
  ];

  // Ad Creative Performance
  const creativePerformance = [
    {
      id: 'ad001',
      description: 'Summer Sale Banner - Beach Theme',
      impressions: 426580,
      clicks: 24315,
      ctr: 5.7,
      conversions: 876,
      convRate: 3.6,
      spend: 2876.42,
      cpa: 3.28,
      status: 'active'
    },
    {
      id: 'ad002',
      description: 'Summer Sale Video - Product Showcase',
      impressions: 356240,
      clicks: 18932,
      ctr: 5.3,
      conversions: 742,
      convRate: 3.9,
      spend: 2354.76,
      cpa: 3.17,
      status: 'active'
    },
    {
      id: 'ad003',
      description: 'Limited Time Offer - Countdown',
      impressions: 289457,
      clicks: 14562,
      ctr: 5.0,
      conversions: 532,
      convRate: 3.7,
      spend: 1987.31,
      cpa: 3.73,
      status: 'active'
    },
    {
      id: 'ad004',
      description: 'Customer Testimonial Carousel',
      impressions: 386695,
      clicks: 10445,
      ctr: 2.7,
      conversions: 591,
      convRate: 5.7,
      spend: 2658.96,
      cpa: 4.50,
      status: 'active'
    }
  ];

  // Anomaly alerts
  const anomalyAlerts = [
    {
      id: 'anom001',
      date: '2025-04-21',
      metric: 'spend',
      description: 'Spend increased by 180% above normal levels',
      severity: 'high',
      status: 'investigating'
    },
    {
      id: 'anom002',
      date: '2025-04-18',
      metric: 'cpm',
      description: 'CPM increased by 150% above normal levels',
      severity: 'medium',
      status: 'resolved'
    },
    {
      id: 'anom003',
      date: '2025-04-23',
      metric: 'conversions',
      description: 'Conversion rate increased by 90% above normal levels',
      severity: 'low',
      status: 'positive'
    }
  ];

  // Recommendations based on data
  const recommendations = [
    {
      id: 'rec001',
      title: 'Optimize Bid Strategy',
      description: 'Your CPM has been trending higher than benchmark. Consider adjusting your bid strategy to focus on value rather than competition.',
      impact: 'high',
      effort: 'medium',
    },
    {
      id: 'rec002',
      title: 'Refresh Creative Assets',
      description: 'Ad "Customer Testimonial Carousel" has a significantly lower CTR compared to other creatives. Consider refreshing these assets or reallocating budget.',
      impact: 'medium',
      effort: 'medium',
    },
    {
      id: 'rec003',
      title: 'Expand Mobile Targeting',
      description: 'Mobile represents 68% of your audience with the highest conversion rate. Consider increasing budget allocation to mobile-specific placements.',
      impact: 'high',
      effort: 'low',
    }
  ];

  // --- Helper Functions ---
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatCurrency = (num) => {
    return `$${formatNumber(num)}`;
  };

  // Removed unused formatPercentage function

  const getDateRangeLabel = () => {
    switch(dateRange) {
      case 'last7days': return 'Last 7 Days';
      case 'last14days': return 'Last 14 Days';
      case 'last30days': return 'Last 30 Days';
      case 'last90days': return 'Last 90 Days';
      default: return 'Custom Range';
    }
  };

  // Filter data based on selected date range
  const filterDataByDateRange = (data) => {
    let daysToInclude;
    switch(dateRange) {
      case 'last7days': daysToInclude = 7; break;
      case 'last14days': daysToInclude = 14; break;
      case 'last30days': daysToInclude = 30; break;
      case 'last90days': daysToInclude = 90; break;
      default: daysToInclude = 30;
    }

    return data.slice(-daysToInclude);
  };

  // Calculate percentage change for metrics
  const calculateChange = (data, metric) => {
    if (!data || data.length < 2) return { value: 0, direction: 'flat' };

    const currentValue = data[data.length - 1][metric];
    const previousValue = data[data.length - 2][metric];

    if (previousValue === 0) return { value: 0, direction: 'flat' };

    const change = ((currentValue - previousValue) / previousValue) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      direction: change >= 0 ? 'up' : 'down'
    };
  };

  // Colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  // Removed unused severityColors variable
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    ended: 'bg-gray-100 text-gray-800',
    investigating: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
    positive: 'bg-blue-100 text-blue-800'
  };
  const impactColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800'
  };
  const effortColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  // Calculate remaining budget
  const remainingBudget = campaignDetails.budget - campaignDetails.spent;
  const budgetPercentUsed = (campaignDetails.spent / campaignDetails.budget) * 100;

  // Get changes for summary metrics
  const spendChange = calculateChange(spendData, 'spend');
  const impressionsChange = calculateChange(impressionsData, 'impressions');
  const clicksChange = calculateChange(clicksData, 'clicks');
  const conversionsChange = calculateChange(conversionsData, 'conversions');
  const ctrChange = calculateChange(ctrData, 'ctr');
  const cpmChange = calculateChange(cpmData, 'cpm');

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Dashboard Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Back Button and Campaign Title */}
            <div className="flex flex-col">
              <button
                onClick={onBackClick}
                className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm mb-2"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Alerts
              </button>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                {campaignDetails.name}
                <span className="ml-3 px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  {campaignDetails.status}
                </span>
              </h1>
              <div className="text-sm text-gray-500 mt-1">
                Campaign ID: {campaignDetails.id} • {campaignDetails.platforms.join(', ')}
              </div>
            </div>

            {/* Date Selector and Controls */}
            <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
              <div className="flex items-center bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => setDateRange('last7days')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md ${dateRange === 'last7days' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  7d
                </button>
                <button
                  onClick={() => setDateRange('last14days')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md ${dateRange === 'last14days' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  14d
                </button>
                <button
                  onClick={() => setDateRange('last30days')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md ${dateRange === 'last30days' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  30d
                </button>
                <button
                  onClick={() => setDateRange('last90days')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md ${dateRange === 'last90days' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  90d
                </button>
              </div>
              <button className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                <Calendar className="w-4 h-4" />
              </button>
              <button className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Campaign Time Range */}
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1.5" />
            <span>Campaign Period: {campaignDetails.startDate} to {campaignDetails.endDate}</span>
            <span className="mx-2">•</span>
            <Clock className="w-4 h-4 mr-1.5" />
            <span>Last updated: {new Date(campaignDetails.lastUpdated).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Budget Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Budget Overview</h2>
            <div className="flex items-center text-sm mt-2 md:mt-0">
              <DollarSign className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-gray-500">Total Budget: {formatCurrency(campaignDetails.budget)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Spent */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-500">Spent</span>
                <span className="text-sm text-gray-600">{budgetPercentUsed.toFixed(1)}% of budget</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(campaignDetails.spent)}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${budgetPercentUsed > 90 ? 'bg-red-500' : budgetPercentUsed > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min(budgetPercentUsed, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Remaining */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-500">Remaining</span>
                <span className="text-sm text-gray-600">{(100 - budgetPercentUsed).toFixed(1)}% of budget</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(remainingBudget)}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${100 - Math.min(budgetPercentUsed, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* ROI */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-500">Return on Investment</span>
                <span className="text-sm text-gray-600">Revenue: {formatCurrency(summaryMetrics.revenue)}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{summaryMetrics.roi}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${summaryMetrics.roi > 400 ? 'bg-green-500' : summaryMetrics.roi > 200 ? 'bg-green-400' : 'bg-yellow-500'}`}
                  style={{ width: `${Math.min(summaryMetrics.roi / 10, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveMetricTab('overview')}
              className={`flex-1 py-3 text-sm font-medium ${
                activeMetricTab === 'overview'
                  ? 'text-indigo-600 border-b-2 border-indigo-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveMetricTab('conversions')}
              className={`flex-1 py-3 text-sm font-medium ${
                activeMetricTab === 'conversions'
                  ? 'text-indigo-600 border-b-2 border-indigo-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Conversions
            </button>
            <button
              onClick={() => setActiveMetricTab('engagement')}
              className={`flex-1 py-3 text-sm font-medium ${
                activeMetricTab === 'engagement'
                  ? 'text-indigo-600 border-b-2 border-indigo-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Engagement
            </button>
            <button
              onClick={() => setActiveMetricTab('spend')}
              className={`flex-1 py-3 text-sm font-medium ${
                activeMetricTab === 'spend'
                  ? 'text-indigo-600 border-b-2 border-indigo-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Spend & Efficiency
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeMetricTab === 'overview' && (
              <div>
                {/* Key Metrics Summary */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  {/* Impressions */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">Impressions</span>
                      <div className={`flex items-center text-xs ${impressionsChange.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {impressionsChange.direction === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {impressionsChange.value}%
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(summaryMetrics.impressions)}</div>
                  </div>

                  {/* Clicks */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">Clicks</span>
                      <div className={`flex items-center text-xs ${clicksChange.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {clicksChange.direction === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {clicksChange.value}%
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(summaryMetrics.clicks)}</div>
                  </div>

                  {/* CTR */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">CTR</span>
                      <div className={`flex items-center text-xs ${ctrChange.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {ctrChange.direction === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {ctrChange.value}%
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">{summaryMetrics.ctr}%</div>
                  </div>

                  {/* Conversions */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">Conversions</span>
                      <div className={`flex items-center text-xs ${conversionsChange.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {conversionsChange.direction === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {conversionsChange.value}%
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(summaryMetrics.conversions)}</div>
                  </div>

                  {/* CPM */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">CPM</span>
                      <div className={`flex items-center text-xs ${cpmChange.direction === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                        {cpmChange.direction === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {cpmChange.value}%
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">${summaryMetrics.cpm}</div>
                  </div>

                  {/* Spend */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">Spend</span>
                      <div className={`flex items-center text-xs ${spendChange.direction === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                        {spendChange.direction === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {spendChange.value}%
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">{formatCurrency(summaryMetrics.spend)}</div>
                  </div>
                </div>

                {/* Main Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Spend Over Time Chart */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-900">Daily Spend - {getDateRangeLabel()}</h3>
                      <div className="text-xs text-gray-500">Total: {formatCurrency(spendData.reduce((acc, item) => acc + item.spend, 0))}</div>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={filterDataByDateRange(spendData)} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) => {
                              const date = new Date(value);
                              return date.getDate();
                            }}
                            stroke="#9CA3AF"
                            fontSize={10}
                          />
                          <YAxis
                            stroke="#9CA3AF"
                            fontSize={10}
                            tickFormatter={(value) => `$${value}`}
                          />
                          <Tooltip
                            formatter={(value) => [`$${value}`, 'Spend']}
                            labelFormatter={(value) => `Date: ${value}`}
                          />
                          <Area type="monotone" dataKey="spend" stroke="#0284C7" fill="#0284C7" fillOpacity={0.2} activeDot={{ r: 6 }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Performance Metrics Chart */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-900">Performance Metrics - {getDateRangeLabel()}</h3>
                      <div className="flex space-x-2">
                        <div className="flex items-center text-xs">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                          <span>CTR</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                          <span>Conv. Rate</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filterDataByDateRange([...ctrData, ...conversionsData])} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) => {
                              const date = new Date(value);
                              return date.getDate();
                            }}
                            stroke="#9CA3AF"
                            fontSize={10}
                          />
                          <YAxis
                            stroke="#9CA3AF"
                            fontSize={10}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <Tooltip
                            formatter={(value) => [`${value}%`, 'Rate']}
                            labelFormatter={(value) => `Date: ${value}`}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="ctr" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                          <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Conversions Tab */}
            {activeMetricTab === 'conversions' && (
              <div>
                {/* Conversion Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Total Conversions</span>
                      <div className={`flex items-center text-xs ${conversionsChange.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {conversionsChange.direction === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {conversionsChange.value}%
                      </div>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{formatNumber(summaryMetrics.conversions)}</div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm font-medium text-gray-700 mb-2">Conversion Rate</div>
                    <div className="text-xl font-bold text-gray-900">{summaryMetrics.conversionRate}%</div>
                    <div className="mt-2 text-xs text-gray-500">
                      Benchmark: 3.2% • {summaryMetrics.conversionRate > 3.2 ? 'Outperforming' : 'Underperforming'}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm font-medium text-gray-700 mb-2">Cost Per Acquisition</div>
                    <div className="text-xl font-bold text-gray-900">${summaryMetrics.cpa}</div>
                    <div className="mt-2 text-xs text-gray-500">
                      Benchmark: $4.50 • {summaryMetrics.cpa < 4.5 ? 'Outperforming' : 'Underperforming'}
                    </div>
                  </div>
                </div>

                {/* Conversion Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Conversions Over Time */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-900">Conversions Over Time</h3>
                      <div className="text-xs text-gray-500">
                        Total: {formatNumber(conversionsData.reduce((acc, item) => acc + item.conversions, 0))}
                      </div>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={filterDataByDateRange(conversionsData)} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) => {
                              const date = new Date(value);
                              return date.getDate();
                            }}
                            stroke="#9CA3AF"
                            fontSize={10}
                          />
                          <YAxis
                            stroke="#9CA3AF"
                            fontSize={10}
                          />
                          <Tooltip
                            formatter={(value) => [value, 'Conversions']}
                            labelFormatter={(value) => `Date: ${value}`}
                          />
                          <Bar dataKey="conversions" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Conversion Rate vs. Spend */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-900">Cost Per Acquisition Trend</h3>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={filterDataByDateRange(conversionsData)} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) => {
                              const date = new Date(value);
                              return date.getDate();
                            }}
                            stroke="#9CA3AF"
                            fontSize={10}
                          />
                          <YAxis
                            yAxisId="left"
                            stroke="#9CA3AF"
                            fontSize={10}
                            tickFormatter={(value) => `$${value}`}
                          />
                          <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="#9CA3AF"
                            fontSize={10}
                          />
                          <Tooltip />
                          <Legend />
                          <Bar yAxisId="left" dataKey="conversions" fill="#8884d8" name="Conversions" />
                          <Line yAxisId="right" type="monotone" dataKey="benchmark" stroke="#ff7300" name="Benchmark" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Engagement Tab */}
            {activeMetricTab === 'engagement' && (
              <div>
                {/* Engagement Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Total Impressions</span>
                      <div className={`flex items-center text-xs ${impressionsChange.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {impressionsChange.direction === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {impressionsChange.value}%
                      </div>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{formatNumber(summaryMetrics.impressions)}</div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Total Clicks</span>
                      <div className={`flex items-center text-xs ${clicksChange.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {clicksChange.direction === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {clicksChange.value}%
                      </div>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{formatNumber(summaryMetrics.clicks)}</div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Click-Through Rate</span>
                      <div className={`flex items-center text-xs ${ctrChange.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {ctrChange.direction === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {ctrChange.value}%
                      </div>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{summaryMetrics.ctr}%</div>
                    <div className="mt-2 text-xs text-gray-500">
                      Benchmark: 4.2% • {summaryMetrics.ctr > 4.2 ? 'Outperforming' : 'Underperforming'}
                    </div>
                  </div>
                </div>

                {/* Engagement Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Impressions Over Time */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-900">Impressions Over Time</h3>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={filterDataByDateRange(impressionsData)} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) => {
                              const date = new Date(value);
                              return date.getDate();
                            }}
                            stroke="#9CA3AF"
                            fontSize={10}
                          />
                          <YAxis
                            stroke="#9CA3AF"
                            fontSize={10}
                          />
                          <Tooltip
                            formatter={(value) => [formatNumber(value), 'Impressions']}
                            labelFormatter={(value) => `Date: ${value}`}
                          />
                          <Area type="monotone" dataKey="impressions" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.2} activeDot={{ r: 6 }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* CTR Over Time */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-900">Click-Through Rate Over Time</h3>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filterDataByDateRange(ctrData)} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) => {
                              const date = new Date(value);
                              return date.getDate();
                            }}
                            stroke="#9CA3AF"
                            fontSize={10}
                          />
                          <YAxis
                            stroke="#9CA3AF"
                            fontSize={10}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <Tooltip
                            formatter={(value) => [`${value}%`, 'CTR']}
                            labelFormatter={(value) => `Date: ${value}`}
                          />
                          <Line type="monotone" dataKey="ctr" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                          <Line type="monotone" dataKey="benchmark" stroke="#9CA3AF" strokeWidth={1} strokeDasharray="3 3" dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Hourly Performance Today */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-900">Hourly Performance (Today)</h3>
                    <div className="flex space-x-2">
                      <div className="flex items-center text-xs">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                        <span>Impressions</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                        <span>Clicks</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={hourlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="hour"
                          tickFormatter={(value) => `${value}:00`}
                          stroke="#9CA3AF"
                          fontSize={10}
                        />
                        <YAxis
                          yAxisId="left"
                          stroke="#9CA3AF"
                          fontSize={10}
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          stroke="#9CA3AF"
                          fontSize={10}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="impressions" fill="#3B82F6" name="Impressions" />
                        <Line yAxisId="right" type="monotone" dataKey="clicks" stroke="#10B981" strokeWidth={2} name="Clicks" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Spend & Efficiency Tab */}
            {activeMetricTab === 'spend' && (
              <div>
                {/* Spend Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Total Spend</span>
                      <div className={`flex items-center text-xs ${spendChange.direction === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                        {spendChange.direction === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {spendChange.value}%
                      </div>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{formatCurrency(summaryMetrics.spend)}</div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Cost Per Mille (CPM)</span>
                      <div className={`flex items-center text-xs ${cpmChange.direction === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                        {cpmChange.direction === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {cpmChange.value}%
                      </div>
                    </div>
                    <div className="text-xl font-bold text-gray-900">${summaryMetrics.cpm}</div>
                    <div className="mt-2 text-xs text-gray-500">
                      Benchmark: $5.90 • {summaryMetrics.cpm < 5.9 ? 'Outperforming' : 'Underperforming'}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm font-medium text-gray-700 mb-2">Revenue</div>
                    <div className="text-xl font-bold text-gray-900">{formatCurrency(summaryMetrics.revenue)}</div>
                    <div className="mt-2 text-xs text-gray-500">ROI: {summaryMetrics.roi}%</div>
                  </div>
                </div>

                {/* Spend Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Spend by Day */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-900">Daily Spend</h3>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={filterDataByDateRange(spendData)} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) => {
                              const date = new Date(value);
                              return date.getDate();
                            }}
                            stroke="#9CA3AF"
                            fontSize={10}
                          />
                          <YAxis
                            stroke="#9CA3AF"
                            fontSize={10}
                            tickFormatter={(value) => `$${value}`}
                          />
                          <Tooltip
                            formatter={(value) => [`$${value}`, 'Spend']}
                            labelFormatter={(value) => `Date: ${value}`}
                          />
                          <Bar dataKey="spend" fill="#EF4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* CPM Trend */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-900">CPM Trend</h3>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filterDataByDateRange(cpmData)} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) => {
                              const date = new Date(value);
                              return date.getDate();
                            }}
                            stroke="#9CA3AF"
                            fontSize={10}
                          />
                          <YAxis
                            stroke="#9CA3AF"
                            fontSize={10}
                            tickFormatter={(value) => `$${value}`}
                          />
                          <Tooltip
                            formatter={(value) => [`$${value}`, 'CPM']}
                            labelFormatter={(value) => `Date: ${value}`}
                          />
                          <Line type="monotone" dataKey="cpm" stroke="#F97316" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                          <Line type="monotone" dataKey="benchmark" stroke="#9CA3AF" strokeWidth={1} strokeDasharray="3 3" dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Revenue vs Spend */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-900">Revenue vs. Spend</h3>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={filterDataByDateRange(revenueData)} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.getDate();
                          }}
                          stroke="#9CA3AF"
                          fontSize={10}
                        />
                        <YAxis
                          stroke="#9CA3AF"
                          fontSize={10}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                          formatter={(value) => [`$${value}`, value === 'revenue' ? 'Revenue' : 'Spend']}
                          labelFormatter={(value) => `Date: ${value}`}
                        />
                        <Legend />
                        <Bar dataKey="spend" fill="#EF4444" name="Spend" />
                        <Line type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={2} name="Revenue" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Performance by Audience Section */}
        <div className="mb-6">
          <div className="flex items-center mb-3 cursor-pointer" onClick={() => toggleSection('audience')}>
            <h2 className="text-lg font-semibold text-gray-900">Performance by Audience</h2>
            <button className="ml-2 text-gray-500 hover:text-gray-700">
              {expandedSections.audience ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {expandedSections.audience && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Device Breakdown */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Device Breakdown</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={audienceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {audienceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Geographic Distribution */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={geoData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {geoData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Age Distribution */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Age Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ageData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Bar dataKey="value" fill="#8884d8">
                        {ageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Creative Performance */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Creative Performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Impressions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CTR
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conv. Rate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spend
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CPA
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {creativePerformance.map((creative) => (
                  <tr key={creative.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {creative.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatNumber(creative.impressions)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatNumber(creative.clicks)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {creative.ctr}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatNumber(creative.conversions)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {creative.convRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${formatNumber(creative.spend)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${creative.cpa}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[creative.status]}`}>
                        {creative.status.charAt(0).toUpperCase() + creative.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Anomaly Alerts */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Anomaly Alerts</h2>
          </div>
          <div className="p-4">
            {anomalyAlerts.map((alert) => (
              <div key={alert.id} className="mb-3 last:mb-0 p-3 border border-gray-200 rounded-lg">
                <div className="flex items-start">
                  <div className="mr-3">
                    {alert.severity === 'high' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                    {alert.severity === 'medium' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                    {alert.severity === 'low' && <Info className="h-5 w-5 text-blue-500" />}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900">{alert.metric.toUpperCase()} Anomaly</h3>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">{new Date(alert.date).toLocaleDateString()}</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[alert.status]}`}>
                          {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="mb-6">
          <div className="flex items-center mb-3 cursor-pointer" onClick={() => toggleSection('recommendations')}>
            <h2 className="text-lg font-semibold text-gray-900">AI-Powered Recommendations</h2>
            <button className="ml-2 text-gray-500 hover:text-gray-700">
              {expandedSections.recommendations ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {expandedSections.recommendations && (
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">{rec.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${impactColors[rec.impact]}`}>
                          Impact: {rec.impact.charAt(0).toUpperCase() + rec.impact.slice(1)}
                        </span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${effortColors[rec.effort]}`}>
                          Effort: {rec.effort.charAt(0).toUpperCase() + rec.effort.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Export Actions */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Data shown for Campaign ID: {campaignDetails.id}
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm font-medium hover:bg-gray-300 flex items-center">
              <Download className="w-4 h-4 mr-1.5" /> Export PDF
            </button>
            <button className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm font-medium hover:bg-gray-300 flex items-center">
              <Download className="w-4 h-4 mr-1.5" /> Export CSV
            </button>
            <button className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm font-medium hover:bg-indigo-700 flex items-center">
              <ExternalLink className="w-4 h-4 mr-1.5" /> Share Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDashboard;