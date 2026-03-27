/**
 * BountyStack Agent — Custom Plugins
 *
 * This file exports all custom plugins for the BountyStack agent:
 * - superteam-scraper: Fetches and filters bounties from Superteam Earn
 * - rate-monitor: Monitors USDT to Naira exchange rates
 * - proposal-generator: Generates tailored proposals for bounties
 */

import { type Plugin } from "@elizaos/core";
import { fetchBountiesAction } from "./plugins/superteam-scraper";
import { fetchRatesAction } from "./plugins/rate-monitor";
import { generateProposalAction, getUserProfileAction } from "./plugins/proposal-generator";

export const bountystackPlugin: Plugin = {
  name: "bountystack",
  description: "BountyStack - Nigerian web3 hustler's copilot for finding bounties, monitoring crypto rates, and writing proposals",
  actions: [fetchBountiesAction, fetchRatesAction, generateProposalAction, getUserProfileAction],
  providers: [],
  evaluators: [],
};

export { fetchBountiesAction, fetchRatesAction, generateProposalAction, getUserProfileAction };
export default bountystackPlugin;
