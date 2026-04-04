import type { carouselitems, Features, list, steps } from "@/types/featurestype";
import {
    BotMessageSquare,
    ChartBarIncreasing,
    BanknoteArrowDown,
    Balloon,
    ShieldCheck,
    Clock
} from "lucide-react";

//landingpage lists,cards showcase
export const features: Features[] = [
    {
        id: 1,
        title: "AI Financial Forecasting",
        desc: "Predict revenue, expenses, and cash flow with advanced AI models.",
        props: BotMessageSquare,
    },
    {
        id: 2,
        title: "Real-Time Analytics",
        desc: "Track your financial performance with live dashboards and insights.",
        props: ChartBarIncreasing,
    },
    {
        id: 3,
        title: "Smart Expense Tracking",
        desc: "Automatically categorize and monitor spending patterns.",
        props: BanknoteArrowDown,
    },
    {
        id: 4,
        title: "Predictive Insights",
        desc: "Get actionable recommendations to optimize profits and reduce risks.",
        props: Balloon,
    },
    {
        id: 5,
        title: "Secure & Reliable",
        desc: "Advanced security features to keep your financial data safe.",
        props: ShieldCheck,
    },
    {
        id: 6,
        title: "Time-Saving Automation",
        desc: "Automate repetitive tasks so your team can focus on strategy.",
        props: Clock,
    },
];

export const step: steps[] = [
    {
        id: 1,
        title : " Save hours of manual work",
        desc : "Automate repetitive financial tasks like tracking, categorizing, and reporting."
    },
    {
        id: 2,
        title : "Make smarter financial decisions",
        desc : "Use AI-powered insights to understand trends and plan ahead with confidence."
    },
    {
        id: 3,
        title : "Reduce risks and costly mistakes",
        desc : "Detect errors early and prevent financial losses with smart monitoring."
    },
    {
        id: 4,
        title : "Improve cash flow visibility",
        desc : "Get real-time insights into your income and expenses in one place."
    },
    {
        id: 5,
        title : "Scale your business with confidence",
        desc : "Grow faster using data-driven decisions and automated systems."
    }
]

export const lists : list[] = [
    {
        id : 1,
        desc : "Connect Your Data Securely link your bank accounts and financial tools."
    },
    {
        id : 2,
        desc : "AI Analyzes Everything Our system processes and learns from your financial data."
    },
    {
        id : 3,
        desc : "Get Actionable Insights Receive forecasts, alerts, and smart recommendations instantly."
    }
]

export const carousel: carouselitems[] = [
    {
        id: 1,
        user: "Sarah Jenkins, Freelancer",
        comment: "Managing finances has never been this easy. The AI insights are incredibly accurate and save me so much stress during tax season."
    },
    {
        id: 2,
        user: "Michael Chen, Tech Founder",
        comment: "This tool saved us hours every week and significantly improved our runway forecasting accuracy. A must-have for any startup."
    },
    {
        id: 3,
        user: "Elena Rodriguez, Retail Manager",
        comment: "The dashboard gives me a clear bird's-eye view of all store expenses. I can finally spot where we're overspending instantly."
    },
    {
        id: 4,
        user: "David Park, E-commerce Owner",
        comment: "The automated categorization is a lifesaver. I no longer have to manually enter every single transaction from my shop."
    },
    {
        id: 5,
        user: "Jessica Taylor, Consultant",
        comment: "I love the clean interface. It makes financial planning feel less like a chore and more like a strategy session for my growth."
    },
    {
        id: 6,
        user: "Marcus Thorne, Real Estate Agent",
        comment: "The mobile app is lightning fast. I can track my mileage and expenses between property viewings without any hassle."
    }
];