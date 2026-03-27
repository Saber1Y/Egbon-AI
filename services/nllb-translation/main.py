"""
NLLB-200 Translation Service
FastAPI wrapper for Meta's NLLB-200 model for Nigerian language translation
Supports: Yoruba (yor_Latn), Igbo (ibo_Latn), Hausa (hau_Latn)
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import os

app = FastAPI(title="NLLB Translation Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_NAME = os.getenv("MODEL_NAME", "facebook/nllb-200-distilled-600M")

print(f"Loading model: {MODEL_NAME}")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
print("Model loaded successfully!")


class TranslationRequest(BaseModel):
    text: str
    target_lang: str = "yor_Latn"
    source_lang: str = "eng_Latn"


class TranslationResponse(BaseModel):
    translation: str
    source_lang: str
    target_lang: str


LANGUAGE_CODES = {
    "yoruba": "yor_Latn",
    "igbo": "ibo_Latn",
    "hausa": "hau_Latn",
    "english": "eng_Latn",
    "pidgin": "eng_Latn",
}


@app.get("/")
async def root():
    return {
        "service": "NLLB-200 Translation Service",
        "version": "1.0.0",
        "supported_languages": list(LANGUAGE_CODES.keys()),
        "model": MODEL_NAME,
    }


@app.post("/translate", response_model=TranslationResponse)
async def translate(request: TranslationRequest):
    try:
        target_lang = LANGUAGE_CODES.get(request.target_lang, request.target_lang)
        source_lang = LANGUAGE_CODES.get(request.source_lang, request.source_lang)

        inputs = tokenizer(
            request.text,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=512,
        )

        with torch.no_grad():
            generated_tokens = model.generate(
                **inputs,
                forced_bos_token_id=tokenizer.convert_tokens_to_ids(target_lang),
                max_length=512,
                num_beams=5,
                early_stopping=True,
            )

        translation = tokenizer.batch_decode(
            generated_tokens, skip_special_tokens=True
        )[0]

        return TranslationResponse(
            translation=translation, source_lang=source_lang, target_lang=target_lang
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/translate/batch")
async def translate_batch(
    texts: list[str], target_lang: str = "yor_Latn", source_lang: str = "eng_Latn"
):
    try:
        target_code = LANGUAGE_CODES.get(target_lang, target_lang)
        source_code = LANGUAGE_CODES.get(source_lang, source_lang)

        translations = []

        for text in texts:
            inputs = tokenizer(
                text, return_tensors="pt", padding=True, truncation=True, max_length=512
            )

            with torch.no_grad():
                generated_tokens = model.generate(
                    **inputs,
                    forced_bos_token_id=tokenizer.convert_tokens_to_ids(target_code),
                    max_length=512,
                    num_beams=5,
                    early_stopping=True,
                )

            translation = tokenizer.batch_decode(
                generated_tokens, skip_special_tokens=True
            )[0]
            translations.append(translation)

        return {
            "translations": translations,
            "source_lang": source_code,
            "target_lang": target_code,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health():
    return {"status": "healthy", "model_loaded": True}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
