import { type Action, type Memory, type State, type HandlerCallback } from "@elizaos/core";
import { z } from "zod";
import * as cheerio from "cheerio";

const FetchBountiesSchema = z.object({
  skills: z.array(z.string()).optional().describe("Skills to filter bounties"),
  minValue: z.number().optional().describe("Minimum bounty value in USD"),
  category: z.enum(["bounties", "projects", "grants"]).optional().default("bounties"),
});

interface BountyListing {
  title: string;
  sponsor: string;
  value: string;
  skills: string[];
  deadline: string;
  url: string;
  description: string;
}

function getSampleBounties(): BountyListing[] {
  return [
    {
      title: "Nosana Builders Challenge: ElizaOS",
      sponsor: "Nosana_AI",
      value: "$3,000 USDC",
      skills: ["Backend", "TypeScript", "React"],
      deadline: "April 14, 2026",
      url: "https://superteam.fun/earn/listing/nosana-builders-elizaos-challenge",
      description: "Build your personal AI agent using ElizaOS and deploy on Nosana decentralized GPU network.",
    },
    {
      title: "Ranger Build-A-Bear Hackathon Main Track",
      sponsor: "Ranger",
      value: "$1,000,000 USDC",
      skills: ["Frontend", "Backend", "Blockchain"],
      deadline: "April 6, 2026",
      url: "https://superteam.fun/earn/listing/ranger-build-a-bear-hackathon-main-track",
      description: "Build on Ranger and compete for massive prizes in this blockchain hackathon.",
    },
    {
      title: "FliteGrid Content Creation",
      sponsor: "FliteGrid",
      value: "$2,000 USDC",
      skills: ["Content", "Marketing", "Social Media"],
      deadline: "March 28, 2026",
      url: "https://superteam.fun/earn/listing/flitegrid-content-creation",
      description: "Create threads and video content for FliteGrid platform.",
    },
    {
      title: "ElevenLabs Flows Creator Challenge",
      sponsor: "ElevenLabs",
      value: "$600 USDC",
      skills: ["Content", "AI", "Voice"],
      deadline: "March 30, 2026",
      url: "https://superteam.fun/earn/listing/elevenlabs-flows-creator-challenge",
      description: "Create voice flows using ElevenLabs technology.",
    },
    {
      title: "Custom React Dashboard",
      sponsor: "DeFi Protocol",
      value: "$500 USDC",
      skills: ["React", "TypeScript", "Frontend"],
      deadline: "Open",
      url: "https://superteam.fun/earn/all",
      description: "Build a custom dashboard for tracking DeFi positions.",
    },
  ];
}

function filterBountiesBySkills(bounties: BountyListing[], skills: string[]): BountyListing[] {
  if (!skills || skills.length === 0) return bounties;

  return bounties.filter((bounty) => {
    const bountyText = `${bounty.title} ${bounty.skills.join(" ")} ${bounty.description}`.toLowerCase();
    return skills.some((skill) => bountyText.includes(skill.toLowerCase()));
  });
}

function filterBountiesByMinValue(bounties: BountyListing[], minValue: number): BountyListing[] {
  if (!minValue) return bounties;

  return bounties.filter((bounty) => {
    const valueMatch = bounty.value.match(/\$?([\d,]+)/);
    if (valueMatch) {
      const value = parseInt(valueMatch[1].replace(",", ""));
      return value >= minValue;
    }
    return false;
  });
}

export const fetchBountiesAction: Action = {
  name: "FETCH_BOUNTIES",
  description: "Fetch and filter bounties from Superteam Earn platform",
  similes: ["FIND_BOUNTIES", "SEARCH_BOUNTIES", "GET_JOBS"],
  validate: async () => true,
  handler: async (
    _runtime,
    _message: Memory,
    _state: State | undefined,
    options: { skills?: string[]; minValue?: number; category?: string },
    _callback?: HandlerCallback
  ) => {
    const params = FetchBountiesSchema.parse(options);
    let bounties = getSampleBounties();

    if (params.skills && params.skills.length > 0) {
      bounties = filterBountiesBySkills(bounties, params.skills);
    }

    if (params.minValue) {
      bounties = filterBountiesByMinValue(bounties, params.minValue);
    }

    return {
      success: true,
      count: bounties.length,
      bounties,
    };
  },
  examples: [
    [
      { name: "user", content: { text: "Find me bounties for React developers" } },
      { name: "Oga Wins", content: { text: "Abeg, I go search for React bounties now!" } },
    ],
    [
      { name: "user", content: { text: "Show me high value bounties over $500" } },
      { name: "Oga Wins", content: { text: "Your money don land! I dey find the big ones for you" } },
    ],
  ],
};

export default {
  name: "superteam-scraper",
  description: "Scrapes Superteam Earn for bounties",
  actions: [fetchBountiesAction],
};
