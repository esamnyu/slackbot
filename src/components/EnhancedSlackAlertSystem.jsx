import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    // Icons for SlackInsightBot
    ArrowRight, ArrowDown, ArrowUp, Database, MessageSquare as MessageSquareIcon, // Renamed MessageSquare for clarity
    BarChart3, BrainCircuit, LineChart as LineChartIcon, Users as UsersIcon, RefreshCw as RefreshCwIcon, // Renamed icons for clarity

    // Icons for EnhancedSlackAlertSystem
    AlertTriangle, ExternalLink, Activity, TrendingUp, TrendingDown,
    DollarSign, BarChart, /* Clock, */ Users, MousePointer, Target, // Removed unused Clock
    Bell, CheckCircle, UserCheck, ChevronDown, ChevronUp,
    EyeOff, Flag, Filter, MoreHorizontal, Info,
    ThumbsUp, ThumbsDown, Bug, // Replaced SearchX with Bug
    // Loader2 // Removed unused Loader2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

//===============================================
// Component 1: SlackInsightBot (Pipeline View)
//===============================================
// (Keep SlackInsightBot component as provided by the user)
const SlackInsightBot = () => {
    // Enhanced styles for components - using Tailwind CSS classes
    const boxStyle = "rounded-lg px-6 py-5 shadow-lg border border-gray-200 flex flex-col items-center text-center min-h-[230px] justify-center transition-transform duration-200 ease-in-out hover:scale-105";
    const arrowContainerStyle = "flex items-center justify-center h-full";
    const arrowStyle = "text-gray-600 mx-3 flex-shrink-0";
    const titleStyle = "font-semibold text-lg mb-2";
    const subtitleStyle = "text-sm text-gray-700 mb-1";
    const detailStyle = "text-xs text-gray-500 mb-0.5";
    const channelBadge = "bg-purple-200 text-purple-900 px-2.5 py-1 rounded-full text-xs font-bold inline-block shadow-sm";

    // Style for the highlighted Mock Dashboard box
    const highlightedBoxStyle = "border-2 border-indigo-400 shadow-xl ring-4 ring-indigo-200 ring-opacity-50";

    return (
        // Main container with padding and a subtle gradient background
        <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 font-sans w-full">
            <h1 className="text-3xl font-bold text-center mb-16 text-gray-800 tracking-tight">Slack Insight Bot - Closed-Loop Analytics Pipeline</h1>

            {/* Main pipeline flow */}
            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 mb-12">

                {/* Step 1: Campaign Data */}
                <div className={`${boxStyle} bg-gradient-to-b from-blue-100 to-blue-50 w-full lg:w-[18%]`}>
                    <Database className="text-blue-700 mb-3" size={36} />
                    <h2 className={titleStyle}>1. Campaign Data</h2>
                    <p className={detailStyle}>APIs, DB Logs, PoC Metrics, CSV/JSON</p> {/* Combined for space */}
                </div>

                {/* Arrow */}
                <div className={`${arrowContainerStyle} w-full lg:w-auto my-4 lg:my-0`}>
                    <ArrowRight className={arrowStyle} size={28} strokeWidth={2.5}/>
                </div>

                {/* Step 2: Data Ingestion & Preprocessing */}
                <div id="ingestion-preprocessing" className={`${boxStyle} bg-gradient-to-b from-green-100 to-green-50 w-full lg:w-[18%]`}>
                    <LineChartIcon className="text-green-700 mb-3" size={36} /> {/* Use renamed icon */}
                    <h2 className={titleStyle}>2. Ingestion & Preprocessing</h2>
                    <p className={subtitleStyle}>Python</p>
                    <p className={detailStyle}>Cleans, normalizes, filters</p>
                    <div className="mt-2.5">
                        <span className={channelBadge}>geo-optional</span>
                    </div>
                </div>

                {/* Arrow */}
                <div className={`${arrowContainerStyle} w-full lg:w-auto my-4 lg:my-0`}>
                    <ArrowRight className={arrowStyle} size={28} strokeWidth={2.5}/>
                </div>

                {/* Step 3: Feature Enrichment */}
                <div id="feature-enrichment" className={`${boxStyle} bg-gradient-to-b from-yellow-100 to-yellow-50 w-full lg:w-[18%]`}>
                    <BarChart3 className="text-yellow-700 mb-3" size={36} />
                    <h2 className={titleStyle}>3. Feature Enrichment</h2>
                    <p className={subtitleStyle}>Wind, Z-scores</p>
                    <p className={detailStyle}>Rolling metrics, Anomaly detection</p>
                    <div className="mt-2.5">
                        <span className={channelBadge}>campaign-alerts</span>
                    </div>
                </div>

                {/* Arrow */}
                <div className={`${arrowContainerStyle} w-full lg:w-auto my-4 lg:my-0`}>
                    <ArrowRight className={arrowStyle} size={28} strokeWidth={2.5}/>
                </div>

                {/* Step 4: OpenAI GPT */}
                <div className={`${boxStyle} bg-gradient-to-b from-purple-100 to-purple-50 w-full lg:w-[18%]`}>
                    <BrainCircuit className="text-purple-700 mb-3" size={36} />
                    <h2 className={titleStyle}>4. OpenAI GPT</h2>
                    <p className={subtitleStyle}>Alert Generation</p>
                    <p className={detailStyle}>Contextualizes data, Human-readable</p>
                </div>

                {/* Arrow */}
                <div className={`${arrowContainerStyle} w-full lg:w-auto my-4 lg:my-0`}>
                    <ArrowRight className={arrowStyle} size={28} strokeWidth={2.5}/>
                </div>

                {/* Step 5: Mock Dashboard - HIGHLIGHTED */}
                <div className={`${boxStyle} ${highlightedBoxStyle} bg-gradient-to-b from-indigo-100 to-indigo-50 w-full lg:w-[18%]`}>
                    <BarChart3 className="text-indigo-700 mb-3" size={36} />
                    <h2 className={titleStyle}>5. Mock Dashboard</h2>
                    <p className={subtitleStyle}>Linked in Alert</p>
                    <p className={detailStyle}>Visualization, Drill-down</p>
                </div>
            </div>

            {/* Arrow pointing down towards Users */}
            <div className="flex justify-center mb-4">
                <ArrowDown className="text-gray-500 animate-bounce" size={28} strokeWidth={2.5}/>
            </div>

            {/* Users Section */}
            <div className="mb-12 flex flex-col items-center justify-center">
                <div className={`${boxStyle} bg-gradient-to-b from-red-100 to-red-50 max-w-md w-full lg:w-[40%]`}>
                    <UsersIcon className="text-red-700 mb-3" size={36} /> {/* Use renamed icon */}
                    <h2 className={titleStyle}>6. Ops/Analytics Team (Users)</h2>
                    <p className={detailStyle}>Consume alerts, Review dashboards, Provide feedback (false alarms, ROI, notes)</p> {/* Combined */}
                </div>
            </div>

            {/* Feedback Loop Section - Refined for Clarity */}
            <div className="relative mt-10 flex flex-col items-center justify-center text-center px-4">
                {/* Central Feedback Icon */}
                <div className="mb-4 p-3 bg-gray-200 rounded-full shadow-md">
                    <RefreshCwIcon className="text-gray-800 animate-spin [animation-duration:3s]" size={32} strokeWidth={2.5}/> {/* Use renamed icon */}
                </div>

                {/* Feedback Description Box - Styled like the reference image */}
                <div className="w-full max-w-xl mx-auto mb-6 p-5 bg-white rounded-lg shadow-lg border border-gray-300">
                    <p className="font-semibold text-lg mb-3 text-gray-800">Feedback Loop:</p>
                    <p className="text-sm text-gray-600 mb-4">
                        User feedback (false alarms, ROI, notes) is channeled back to improve the system.
                    </p>
                    {/* Explicit visual cues for feedback destination - Made clearer */}
                    {/* Using inline-flex for better alignment and spacing */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm font-medium">
                        <div className="inline-flex items-center gap-1.5 p-2 bg-green-100 text-green-800 rounded-md border border-green-300 shadow-sm">
                            <ArrowUp size={18} strokeWidth={2.5}/>
                            <span>To: Ingestion/Preprocessing</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 p-2 bg-yellow-100 text-yellow-800 rounded-md border border-yellow-300 shadow-sm">
                            <ArrowUp size={18} strokeWidth={2.5}/>
                            <span>To: Feature Enrichment</span>
                        </div>
                    </div>
                </div>

                {/* Motto */}
                <div className="mt-6 p-5 bg-gray-800 rounded-lg mx-auto max-w-lg shadow-xl">
                    <p className="font-bold italic text-white text-base">
                        "Closed-loop learning system—feeding real user feedback"
                    </p>
                </div>
            </div>
        </div>
    );
};


//===============================================
// Component 2: EnhancedSlackAlertSystem (Alerts View) - CORRECTED
//===============================================
const EnhancedSlackAlertSystem = () => {
    // --- Existing State ---
    const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
    const [showLiveDemo, setShowLiveDemo] = useState(false);
    const [showMiniChart, setShowMiniChart] = useState(false);
    const [expandedDetails, setExpandedDetails] = useState(false);
    const [showReactions, setShowReactions] = useState(false);
    const [showThreads, setShowThreads] = useState(false);
    // const [liveDemoTime, setLiveDemoTime] = useState(0); // Removed unused state
    const [incomingAlert, setIncomingAlert] = useState(null);
    const [animateIncoming, setAnimateIncoming] = useState(false);
    const [feedbackGiven, setFeedbackGiven] = useState({});

    // --- State for Action Buttons ---
    // We'll store the status *per alert index*
    const [alertStatuses, setAlertStatuses] = useState({});
    // Example structure: { 0: { acknowledged: false, assignedTo: null, reported: false, issue: null }, 1: {...} }

    const [mutedAlerts, setMutedAlerts] = useState({});
    // Example structure: { "C12345-spend": { muted: true, expires: 1713805623000 }, ... }

    // Enhanced mock alerts (Consider adding initial 'status' if needed, or rely on alertStatuses state)
    // For simplicity, the original 'status' field in the mock data remains, but alertStatuses will override for UI
    // Removed unused setAlerts warning by adding eslint-disable-next-line (assuming it might be used later)
    // eslint-disable-next-line no-unused-vars
    const [alerts, setAlerts] = useState([
        {
            campaign: "Summer Sale 2025", campaignId: "C12345", timestamp: "2025-04-21T14:35:00",
            metric: "spend", direction: "increase", value: 286.45, meanValue: 102.30, percentChange: 180, zScore: 4.5,
            dashboardUrl: "https://analytics.example.com/dashboard/C12345", platform: "Facebook", targetAudience: "Returning Customers",
            historyData: [ { time: "09:00", value: 98.12 }, { time: "10:00", value: 105.34 }, { time: "11:00", value: 99.87 }, { time: "12:00", value: 102.55 }, { time: "13:00", value: 110.23 }, { time: "14:00", value: 286.45 }, ],
            priority: "high", status: "unresolved", // Initial status
            reactions: [ { emoji: "👀", count: 3, users: ["Sarah P.", "Mark T.", "Alex K."] }, { emoji: "🚨", count: 2, users: ["John D.", "Emma S."] } ],
            comments: [ { user: "Sarah P.", avatar: "SP", time: "2025-04-21T14:40:00", text: "I'm looking into this now. Seems like we might have an issue with our bid strategy.", reactions: [{ emoji: "👍", count: 2 }] }, { user: "Mark T.", avatar: "MT", time: "2025-04-21T14:42:00", text: "Could be related to the auction competition change they announced yesterday.", reactions: [] } ]
        },
        {
            campaign: "Summer Sale 2025", campaignId: "C12345", timestamp: "2025-04-21T10:15:00",
            metric: "cpm", direction: "increase", value: 12.75, meanValue: 5.10, percentChange: 150, zScore: 3.8,
            dashboardUrl: "https://analytics.example.com/dashboard/C12345", platform: "Instagram", targetAudience: "New Customers",
            historyData: [ { time: "05:00", value: 4.92 }, { time: "06:00", value: 5.03 }, { time: "07:00", value: 5.21 }, { time: "08:00", value: 5.15 }, { time: "09:00", value: 5.34 }, { time: "10:00", value: 12.75 }, ],
            priority: "medium", status: "investigating",
            reactions: [ { emoji: "👀", count: 2, users: ["Alex K.", "John D."] }, { emoji: "👆", count: 1, users: ["Emma S."] } ],
            comments: [ { user: "John D.", avatar: "JD", time: "2025-04-21T10:30:00", text: "I'm seeing similar CPM spikes across all Instagram campaigns. Might be platform-wide.", reactions: [{ emoji: "💯", count: 1 }] } ]
        },
        {
            campaign: "Summer Sale 2025", campaignId: "C12345", timestamp: "2025-04-20T16:45:00",
            metric: "ctr", direction: "decrease", value: 0.008, meanValue: 0.020, percentChange: -60, zScore: -3.2,
            dashboardUrl: "https://analytics.example.com/dashboard/C12345", platform: "Google Ads", targetAudience: "All Customers",
            historyData: [ { time: "11:00", value: 0.019 }, { time: "12:00", value: 0.021 }, { time: "13:00", value: 0.022 }, { time: "14:00", value: 0.02 }, { time: "15:00", value: 0.018 }, { time: "16:00", value: 0.008 }, ],
            priority: "medium", status: "resolved",
            reactions: [ { emoji: "👀", count: 4, users: ["Sarah P.", "Mark T.", "Alex K.", "Emma S."] }, { emoji: "✅", count: 1, users: ["Alex K."] } ],
            comments: [ { user: "Emma S.", avatar: "ES", time: "2025-04-20T17:00:00", text: "Creative fatigue is likely the issue. Let's rotate in the new ad variants.", reactions: [{ emoji: "👍", count: 2 }] }, { user: "Alex K.", avatar: "AK", time: "2025-04-20T17:30:00", text: "New creative variants deployed. CTR already recovering in the last hour.", reactions: [{ emoji: "🎉", count: 3 }] } ]
        },
        {
            campaign: "Spring Collection Promo", campaignId: "C78901", timestamp: "2025-04-21T08:20:00",
            metric: "impressions", direction: "decrease", value: 18450, meanValue: 42300, percentChange: -56, zScore: -3.7,
            dashboardUrl: "https://analytics.example.com/dashboard/C78901", platform: "TikTok", targetAudience: "Gen Z",
            historyData: [ { time: "03:00", value: 41200 }, { time: "04:00", value: 43500 }, { time: "05:00", value: 44100 }, { time: "06:00", value: 42800 }, { time: "07:00", value: 40200 }, { time: "08:00", value: 18450 }, ],
            priority: "high", status: "investigating",
            reactions: [ { emoji: "👀", count: 2, users: ["Sarah P.", "John D."] }, { emoji: "🔍", count: 3, users: ["Mark T.", "Emma S.", "Alex K."] } ],
            comments: [ { user: "John D.", avatar: "JD", time: "2025-04-21T08:35:00", text: "Checking if there's a TikTok API outage or reporting delay.", reactions: [] }, { user: "Sarah P.", avatar: "SP", time: "2025-04-21T08:40:00", text: "Found the issue - our content got flagged by platform moderation. Working with TikTok support now.", reactions: [{ emoji: "🙏", count: 2 }] } ]
        },
        {
            campaign: "Loyalty Program", campaignId: "C24680", timestamp: "2025-04-21T12:05:00",
            metric: "conversion_rate", direction: "increase", value: 0.082, meanValue: 0.031, percentChange: 165, zScore: 4.1,
            dashboardUrl: "https://analytics.example.com/dashboard/C24680", platform: "Email", targetAudience: "Loyal Customers",
            historyData: [ { time: "07:00", value: 0.029 }, { time: "08:00", value: 0.032 }, { time: "09:00", value: 0.031 }, { time: "10:00", value: 0.030 }, { time: "11:00", value: 0.033 }, { time: "12:00", value: 0.082 }, ],
            priority: "low", status: "positive",
            reactions: [ { emoji: "🎉", count: 5, users: ["Sarah P.", "Mark T.", "Alex K.", "John D.", "Emma S."] }, { emoji: "👏", count: 3, users: ["Sarah P.", "Emma S.", "Alex K."] } ],
            comments: [ { user: "Emma S.", avatar: "ES", time: "2025-04-21T12:10:00", text: "Great news! The new email template is performing exceptionally well.", reactions: [{ emoji: "💯", count: 2 }] }, { user: "Mark T.", avatar: "MT", time: "2025-04-21T12:15:00", text: "Let's analyze what elements are driving this improvement and apply them to other campaigns.", reactions: [{ emoji: "👍", count: 3 }] } ]
        }
    ]);

    // Metric definitions
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

    // GPT response generation
    const generateGPTResponse = (alert) => {
        if (!alert) return { whatHappened: '', whyItMatters: '', recommendations: []}; // Handle undefined alert
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

        // Fallback for unhandled metrics
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

    // Simplified Live demo simulation logic (removed liveDemoTime)
    useEffect(() => {
        let intervalId;
        let timer = 0; // Local timer variable
        if (showLiveDemo) {
            intervalId = setInterval(() => {
                timer++;
                if (timer === 5 && !incomingAlert) {
                    const randomAlertIndex = Math.floor(Math.random() * alerts.length);
                    const newIncomingAlert = alerts[randomAlertIndex]; // Use distinct variable name
                    setIncomingAlert(newIncomingAlert);
                    setAnimateIncoming(true);

                    setTimeout(() => {
                        setAnimateIncoming(false);
                        // Check if the incoming alert still matches the one we set
                        // (in case another interval fired quickly or state changed)
                        // Compare with the captured alert object reference
                        if (incomingAlert === newIncomingAlert) {
                            setCurrentAlertIndex(randomAlertIndex);
                            setIncomingAlert(null); // Clear incoming *after* setting index
                        }
                    }, 2000);
                    timer = 0; // Reset timer after firing
                }
                if (timer >= 10) { // Reset if no alert triggered after 10s
                   timer = 0;
                }
            }, 1000);
        } else {
           // Clear state when demo stops
            setIncomingAlert(null);
            setAnimateIncoming(false);
        }
        return () => clearInterval(intervalId);
    // Add setCurrentAlertIndex to dependencies as it's used in the timeout now
    }, [showLiveDemo, alerts, incomingAlert, setCurrentAlertIndex]);


    // --- Action Button Handler Functions ---

    const handleAcknowledge = useCallback((alertIndex) => {
        console.log(`Acknowledging alert ${alertIndex}`);
        setAlertStatuses(prev => ({
            ...prev,
            [alertIndex]: {
                ...prev[alertIndex], // Keep existing statuses like assignedTo, reported
                acknowledged: true,
                // Change status if it was unresolved, else keep current
                status: (prev[alertIndex]?.status ?? alerts[alertIndex]?.status) === 'unresolved'
                    ? 'investigating'
                    : (prev[alertIndex]?.status ?? alerts[alertIndex]?.status)
            }
        }));
        // TODO: Add API call to backend to persist acknowledgement
        // Example: api.acknowledgeAlert(alerts[alertIndex].campaignId, alerts[alertIndex].timestamp);
    }, [alerts, alertStatuses]); // Added missing dependency: alertStatuses

    const handleAssign = useCallback((alertIndex) => {
        console.log(`Assigning alert ${alertIndex}`);
        // In a real app, this would open a modal/dropdown
        const assignedUser = prompt("(Mock) Assign alert to user:"); // Replace with proper UI
        if (assignedUser) {
             const currentStatus = alertStatuses[alertIndex]?.status ?? alerts[alertIndex]?.status;
            setAlertStatuses(prev => ({
                ...prev,
                [alertIndex]: {
                    ...prev[alertIndex],
                    assignedTo: assignedUser,
                     // Update status if needed, e.g., ensure it's at least 'investigating'
                    status: ['unresolved', 'investigating'].includes(currentStatus) ? 'investigating' : currentStatus
                }
            }));
            console.log(`Alert ${alertIndex} assigned to ${assignedUser}`);
            // TODO: Add API call to backend to persist assignment
            // Example: api.assignAlert(alerts[alertIndex].campaignId, alerts[alertIndex].timestamp, assignedUser);
        }
    }, [alerts, alertStatuses]); // Added missing dependency: alertStatuses

    const handleMuteSimilar = useCallback((alertIndex) => {
        console.log(`Muting similar alerts to ${alertIndex}`);
        const currentAlert = alerts[alertIndex];
        if (!currentAlert) return;

        // Define similarity criteria (e.g., campaign and metric)
        const muteKey = `${currentAlert.campaignId}-${currentAlert.metric}`;

        // In a real app, use a modal for duration selection
        const muteDurationHours = prompt("(Mock) Mute similar alerts for how many hours?"); // Replace with proper UI
        const duration = parseInt(muteDurationHours);

        if (duration && !isNaN(duration) && duration > 0) {
            const expiryTime = Date.now() + duration * 60 * 60 * 1000;
            setMutedAlerts(prev => ({
                ...prev,
                [muteKey]: { muted: true, expires: expiryTime }
            }));
            console.log(`Muting alerts matching key '${muteKey}' for ${duration} hours.`);
             // TODO: Add API call to backend to persist mute rule
             // Example: api.muteAlerts(muteKey, expiryTime);

             // Optional: Add visual feedback like a toast notification
        } else if (muteDurationHours !== null) { // Only alert if prompt wasn't cancelled
            alert("Invalid duration. Please enter a positive number of hours.");
        }
    }, [alerts]); // Dependency on alerts is correct

    const handleReportIssue = useCallback((alertIndex, feedbackHandler) => {
        console.log(`Reporting issue for alert ${alertIndex}`);
        // In a real app, use a modal for issue description
        const issueDescription = prompt("(Mock) Describe the issue with this alert:"); // Replace with proper UI
        if (issueDescription) {
            setAlertStatuses(prev => ({
                ...prev,
                [alertIndex]: {
                    ...prev[alertIndex],
                    reported: true,
                    issue: issueDescription
                }
            }));
            console.log(`Issue reported for alert ${alertIndex}: ${issueDescription}`);

            // Optionally automatically mark as 'False Positive' or 'Not Useful'
             if (feedbackHandler) {
                 feedbackHandler('False Positive'); // Pass the feedback type
             }

            // TODO: Add API call to backend to create issue/ticket
            // Example: api.reportIssue(alerts[alertIndex].campaignId, alerts[alertIndex].timestamp, issueDescription);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alerts, alertStatuses]); // Added missing dependencies based on potential usage in API call/feedback

    // --- Modified handleFeedback to accept alertIndex ---
    const handleFeedback = useCallback((alertIndex, feedbackType) => {
        console.log(`Feedback submitted for alert index ${alertIndex}: ${feedbackType}`);
        setFeedbackGiven(prev => ({
            ...prev,
            [alertIndex]: feedbackType
        }));
        // TODO: Add API call to backend to persist feedback
        // Example: api.submitFeedback(alerts[alertIndex].campaignId, alerts[alertIndex].timestamp, feedbackType);
    }, [alerts]); // Added missing dependency: alerts (implicitly used via index)


    // --- Helper to get the current effective status ---
    const getEffectiveStatus = useCallback((index) => {
        // Status from our actions takes precedence, otherwise use original alert status
        return alertStatuses[index]?.status ?? alerts[index]?.status ?? 'unresolved';
    }, [alerts, alertStatuses]);


    // --- Existing Formatting and Navigation Logic ---

    // Formatting functions
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
        const diffSeconds = Math.floor((now - then) / 1000);

        if (diffSeconds < 60) return 'just now';
        const diffMinutes = Math.floor(diffSeconds / 60);
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays}d ago`;
    };

    // Navigation handler
    const navigateAlert = useCallback((direction) => {
        setCurrentAlertIndex(prevIndex => {
            let newIndex;
            if (direction === 'next') {
                newIndex = prevIndex < alerts.length - 1 ? prevIndex + 1 : 0;
            } else {
                newIndex = prevIndex > 0 ? prevIndex - 1 : alerts.length - 1;
            }
            setShowThreads(false); // Collapse threads on navigation
            return newIndex;
        });
    }, [alerts.length]); // Dependency alerts.length is correct

    // Get current alert data
    const alert = alerts[currentAlertIndex]; // The currently selected alert object
    const gptResponse = generateGPTResponse(alert);
    const currentFeedback = feedbackGiven[currentAlertIndex]; // Feedback for the current alert
    const currentAlertStatusInfo = alertStatuses[currentAlertIndex] || {}; // Get specific status object for current alert
    const currentEffectiveStatus = getEffectiveStatus(currentAlertIndex); // Use helper


    // --- Check if similar alerts are muted - REFACTORED ---
    // Calculate muted status purely based on current state
    const calculateIsMuted = (alertToCheck, currentMutedAlerts) => {
      if (!alertToCheck) return false;
      const muteKey = `${alertToCheck.campaignId}-${alertToCheck.metric}`;
      const muteInfo = currentMutedAlerts[muteKey];
      return muteInfo?.muted && muteInfo.expires > Date.now();
    };

    // Use useMemo to calculate the muted status for the *current* alert
    // This replaces the problematic useCallback for isMuted
    const currentlyMuted = useMemo(() => calculateIsMuted(alert, mutedAlerts), [alert, mutedAlerts]);

    // Effect to clean up expired mutes periodically or when relevant state changes
    useEffect(() => {
      const now = Date.now();
      let changed = false;
      const nextMutedAlerts = { ...mutedAlerts };
      for (const key in nextMutedAlerts) {
        if (nextMutedAlerts[key].expires <= now) {
          delete nextMutedAlerts[key];
          changed = true;
        }
      }
      if (changed) {
        setMutedAlerts(nextMutedAlerts);
        // TODO: Notify backend about expiry if needed
      }
      // This effect runs when mutedAlerts changes, which is sufficient for cleanup
      // after a new mute is added or if the component re-renders for other reasons.
    }, [mutedAlerts]); // Removed setMutedAlerts from deps as it causes infinite loop if state changes


    // Add a check for alert existence before rendering details
    if (!alert) {
        return <div className="p-6 text-center text-gray-600">Loading alerts or no alerts available...</div>;
    }

    // -- Component Return JSX --
    return (
        <div className="flex flex-col bg-gray-100 min-h-screen font-sans">
            {/* Control Panel */}
            <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-y-3">
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
                        <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">Campaign Insight Bot</h1>
                        <div className="flex flex-wrap space-x-2">
                           <button
                               onClick={() => setShowLiveDemo(!showLiveDemo)}
                               className={`text-sm px-3 py-1 rounded-full flex items-center gap-1 transition-colors ${
                                   showLiveDemo ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                               }`}
                           >
                               <RefreshCwIcon className={`h-3 w-3 ${showLiveDemo ? 'animate-spin' : ''}`} />
                               {showLiveDemo ? 'Stop Live Demo' : 'Start Live Demo'}
                           </button>
                           <button
                               onClick={() => setShowMiniChart(!showMiniChart)}
                               className={`text-sm px-3 py-1 rounded-full flex items-center gap-1 transition-colors ${
                                   showMiniChart ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                               }`}
                           >
                               <BarChart className="h-3 w-3" />
                               {showMiniChart ? 'Hide Charts' : 'Show Charts'}
                           </button>
                           <button
                               onClick={() => setExpandedDetails(!expandedDetails)}
                               className={`text-sm px-3 py-1 rounded-full flex items-center gap-1 transition-colors ${
                                   expandedDetails ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                               }`}
                           >
                               <Info className="h-3 w-3" />
                               {expandedDetails ? 'Simple View' : 'Detailed View'}
                           </button>
                           <button
                               onClick={() => setShowReactions(!showReactions)}
                               className={`text-sm px-3 py-1 rounded-full flex items-center gap-1 transition-colors ${
                                   showReactions ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                               }`}
                           >
                               <MessageSquareIcon className="h-3 w-3" />
                               {showReactions ? 'Hide Social' : 'Show Social'}
                           </button>
                        </div>
                    </div>
                   <div className="flex items-center space-x-3">
                       <div className="text-sm flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                           <Filter className="h-3 w-3 text-gray-500" />
                           <span className="text-gray-700">Filter: All Alerts</span>
                       </div>
                       <select
                           title="Select Alert"
                           className="text-sm border border-gray-300 rounded px-2 py-1 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                           value={currentAlertIndex}
                           onChange={(e) => setCurrentAlertIndex(parseInt(e.target.value, 10))}
                       >
                           {alerts.map((a, i) => (
                               <option key={i} value={i}>
                                   {`${i + 1}: ${a.campaign.substring(0,15)}... ${a.metric} ${a.direction}`}
                               </option>
                           ))}
                       </select>
                       <div className="flex space-x-1">
                           <button onClick={() => navigateAlert('prev')} title="Previous Alert" className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded transition-colors" > <ChevronUp className="h-4 w-4" /> </button>
                           <button onClick={() => navigateAlert('next')} title="Next Alert" className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded transition-colors" > <ChevronDown className="h-4 w-4" /> </button>
                       </div>
                   </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-6xl mx-auto w-full p-4 md:p-6 flex flex-col-reverse md:flex-row gap-6 flex-grow">
                {/* Sidebar (Recent Alerts List) */}
                <div className="w-full md:w-80 flex-shrink-0">
                    <div className="flex flex-col h-full">
                       <div className="p-3 bg-gray-50 border border-gray-200 rounded-t-lg flex justify-between items-center sticky top-[73px] z-10 flex-shrink-0">
                           <h2 className="font-medium text-gray-700 flex items-center gap-2">
                               <Bell className="h-4 w-4 text-gray-500" /> Recent Alerts
                           </h2>
                           <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-medium"> {alerts.length} Total </span>
                       </div>
                       <div className="divide-y divide-gray-100 overflow-y-auto bg-white border border-gray-200 border-t-0 rounded-b-lg shadow flex-grow min-h-0 max-h-[calc(100vh-180px)]"> {/* Added max-height */}
                           {alerts.map((a, i) => {
                               const effectiveStatus = getEffectiveStatus(i); // Use helper
                               const statusInfo = alertStatuses[i] || {};
                               const assignedTo = statusInfo.assignedTo;

                               // Determine if the alert in the list *would* be muted if viewed
                               // Use the pure calculation function here as well
                               const isListItemMuted = calculateIsMuted(a, mutedAlerts);
                               const listItemMuteInfo = isListItemMuted ? mutedAlerts[`${a.campaignId}-${a.metric}`] : null;

                               return (
                                   <div
                                       key={`${a.campaignId}-${a.timestamp}-${i}`}
                                       className={`p-3 cursor-pointer transition-colors relative ${
                                           currentAlertIndex === i ? 'bg-blue-50' : 'hover:bg-gray-50'
                                       } ${isListItemMuted ? 'opacity-50' : ''}`} // Dim muted alerts in list
                                       onClick={() => setCurrentAlertIndex(i)}
                                       title={isListItemMuted ? `Similar alerts muted until ${new Date(listItemMuteInfo.expires).toLocaleTimeString()}` : ''}
                                   >
                                       {currentAlertIndex === i && !isListItemMuted && ( // Only show indicator if not muted
                                           <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                                       )}
                                       {isListItemMuted && ( // Show muted icon
                                           <EyeOff className="absolute top-2 right-2 h-3.5 w-3.5 text-gray-400" />
                                       )}
                                       <div className={`${currentAlertIndex === i ? 'ml-1' : 'ml-0'}`}>
                                           {/* Priority, Timestamp */}
                                           <div className="flex justify-between items-start mb-1">
                                               <div className={`text-xs font-semibold px-1.5 py-0.5 rounded ${priorityBadges[a.priority].bg} ${priorityBadges[a.priority].text}`}>
                                                   {priorityBadges[a.priority].label}
                                               </div>
                                               <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{formatRelativeTime(a.timestamp)}</span>
                                           </div>
                                           {/* Metric, Change */}
                                           <div className="flex items-center gap-2 mb-1">
                                               <div className={`p-1 rounded-md ${metricColors[a.metric]?.bg || metricColors.spend.bg}`}>
                                                   {metricIcons[a.metric] || <Activity className="h-4 w-4" /> }
                                               </div>
                                               <div>
                                                   <div className="font-medium text-sm text-gray-800">{a.metric.replace('_', ' ').toUpperCase()}</div>
                                                   <div className={`text-xs font-bold ${a.direction === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                                                       {a.direction === 'increase' ? <TrendingUp className="inline h-3 w-3 mr-0.5"/> : <TrendingDown className="inline h-3 w-3 mr-0.5" />}
                                                       {a.direction === 'increase' ? '+' : ''}{a.percentChange}%
                                                   </div>
                                               </div>
                                           </div>
                                           {/* Campaign, Platform, Status */}
                                           <div className="text-xs text-gray-600 mt-1.5 flex items-center justify-between flex-wrap gap-1">
                                               <span className="font-medium truncate" title={a.campaign}>{a.campaign.substring(0, 25)}{a.campaign.length > 25 ? '...' : ''}</span>
                                               <div className="flex items-center gap-1">
                                                   <span className="text-gray-500">{a.platform}</span>
                                                   <div className={`px-1.5 py-0.5 rounded-full ${statusColors[effectiveStatus]?.bg ?? statusColors.unresolved.bg} ${statusColors[effectiveStatus]?.text ?? statusColors.unresolved.text} text-xs font-medium`}>
                                                       {effectiveStatus.charAt(0).toUpperCase() + effectiveStatus.slice(1)}
                                                   </div>
                                               </div>
                                           </div>
                                           {/* Assignment Info */}
                                           {assignedTo && (
                                               <div className="mt-1.5 text-xs text-purple-700 flex items-center gap-1">
                                                   <UserCheck className="h-3 w-3" /> Assigned: {assignedTo}
                                               </div>
                                           )}
                                           {/* Feedback Indicator */}
                                           {feedbackGiven[i] && (
                                               <div className="mt-1.5 text-xs text-gray-500 italic flex items-center gap-1">
                                                   {feedbackGiven[i] === 'Useful' && <ThumbsUp className="h-3 w-3 text-green-500" />}
                                                   {feedbackGiven[i] === 'Not Useful' && <ThumbsDown className="h-3 w-3 text-red-500" />}
                                                   {feedbackGiven[i] === 'False Positive' && <Bug className="h-3 w-3 text-yellow-500" />}
                                                   Feedback: {feedbackGiven[i]}
                                               </div>
                                           )}
                                       </div>
                                   </div>
                               );
                           })}
                       </div>
                    </div>
                </div>

                {/* Main Alert Content */}
                <div className="flex-grow min-w-0">
                    {/* Live Demo Notification */}
                    {showLiveDemo && (
                        <div className={`mb-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between transition-all duration-500 ${
                            animateIncoming ? 'ring-2 ring-green-300 ring-offset-1 animate-pulse' : ''
                        }`}>
                            <div className="flex items-center gap-2">
                                <RefreshCwIcon className="h-4 w-4 text-green-600 animate-spin" />
                                <span className="text-sm text-green-800 font-medium">
                                    {incomingAlert ? 'New alert detected!' : 'Live demo mode: Monitoring campaigns...'}
                                </span>
                            </div>
                            {incomingAlert && ( <div className="flex items-center gap-2 text-green-800"> <span className="text-sm font-medium hidden sm:inline"> Incoming: {incomingAlert.metric.toUpperCase()} on {incomingAlert.platform} </span> <ArrowRight className="h-4 w-4" /> </div> )}
                        </div>
                    )}

                    {/* Muted Alert Notification */}
                    {currentlyMuted && (
                        <div className="mb-4 bg-gray-100 border border-gray-300 rounded-lg p-3 flex items-center gap-2 text-sm text-gray-600">
                            <EyeOff className="h-4 w-4 text-gray-500 flex-shrink-0" />
                            Similar alerts (Campaign: {alert.campaignId}, Metric: {alert.metric}) are currently muted until {new Date(mutedAlerts[`${alert.campaignId}-${alert.metric}`]?.expires).toLocaleTimeString()}. Actions are disabled.
                        </div>
                    )}

                    {/* Slack App UI Mockup */}
                    <div className={`bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 ${currentlyMuted ? 'opacity-60 pointer-events-none' : ''}`}> {/* Dim and disable interactions if muted */}
                        {/* Header */}
                       <div className="bg-purple-800 p-3 text-white flex items-center justify-between">
                           <div className="flex items-center gap-2"> <span className="font-semibold text-sm"># campaign-alerts</span> <span className="text-purple-300 text-xs hidden sm:inline">marketing-ops channel</span> </div>
                           <div className="flex items-center gap-2 text-xs"> <Users className="h-4 w-4 text-purple-300" /> <span className="text-purple-200">42</span> <button title="Channel Settings" className="hover:bg-purple-700 p-1 rounded"> <MoreHorizontal className="h-4 w-4" /> </button> </div>
                       </div>

                        {/* Message Container */}
                        <div className="p-4 bg-white">
                            {/* Message Header */}
                           <div className="flex items-start mb-2">
                               <div className="flex-shrink-0 w-10 h-10 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-3 shadow">IB</div>
                               <div className="flex-grow min-w-0">
                                   <div className="flex items-center flex-wrap gap-x-2">
                                       <span className="font-bold text-gray-900">Insight Bot</span>
                                       <span className="text-gray-500 text-xs">{formatTime(alert.timestamp)}</span>
                                       <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded font-medium">App</span>
                                   </div>
                                   {showReactions && alert.reactions?.length > 0 && (
                                       <div className="flex flex-wrap gap-1 mt-1">
                                           {alert.reactions.map((reaction, idx) => ( <div key={idx} title={`Reacted by: ${reaction.users.join(', ')}`} className="bg-gray-100 border border-gray-200 text-gray-800 text-xs px-1.5 py-0.5 rounded-full flex items-center gap-0.5 cursor-default"> <span>{reaction.emoji}</span> <span className="font-medium">{reaction.count}</span> </div> ))}
                                           <button title="Add Reaction" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-0.5 text-xs"> <span className="text-lg leading-none">+</span> </button>
                                       </div>
                                   )}
                               </div>
                           </div>

                            {/* Message Content */}
                            <div className="ml-13 pl-0 md:pl-10"> {/* Adjusted padding */}
                                {/* Main Alert Block */}
                               <div className={`border-l-4 ${alert.priority === 'high' ? 'border-red-500' : alert.priority === 'medium' ? 'border-yellow-500' : 'border-blue-500'} p-4 bg-white rounded-r-lg shadow-sm mb-4 border border-gray-200 border-l-[5px]`}>
                                   {/* Alert Title */}
                                  <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-gray-900 mb-2">
                                      {alert.priority === 'high' && <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />}
                                      {alert.priority === 'medium' && <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />}
                                      {alert.priority === 'low' && <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />}
                                      <span className="truncate">{alert.campaign}: Campaign Anomaly Alert</span>
                                  </div>
                                   {/* Alert Metadata */}
                                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-600 mb-4 border-b border-gray-100 pb-3">
                                      <span>ID: <span className="font-medium text-gray-700">{alert.campaignId}</span></span>
                                      <span className="hidden sm:inline">•</span>
                                      <span>Detected: <span className="font-medium text-gray-700">{formatTime(alert.timestamp)}</span></span>
                                      {currentAlertStatusInfo.assignedTo && ( <> <span className="hidden sm:inline">•</span> <span className="text-purple-700">Assigned: <span className="font-medium">{currentAlertStatusInfo.assignedTo}</span></span> </> )}
                                      {expandedDetails && ( <> <span className="hidden sm:inline">•</span> <span>Platform: <span className="font-medium text-gray-700">{alert.platform}</span></span> <span className="hidden sm:inline">•</span> <span>Audience: <span className="font-medium text-gray-700">{alert.targetAudience}</span></span> </> )}
                                  </div>
                                   {/* Key Metrics */}
                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${(metricColors[alert.metric] || metricColors.spend).bg} ${(metricColors[alert.metric] || metricColors.spend).text}`}> {metricIcons[alert.metric] || <DollarSign className="h-4 w-4" />} <span className="font-semibold capitalize">{alert.metric.replace('_', ' ').toUpperCase()}</span> {alert.direction === "increase" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />} </div>
                                      <div className="flex items-center gap-1 text-sm"> <span className="font-medium text-gray-700">Z-Score:</span> <span className={`font-bold ${Math.abs(alert.zScore) >= 3 ? "text-red-600" : Math.abs(alert.zScore) >= 2 ? "text-orange-600" : "text-green-600"}`}> {alert.zScore > 0 ? "+" : ""}{alert.zScore.toFixed(1)}σ </span> </div>
                                      <div className="flex items-center gap-1 text-sm"> <span className="font-medium text-gray-700">Change:</span> <span className={`font-bold ${ alert.direction === "increase" ? "text-green-600" : "text-red-600" }`}> {alert.direction === "increase" ? "+" : "-"}{Math.abs(alert.percentChange)}% </span> <span className="text-xs text-gray-500">(vs avg: {alert.metric === 'spend' || alert.metric === 'cpm' ? '$' : ''}{alert.meanValue?.toFixed(2)}{alert.metric === 'ctr' || alert.metric === 'conversion_rate' ? '%' : ''})</span> </div>
                                      <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[currentEffectiveStatus]?.bg ?? statusColors.unresolved.bg} ${statusColors[currentEffectiveStatus]?.text ?? statusColors.unresolved.text}`}> {currentEffectiveStatus.charAt(0).toUpperCase() + currentEffectiveStatus.slice(1)} </div>
                                  </div>
                                   {/* Mini Chart */}
                                  {showMiniChart && alert.historyData?.length > 0 && (
                                      <div className="mb-4 bg-gray-50 p-3 rounded border border-gray-200">
                                          <div className="text-sm font-medium text-gray-700 mb-2"> {alert.metric.replace('_', ' ').toUpperCase()} Trend (Last {alert.historyData.length} Hours) </div>
                                          <div className="h-36 sm:h-40">
                                              <ResponsiveContainer width="100%" height="100%">
                                                  <LineChart data={alert.historyData} margin={{ top: 5, right: 35, bottom: 5, left: 0 }}>
                                                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                                      <XAxis dataKey="time" stroke="#9ca3af" fontSize={10} interval="preserveStartEnd" />
                                                      <YAxis stroke="#9ca3af" fontSize={10} domain={['auto', 'auto']} tickFormatter={(value) => value.toLocaleString()} allowDataOverflow={true} width={30} />
                                                      <Tooltip contentStyle={{ border: '1px solid #e5e7eb', borderRadius: '0.375rem', backgroundColor: 'rgba(255, 255, 255, 0.95)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} formatter={(value) => [value.toLocaleString(), alert.metric.replace('_', ' ')]} labelStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#374151' }} itemStyle={{ fontSize: '12px' }} />
                                                      <Line type="monotone" dataKey="value" stroke={(metricColors[alert.metric] || metricColors.spend).chart} strokeWidth={2.5} dot={{ r: 3, fill: (metricColors[alert.metric] || metricColors.spend).chart }} activeDot={{ r: 5, strokeWidth: 2, stroke: '#ffffff' }} />
                                                      <ReferenceLine y={alert.meanValue} stroke="#6b7280" strokeDasharray="4 4" label={{ position: 'right', value: `Avg (${alert.meanValue?.toLocaleString()})`, fill: '#6b7280', fontSize: 10, dy: -5 }} />
                                                  </LineChart>
                                              </ResponsiveContainer>
                                          </div>
                                      </div>
                                  )}
                                   {/* GPT Analysis */}
                                  <div className="border-t border-gray-100 pt-4 space-y-3 text-sm">
                                       <div> <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-1"><BrainCircuit className="h-4 w-4 text-purple-600" /> WHAT HAPPENED:</h3> <p className="text-gray-700 leading-relaxed">{gptResponse.whatHappened}</p> </div>
                                       <div> <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-1"><Target className="h-4 w-4 text-red-600" /> WHY IT MATTERS:</h3> <p className="text-gray-700 leading-relaxed">{gptResponse.whyItMatters}</p> </div>
                                       {expandedDetails && gptResponse.recommendations?.length > 0 && ( <div> <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-600" /> RECOMMENDATIONS:</h3> <ul className="text-gray-700 list-disc pl-5 space-y-1 leading-relaxed"> {gptResponse.recommendations.map((rec, idx) => ( <li key={idx}>{rec}</li> ))} </ul> </div> )}
                                  </div>
                               </div>

                                {/* Action Buttons & Feedback Section */}
                               <div className="mb-4">
                                   <div className="flex flex-wrap gap-2 mb-3 border-b border-gray-100 pb-3">
                                       <a href={alert.dashboardUrl} target="_blank" rel="noopener noreferrer" title="Open related dashboard in new tab" className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors shadow-sm ${ currentlyMuted ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700' }`} aria-disabled={currentlyMuted} onClick={(e) => currentlyMuted && e.preventDefault()} > View Dashboard <ExternalLink className="h-3.5 w-3.5" /> </a>
                                       <button onClick={() => !currentAlertStatusInfo.acknowledged && handleAcknowledge(currentAlertIndex)} title={currentAlertStatusInfo.acknowledged ? "Alert already acknowledged" : "Acknowledge this alert"} disabled={currentAlertStatusInfo.acknowledged || currentlyMuted} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors ${ currentAlertStatusInfo.acknowledged || currentlyMuted ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-100 text-blue-700 hover:bg-blue-200' }`} > <CheckCircle className="h-3.5 w-3.5" /> {currentAlertStatusInfo.acknowledged ? 'Acknowledged' : 'Acknowledge'} </button>
                                       <button onClick={() => handleAssign(currentAlertIndex)} title={currentAlertStatusInfo.assignedTo ? `Assigned to ${currentAlertStatusInfo.assignedTo}` : "Assign alert to a team member"} disabled={currentlyMuted} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors ${ currentlyMuted ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-purple-100 text-purple-700 hover:bg-purple-200' }`} > <UserCheck className="h-3.5 w-3.5" /> {currentAlertStatusInfo.assignedTo ? `Reassign` : 'Assign'} </button>
                                       <button onClick={() => handleMuteSimilar(currentAlertIndex)} title="Mute similar alerts for a period" disabled={currentlyMuted} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors ${ currentlyMuted ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }`} > <EyeOff className="h-3.5 w-3.5" /> {currentlyMuted ? 'Muted' : 'Mute Similar'} </button>
                                       <button onClick={() => handleReportIssue(currentAlertIndex, (feedback) => handleFeedback(currentAlertIndex, feedback))} title={currentAlertStatusInfo.reported ? `Issue reported: ${currentAlertStatusInfo.issue}` : "Report an issue with this alert"} disabled={currentAlertStatusInfo.reported || currentlyMuted} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors ${ currentAlertStatusInfo.reported || currentlyMuted ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' }`} > <Flag className="h-3.5 w-3.5" /> {currentAlertStatusInfo.reported ? 'Issue Reported' : 'Report Issue'} </button>
                                   </div>
                                   {/* Feedback Section */}
                                  <div className="pt-3">
                                      <h4 className="text-sm font-medium text-gray-600 mb-2">Was this alert helpful?</h4>
                                      {!currentFeedback ? (
                                          <div className="flex flex-wrap gap-2">
                                              <button onClick={() => handleFeedback(currentAlertIndex, 'Useful')} title="Mark alert as useful" className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 text-xs font-medium transition-colors border border-green-200" > <ThumbsUp className="h-3.5 w-3.5" /> Useful </button>
                                              <button onClick={() => handleFeedback(currentAlertIndex, 'Not Useful')} title="Mark alert as not useful" className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full hover:bg-red-200 text-xs font-medium transition-colors border border-red-200" > <ThumbsDown className="h-3.5 w-3.5" /> Not Useful </button>
                                              <button onClick={() => handleFeedback(currentAlertIndex, 'False Positive')} title="Mark alert as a false positive" className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 text-xs font-medium transition-colors border border-yellow-200" > <Bug className="h-3.5 w-3.5" /> False Positive </button>
                                          </div>
                                      ) : ( <div className="text-sm text-gray-500 italic flex items-center gap-1.5 py-1"> <CheckCircle className="h-4 w-4 text-green-500" /> Feedback received: <span className="font-medium">{currentFeedback}</span>. Thank you! </div> )}
                                  </div>
                               </div>

                                {/* Thread Replies */}
                               {showReactions && alert.comments?.length > 0 && (
                                   <div className="mt-2 border-t border-gray-200 pt-3">
                                       <button className="text-sm text-blue-600 hover:text-blue-800 mb-3 flex items-center gap-1 font-medium" onClick={() => setShowThreads(!showThreads)} > {showThreads ? ( <> <ChevronUp className="h-4 w-4" /> Hide thread ({alert.comments.length} {alert.comments.length === 1 ? 'reply' : 'replies'}) </> ) : ( <> <ChevronDown className="h-4 w-4" /> Show thread ({alert.comments.length} {alert.comments.length === 1 ? 'reply' : 'replies'}) </> )} </button>
                                       {showThreads && (
                                           <div className="space-y-3 pl-4 border-l-2 border-gray-200 ml-2">
                                               {alert.comments.map((comment, idx) => ( <div key={idx} className="flex items-start"> <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold mr-2 text-xs shadow-inner"> {comment.avatar} </div> <div className="flex-grow bg-gray-50 rounded-lg p-2 border border-gray-100"> <div className="flex items-center justify-between"> <span className="font-medium text-sm text-gray-800">{comment.user}</span> <span className="text-gray-500 text-xs">{formatRelativeTime(comment.time)}</span> </div> <p className="text-gray-700 text-sm mt-1 leading-relaxed">{comment.text}</p> {comment.reactions?.length > 0 && ( <div className="flex flex-wrap gap-1 mt-1.5"> {comment.reactions.map((reaction, ridx) => ( <div key={ridx} className="bg-white border border-gray-200 text-gray-700 text-xs px-1.5 py-0.5 rounded-full flex items-center gap-0.5 cursor-default"> <span>{reaction.emoji}</span> <span className="font-medium">{reaction.count}</span> </div> ))} <button title="Add Reaction" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-0.5 text-xs"> <span className="text-lg leading-none">+</span> </button> </div> )} </div> </div> ))}
                                               <div className="flex items-center gap-2 pt-3 border-t border-gray-100 mt-3"> <input type="text" placeholder="Reply to thread..." className="flex-grow text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow" /> <button className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors font-medium"> Send </button> </div>
                                           </div>
                                       )}
                                   </div>
                               )}
                           </div>
                       </div>
                   </div>

                    {/* Footer Note */}
                   <div className="mt-4 text-center text-gray-500 max-w-3xl mx-auto">
                       <p className="text-xs leading-relaxed">
                           This alert was generated via statistical analysis (z-score: <span className="font-medium">{alert.zScore ? `${alert.zScore > 0 ? '+' : ''}${Math.abs(alert.zScore).toFixed(1)}σ` : 'N/A'}</span>).
                           GPT-4 provides context and actionable insights. Feedback helps improve future alerts.
                       </p>
                   </div>
                </div>
            </div>
        </div>
    );
};


//===============================================
// Component 3: SystemExplanation (Explanation View)
//===============================================
// (Keep SystemExplanation component as provided by the user)
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


// --- Ensure all three components are exported ---
export { SlackInsightBot, EnhancedSlackAlertSystem, SystemExplanation };