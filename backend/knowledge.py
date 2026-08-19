# Knowledge base for the chatbot.
# Each entry has a set of trigger phrases and one answer.
# Edit this file to teach the bot new facts about yourself —
# no code changes needed elsewhere.

KNOWLEDGE_BASE = [
    {
        "topic": "greeting",
        "triggers": [
            "hey", "hi", "hello", "yo", "sup", "good morning", "good afternoon",
            "good evening", "what's up", "whats up",
        ],
        "answer": (
            "Hey there! I'm Azashiro's assistant — ask me about Rommel's skills, "
            "projects, education, or how to get in touch."
        ),
    },
    {
        "topic": "smalltalk",
        "triggers": [
            "how are you", "how's it going", "hows it going", "thanks", "thank you",
            "bye", "goodbye", "see you",
        ],
        "answer": (
            "I'm just a small chatbot, so I'm always doing fine! Let me know if you "
            "want to know more about Rommel's work or how to reach him."
        ),
    },
    {
        "topic": "identity",
        "triggers": [
            "who are you", "who is rommel", "your name", "introduce yourself",
            "tell me about yourself", "tell me about rommel",
        ],
        "answer": (
            "I'm Rommel Glenn Austria, a fresh BS Computer Science graduate from PhilCST. "
            "I build across mobile, web, and design — with a background in graphic design "
            "that shapes how I think about interfaces, not just how they function."
        ),
    },
    {
        "topic": "education",
        "triggers": [
            "education", "degree", "graduate", "school", "university", "college", "philcst",
        ],
        "answer": (
            "I hold a BS in Computer Science from PhilCST (Philippine College of Science and Technology), "
            "graduating recently. I'm continuously picking up new tools and frameworks beyond the curriculum."
        ),
    },
    {
        "topic": "skills",
        "triggers": [
            "skills", "what can you do", "tech stack", "technologies", "what do you know",
            "programming languages", "what are you good at",
        ],
        "answer": (
            "My core stack: Python, PHP, Flutter/Dart, and React. On the design side: Figma, "
            "Photoshop, Illustrator, and Sketchup. I lean mobile-first (Flutter) but I'm comfortable "
            "across the full stack, from backend logic to pixel-level UI."
        ),
    },
    {
        "topic": "tools",
        "triggers": ["tools", "toolbox", "software you use", "what apps do you use"],
        "answer": (
            "Programming: Python, PHP. Mobile: Flutter. Design: Figma and Adobe Illustrator. "
            "I pick the tool based on the problem rather than sticking to one stack."
        ),
    },
    {
        "topic": "projects_overview",
        "triggers": [
            "projects", "what have you built", "your work", "portfolio", "show me your projects",
        ],
        "answer": (
            "Three projects I'm proud of: Doc-Ease (an OCR-powered document editor), "
            "Aether POS (a customizable point-of-sale system), and Aexor Music Player "
            "(a Firebase-backed music app). Ask me about any one by name for details."
        ),
    },
    {
        "topic": "project_docease",
        "triggers": ["doc-ease", "docease", "document editor", "ocr project"],
        "answer": (
            "Doc-Ease is an OCR-powered document editor built in Flutter. It converts photos of "
            "text into fully editable documents, with dual editing modes (ML Kit OCR and "
            "image-based text overlay) and exports to PDF, DOCX, and TXT."
        ),
    },
    {
        "topic": "project_aether",
        "triggers": ["aether", "pos system", "point of sale", "point-of-sale"],
        "answer": (
            "Aether POS is a highly customizable point-of-sale app with a Gmail-based activation "
            "flow, super-admin approval, and per-store dynamic field configuration. It's cloud-backed "
            "with Supabase, uses Isar for local storage, and ships with three theme palettes. Built with "
            "Flutter and the BLoC pattern."
        ),
    },
    {
        "topic": "project_aexor",
        "triggers": ["aexor", "music player", "music app"],
        "answer": (
            "Aexor is a Firebase-backed music player with Google and email authentication, real-time "
            "sign-in notifications, and full metadata support (lyrics, album art, track management). "
            "It was a school project built with production-grade auth flows."
        ),
    },
    {
        "topic": "availability",
        "triggers": [
            "are you available", "open to work", "hiring", "looking for a job", "freelance",
            "available for work", "job",
        ],
        "answer": (
            "Yes — I'm open to entry-level roles, freelance work, and collaborations. "
            "If you've got an interesting problem, use the contact section below or the links "
            "in this chat to reach out."
        ),
    },
    {
        "topic": "contact",
        "triggers": [
            "contact", "email", "reach you", "get in touch", "github", "instagram", "social",
        ],
        "answer": (
            "You can email me at austriarommelglenn09@gmail.com, check my code on GitHub "
            "(github.com/Azazel9-4), or find me on Instagram @azaashirooo. There's also a "
            "Contact section further down this page with clickable links."
        ),
    },
    {
        "topic": "design_background",
        "triggers": ["design background", "graphic design", "designer", "figma", "illustrator"],
        "answer": (
            "I have a graphic design background alongside my CS degree — I've worked in Figma, "
            "Photoshop, and Illustrator. It means I think about how an interface looks and feels, "
            "not just whether the logic behind it works."
        ),
    },
]

FALLBACK_ANSWER = (
    "I don't have a solid answer for that yet — try asking about my skills, projects, "
    "education, or how to get in touch. You can also edit backend/knowledge.py to teach me more."
)