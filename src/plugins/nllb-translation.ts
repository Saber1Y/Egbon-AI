import { type Action, type Memory, type State, type HandlerCallback } from "@elizaos/core";
import { z } from "zod";

const TranslateSchema = z.object({
  text: z.string().optional(),
  targetLanguage: z.enum(["yoruba", "igbo", "hausa", "pidgin", "english"]).default("pidgin"),
  sourceLanguage: z.enum(["yoruba", "igbo", "hausa", "pidgin", "english"]).default("pidgin"),
});

const NLLB_SERVICE_URL = process.env.NLLB_SERVICE_URL || "http://localhost:8000";

const LANGUAGE_CODES: Record<string, string> = {
  yoruba: "yor_Latn",
  igbo: "ibo_Latn",
  hausa: "hau_Latn",
  english: "eng_Latn",
  pidgin: "eng_Latn",
};

export const translateAction: Action = {
  name: "TRANSLATE_TEXT",
  description: "Translate text between Nigerian languages",
  similes: ["TRANSLATE", "CONVERT_LANGUAGE"],
  validate: async () => true,
  handler: async (
    _runtime,
    _message: Memory,
    _state: State | undefined,
    options: { text?: string; targetLanguage?: string; sourceLanguage?: string },
    _callback?: HandlerCallback
  ) => {
    const params = TranslateSchema.parse({
      text: options.text || "No text provided",
      targetLanguage: options.targetLanguage || "pidgin",
      sourceLanguage: options.sourceLanguage || "pidgin",
    });

    if (params.targetLanguage === "pidgin" || params.targetLanguage === "english") {
      return {
        success: true,
        original: params.text,
        translation: params.text,
        message: "Using default language",
      };
    }

    return {
      success: true,
      original: params.text,
      translation: params.text,
      targetLanguage: params.targetLanguage,
      note: "Translation service requires NLLB deployment on Nosana",
    };
  },
  examples: [
    [
      { name: "user", content: { text: "Respond in Yoruba" } },
      { name: "Oga Wins", content: { text: "Okay! I go respond for Yoruba from now." } },
    ],
  ],
};

export const setLanguagePreferenceAction: Action = {
  name: "SET_LANGUAGE",
  description: "Set the user's preferred language",
  similes: ["CHANGE_LANGUAGE", "SWITCH_LANGUAGE"],
  validate: async () => true,
  handler: async (
    _runtime,
    _message: Memory,
    _state: State | undefined,
    options: { language?: string },
    _callback?: HandlerCallback
  ) => {
    const validLanguages = ["yoruba", "igbo", "hausa", "pidgin", "english"];
    const language = options.language?.toLowerCase() || "pidgin";

    if (!validLanguages.includes(language)) {
      return {
        success: false,
        error: `Invalid language. Choose from: ${validLanguages.join(", ")}`,
      };
    }

    return {
      success: true,
      message: `Language set to ${language}`,
      language,
    };
  },
  examples: [
    [
      { name: "user", content: { text: "Set language to Yoruba" } },
      { name: "Oga Wins", content: { text: "Okay! I go speak Yoruba from now." } },
    ],
  ],
};

export default {
  name: "nllb-translation",
  description: "Translation service for Nigerian languages",
  actions: [translateAction, setLanguagePreferenceAction],
};
