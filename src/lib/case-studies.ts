export interface CaseStudySection {
  title: string;
  content: string;
  list?: string[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  imageUrl: string;
  accent: string;
  metrics: {
    label: string;
    value: string;
  }[];
  challenge: string;
  solution: string;
  sections: CaseStudySection[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "fintech-app-redesign",
    title: "Revolutionizing Digital Banking Experience",
    client: "FinBank Global",
    category: "Fintech",
    description: "A complete overhaul of a legacy banking platform, focusing on user experience and security.",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    accent: "#0d9488",
    metrics: [
      { label: "User Retention", value: "+45%" },
      { label: "Transaction Speed", value: "2.4s" },
      { label: "CSAT Score", value: "4.9/5" }
    ],
    challenge: "The existing app was cluttered, slow, and had a high churn rate among younger users.",
    solution: "We implemented a minimalist design system, optimized API responses, and introduced biometric authentication.",
    sections: [
      {
        title: "The Challenge",
        content: "FinBank Global faced a significant decline in mobile app engagement. Younger demographics found the interface unintuitive, while older users struggled with performance issues. The core challenge was to modernize the app without alienating the existing user base."
      },
      {
        title: "Our Approach",
        content: "We began with an intensive 2-week discovery phase, interviewing stakeholders and analyzing user behavior data. Our strategy focused on three pillars:",
        list: [
          "Information Architecture: Simplifying the navigation to 3 core actions.",
          "Performance Engineering: Reducing app launch time by 60%.",
          "Visual Identity: Transitioning from a clinical corporate look to a vibrant, trust-centric design."
        ]
      },
      {
        title: "Implementation",
        content: "Using React Native, we built a cross-platform solution that shared 90% of the codebase, ensuring feature parity between iOS and Android. We integrated advanced security features like FaceID and TouchID while maintaining a friction-less experience."
      },
      {
        title: "The Outcome",
        content: "Within three months of launch, FinBank saw a 45% increase in user retention. The app's rating on the App Store jumped from 3.2 to 4.8 stars."
      }
    ]
  },
  {
    id: "2",
    slug: "ecommerce-ai-integration",
    title: "AI-Powered Personalization for E-commerce",
    client: "StyleHub",
    category: "E-commerce",
    description: "Integrating agentic AI to provide personalized shopping recommendations and automated support.",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
    accent: "#8b5cf6",
    metrics: [
      { label: "Conversion Rate", value: "+30%" },
      { label: "Average Order Value", value: "+22%" },
      { label: "Support Tickets", value: "-60%" }
    ],
    challenge: "StyleHub struggled with low engagement on product pages and high support costs.",
    solution: "We deployed a custom recommendation engine and a GPT-powered shopping assistant.",
    sections: [
      {
        title: "The Problem",
        content: "With over 50,000 SKUs, StyleHub users were overwhelmed. The bounce rate on the homepage was nearly 70% because users couldn't find what they wanted quickly. Support agents were bogged down by simple order status queries."
      },
      {
        title: "AI Transformation",
        content: "We implemented a two-pronged AI strategy using agentic workflows:",
        list: [
          "Personalized Discovery: A neural network that analyzes real-time browsing behavior to serve relevant product 'lookbooks'.",
          "Automated Support Agent: An AI agent capable of handling returns, tracking, and sizing advice without human intervention."
        ]
      },
      {
        title: "Technical Execution",
        content: "We utilized a vector database (Pinecone) to power semantic search and recommendation, ensuring results were served in under 100ms. The support agent was built using LangChain and integrated directly into the Shopify checkout flow."
      },
      {
        title: "Results",
        content: "The average order value increased by 22% as users were successfully upsold through personalized recommendations. Support overhead dropped by 60% in the first quarter."
      }
    ]
  },
  {
    id: "3",
    slug: "healthcare-telemedicine-platform",
    title: "Scalable Telemedicine Solution",
    client: "HealthConnect",
    category: "Healthcare",
    description: "Building a HIPAA-compliant platform for remote consultations and patient management.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
    accent: "#ec4899",
    metrics: [
      { label: "Monthly Consultations", value: "50k+" },
      { label: "Patient Wait Time", value: "<5min" },
      { label: "Provider Efficiency", value: "+40%" }
    ],
    challenge: "The client needed a highly secure platform that could handle a massive surge in users.",
    solution: "We built a microservices architecture on AWS with end-to-end encryption and real-time video scaling.",
    sections: [
      {
        title: "Context",
        content: "HealthConnect needed to scale from a local clinic tool to a nationwide telemedicine provider. Security was paramount, as the platform handled sensitive patient data protected by HIPAA and GDPR."
      },
      {
        title: "Architecture & Security",
        content: "We designed a zero-trust architecture to ensure data integrity:",
        list: [
          "End-to-End Encryption: All video streams and messages are encrypted client-side.",
          "Scalable Video: WebRTC integration with automated scaling via AWS Elemental.",
          "Patient Portal: A secure dashboard for managing records, prescriptions, and appointments."
        ]
      },
      {
        title: "The Build",
        content: "The platform was built using a Next.js frontend and a Go-based backend for high concurrency. We automated the compliance auditing process by logging all access attempts in an immutable database."
      },
      {
        title: "Impact",
        content: "HealthConnect successfully onboarded 200+ clinics in 6 months, facilitating over 50,000 consultations monthly with zero security incidents."
      }
    ]
  }
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((cs) => cs.slug === slug);
}
