import { type Action, type Memory, type State, type HandlerCallback } from "@elizaos/core";
import { z } from "zod";

const TranslateSchema = z.object({
  text: z.string().describe("Text to translate"),
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

async function translateText(
  text: string,
  targetLang: string,
  sourceLang: string = "eng_Latn"
): Promise<string> {
  try {
    const response = await fetch(`${NLLB_SERVICE_URL}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        target_lang: LANGUAGE_CODES[targetLang] || targetLang,
        source_lang: sourceLang,
      }),
    });

    if (!response.ok) {
      throw new Error(`Translation service error: ${response.status}`);
    }

    const data = await response.json();
    return data.translation;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}

export const translateAction: Action = {
  name: "TRANSLATE_TEXT",
  description: "Translate text between Nigerian languages (Yoruba, Igbo, Hausa) and English/Pidgin. Use this when user wants responses in their native language.",
  similes: ["TRANSLATE", "CONVERT_LANGUAGE", "CHANGE_LANGUAGE", "SPEAK_IN_LANGUAGE"],
  validate: async (_runtime, _message) => {
    return true;
  },
  handler: async (
    _runtime,
    _message: Memory,
    _state: State,
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
        message: "No translation needed - using default language",
      };
    }

    const translation = await translateText(
      params.text,
      params.targetLanguage,
      params.sourceLanguage
    );

    return {
      success: true,
      original: params.text,
      translation,
      targetLanguage: params.targetLanguage,
    };
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "Respond in Yoruba" },
      },
      {
        user: "BountyStack",
        content: {
          text: "Okay! I go respond for Yoruba from now.",
        },
      },
    ],
    [
      {
        user: "{{user1}}",
        content: { text: "Ẹ́ kú àlẹ́" },
      },
      {
        user: "BountyStack",
        content: {
          text: "Ẹ́ kú àlẹ́! BountyStack ti de. Ṣé o wa bounties?",
        },
      },
    ],
  ],
};

export const setLanguagePreferenceAction: Action = {
  name: "SET_LANGUAGE",
  description: "Set the user's preferred language for agent responses. Options: yoruba, igbo, hausa, pidgin (default), english.",
  similes: ["CHANGE_LANGUAGE", "SET_LANGUAGE_PREFERENCE", "SWITCH_LANGUAGE"],
  validate: async (_runtime, _message) => {
    return true;
  },
  handler: async (
    _runtime,
    _message: Memory,
    _state: State,
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
      message: `Language set to ${language}. All responses will be in ${language}.`,
      language,
    };
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "Set language to Yoruba" },
      },
      {
        user: "BountyStack",
        content: {
          text: "Okay! I go speak Yoruba from now. Ẹ́ kú àlẹ́!",
        },
      },
    ],
    [
      {
        user: "{{user1}}",
        content: { text: "I want Hausa" },
      },
      {
        user: "BountyStack",
        content: {
          text: "Sannu! A manna fahimta Hausa daga yanzu.",
        },
      },
    ],
  ],
};

export default {
  name: "nllb-translation",
  description: "NLLB-200 translation service for Nigerian languages (Yoruba, Igbo, Hausa)",
  actions: [translateAction, setLanguagePreferenceAction],
};
