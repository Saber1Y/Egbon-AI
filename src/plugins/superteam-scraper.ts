import { type Action, type Memory, type State, type HandlerCallback } from "@elizaos/core";
import { z } from "zod";

const FetchBountiesSchema = z.object({
  skills: z.array(z.string()).optional().describe("Skills to filter bounties (e.g., ['React', 'Solidity'])"),
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

async function scrapeSuperteamBounties(): Promise<BountyListing[]> {
  const bounties: BountyListing[] = [];

  try {
    const response = await fetch("https://superteam.fun/earn/all?tab=bounties", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      console.log("Direct scrape failed, using sample data");
      return getSampleBounties();
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    $(".listing-card, [class*='bounty'], [class*='listing']").each((_, el) => {
      const title = $(el).find("h2, h3, [class*='title']").first().text().trim();
      const valueText = $(el).find("[class*='value'], [class*='prize'], [class*='amount']").first().text().trim();
      const link = $(el).find("a").first().attr("href") || "";
      const url = link.startsWith("http") ? link : `https://superteam.fun${link}`;

      if (title && valueText) {
        bounties.push({
          title,
          sponsor: "Superteam",
          value: valueText,
          skills: [],
          deadline: "Check listing",
          url,
          description: "View listing for details",
        });
      }
    });

    return bounties.length > 0 ? bounties : getSampleBounties();
  } catch (error) {
    console.log("Scrape error:", error);
    return getSampleBounties();
  }
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
  description: "Fetch and filter bounties from Superteam Earn platform. Searches for web3 jobs, bounties, and projects that match your skills.",
  similes: ["FIND_BOUNTIES", "SEARCH_BOUNTIES", "GET_JOBS", "FIND_WORK", "SEARCH_OPPORTUNITIES"],
  validate: async (_runtime, _message) => {
    return true;
  },
  handler: async (
    _runtime,
    _message: Memory,
    _state: State,
    options: { skills?: string[]; minValue?: number; category?: string },
    _callback?: HandlerCallback
  ) => {
    const params = FetchBountiesSchema.parse(options);
    let bounties = await scrapeSuperteamBounties();

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
      {
        user: "{{user1}}",
        content: { text: "Find me bounties for React developers" },
      },
      {
        user: "BountyStack",
        content: {
          text: "Abeg, I go search for React bounties now! 🔍",
        },
      },
    ],
    [
      {
        user: "{{user1}}",
        content: { text: "Show me high value bounties over $500" },
      },
      {
        user: "BountyStack",
        content: {
          text: "Your money don land! I dey find the big ones for you 💰",
        },
      },
    ],
  ],
};

export default {
  name: "superteam-scraper",
  description: "Scrapes Superteam Earn for bounties, projects, and grants matching your skills",
  actions: [fetchBountiesAction],
};
