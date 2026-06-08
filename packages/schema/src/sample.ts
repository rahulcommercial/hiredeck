import { ResumeSchema, type Resume } from "./resume";

/**
 * A real, populated sample so templates have something to render before
 * the user has uploaded their own resume. Pulled from Rahul's public
 * profile — also doubles as a smoke test for every template.
 *
 * Built through `ResumeSchema.parse()` so Zod fills in array defaults —
 * lets us write the sample without spelling out every empty `highlights: []`.
 */
const SAMPLE_INPUT = {
  $schema: "https://hiredeck.dev/schema/resume.v1.json",
  basics: {
    name: "Rahul Kumar Singh",
    label: "Senior Network Engineer II — Network Automation & AI",
    email: "rahulcommercial@gmail.com",
    phone: "+1 425 568 4334",
    url: "https://github.com/rahulcommercial",
    summary:
      "Senior Network Engineer II at Microsoft building production-grade AI systems for Azure ExpressRoute — Microsoft's global private backbone. Nine years on one product, evolving from BGP and routing specialist to AI platform engineer: shipping autonomous diagnostic agents, MCP-based diagnostic tooling, and telemetry-intelligence platforms that collapse 30–90 minute investigations into 1–3 minutes.",
    location: {
      city: "Bellevue",
      region: "WA",
      countryCode: "US",
    },
    profiles: [
      { network: "GitHub", username: "rahulcommercial", url: "https://github.com/rahulcommercial" },
    ],
  },
  work: [
    {
      name: "Microsoft",
      position: "Senior Network Engineer II — Network Automation & AI",
      startDate: "2026-01",
      summary:
        "Lead network automation and AI engineering for Azure ExpressRoute — Microsoft's global private connectivity service linking enterprises to Azure datacenters across 60+ peering locations worldwide.",
      highlights: [
        "Ship AI-native operational tooling, autonomous diagnostic agents, and MCP-based diagnostic platforms.",
        "Architect agentic systems that compress senior-engineer diagnostic workflows into autonomous AI runs.",
        "Define internal standards for agent reliability and safe autonomous operation in production network infrastructure.",
      ],
      location: "Bellevue, WA",
    },
    {
      name: "LTIMindtree — Client: Microsoft Azure ExpressRoute",
      position: "Senior Network Engineer / AI Platform Engineer",
      startDate: "2018-07",
      endDate: "2026-01",
      summary:
        "Operated Microsoft's global Azure ExpressRoute WAN spanning hundreds of Cisco ASR / NCS and Juniper MX / PTX routers; architected an AI-native operational intelligence platform that collapsed 30–90 minute investigations into 1–3 minutes.",
      highlights: [
        "Architected a 100K+ LoC full-stack platform (FastAPI + React) with GPT-5 / Claude Opus agents and 200+ MCP tools across 19 telemetry clusters.",
        "Built a production autonomous diagnostic agent performing senior-grade network triage end-to-end.",
        "Led a 400+ router code-upgrade campaign across Junos and IOS-XE with zero customer impact.",
        "Owned Sev-1 RCA, authored SOPs / MOPs adopted as team-wide standards.",
      ],
    },
    {
      name: "LTIMindtree — Client: Microsoft (WWISDM)",
      position: "Infrastructure Management Engineer",
      startDate: "2017-03",
      endDate: "2018-06",
      summary:
        "Built monitoring and alerting automation for Microsoft's worldwide infrastructure — SCOM pipelines, BizTalk failure analysis, and Windows Server 2012 health checks.",
      highlights: [
        "Authored Python detectors for unauthorized MSBATCH database changes, surfacing discrepancies before downstream impact.",
        "Built an ASP.NET dashboard for server-health and SLA tracking.",
        "Trained 10+ junior engineers on triage workflows and operational ownership.",
      ],
    },
  ],
  education: [
    {
      institution: "Bhubaneswar Engineering College",
      area: "Computer Science & Engineering",
      studyType: "B.Tech",
      score: "CGPA 7.2",
    },
  ],
  awards: [
    { title: "Unstoppable Award", awarder: "LTIMindtree", summary: "Extraordinary contributions to team operations." },
    { title: "On the Spot Award", awarder: "LTIMindtree", summary: "Operational efficiency and delivery under pressure." },
    { title: "Best Performer of the Year", awarder: "LTIMindtree", summary: "Automation initiatives that elevated team-wide productivity." },
  ],
  projects: [
    {
      name: "Network Investigation Agentic Platform",
      description:
        "AI-native operational intelligence workspace consolidating diagnostics, telemetry, and AI agents. Compresses 30–90 minute investigations into 1–3 minutes.",
      keywords: ["AI Agents", "MCP", "FastAPI", "React", "TypeScript"],
      startDate: "2025",
    },
    {
      name: "Autonomous Diagnostic Agent",
      description:
        "Production AI agent that runs senior-grade network diagnostics on its own — routes between database clusters, chains diagnostic workflows, correlates Kusto telemetry.",
      keywords: ["GPT-5", "Claude Opus", "MCP"],
      startDate: "2025",
    },
    {
      name: "AI-Native Operational Tooling Platform",
      description: "200+ MCP diagnostic tools — a structured AI-callable hierarchy that turns institutional ops knowledge into agent-usable workflows.",
      keywords: ["MCP", "Python", "FastAPI"],
      startDate: "2025",
    },
  ],
  skills: [
    {
      name: "AI & Agentic Systems",
      keywords: ["Production AI Agents", "MCP", "GPT-5", "Claude Opus", "Prompt Engineering", "Long-Context Eval"],
    },
    { name: "Backend", keywords: ["Python", "FastAPI", "Serverless", "REST APIs"] },
    { name: "Frontend", keywords: ["React", "TypeScript", "Tailwind", "Chakra UI"] },
    { name: "Networking", keywords: ["BGP", "OSPF", "MACsec", "FastPath", "ExpressRoute Direct", "Azure WAN"] },
    { name: "Hardware", keywords: ["Cisco ASR 1006/1009", "Cisco NCS 5500", "Juniper MX10003", "Juniper PTX1000"] },
    { name: "Telemetry & Diagnostics", keywords: ["Kusto (KQL)", "Wireshark", "ICM"] },
  ],
  languages: [
    { language: "English", fluency: "Fluent" },
    { language: "Hindi", fluency: "Native" },
    { language: "Odia", fluency: "Native" },
    { language: "Bengali", fluency: "Conversational" },
  ],
  interests: [
    { name: "Chess", keywords: ["Lichess 2000+"] },
    { name: "Reading", keywords: ["Long-context eval harnesses", "Agent reliability"] },
  ],
  volunteer: [],
  certificates: [],
  publications: [],
  references: [],
  meta: {
    version: "v1.0.0",
    hiredeck: {
      template: "atlas",
      accentColor: "#2E75B6",
      fontFamily: "sans",
      density: "comfortable",
    },
  },
};

export const sampleResume: Resume = ResumeSchema.parse(SAMPLE_INPUT);
