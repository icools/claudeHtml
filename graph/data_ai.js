const jsonAIExtended = {
    "nodes": [
      {"id": "Attention Mechanism", "group": 0},
      {"id": "Transformer", "group": 0},
      
      {"id": "BERT", "group": 1},
      {"id": "GPT-1", "group": 1},
      {"id": "T5", "group": 1},
      {"id": "BART", "group": 1},
      {"id": "ELMo", "group": 1},
      {"id": "XLNet", "group": 1},
      {"id": "RoBERTa", "group": 1},
      {"id": "ALBERT", "group": 1},
      {"id": "ERNIE", "group": 1},
      
      {"id": "GPT-2", "group": 2},
      {"id": "Megatron", "group": 2},
      {"id": "OPT", "group": 2},
      {"id": "Gopher", "group": 2},
      {"id": "DALL-E", "group": 2},
      
      {"id": "GPT-3", "group": 3},
      {"id": "ChatGPT", "group": 3},
      {"id": "InstructGPT", "group": 3},
      {"id": "Codex", "group": 3},
      {"id": "GPT-4", "group": 3},
      {"id": "LLaMA", "group": 3},
      {"id": "PaLM", "group": 3},
      {"id": "Claude", "group": 3},
      {"id": "Sparrow", "group": 3},
      {"id": "MuseNet", "group": 3},
      {"id": "Jukebox", "group": 3},
      {"id": "ChatGLM", "group": 3},
      {"id": "Open LLaMA", "group": 3},
      {"id": "Mistral", "group": 3},
      {"id": "Gemini", "group": 3},
      
      {"id": "DALL-E 2", "group": 4},
      {"id": "Stable Diffusion", "group": 4},
      {"id": "Imagen", "group": 4},
      {"id": "Midjourney", "group": 4},
      {"id": "ControlNet", "group": 4},
      {"id": "DreamBooth", "group": 4},
      {"id": "Make-A-Video", "group": 4},
      {"id": "GitHub Copilot", "group": 4},
      {"id": "ERNIE-ViLG", "group": 4},
      {"id": "WuDao", "group": 4},
      {"id": "Gato", "group": 4}
    ],
    "links": [
      {"source": "Attention Mechanism", "target": "Transformer", "value": 10},
      {"source": "Transformer", "target": "BERT", "value": 10},
      {"source": "Transformer", "target": "GPT-1", "value": 10},
      {"source": "Transformer", "target": "T5", "value": 10},
      {"source": "Transformer", "target": "BART", "value": 10},
      {"source": "Transformer", "target": "ChatGLM", "value": 6},
      
      {"source": "ELMo", "target": "BERT", "value": 6},
      {"source": "BERT", "target": "XLNet", "value": 8},
      {"source": "BERT", "target": "RoBERTa", "value": 8},
      {"source": "BERT", "target": "ALBERT", "value": 8},
      {"source": "BERT", "target": "ERNIE", "value": 8},
      
      {"source": "GPT-1", "target": "GPT-2", "value": 8},
      {"source": "T5", "target": "GPT-2", "value": 8},
      {"source": "BART", "target": "GPT-2", "value": 8},
      
      {"source": "GPT-2", "target": "Megatron", "value": 6},
      {"source": "GPT-2", "target": "OPT", "value": 6},
      {"source": "GPT-2", "target": "Gopher", "value": 6},
      {"source": "GPT-2", "target": "DALL-E", "value": 6},
      
      {"source": "Megatron", "target": "GPT-3", "value": 6},
      {"source": "OPT", "target": "GPT-3", "value": 6},
      {"source": "Gopher", "target": "GPT-3", "value": 6},
      
      {"source": "GPT-3", "target": "ChatGPT", "value": 6},
      {"source": "ChatGPT", "target": "InstructGPT", "value": 6},
      {"source": "ChatGPT", "target": "Codex", "value": 6},
      {"source": "ChatGPT", "target": "GPT-4", "value": 6},
      
      {"source": "GPT-3", "target": "LLaMA", "value": 6},
      {"source": "GPT-3", "target": "PaLM", "value": 6},
      {"source": "GPT-3", "target": "Claude", "value": 6},
      {"source": "GPT-3", "target": "Sparrow", "value": 6},
      {"source": "GPT-3", "target": "MuseNet", "value": 4},
      {"source": "GPT-3", "target": "Jukebox", "value": 4},
      
      {"source": "ChatGPT", "target": "ChatGLM", "value": 4},
      {"source": "GPT-3", "target": "Open LLaMA", "value": 4},
      {"source": "Open LLaMA", "target": "Mistral", "value": 4},
      {"source": "PaLM", "target": "Gemini", "value": 4},
      
      {"source": "DALL-E", "target": "DALL-E 2", "value": 6},
      {"source": "DALL-E", "target": "Stable Diffusion", "value": 6},
      {"source": "Stable Diffusion", "target": "Imagen", "value": 6},
      {"source": "Stable Diffusion", "target": "Midjourney", "value": 6},
      {"source": "Stable Diffusion", "target": "ControlNet", "value": 6},
      {"source": "Stable Diffusion", "target": "DreamBooth", "value": 6},
      {"source": "Midjourney", "target": "Make-A-Video", "value": 6},
      
      {"source": "InstructGPT", "target": "GitHub Copilot", "value": 6},
      
      {"source": "ERNIE", "target": "ERNIE-ViLG", "value": 4},
      {"source": "ChatGLM", "target": "ERNIE-ViLG", "value": 4},
      {"source": "ERNIE-ViLG", "target": "WuDao", "value": 4},
      
      {"source": "DALL-E 2", "target": "ControlNet", "value": 4},
      {"source": "GPT-4", "target": "Gemini", "value": 4},
      
      {"source": "DALL-E 2", "target": "Gato", "value": 4},
      {"source": "Gato", "target": "WuDao", "value": 4}
    ]
  };