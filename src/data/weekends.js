const weekends = [
  {
    id: 1,
    title: "The Vibe Code Kickoff",
    description: "Build your resolution tracker so you can log progress across all 10 weekends.",
    deliverable: "A working web app that tracks your progress through these 10 weekends",
    doneWhen: "Tracker is live, Weekend 1 is logged, and you trust you'll use it.",
    coreWork: [
      "Build it: Use Replit Agent, Lovable, or Cursor to create a simple tracker app.",
      "Core features: List all 10 weekends, completion checkboxes, notes field, progress bar.",
      "Ship it: Deploy live.",
      "Use it: Log Weekend 1 as Complete."
    ],
    advancedTasks: [
      "Add user authentication for multi-user support.",
      "Build as a PWA for mobile access.",
      "Add \"suggest next weekend\" logic.",
      "Add time-tracking field."
    ],
    images: ["/weekend-images/page-04-img-01.png"]
  },
  {
    id: 2,
    title: "The Model Mapping Project",
    description: "Build your personal AI topography so you can answer which tool to use in seconds.",
    deliverable: "Model Topography Sheet + AI Rules of Thumb document",
    doneWhen: "You can answer \"which tool do I use for what?\" in 30 seconds without hesitation.",
    coreWork: [
      "Pick 2-3 models you have access to (Claude, ChatGPT, Gemini).",
      "Run the same tasks through each: Deep Research, Writing, Strategy, Data, Visual.",
      "Compare outputs: speed, clarity, questions asked, overall fit.",
      "Synthesize a one-page Rules of Thumb summary."
    ],
    advancedTasks: [
      "Test specialized tools (Perplexity, etc.).",
      "Build a matrix including cost and context window.",
      "Test output consistency over time.",
      "Track editing time needed per model."
    ],
    images: ["/weekend-images/page-05-img-01.png"]
  },
  {
    id: 3,
    title: "The Deep Research Sprint",
    description: "Let AI do a week's research in an afternoon and deliver a usable recommendation.",
    deliverable: "A 2-page research brief with a clear recommendation",
    doneWhen: "Your brief leads to a recommendation you'd actually follow, with known uncertainties.",
    coreWork: [
      "Pick a real decision you need to make (not hypothetical).",
      "Use deep research modes in Claude, Gemini, or ChatGPT.",
      "Iterate: push back, ask for disconfirming evidence.",
      "Structure: Problem, Findings, Options, Recommendation, Risks."
    ],
    advancedTasks: [
      "Run the same question through all 3 major tools.",
      "Create a meta-analysis of which tool was most accurate.",
      "Build a fact check list of 10 claims you verify manually."
    ],
    images: ["/weekend-images/page-06-img-01.png"]
  },
  {
    id: 4,
    title: "The Analysis Project",
    description: "Turn messy data into decisions with a cleaned dataset and insight memo.",
    deliverable: "Cleaned dataset + one-page Insights Memo with actions",
    doneWhen: "You can name the top 3 drivers of what you analyzed and what to do next.",
    coreWork: [
      "Collect real data (CSV or spreadsheet) from Spotify, bank, Google Takeout, or Kaggle.",
      "Ask AI for cleaning steps, 5-10 metrics, and 3 hypotheses.",
      "Produce a cleaned dataset, summary table, 3 insights, and 3 actions.",
      "Write a one-page Insights Memo (no charts required)."
    ],
    advancedTasks: [
      "Build a reusable prompt template for monthly updates.",
      "Connect to a live data source for real-time analysis.",
      "Compare insights from Claude vs. ChatGPT on the same data."
    ],
    images: ["/weekend-images/page-07-img-01.png"]
  },
  {
    id: 5,
    title: "The Visual Reasoning Project",
    description: "Make AI see and think by creating a visual explainer that improves understanding.",
    deliverable: "One infographic, diagram, or visual explainer you'd actually use",
    doneWhen: "You can explain the idea faster with the visual, and others get it instantly.",
    coreWork: [
      "Pick a concept: process, comparison, framework, or timeline.",
      "Ask AI for the best visual logic and tradeoffs.",
      "Draft two alternate design approaches (flowchart vs. matrix).",
      "Finalize using AI generation or tools like Canva/Gamma.",
      "Visual QA: readable in 5 seconds with one clear takeaway."
    ],
    advancedTasks: [
      "Create a reusable visual system or template.",
      "Design and build a complex data visualization.",
      "Build a visual pattern library (2x2s, cycles, flows)."
    ],
    images: ["/weekend-images/page-08-img-01.png"]
  },
  {
    id: 6,
    title: "The Information Pipeline",
    description: "Build a reusable workflow that turns one input into summaries, FAQs, and decks.",
    deliverable: "A reusable workflow: Summary + FAQ + Presentation Deck",
    doneWhen: "You can brief someone in under 7 minutes using your deck.",
    coreWork: [
      "Use a corpus (transcript, report, notes, or book).",
      "NotebookLM: generate summary, glossary, FAQ, and audio overview.",
      "Gamma: create an 8-12 slide deck with one visual and a recommendation.",
      "Document the prompts and workflow for reuse."
    ],
    advancedTasks: [
      "Build a full repurposing pipeline (audio, deck, one-pager, tweets).",
      "Time the process and compare to manual effort.",
      "Create a reusable checklist template."
    ],
    images: ["/weekend-images/page-09-img-01.png"]
  },
  {
    id: 7,
    title: "The First Automation",
    description: "Build a content distribution automation with trigger, transform, route, approval, and logging.",
    deliverable: "One working automation + a \"How It Works\" doc",
    doneWhen: "You've run it twice, it saved time, and you can explain it.",
    coreWork: [
      "Include Trigger, Transform, Route, Approval, and Logging.",
      "Use Lindy, n8n, Make, or native Slack/Notion workflows.",
      "Example: Notion note → summarize → draft tweets → send to Slack.",
      "Default idea: Weekly reading digest."
    ],
    advancedTasks: [
      "Chain multiple automations together.",
      "Add conditional logic for different content types.",
      "Add robust error handling for failures.",
      "Log detailed analytics."
    ],
    images: ["/weekend-images/page-10-img-01.png"]
  },
  {
    id: 8,
    title: "The Second Automation",
    description: "Build a productivity workflow automation and a follow-up tracker/dashboard.",
    deliverable: "One working productivity automation + tracker/dashboard",
    doneWhen: "The system creates follow-ups automatically, you trust it, and you track open items.",
    coreWork: [
      "Include Trigger, Transform, Route, Approval, and Logging.",
      "Pick one: Inbox → Follow-up, Lead → Response, or Meeting Prep Bot.",
      "Default: Calendar event → LinkedIn lookup → briefing sent 30m prior.",
      "Use Lindy, n8n, Make, or Zapier."
    ],
    advancedTasks: [
      "Add a feedback loop to rate output quality.",
      "Make it conversational (e.g., Slack bot drafts reply, you say \"send\").",
      "Connect to a CRM/tracker for a dashboard view."
    ],
    images: ["/weekend-images/page-11-img-01.png"]
  },
  {
    id: 9,
    title: "The Context Engineering Project",
    description: "Build your personal AI operating system and reusable context documents.",
    deliverable: "Structured context system + Professional Context Document",
    doneWhen: "You have one place to store outputs and a habit to maintain it.",
    coreWork: [
      "Create sections: Playbook, Artifacts Library, Automation Log, Decisions Log.",
      "Set up one central inbox and a weekly 15-minute review.",
      "Write a context doc: Role, Key Projects, Style prefs, What to Avoid.",
      "Save it where you can paste instantly."
    ],
    advancedTasks: [
      "Create multiple context profiles (Work vs Personal).",
      "Include real writing/email examples in context.",
      "Add a quarterly context refresh to your calendar."
    ],
    images: ["/weekend-images/page-12-img-01.png"]
  },
  {
    id: 10,
    title: "The AI-Powered Build",
    description: "Ship a product with AI as the core feature and deploy it.",
    deliverable: "A working application with AI at its center",
    doneWhen: "You have deployed something usable that includes AI as the core feature.",
    coreWork: [
      "Use Google AI Studio or similar for core logic.",
      "Option A: chatbot trained on your notes or FAQs.",
      "Option B: voice agent for interviews, practice, or sales.",
      "Option C: mini-agent that ingests docs and outputs structured data.",
      "Deploy somewhere usable."
    ],
    advancedTasks: [
      "Build something for others (team or clients), not just you.",
      "Train it on a specific company knowledge base.",
      "Give it to real people, get feedback, and iterate.",
      "Move from side project to prototype."
    ],
    images: ["/weekend-images/page-13-img-01.png"]
  }
];

export default weekends;
