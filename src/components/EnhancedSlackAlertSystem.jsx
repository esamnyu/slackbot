import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, ExternalLink, Activity, TrendingUp, TrendingDown, 
  DollarSign, BarChart, Clock, Users, MousePointer, Target, 
  Bell, CheckCircle, UserCheck, MessageSquare, ChevronDown, ChevronUp,
  EyeOff, Flag, ArrowRight, RefreshCw, Filter, MoreHorizontal, Info
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const EnhancedSlackAlertSystem = () => {
  const [currentAlert, setCurrentAlert] = useState(0);
  const [showLiveDemo, setShowLiveDemo] = useState(false);
  const [showMiniChart, setShowMiniChart] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showThreads, setShowThreads] = useState(false);
  const [liveDemoTime, setLiveDemoTime] = useState(0);
  const [incomingAlert, setIncomingAlert] = useState(null);
  const [animateIncoming, setAnimateIncoming] = useState(false);
  
  // Enhanced mock alerts with more data and variety
  const alerts = [
    {
      campaign: "Summer Sale 2025",
      campaignId: "C12345",
      timestamp: "2025-04-21T14:35:00",
      metric: "spend",
      direction: "increase",
      value: 286.45,
      meanValue: 102.30,
      percentChange: 180,
      zScore: 4.5,
      dashboardUrl: "https://analytics.example.com/dashboard/C12345",
      platform: "Facebook",
      targetAudience: "Returning Customers",
      historyData: [
        { time: "09:00", value: 98.12 },
        { time: "10:00", value: 105.34 },
        { time: "11:00", value: 99.87 },
        { time: "12:00", value: 102.55 },
        { time: "13:00", value: 110.23 },
        { time: "14:00", value: 286.45 },
      ],
      priority: "high",
      status: "unresolved",
      reactions: [
        { emoji: "👀", count: 3, users: ["Sarah P.", "Mark T.", "Alex K."] },
        { emoji: "🚨", count: 2, users: ["John D.", "Emma S."] }
      ],
      comments: [
        { 
          user: "Sarah P.", 
          avatar: "SP", 
          time: "2025-04-21T14:40:00", 
          text: "I'm looking into this now. Seems like we might have an issue with our bid strategy.",
          reactions: [{ emoji: "👍", count: 2 }]
        },
        { 
          user: "Mark T.", 
          avatar: "MT", 
          time: "2025-04-21T14:42:00", 
          text: "Could be related to the auction competition change they announced yesterday.",
          reactions: []
        }
      ]
    },
    {
      campaign: "Summer Sale 2025",
      campaignId: "C12345",
      timestamp: "2025-04-21T10:15:00",
      metric: "cpm",
      direction: "increase",
      value: 12.75,
      meanValue: 5.10,
      percentChange: 150,
      zScore: 3.8,
      dashboardUrl: "https://analytics.example.com/dashboard/C12345",
      platform: "Instagram",
      targetAudience: "New Customers",
      historyData: [
        { time: "05:00", value: 4.92 },
        { time: "06:00", value: 5.03 },
        { time: "07:00", value: 5.21 },
        { time: "08:00", value: 5.15 },
        { time: "09:00", value: 5.34 },
        { time: "10:00", value: 12.75 },
      ],
      priority: "medium",
      status: "investigating",
      reactions: [
        { emoji: "👀", count: 2, users: ["Alex K.", "John D."] },
        { emoji: "👆", count: 1, users: ["Emma S."] }
      ],
      comments: [
        { 
          user: "John D.", 
          avatar: "JD", 
          time: "2025-04-21T10:30:00", 
          text: "I'm seeing similar CPM spikes across all Instagram campaigns. Might be platform-wide.",
          reactions: [{ emoji: "💯", count: 1 }]
        }
      ]
    },
    {
      campaign: "Summer Sale 2025",
      campaignId: "C12345",
      timestamp: "2025-04-20T16:45:00",
      metric: "ctr",
      direction: "decrease",
      value: 0.008,
      meanValue: 0.020,
      percentChange: -60,
      zScore: -3.2,
      dashboardUrl: "https://analytics.example.com/dashboard/C12345",
      platform: "Google Ads",
      targetAudience: "All Customers",
      historyData: [
        { time: "11:00", value: 0.019 },
        { time: "12:00", value: 0.021 },
        { time: "13:00", value: 0.022 },
        { time: "14:00", value: 0.02 },
        { time: "15:00", value: 0.018 },
        { time: "16:00", value: 0.008 },
      ],
      priority: "medium",
      status: "resolved",
      reactions: [
        { emoji: "👀", count: 4, users: ["Sarah P.", "Mark T.", "Alex K.", "Emma S."] },
        { emoji: "✅", count: 1, users: ["Alex K."] }
      ],
      comments: [
        { 
          user: "Emma S.", 
          avatar: "ES", 
          time: "2025-04-20T17:00:00", 
          text: "Creative fatigue is likely the issue. Let's rotate in the new ad variants.",
          reactions: [{ emoji: "👍", count: 2 }]
        },
        { 
          user: "Alex K.", 
          avatar: "AK", 
          time: "2025-04-20T17:30:00", 
          text: "New creative variants deployed. CTR already recovering in the last hour.",
          reactions: [{ emoji: "🎉", count: 3 }]
        }
      ]
    },
    {
      campaign: "Spring Collection Promo",
      campaignId: "C78901",
      timestamp: "2025-04-21T08:20:00",
      metric: "impressions",
      direction: "decrease",
      value: 18450,
      meanValue: 42300,
      percentChange: -56,
      zScore: -3.7,
      dashboardUrl: "https://analytics.example.com/dashboard/C78901",
      platform: "TikTok",
      targetAudience: "Gen Z",
      historyData: [
        { time: "03:00", value: 41200 },
        { time: "04:00", value: 43500 },
        { time: "05:00", value: 44100 },
        { time: "06:00", value: 42800 },
        { time: "07:00", value: 40200 },
        { time: "08:00", value: 18450 },
      ],
      priority: "high",
      status: "investigating",
      reactions: [
        { emoji: "👀", count: 2, users: ["Sarah P.", "John D."] },
        { emoji: "🔍", count: 3, users: ["Mark T.", "Emma S.", "Alex K."] }
      ],
      comments: [
        { 
          user: "John D.", 
          avatar: "JD", 
          time: "2025-04-21T08:35:00", 
          text: "Checking if there's a TikTok API outage or reporting delay.",
          reactions: []
        },
        { 
          user: "Sarah P.", 
          avatar: "SP", 
          time: "2025-04-21T08:40:00", 
          text: "Found the issue - our content got flagged by platform moderation. Working with TikTok support now.",
          reactions: [{ emoji: "🙏", count: 2 }]
        }
      ]
    },
    {
      campaign: "Loyalty Program",
      campaignId: "C24680",
      timestamp: "2025-04-21T12:05:00",
      metric: "conversion_rate",
      direction: "increase",
      value: 0.082,
      meanValue: 0.031,
      percentChange: 165,
      zScore: 4.1,
      dashboardUrl: "https://analytics.example.com/dashboard/C24680",
      platform: "Email",
      targetAudience: "Loyal Customers",
      historyData: [
        { time: "07:00", value: 0.029 },
        { time: "08:00", value: 0.032 },
        { time: "09:00", value: 0.031 },
        { time: "10:00", value: 0.030 },
        { time: "11:00", value: 0.033 },
        { time: "12:00", value: 0.082 },
      ],
      priority: "low",
      status: "positive",
      reactions: [
        { emoji: "🎉", count: 5, users: ["Sarah P.", "Mark T.", "Alex K.", "John D.", "Emma S."] },
        { emoji: "👏", count: 3, users: ["Sarah P.", "Emma S.", "Alex K."] }
      ],
      comments: [
        { 
          user: "Emma S.", 
          avatar: "ES", 
          time: "2025-04-21T12:10:00", 
          text: "Great news! The new email template is performing exceptionally well.",
          reactions: [{ emoji: "💯", count: 2 }]
        },
        { 
          user: "Mark T.", 
          avatar: "MT", 
          time: "2025-04-21T12:15:00", 
          text: "Let's analyze what elements are driving this improvement and apply them to other campaigns.",
          reactions: [{ emoji: "👍", count: 3 }]
        }
      ]
    }
  ];

  // Additional metric definitions
  const metricIcons = {
    spend: <DollarSign className="h-5 w-5" />,
    cpm: <BarChart className="h-5 w-5" />,
    ctr: <Activity className="h-5 w-5" />,
    impressions: <Users className="h-5 w-5" />,
    clicks: <MousePointer className="h-5 w-5" />,
    conversion_rate: <Target className="h-5 w-5" />
  };
  
  const metricColors = {
    spend: { bg: "bg-yellow-100", text: "text-yellow-800", chart: "#eab308" },
    cpm: { bg: "bg-orange-100", text: "text-orange-800", chart: "#f97316" },
    ctr: { bg: "bg-blue-100", text: "text-blue-800", chart: "#3b82f6" },
    impressions: { bg: "bg-purple-100", text: "text-purple-800", chart: "#a855f7" },
    clicks: { bg: "bg-green-100", text: "text-green-800", chart: "#22c55e" },
    conversion_rate: { bg: "bg-indigo-100", text: "text-indigo-800", chart: "#6366f1" }
  };
  
  const statusColors = {
    unresolved: { bg: "bg-red-100", text: "text-red-800" },
    investigating: { bg: "bg-yellow-100", text: "text-yellow-800" },
    resolved: { bg: "bg-green-100", text: "text-green-800" },
    positive: { bg: "bg-blue-100", text: "text-blue-800" }
  };
  
  const priorityBadges = {
    high: { label: "High Priority", bg: "bg-red-100", text: "text-red-800" },
    medium: { label: "Medium Priority", bg: "bg-yellow-100", text: "text-yellow-800" },
    low: { label: "Low Priority", bg: "bg-blue-100", text: "text-blue-800" }
  };
  
  // GPT response generation with more detailed insights
  const generateGPTResponse = (alert) => {
    if (alert.metric === "spend") {
      return {
        whatHappened: `Spend has spiked to $${alert.value.toFixed(2)}, which is ${alert.percentChange}% higher than the 24-hour average of $${alert.meanValue.toFixed(2)} on ${alert.platform}.`,
        whyItMatters: "This sudden increase in spend could rapidly deplete your campaign budget. Check for bidding strategy changes, competitor activity in the auction, or if conversion tracking is still working properly. Consider implementing a budget cap until resolved.",
        recommendations: [
          "Review recent changes to automated bidding settings",
          "Check for unusual competitor activity in auction insights",
          "Verify conversion tracking is functioning correctly",
          "Consider implementing a temporary budget cap"
        ]
      };
    } else if (alert.metric === "cpm") {
      return {
        whatHappened: `CPM has risen to $${alert.value.toFixed(2)}, which is ${alert.percentChange}% above the recent average of $${alert.meanValue.toFixed(2)} for your ${alert.targetAudience} audience on ${alert.platform}.`,
        whyItMatters: "Higher CPM means your campaign is becoming less efficient. This impacts your overall ROI and could be caused by increased competition, audience saturation, or declining ad relevance scores.",
        recommendations: [
          "Refresh creative assets to improve relevance scores",
          "Expand audience targeting to reduce saturation",
          "Review auction insights for competitive pressure",
          "Consider testing alternative placements"
        ]
      };
    } else if (alert.metric === "ctr") {
      return {
        whatHappened: `CTR has dropped to ${(alert.value * 100).toFixed(2)}%, which is ${Math.abs(alert.percentChange)}% below the normal level of ${(alert.meanValue * 100).toFixed(2)}% for ${alert.platform} campaigns.`,
        whyItMatters: "Declining CTR indicates reduced audience engagement with your ads, which affects quality scores and can lead to higher costs. This significant drop suggests possible creative fatigue or changing audience preferences.",
        recommendations: [
          "Deploy new creative variations with fresh messaging",
          "Test different ad formats or placements",
          "Review competitor messaging for market shifts",
          "Consider adjusting audience targeting parameters"
        ]
      };
    } else if (alert.metric === "impressions") {
      return {
        whatHappened: `Impressions have fallen to ${alert.value.toLocaleString()}, which is ${Math.abs(alert.percentChange)}% below the normal level of ${alert.meanValue.toLocaleString()} for your ${alert.platform} campaigns.`,
        whyItMatters: "This significant drop in impressions indicates potential delivery issues that could impact your reach and campaign effectiveness. It may be caused by platform technical issues, content policy violations, or major auction changes.",
        recommendations: [
          "Check for content policy violations or account restrictions",
          "Verify budget caps and bidding settings",
          "Monitor platform status pages for technical issues",
          "Review recent algorithm or auction mechanism changes"
        ]
      };
    } else if (alert.metric === "conversion_rate") {
      return {
        whatHappened: `Conversion rate has increased to ${(alert.value * 100).toFixed(2)}%, which is ${alert.percentChange}% above the normal level of ${(alert.meanValue * 100).toFixed(2)}% for ${alert.platform} campaigns.`,
        whyItMatters: "This positive anomaly represents a significant improvement in campaign effectiveness. Understanding what drove this change could help replicate this success across other campaigns and channels.",
        recommendations: [
          "Analyze which audience segments are driving the improvement",
          "Review recent creative or messaging changes",
          "Document changes to landing page or conversion flow",
          "Apply successful elements to other campaigns"
        ]
      };
    }
    
    return {
      whatHappened: `${alert.metric.toUpperCase()} has shown an anomalous ${alert.direction} to ${alert.value}, which is ${alert.direction === "increase" ? "+" : ""}${alert.percentChange}% from the average on ${alert.platform}.`,
      whyItMatters: "This deviation could impact campaign performance and efficiency. Immediate investigation is recommended to understand the root cause and take appropriate action.",
      recommendations: [
        "Review recent campaign changes",
        "Check for platform updates or issues",
        "Compare with historical patterns",
        "Monitor for continued anomalies"
      ]
    };
  };

  // Live demo simulation logic
  useEffect(() => {
    if (showLiveDemo) {
      const interval = setInterval(() => {
        setLiveDemoTime(prev => {
          // After 5 seconds, trigger an incoming alert
          if (prev === 5 && !incomingAlert) {
            const randomAlert = Math.floor(Math.random() * alerts.length);
            setIncomingAlert(alerts[randomAlert]);
            setAnimateIncoming(true);
            
            // After 2 seconds, add it to the feed
            setTimeout(() => {
              setAnimateIncoming(false);
              setCurrentAlert(randomAlert);
            }, 2000);
          }
          
          // Reset after 10 seconds
          if (prev >= 10) {
            setIncomingAlert(null);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [showLiveDemo, incomingAlert]);
  
  const alert = alerts[currentAlert];
  const gptResponse = generateGPTResponse(alert);
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    });
  };

  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMinutes = Math.floor((now - then) / (1000 * 60));
    
    if (diffMinutes < 1) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };
  
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* Control Panel */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center mb-2 md:mb-0">
            <h1 className="text-xl font-bold text-gray-800 mr-4">Campaign Insight Bot</h1>
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowLiveDemo(!showLiveDemo)}
                className={`text-sm px-3 py-1 rounded-full flex items-center gap-1 ${
                  showLiveDemo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <RefreshCw className="h-3 w-3" />
                {showLiveDemo ? 'Stop Live Demo' : 'Start Live Demo'}
              </button>
              
              <button 
                onClick={() => setShowMiniChart(!showMiniChart)}
                className={`text-sm px-3 py-1 rounded-full flex items-center gap-1 ${
                  showMiniChart ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <BarChart className="h-3 w-3" />
                {showMiniChart ? 'Hide Charts' : 'Show Charts'}
              </button>
              
              <button 
                onClick={() => setExpandedDetails(!expandedDetails)}
                className={`text-sm px-3 py-1 rounded-full flex items-center gap-1 ${
                  expandedDetails ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <Info className="h-3 w-3" />
                {expandedDetails ? 'Simple View' : 'Detailed View'}
              </button>
              
              <button 
                onClick={() => setShowReactions(!showReactions)}
                className={`text-sm px-3 py-1 rounded-full flex items-center gap-1 ${
                  showReactions ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <MessageSquare className="h-3 w-3" />
                {showReactions ? 'Hide Reactions' : 'Show Reactions'}
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-sm flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <Filter className="h-3 w-3 text-gray-500" />
              <span>Filter: All Alerts</span>
            </div>
            
            <select className="text-sm border border-gray-200 rounded px-2 py-1">
              <option>Navigate Examples...</option>
              {alerts.map((a, i) => (
                <option key={i} value={i} onClick={() => setCurrentAlert(i)}>
                  {a.campaign}: {a.metric} {a.direction}
                </option>
              ))}
            </select>
            
            <div className="flex space-x-1">
              <button 
                onClick={() => setCurrentAlert((prev) => (prev > 0 ? prev - 1 : alerts.length - 1))}
                className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setCurrentAlert((prev) => (prev < alerts.length - 1 ? prev + 1 : 0))}
                className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto w-full p-4 md:p-6 flex flex-col-reverse md:flex-row gap-6">
        {/* Sidebar - Alert List */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-medium text-gray-700 flex items-center gap-2">
                <Bell className="h-4 w-4 text-gray-500" />
                Recent Alerts
              </h2>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                {alerts.length}
              </span>
            </div>
            
            <div className="divide-y divide-gray-100">
              {alerts.map((a, i) => (
                <div 
                  key={i}
                  className={`p-3 hover:bg-gray-50 cursor-pointer ${
                    currentAlert === i ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => setCurrentAlert(i)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${priorityBadges[a.priority].bg} ${priorityBadges[a.priority].text}`}>
                      {priorityBadges[a.priority].label}
                    </div>
                    <span className="text-xs text-gray-500">{formatRelativeTime(a.timestamp)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`p-1 rounded ${metricColors[a.metric].bg}`}>
                      {metricIcons[a.metric]}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{a.metric.replace('_', ' ').toUpperCase()}</div>
                      <div className={`text-xs ${a.direction === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                        {a.direction === 'increase' ? '+' : ''}{a.percentChange}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-600 mt-1 flex items-center justify-between">
                    <div>{a.platform}</div>
                    <div className={`px-1.5 py-0.5 rounded-full ${statusColors[a.status].bg} ${statusColors[a.status].text} text-xs`}>
                      {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Alert Content */}
        <div className="flex-grow">
          {/* Live Demo Notification */}
          {showLiveDemo && (
            <div className={`mb-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between transition-all duration-500 ${
              animateIncoming ? 'animate-pulse' : ''
            }`}>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-green-500 animate-spin" />
                <span className="text-green-700 font-medium">
                  {incomingAlert ? 'New alert detected!' : 'Live demo mode: Monitoring campaigns in real-time...'}
                </span>
              </div>
              
              {incomingAlert && (
                <div className="flex items-center gap-2 text-green-700">
                  <span className="text-sm">
                    {incomingAlert.metric.toUpperCase()} anomaly on {incomingAlert.platform}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </div>
          )}
        
          {/* Slack App UI Mockup */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            {/* Slack Header */}
            <div className="bg-purple-700 p-3 text-white">
              <div className="flex items-center gap-2">
                <span className="font-bold"># campaign-alerts</span>
                <span className="text-purple-200 text-sm">marketing-team</span>
                <div className="ml-auto flex items-center gap-2 text-xs">
                  <span className="bg-purple-800 px-2 py-0.5 rounded text-white">42 members</span>
                  <button className="hover:bg-purple-600 p-1 rounded">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Message Container */}
            <div className="p-4 bg-white">
              {/* Bot Avatar and Name */}
              <div className="flex items-start mb-2">
                <div className="w-10 h-10 rounded bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                  IB
                </div>
                <div className="flex items-center">
                  <span className="font-bold">Insight Bot</span>
                  <span className="text-gray-500 text-xs ml-2">{formatTime(alert.timestamp)}</span>
                  <div className="ml-2 flex items-center gap-1">
                    <span className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded">Bot</span>
                    {showReactions && (
                      <div className="flex space-x-1 ml-2">
                        {alert.reactions.map((reaction, idx) => (
                          <div key={idx} className="bg-gray-100 text-gray-800 text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <span>{reaction.emoji}</span>
                            <span>{reaction.count}</span>
                          </div>
                        ))}
                        <button className="text-gray-400 hover:text-gray-600">
                          <span className="text-xs">+</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Message Content */}
              <div className="ml-13 pl-10">
                {/* Alert Header */}
                <div className="border-l-4 border-red-500 p-4 bg-white rounded-lg shadow mb-4">
                  <div className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Campaign Anomaly Alert: {alert.campaign}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-4">
                    <span>Campaign ID: {alert.campaignId}</span>
                    <span>•</span>
                    <span>Detected at: {formatTime(alert.timestamp)}</span>
                    {expandedDetails && (
                      <>
                        <span>•</span>
                        <span>Platform: {alert.platform}</span>
                        <span>•</span>
                        <span>Audience: {alert.targetAudience}</span>
                      </>
                    )}
                  </div>
                  
                  {/* Anomaly Details */}
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                      metricColors[alert.metric].bg} ${metricColors[alert.metric].text}`}>
                      {metricIcons[alert.metric]}
                      <span className="font-medium capitalize">{alert.metric.replace('_', ' ').toUpperCase()}</span>
                      {alert.direction === "increase" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Z-Score:</span>
                      <span className={`${Math.abs(alert.zScore) > 3 ? "text-red-600" : "text-orange-600"} font-bold`}>
                        {alert.zScore > 0 ? "+" : ""}{alert.zScore.toFixed(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Change:</span>
                      <span className={`${
                        alert.direction === "increase" ? "text-green-600" : "text-red-600"
                      } font-bold`}>
                        {alert.direction === "increase" ? "+" : "-"}{Math.abs(alert.percentChange)}%
                      </span>
                    </div>
                    
                    <div className={`px-2 py-0.5 rounded-full text-xs ${statusColors[alert.status].bg} ${statusColors[alert.status].text}`}>
                      Status: {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </div>
                  </div>

                  {/* Mini Chart */}
                  {showMiniChart && (
                    <div className="mb-4 bg-gray-50 p-3 rounded border border-gray-100">
                      <div className="text-sm font-medium text-gray-700 mb-2">
                        {alert.metric.replace('_', ' ').toUpperCase()} Trend (Last 6 Hours)
                      </div>
                      <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={alert.historyData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="time" stroke="#9ca3af" fontSize={10} />
                            <YAxis stroke="#9ca3af" fontSize={10} />
                            <Tooltip 
                              contentStyle={{ 
                                border: '1px solid #e5e7eb', 
                                borderRadius: '0.25rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.95)'
                              }}
                              formatter={(value) => [value, alert.metric.replace('_', ' ')]}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke={metricColors[alert.metric].chart} 
                              strokeWidth={2}
                              dot={{ r: 2, fill: metricColors[alert.metric].chart }}
                              activeDot={{ r: 4 }}
                            />
                            <ReferenceLine y={alert.meanValue} stroke="#9ca3af" strokeDasharray="3 3" label={{
                              position: 'right',
                              value: 'Avg',
                              fill: '#9ca3af',
                              fontSize: 10
                            }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                  
                  {/* GPT-Generated Content */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="mb-3">
                      <h3 className="font-semibold text-gray-800 mb-1">WHAT HAPPENED:</h3>
                      <p className="text-gray-700">{gptResponse.whatHappened}</p>
                    </div>
                    
                    <div className="mb-3">
                      <h3 className="font-semibold text-gray-800 mb-1">WHY IT MATTERS:</h3>
                      <p className="text-gray-700">{gptResponse.whyItMatters}</p>
                    </div>
                    
                    {expandedDetails && (
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">RECOMMENDATIONS:</h3>
                        <ul className="text-gray-700 list-disc pl-5 space-y-1">
                          {gptResponse.recommendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <a 
                    href={alert.dashboardUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium"
                  >
                    View Dashboard
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium">
                    <CheckCircle className="h-4 w-4" />
                    Acknowledge
                  </button>
                  
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 text-sm font-medium">
                    <UserCheck className="h-4 w-4" />
                    Assign
                  </button>
                  
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm font-medium">
                    <EyeOff className="h-4 w-4" />
                    Mute Similar
                  </button>
                  
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 text-sm font-medium">
                    <Flag className="h-4 w-4" />
                    Report Issue
                  </button>
                </div>

                {/* Thread Replies */}
                {showReactions && alert.comments.length > 0 && (
                  <div className="mt-2 border-t border-gray-100 pt-3">
                    <button 
                      className="text-sm text-blue-600 mb-3 flex items-center gap-1"
                      onClick={() => setShowThreads(!showThreads)}
                    >
                      {showThreads ? (
                        <>
                          <ChevronUp className="h-3 w-3" />
                          Hide thread
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3 w-3" />
                          Show thread ({alert.comments.length} replies)
                        </>
                      )}
                    </button>
                    
                    {showThreads && (
                      <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                        {alert.comments.map((comment, idx) => (
                          <div key={idx} className="flex items-start">
                            <div className="w-8 h-8 rounded bg-gray-300 flex items-center justify-center text-white font-bold mr-2 text-xs">
                              {comment.avatar}
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center">
                                <span className="font-medium text-sm">{comment.user}</span>
                                <span className="text-gray-500 text-xs ml-2">{formatRelativeTime(comment.time)}</span>
                              </div>
                              <p className="text-gray-700 text-sm mt-1">{comment.text}</p>
                              
                              {comment.reactions.length > 0 && (
                                <div className="flex space-x-1 mt-1">
                                  {comment.reactions.map((reaction, ridx) => (
                                    <div key={ridx} className="bg-gray-100 text-gray-800 text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                      <span>{reaction.emoji}</span>
                                      <span>{reaction.count}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                          <input 
                            type="text" 
                            placeholder="Reply to thread..." 
                            className="w-full text-sm border border-gray-300 rounded-md px-3 py-1.5"
                          />
                          <button className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-blue-700">
                            Send
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Information Footer */}
          <div className="mt-4 text-center text-gray-500 max-w-3xl mx-auto">
            <p className="text-sm">
              This alert was automatically generated using statistical analysis (z-score ±{Math.abs(alert.zScore).toFixed(1)}σ) to detect abnormal patterns.
              GPT-4 translates these technical findings into actionable insights for your marketing team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSlackAlertSystem;