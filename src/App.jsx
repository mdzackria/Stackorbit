
import { useState, useEffect, useRef } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────
const AFFILIATE_LINKS = {
  "HubSpot":          "https://hubspot.com/?ref=YOUR_ID",
  "Pipedrive":        "https://pipedrive.com/?ref=YOUR_ID",
  "Salesforce":       "https://salesforce.com/?ref=YOUR_ID",
  "Close":            "https://close.com/?ref=YOUR_ID",
  "Apollo":           "https://apollo.io/?ref=YOUR_ID",
  "Clay":             "https://clay.com/?ref=YOUR_ID",
  "Instantly":        "https://instantly.ai/?ref=YOUR_ID",
  "Lemlist":          "https://lemlist.com/?ref=YOUR_ID",
  "Zapier":           "https://zapier.com/?ref=YOUR_ID",
  "Make":             "https://make.com/?ref=YOUR_ID",
  "n8n":              "https://n8n.io/?ref=YOUR_ID",
  "Activepieces":     "https://activepieces.com/?ref=YOUR_ID",
  "Monday.com":       "https://monday.com/?ref=YOUR_ID",
  "ClickUp":          "https://clickup.com/?ref=YOUR_ID",
  "Asana":            "https://asana.com/?ref=YOUR_ID",
  "Notion":           "https://notion.so/?ref=YOUR_ID",
  "Linear":           "https://linear.app/?ref=YOUR_ID",
  "Jasper":           "https://jasper.ai/?ref=YOUR_ID",
  "Copy.ai":          "https://copy.ai/?ref=YOUR_ID",
  "Writesonic":       "https://writesonic.com/?ref=YOUR_ID",
  "Rytr":             "https://rytr.me/?ref=YOUR_ID",
  "Hypotenuse":       "https://hypotenuse.ai/?ref=YOUR_ID",
  "ChatGPT":          "https://openai.com/?ref=YOUR_ID",
  "Claude":           "https://claude.ai/?ref=YOUR_ID",
  "Gemini":           "https://gemini.google.com/?ref=YOUR_ID",
  "Perplexity":       "https://perplexity.ai/?ref=YOUR_ID",
  "Intercom":         "https://intercom.com/?ref=YOUR_ID",
  "Zendesk":          "https://zendesk.com/?ref=YOUR_ID",
  "Freshdesk":        "https://freshdesk.com/?ref=YOUR_ID",
  "Tidio":            "https://tidio.com/?ref=YOUR_ID",
  "Crisp":            "https://crisp.chat/?ref=YOUR_ID",
  "ActiveCampaign":   "https://activecampaign.com/?ref=YOUR_ID",
  "Mailchimp":        "https://mailchimp.com/?ref=YOUR_ID",
  "Klaviyo":          "https://klaviyo.com/?ref=YOUR_ID",
  "Brevo":            "https://brevo.com/?ref=YOUR_ID",
  "Beehiiv":          "https://beehiiv.com/?ref=YOUR_ID",
  "Canva":            "https://canva.com/?ref=YOUR_ID",
  "Midjourney":       "https://midjourney.com/?ref=YOUR_ID",
  "Adobe Firefly":    "https://firefly.adobe.com/?ref=YOUR_ID",
  "Runway":           "https://runwayml.com/?ref=YOUR_ID",
  "Airtable":         "https://airtable.com/?ref=YOUR_ID",
  "Rows":             "https://rows.com/?ref=YOUR_ID",
  "Metabase":         "https://metabase.com/?ref=YOUR_ID",
  "Otter.ai":         "https://otter.ai/?ref=YOUR_ID",
  "Fireflies":        "https://fireflies.ai/?ref=YOUR_ID",
  "Loom":             "https://loom.com/?ref=YOUR_ID",
  "Grain":            "https://grain.com/?ref=YOUR_ID",
  "Reclaim":          "https://reclaim.ai/?ref=YOUR_ID",
  "Rippling":         "https://rippling.com/?ref=YOUR_ID",
  "Greenhouse":       "https://greenhouse.com/?ref=YOUR_ID",
  "Manatal":          "https://manatal.com/?ref=YOUR_ID",
  "Xero":             "https://xero.com/?ref=YOUR_ID",
  "QuickBooks":       "https://quickbooks.intuit.com/?ref=YOUR_ID",
  "Brex":             "https://brex.com/?ref=YOUR_ID",
  "1Password":        "https://1password.com/?ref=YOUR_ID",
  "Vanta":            "https://vanta.com/?ref=YOUR_ID",
  "Semrush":          "https://semrush.com/?ref=YOUR_ID",
  "Ahrefs":           "https://ahrefs.com/?ref=YOUR_ID",
  "Surfer SEO":       "https://surferseo.com/?ref=YOUR_ID",
};

const getLink = (name) => {
  for (const k of Object.keys(AFFILIATE_LINKS))
    if (name.toLowerCase().includes(k.toLowerCase())) return AFFILIATE_LINKS[k];
  return "#";
};

const CURRENCIES = [
  { code: "USD", symbol: "$",    label: "🇺🇸 USD — US Dollar" },
  { code: "CAD", symbol: "C$",   label: "🇨🇦 CAD — Canadian Dollar" },
  { code: "MXN", symbol: "MX$",  label: "🇲🇽 MXN — Mexican Peso" },
  { code: "BRL", symbol: "R$",   label: "🇧🇷 BRL — Brazilian Real" },
  { code: "ARS", symbol: "AR$",  label: "🇦🇷 ARS — Argentine Peso" },
  { code: "COP", symbol: "COL$", label: "🇨🇴 COP — Colombian Peso" },
  { code: "CLP", symbol: "CL$",  label: "🇨🇱 CLP — Chilean Peso" },
  { code: "PEN", symbol: "S/",   label: "🇵🇪 PEN — Peruvian Sol" },
  { code: "EUR", symbol: "€",    label: "🇪🇺 EUR — Euro" },
  { code: "GBP", symbol: "£",    label: "🇬🇧 GBP — British Pound" },
  { code: "CHF", symbol: "Fr",   label: "🇨🇭 CHF — Swiss Franc" },
  { code: "SEK", symbol: "kr",   label: "🇸🇪 SEK — Swedish Krona" },
  { code: "NOK", symbol: "kr",   label: "🇳🇴 NOK — Norwegian Krone" },
  { code: "DKK", symbol: "kr",   label: "🇩🇰 DKK — Danish Krone" },
  { code: "PLN", symbol: "zł",   label: "🇵🇱 PLN — Polish Złoty" },
  { code: "CZK", symbol: "Kč",   label: "🇨🇿 CZK — Czech Koruna" },
  { code: "HUF", symbol: "Ft",   label: "🇭🇺 HUF — Hungarian Forint" },
  { code: "RON", symbol: "lei",  label: "🇷🇴 RON — Romanian Leu" },
  { code: "TRY", symbol: "₺",    label: "🇹🇷 TRY — Turkish Lira" },
  { code: "UAH", symbol: "₴",    label: "🇺🇦 UAH — Ukrainian Hryvnia" },
  { code: "AED", symbol: "د.إ",  label: "🇦🇪 AED — UAE Dirham" },
  { code: "SAR", symbol: "﷼",    label: "🇸🇦 SAR — Saudi Riyal" },
  { code: "QAR", symbol: "ر.ق",  label: "🇶🇦 QAR — Qatari Riyal" },
  { code: "KWD", symbol: "د.ك",  label: "🇰🇼 KWD — Kuwaiti Dinar" },
  { code: "BHD", symbol: ".د.ب", label: "🇧🇭 BHD — Bahraini Dinar" },
  { code: "ILS", symbol: "₪",    label: "🇮🇱 ILS — Israeli Shekel" },
  { code: "EGP", symbol: "E£",   label: "🇪🇬 EGP — Egyptian Pound" },
  { code: "NGN", symbol: "₦",    label: "🇳🇬 NGN — Nigerian Naira" },
  { code: "KES", symbol: "KSh",  label: "🇰🇪 KES — Kenyan Shilling" },
  { code: "GHS", symbol: "₵",    label: "🇬🇭 GHS — Ghanaian Cedi" },
  { code: "ZAR", symbol: "R",    label: "🇿🇦 ZAR — South African Rand" },
  { code: "MAD", symbol: "د.م.", label: "🇲🇦 MAD — Moroccan Dirham" },
  { code: "TZS", symbol: "TSh",  label: "🇹🇿 TZS — Tanzanian Shilling" },
  { code: "ETB", symbol: "Br",   label: "🇪🇹 ETB — Ethiopian Birr" },
  { code: "INR", symbol: "₹",    label: "🇮🇳 INR — Indian Rupee" },
  { code: "PKR", symbol: "₨",    label: "🇵🇰 PKR — Pakistani Rupee" },
  { code: "BDT", symbol: "৳",    label: "🇧🇩 BDT — Bangladeshi Taka" },
  { code: "LKR", symbol: "₨",    label: "🇱🇰 LKR — Sri Lankan Rupee" },
  { code: "NPR", symbol: "₨",    label: "🇳🇵 NPR — Nepalese Rupee" },
  { code: "JPY", symbol: "¥",    label: "🇯🇵 JPY — Japanese Yen" },
  { code: "CNY", symbol: "¥",    label: "🇨🇳 CNY — Chinese Yuan" },
  { code: "KRW", symbol: "₩",    label: "🇰🇷 KRW — South Korean Won" },
  { code: "HKD", symbol: "HK$",  label: "🇭🇰 HKD — Hong Kong Dollar" },
  { code: "TWD", symbol: "NT$",  label: "🇹🇼 TWD — Taiwan Dollar" },
  { code: "SGD", symbol: "S$",   label: "🇸🇬 SGD — Singapore Dollar" },
  { code: "MYR", symbol: "RM",   label: "🇲🇾 MYR — Malaysian Ringgit" },
  { code: "THB", symbol: "฿",    label: "🇹🇭 THB — Thai Baht" },
  { code: "IDR", symbol: "Rp",   label: "🇮🇩 IDR — Indonesian Rupiah" },
  { code: "PHP", symbol: "₱",    label: "🇵🇭 PHP — Philippine Peso" },
  { code: "VND", symbol: "₫",    label: "🇻🇳 VND — Vietnamese Dong" },
  { code: "MMK", symbol: "K",    label: "🇲🇲 MMK — Myanmar Kyat" },
  { code: "KHR", symbol: "៛",    label: "🇰🇭 KHR — Cambodian Riel" },
  { code: "AUD", symbol: "A$",   label: "🇦🇺 AUD — Australian Dollar" },
  { code: "NZD", symbol: "NZ$",  label: "🇳🇿 NZD — New Zealand Dollar" },
];

const REVIEWS = [
  { name: "Marcus T.", role: "Founder, B2B SaaS · $120K MRR", stars: 5, text: "I was spending $1,800/month on tools that overlapped. StackOrbit flagged three I could cancel immediately. Saved $840 in the first month alone." },
  { name: "Priya S.", role: "CEO, Digital Agency · 22 staff", stars: 5, text: "The recommendation logic is sharp. It didn't give me a generic list — it knew I was agency-stage and recommended exactly what we needed for client delivery." },
  { name: "James O.", role: "Co-Founder, E-commerce Brand", stars: 5, text: "What surprised me was the ROI breakdown per tool. I could actually justify each purchase internally. That level of specificity doesn't exist anywhere else." },
  { name: "Leila K.", role: "MD, Consulting Firm · 8 people", stars: 5, text: "We'd been debating AI tools for months. StackOrbit gave us a prioritised implementation roadmap in under 3 minutes. We started on Monday." },
  { name: "Tom R.", role: "Founder, Recruiting Agency", stars: 5, text: "The insight at the end was worth it alone. It told me something about our stage that I'd never explicitly articulated but immediately recognised as true." },
  { name: "Dana W.", role: "CEO, MarTech Startup · Series A", stars: 4, text: "Genuinely useful. The cancel recommendations were uncomfortable but accurate. Cutting Jasper saved us $708 a year for tools that do the same thing better." },
];

const USE_CASES = [
  { icon: "🏢", title: "Agency Founders", desc: "Identify which AI tools eliminate the most manual delivery work and free your team to take on more clients — without hiring." },
  { icon: "⚡", title: "SaaS Startups", desc: "Build the right AI infrastructure for your growth stage. Avoid tools designed for enterprises when you're still finding product-market fit." },
  { icon: "💼", title: "Consulting Firms", desc: "Cut the time spent on proposals, reporting, and admin. Redirect that capacity toward billable client work." },
  { icon: "🛒", title: "E-commerce Brands", desc: "Automate customer support, content production, and inventory workflows without overspending on enterprise platforms." },
  { icon: "📈", title: "Sales-Led Businesses", desc: "Stack the right outreach, CRM, and follow-up tools to shorten sales cycles and increase pipeline without adding headcount." },
  { icon: "🧑‍💻", title: "Solo Operators", desc: "Get a lean, powerful AI stack that lets one person run a business that used to require a team of three." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Answer 5 questions", desc: "Tell us your revenue, team size, primary business challenge, budget, and current tools. Takes under 2 minutes." },
  { step: "02", title: "AI analyses your situation", desc: "StackOrbit cross-references 200+ AI tools against your revenue stage, team size, and biggest operational challenge." },
  { step: "03", title: "Receive your personalised stack", desc: "Get a prioritised list of what to buy, what to cancel, and what ROI to expect — specific to your business." },
];

const STATS = [
  { val: "200+", label: "AI tools analysed" },
  { val: "$1,240", label: "Avg. monthly savings identified" },
  { val: "2 min", label: "Time to get your report" },
  { val: "94%", label: "Founder satisfaction rate" },
];

const PAIN_OPTIONS = [
  { value: "", label: "Select your primary challenge..." },
  { value: "Sales & Lead Generation — Too much time on manual prospecting and outreach with inconsistent pipeline results.", label: "Sales & Lead Generation" },
  { value: "Client Communication & Retention — Struggling to maintain consistent, high-quality touchpoints across multiple accounts.", label: "Client Communication & Retention" },
  { value: "Content & Marketing Production — Content creation is slow, expensive, and doesn't scale with business growth.", label: "Content & Marketing Production" },
  { value: "Internal Operations & Workflows — Repetitive manual processes consuming disproportionate team bandwidth.", label: "Internal Operations & Workflows" },
  { value: "Reporting & Business Intelligence — Time-intensive reporting with limited actionable insight from existing data.", label: "Reporting & Business Intelligence" },
  { value: "Recruitment & HR Management — Hiring cycles are too long and onboarding lacks structure and consistency.", label: "Recruitment & HR Management" },
  { value: "Customer Support & Service — Support volume is growing faster than the team's capacity to respond.", label: "Customer Support & Service" },
  { value: "Financial Management & Forecasting — Limited visibility into cash flow, margins, and forward-looking projections.", label: "Financial Management & Forecasting" },
  { value: "Product Development & Delivery — Development cycles are slow and misaligned with market feedback.", label: "Product Development & Delivery" },
  { value: "Knowledge Management — Critical information is siloed and difficult to retrieve across the team.", label: "Knowledge Management" },
];

const FUNDING_STAGES = [
  { value: "", label: "Select funding stage..." },
  { value: "Pre-Idea / Bootstrapped — No external funding, self-funded or personal savings, revenue-first mindset.", label: "Bootstrapped" },
  { value: "Pre-Seed — Early stage, typically $0–$500K raised, proving concept, small team.", label: "Pre-Seed" },
  { value: "Seed — $500K–$3M raised, product-market fit phase, growing team of 5–15.", label: "Seed" },
  { value: "Series A — $3M–$15M raised, scaling proven model, 15–50 person team.", label: "Series A" },
  { value: "Series B — $15M–$50M raised, aggressive growth phase, 50–200 person team.", label: "Series B" },
  { value: "Series C+ — $50M+ raised, market expansion, 200+ person team.", label: "Series C+" },
  { value: "Growth / Pre-IPO — Late stage, $100M+ raised, preparing for public markets.", label: "Growth / Pre-IPO" },
];

const getFields = (sym) => [
  { key: "revenue", question: "What is your revenue or funding stage?", placeholder: `e.g. ${sym}50,000 / month`, hint: "Enter your monthly revenue OR select your funding round", type: "revenue_or_funding" },
  { key: "team", question: "What is your current team size?", placeholder: "e.g. 8 people", hint: "Tool complexity and pricing tiers scale with headcount", type: "text" },
  { key: "pain", question: "Where is your business losing the most time or revenue?", hint: "Your primary challenge shapes your entire AI stack recommendation", type: "dropdown", options: PAIN_OPTIONS },
  { key: "budget", question: "What is your monthly budget for AI tooling?", placeholder: `e.g. ${sym}500 / month`, hint: "We will only recommend solutions within your financial parameters", type: "text" },
  { key: "tools", question: "Which tools are you currently paying for?", hint: "Select all that apply — or skip if none. We identify what to keep, replace, or cut.", type: "tool_picker" },
];

const STEPS = ["Revenue", "Team", "Challenge", "Budget", "Tools"];
const F = "'Instrument Serif', Georgia, serif";
const M = "'Geist Mono', 'Courier New', monospace";

// ─── Tool Catalog ─────────────────────────────────────────────────────────
const TOOL_CATALOG = {
  "AI Assistants": ["ChatGPT","Claude","Gemini","Perplexity","Copilot","Grok","Mistral","Llama","Cohere","You.com","Pi","Character.ai","Poe","HuggingChat","Inflection","Bing AI","Bard","Meta AI","Phind","Kagi"],
  "AI Writing": ["Jasper","Copy.ai","Writesonic","Rytr","Hypotenuse","Anyword","Copysmith","Peppertype","Wordtune","Grammarly","ProWritingAid","Hemingway","QuillBot","Frase","Surfer AI","Paragraph AI","Lex","Jenni","Compose AI","Neuroflash","Simplified","Unbounce Smart Copy","Scalenut","Longshot AI","Cohesive","Content at Scale","Koala","Originality AI","Ghostwriter","Article Forge"],
  "CRM & Sales": ["HubSpot","Salesforce","Pipedrive","Close","Copper","Zoho CRM","Freshsales","Monday Sales","ActiveCampaign CRM","Insightly","Nimble","Streak","Nutshell","Keap","Apptivo","SugarCRM","Vtiger","Really Simple Systems","Capsule","Salesmate","Agile CRM","Bitrix24","Creatio","Dynamics 365","Oracle CX"],
  "Sales Outreach": ["Apollo","Clay","Instantly","Lemlist","Outreach","Salesloft","Reply.io","Woodpecker","Klenty","Mixmax","Yesware","Mailshake","SalesHandy","Prospect.io","Growbots","Dripify","LinkedHelper","Waalaxy","Expandi","Meet Alfred","Zopto","Skylead","Hunter.io","Snov.io","Findymail","Lusha","ZoomInfo","Clearbit","Bombora","6sense"],
  "Marketing & Email": ["Mailchimp","ActiveCampaign","Klaviyo","Brevo","Beehiiv","ConvertKit","AWeber","GetResponse","Drip","MailerLite","Omnisend","Moosend","Constant Contact","Campaign Monitor","Iterable","Marketo","Pardot","Eloqua","HubSpot Marketing","Autopilot","Dotdigital","Mautic","SendGrid","Postmark","Mailgun"],
  "Automation": ["Zapier","Make","n8n","Activepieces","Pabbly","Integrately","Automate.io","Tray.io","Workato","Boomi","MuleSoft","Microsoft Power Automate","UiPath","Automation Anywhere","Blue Prism","Robocorp","Nintex","Process Street","Kissflow","Formstack"],
  "Project Management": ["Notion","Monday.com","ClickUp","Asana","Linear","Jira","Trello","Basecamp","Wrike","Smartsheet","Teamwork","Height","Shortcut","Plane","AppFlowy","Fibery","Coda","Airtable","Quip","Confluence","Productboard","Aha!","Roadmunk","ProdPad","Miro"],
  "Customer Support": ["Intercom","Zendesk","Freshdesk","Crisp","Tidio","Drift","HelpScout","Gorgias","Kustomer","LiveChat","Olark","Chatwoot","Zowie","Forethought","Fin","Capacity","Thankful","Ultimate.ai","Hiver","Front","Groove","Gladly","Dixa","Supportbench","Zoho Desk"],
  "Design & Creative": ["Canva","Figma","Adobe Creative Cloud","Midjourney","DALL-E","Stable Diffusion","Runway","Pika","Kling","Sora","Adobe Firefly","Leonardo AI","Ideogram","Adobe Express","Crello","Visme","Snappa","Stencil","Desygner","Pixlr","Remove.bg","Cleanup.pictures","Photoroom","Lensa","FaceApp","Luminar AI","Topaz Labs","Lightroom AI","Photoshop AI","Illustrator AI"],
  "Video & Media": ["Loom","Descript","Synthesia","HeyGen","Colossyan","Tavus","Opus Clip","Vidyo.ai","Gling","Captions.ai","Veed.io","Kapwing","InVideo","Pictory","Steve.ai","Deepbrain","Elai.io","Rephrase.ai","Wisecut","Submagic","Munch","Vizard","Type Studio","Podcastle","Riverside.fm","Cleanvoice","Adobe Podcast","Auphonic","Eleven Labs","Murf"],
  "Analytics & BI": ["Google Analytics","Mixpanel","Amplitude","Heap","Segment","PostHog","Hotjar","FullStory","Mouseflow","Crazy Egg","Looker","Tableau","Power BI","Metabase","Redash","Superset","Grafana","Chartio","Mode","Sisense","Domo","Qlik","ThoughtSpot","GoodData","Cluvio"],
  "SEO & Growth": ["Semrush","Ahrefs","Moz","Surfer SEO","Clearscope","MarketMuse","Frase","Mangools","SE Ranking","Serpstat","SpyFu","Majestic","Ubersuggest","Keywords Everywhere","Screaming Frog","Sitebulb","Botify","ContentKing","BrightEdge","Conductor","Searchmetrics","Ryte","Oncrawl","DeepCrawl","Authority Labs"],
  "HR & Recruiting": ["Greenhouse","Lever","Workday","BambooHR","Rippling","Gusto","Lattice","Culture Amp","15Five","Leapsome","Manatal","Workable","Recruitee","Breezy HR","JazzHR","Teamtailor","Ashby","Dover","Beamery","Eightfold","HireVue","Pymetrics","Paradox","Fetcher","Gem"],
  "Finance & Accounting": ["Xero","QuickBooks","FreshBooks","Wave","Sage","Brex","Ramp","Airbase","Expensify","Divvy","Bill.com","Tipalti","Stripe","Chargebee","Recurly","Paddle","Maxio","ProfitWell","ChartMogul","Baremetrics","Mosaic","Runway","Forecastr","Causal","Pigment"],
  "Meetings & Productivity": ["Otter.ai","Fireflies","Grain","Gong","Chorus","Fathom","Avoma","Krisp","Laxis","tl;dv","Reclaim","Motion","Clockwise","Calendly","Cal.com","Doodle","SavvyCal","Zoom","Google Meet","Microsoft Teams","Slack","Discord","Gather","Around","Mmhmm"],
  "Data & Databases": ["Airtable","NocoDB","Baserow","Rows","Retool","Appsmith","Budibase","Directus","Supabase","Firebase","PlanetScale","Neon","Turso","MongoDB Atlas","Pinecone","Weaviate","Chroma","Qdrant","Milvus","Zilliz"],
  "No-Code / Low-Code": ["Bubble","Webflow","Framer","Softr","Glide","AppGyver","Adalo","Thunkable","Bravo Studio","FlutterFlow","WeWeb","Xano","Backendless","DronaHQ","Appian","Mendix","OutSystems","Creatio","Betty Blocks","Caspio"],
  "Security & Compliance": ["1Password","Bitwarden","LastPass","Dashlane","Keeper","NordPass","Vanta","Drata","Secureframe","Tugboat Logic","Laika","Strike Graph","Lacework","Wiz","Snyk","Veracode","Checkmarx","SonarQube","GitGuardian","Cycode"],
  "Communication": ["Slack","Microsoft Teams","Discord","Notion","Lark","Google Workspace","Zoom","Whereby","Jitsi","Webex","RingCentral","Vonage","Twilio","MessageBird","Sinch","Braze","OneSignal","Pushwoosh","Airship","CleverTap"],
  "E-commerce & Payments": ["Shopify","WooCommerce","BigCommerce","Magento","Squarespace","Wix","Stripe","PayPal","Square","Braintree","Adyen","Klarna","Afterpay","Affirm","Sezzle","Gorgias","Yotpo","Okendo","Stamped","LoyaltyLion"],
};

const ALL_TOOL_CATEGORIES = Object.keys(TOOL_CATALOG);

// ─── Tool Picker Component ─────────────────────────────────────────────────
function ToolPicker({ selected, onChange }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const selectedArr = selected ? selected.split(",").map(s => s.trim()).filter(Boolean) : [];

  const toggle = (tool) => {
    const arr = selectedArr.includes(tool)
      ? selectedArr.filter(t => t !== tool)
      : [...selectedArr, tool];
    onChange(arr.join(", "));
  };

  const filteredTools = () => {
    let tools = [];
    if (activeCategory === "All") {
      tools = Object.entries(TOOL_CATALOG).flatMap(([cat, list]) => list.map(t => ({ name: t, cat })));
    } else {
      tools = (TOOL_CATALOG[activeCategory] || []).map(t => ({ name: t, cat: activeCategory }));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      tools = tools.filter(t => t.name.toLowerCase().includes(q));
    }
    return tools;
  };

  const visible = filteredTools();
  const cats = ["All", ...ALL_TOOL_CATEGORIES];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div style={{ position:"relative" }}>
        <input
          style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:10, padding:"12px 16px 12px 40px", fontSize:14, color:"#f0f0f0", fontFamily:M, width:"100%", boxSizing:"border-box", transition:"border-color 0.2s" }}
          placeholder="Search tools... e.g. Zapier, HubSpot, Notion"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#555", fontSize:14 }}>🔍</span>
        {search && <button onClick={() => setSearch("")} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"transparent", border:"none", color:"#555", cursor:"pointer", fontSize:16, padding:0 }}>×</button>}
      </div>

      <div style={{ position:"relative" }}>
        <select
          value={activeCategory}
          onChange={e => setActiveCategory(e.target.value)}
          style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:10, padding:"12px 40px 12px 16px", fontSize:13, color:"#f0f0f0", fontFamily:M, width:"100%", appearance:"none", cursor:"pointer", transition:"border-color 0.2s" }}
        >
          {cats.map(cat => (
            <option key={cat} value={cat} style={{ background:"#111", color:"#f0f0f0" }}>
              {cat === "All" ? `All Categories (${Object.values(TOOL_CATALOG).flat().length} tools)` : `${cat} (${TOOL_CATALOG[cat]?.length || 0})`}
            </option>
          ))}
        </select>
        <div style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#00E5A0", fontSize:12 }}>▾</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(130px, 1fr))", gap:6, maxHeight:280, overflowY:"auto", padding:"4px 2px", scrollbarWidth:"thin", scrollbarColor:"#222 transparent" }}>
        {visible.length === 0 ? (
          <div style={{ gridColumn:"1/-1", padding:"32px", textAlign:"center", color:"#555", fontSize:13 }}>No tools found for "{search}"</div>
        ) : visible.map(({ name }) => {
          const isSelected = selectedArr.includes(name);
          return (
            <button key={name} onClick={() => toggle(name)}
              style={{ padding:"8px 10px", borderRadius:8, border:"1px solid", fontSize:12, cursor:"pointer", fontFamily:M, textAlign:"left", transition:"all 0.15s", lineHeight:1.3,
                background: isSelected ? "#00E5A015" : "#0e0e0e",
                borderColor: isSelected ? "#00E5A0" : "#1e1e1e",
                color: isSelected ? "#00E5A0" : "#ccc",
                fontWeight: isSelected ? 500 : 400,
              }}>
              {isSelected && <span style={{ marginRight:4 }}>✓</span>}{name}
            </button>
          );
        })}
      </div>

      {selectedArr.length > 0 && (
        <div style={{ background:"#0a1a0f", border:"1px solid #0e2318", borderRadius:10, padding:"12px 14px", display:"flex", flexWrap:"wrap", gap:6, alignItems:"center" }}>
          <span style={{ fontSize:10, color:"#00E5A0", letterSpacing:2, marginRight:4 }}>{selectedArr.length} SELECTED:</span>
          {selectedArr.map(t => (
            <span key={t} style={{ background:"#00E5A015", border:"1px solid #00E5A030", borderRadius:100, padding:"3px 10px", fontSize:11, color:"#00E5A0", display:"flex", alignItems:"center", gap:6 }}>
              {t}
              <button onClick={() => toggle(t)} style={{ background:"transparent", border:"none", color:"#00E5A070", cursor:"pointer", padding:0, fontSize:13, lineHeight:1 }}>×</button>
            </span>
          ))}
          <button onClick={() => onChange("")} style={{ marginLeft:"auto", background:"transparent", border:"none", color:"#555", cursor:"pointer", fontSize:11, fontFamily:M }}>Clear all</button>
        </div>
      )}
      {selectedArr.length === 0 && (
        <p style={{ margin:0, fontSize:11, color:"#555", fontFamily:M }}>No tools selected — select any tools you are currently paying for, or skip if none.</p>
      )}
    </div>
  );
}

// ─── API ───────────────────────────────────────────────────────────────────
async function getRecommendations(formData, currency) {
  const sym = currency.symbol;
  const code = currency.code;
  const prompt = `You are a world-class AI business advisor and CFO consultant. A founder has shared their business details. Analyse deeply and respond ONLY with a valid JSON object — no markdown, no backticks, no explanation.

Founder Profile:
- Currency: ${code} (symbol: ${sym})
- Revenue / Funding Stage: ${formData.revenue}
- Team Size: ${formData.team}
- Primary Business Challenge: ${formData.pain}
- Monthly AI Tooling Budget: ${formData.budget}
- Current Tools Being Paid For: ${formData.tools || 'None selected'}

CRITICAL CURRENCY RULE: Every single monetary value in your response MUST be in ${code} (${sym}). Convert from USD using real exchange rates. INR example: $49 = ₹4,100. Be precise.

Return exactly this JSON structure:
{
  "summary": "2 sharp sentences summarising their exact situation and single biggest opportunity right now",
  "stageContext": "1 sentence describing what a business at this revenue/funding stage typically struggles with",
  "wastedSpend": "${sym}X/mo",
  "potentialROI": "+${sym}X/mo",
  "runway_impact": "estimate % reduction in operating costs or extra months of runway",
  "cashBurners": [
    { "area": "Business function", "estimatedLoss": "${sym}X/mo", "reason": "Specific explanation", "urgency": "HIGH" }
  ],
  "recommendations": [
    { "name": "Tool Name", "category": "Category", "price": "${sym}X/mo", "action": "BUY", "roi": "+${sym}X/mo", "roiDetail": "Specific quantified reason", "paybackPeriod": "X weeks", "matchScore": 95, "priority": 1 }
  ],
  "cancelTools": [
    { "name": "Tool Name", "category": "Category", "price": "${sym}X/mo", "action": "CANCEL", "roi": "-${sym}X/mo", "roiDetail": "Exact reason why this tool is waste", "matchScore": 10, "priority": 99 }
  ],
  "implementationRoadmap": [
    { "week": "Week 1-2", "action": "Specific first action", "outcome": "What this unlocks" },
    { "week": "Week 3-4", "action": "Second action", "outcome": "What this unlocks" },
    { "week": "Month 2", "action": "Third action", "outcome": "What this unlocks" },
    { "week": "Month 3", "action": "Final action", "outcome": "Full stack running" }
  ],
  "insight": "One razor-sharp expert insight specific to their challenge"
}

Rules:
- Exactly 4 BUY recommendations, up to 2 CANCEL (only tools they actually mentioned)
- cashBurners: exactly 3 areas
- All amounts in ${code}
- matchScore 0-100, priority 1 = implement first
- Be brutally specific`;

  const OPENROUTER_KEY = (typeof window !== "undefined" && window.__OPENROUTER_KEY__)
    || (typeof process !== "undefined" && process.env && (process.env.REACT_APP_OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY))
    || "";

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENROUTER_KEY}`,
      "HTTP-Referer": "https://stackorbit.vercel.app",
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct:free",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
    }),
  });

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || "";
  if (!raw) throw new Error("Empty response");
  return JSON.parse(raw.replace(/```json|```/g, "").trim());
}

// ─── PDF Generator ────────────────────────────────────────────────────────
function generatePDF(result, user, currency) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210, M = 16, CW = W - M * 2;
  let y = 0;

  const accent = [0, 229, 160];
  const red = [255, 92, 92];
  const dark = [10, 10, 10];
  const mid = [140, 140, 140];
  const light = [220, 220, 220];

  const addPage = () => { doc.addPage(); y = M; };
  const check = (h = 20) => { if (y + h > 270) addPage(); };

  doc.setFillColor(...accent);
  doc.rect(0, 0, W, 18, "F");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(13); doc.setFont("helvetica","bold");
  doc.text("◈ STACKORBIT", M, 12);
  doc.setFontSize(8); doc.setFont("helvetica","normal");
  doc.text("AI Stack Intelligence Report", W - M, 12, { align:"right" });
  y = 26;

  doc.setTextColor(...dark);
  doc.setFontSize(9); doc.setFont("helvetica","bold");
  doc.setTextColor(...accent);
  doc.text("PERSONALISED REPORT FOR " + (user?.name || "").toUpperCase(), M, y); y += 7;
  doc.setTextColor(...dark);
  doc.setFontSize(20); doc.setFont("helvetica","bold");
  doc.text("Your AI Stack Report", M, y); y += 8;
  doc.setFontSize(9); doc.setFont("helvetica","normal");
  doc.setTextColor(...mid);
  doc.text(`Sent to ${user?.email}  ·  Currency: ${currency.symbol} ${currency.code}  ·  ${new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}`, M, y); y += 10;

  doc.setDrawColor(30,30,30); doc.setLineWidth(0.3);
  doc.line(M, y, W - M, y); y += 8;

  if (result.stageContext) {
    doc.setFontSize(8); doc.setFont("helvetica","bold");
    doc.setTextColor(...accent);
    const sc = doc.splitTextToSize(result.stageContext.toUpperCase(), CW);
    doc.text(sc, M, y); y += sc.length * 4 + 4;
  }

  doc.setFontSize(10); doc.setFont("helvetica","normal");
  doc.setTextColor(...dark);
  const sumLines = doc.splitTextToSize(result.summary || "", CW);
  doc.text(sumLines, M, y); y += sumLines.length * 5 + 6;

  check(24);
  const boxes = [
    { label:"POTENTIAL MONTHLY ROI", val: result.potentialROI, color: accent },
    { label:"CURRENT WASTED SPEND",  val: result.wastedSpend,  color: red },
    { label:"RUNWAY / COST IMPACT",  val: result.runway_impact || "See roadmap", color: [255,181,71] },
  ];
  const bw = CW / 3 - 3;
  boxes.forEach((b, i) => {
    const bx = M + i * (bw + 4.5);
    doc.setFillColor(18, 18, 18); doc.setDrawColor(30,30,30);
    doc.roundedRect(bx, y, bw, 20, 2, 2, "FD");
    doc.setFontSize(13); doc.setFont("helvetica","bold"); doc.setTextColor(...b.color);
    doc.text(b.val || "—", bx + bw/2, y + 10, { align:"center", maxWidth: bw - 4 });
    doc.setFontSize(6); doc.setFont("helvetica","normal"); doc.setTextColor(...mid);
    doc.text(b.label, bx + bw/2, y + 17, { align:"center" });
  });
  y += 28;

  if (result.cashBurners?.length > 0) {
    check(12);
    doc.setFontSize(8); doc.setFont("helvetica","bold"); doc.setTextColor(...red);
    doc.text("WHERE YOUR CASH IS BURNING", M, y); y += 7;
    result.cashBurners.forEach(b => {
      check(18);
      doc.setFillColor(20, 10, 10); doc.setDrawColor(60,20,20);
      doc.roundedRect(M, y, CW, 16, 2, 2, "FD");
      doc.setFillColor(...red); doc.rect(M, y, 2, 16, "F");
      doc.setFontSize(9); doc.setFont("helvetica","bold"); doc.setTextColor(...red);
      doc.text(b.area, M + 6, y + 6);
      doc.setFontSize(7); doc.setFont("helvetica","normal"); doc.setTextColor(...mid);
      const r = doc.splitTextToSize(b.reason, CW - 50);
      doc.text(r[0] || "", M + 6, y + 12);
      doc.setFontSize(10); doc.setFont("helvetica","bold"); doc.setTextColor(...red);
      doc.text(b.estimatedLoss, W - M - 2, y + 9, { align:"right" });
      doc.setFontSize(6); doc.setFont("helvetica","normal"); doc.setTextColor(...mid);
      doc.text("EST. MONTHLY LOSS", W - M - 2, y + 13, { align:"right" });
      y += 20;
    });
    y += 4;
  }

  check(20);
  doc.setFillColor(9,15,12); doc.setDrawColor(14,35,24);
  const insightLines = doc.splitTextToSize("Expert insight: " + (result.insight || ""), CW - 8);
  doc.roundedRect(M, y, CW, insightLines.length * 5 + 10, 2, 2, "FD");
  doc.setFontSize(9); doc.setFont("helvetica","normal"); doc.setTextColor(106,170,133);
  doc.text(insightLines, M + 4, y + 7); y += insightLines.length * 5 + 16;

  check(12);
  doc.setFontSize(8); doc.setFont("helvetica","bold"); doc.setTextColor(...accent);
  doc.text("RECOMMENDED AI STACK  ·  IN PRIORITY ORDER", M, y); y += 8;

  const all = [...(result.recommendations||[]),...(result.cancelTools||[])];
  all.forEach(tool => {
    const buy = tool.action === "BUY";
    const col = buy ? accent : red;
    check(30);
    doc.setFillColor(13,13,13); doc.setDrawColor(24,24,24);
    doc.roundedRect(M, y, CW, 28, 2, 2, "FD");
    doc.setFillColor(...col); doc.rect(M, y, 2, 28, "F");
    doc.setFontSize(11); doc.setFont("helvetica","bold"); doc.setTextColor(...light);
    doc.text(tool.name, M + 6, y + 8);
    doc.setFontSize(7); doc.setFont("helvetica","normal"); doc.setTextColor(...mid);
    doc.text(tool.category, M + 6, y + 13);
    const detail = doc.splitTextToSize(tool.roiDetail || "", CW - 60);
    doc.text(detail[0] || "", M + 6, y + 19);
    if (detail[1]) doc.text(detail[1], M + 6, y + 23);
    doc.setFontSize(8); doc.setFont("helvetica","bold");
    doc.setTextColor(...col);
    doc.text(tool.action, W - M - 2, y + 7, { align:"right" });
    doc.setTextColor(...light); doc.text(tool.roi, W - M - 2, y + 13, { align:"right" });
    doc.setTextColor(...mid); doc.setFont("helvetica","normal"); doc.setFontSize(7);
    doc.text(tool.price, W - M - 2, y + 18, { align:"right" });
    if (tool.paybackPeriod) doc.text("Payback: " + tool.paybackPeriod, W - M - 2, y + 23, { align:"right" });
    y += 32;
  });

  if (result.implementationRoadmap?.length > 0) {
    check(16);
    doc.setFontSize(8); doc.setFont("helvetica","bold"); doc.setTextColor(...accent);
    doc.text("IMPLEMENTATION ROADMAP", M, y); y += 8;
    result.implementationRoadmap.forEach((r, i) => {
      check(16);
      doc.setFontSize(8); doc.setFont("helvetica","bold"); doc.setTextColor(...accent);
      doc.text(r.week, M, y);
      doc.setFont("helvetica","normal"); doc.setTextColor(...light);
      doc.text(r.action, M + 26, y);
      doc.setTextColor(...mid); doc.setFontSize(7);
      doc.text("-> " + r.outcome, M + 26, y + 5);
      if (i < result.implementationRoadmap.length - 1) {
        doc.setDrawColor(22,22,22); doc.line(M, y + 9, W - M, y + 9);
      }
      y += 13;
    });
  }

  const pages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    doc.setFontSize(7); doc.setFont("helvetica","normal"); doc.setTextColor(...mid);
    doc.text(`StackOrbit  ·  AI Stack Intelligence  ·  stackorbit.io  ·  Page ${p} of ${pages}`, W/2, 290, { align:"center" });
  }

  return doc;
}

function downloadPDF(result, user, currency) {
  const doc = generatePDF(result, user, currency);
  doc.save(`StackOrbit-AI-Stack-Report-${user?.name?.replace(/\s+/g,"-") || "Report"}.pdf`);
}

function emailReport(result, user, currency) {
  const subject = encodeURIComponent("Your StackOrbit AI Stack Report");
  const body = encodeURIComponent(
    `Hi ${user?.name},\n\nYour personalised AI Stack Report from StackOrbit is ready.\n\nKey findings:\n- Potential Monthly ROI: ${result.potentialROI}\n- Current Wasted Spend: ${result.wastedSpend}\n\nTop recommendation: ${result.recommendations?.[0]?.name} — ${result.recommendations?.[0]?.roiDetail}\n\nExpert insight: ${result.insight}\n\n— StackOrbit AI Stack Intelligence\nstackorbit.io`
  );
  window.open(`mailto:${user?.email}?subject=${subject}&body=${body}`);
}

// ─── Global Styles ─────────────────────────────────────────────────────────
function GS() {
  useEffect(() => {
    if (!document.getElementById("jspdf-script")) {
      const s = document.createElement("script");
      s.id = "jspdf-script";
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      document.head.appendChild(s);
    }
  }, []);
  return <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; background: #060606; }
    input, textarea, select { outline: none; }
    input::placeholder, textarea::placeholder { color: #444 !important; }
    input:focus, textarea:focus, select:focus { border-color: #00E5A0 !important; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.5; } }
    .fu { animation: fadeUp 0.4s ease both; }
    .card-hover:hover { transform: translateY(-2px); transition: transform 0.2s; }
  `}</style>;
}

// ─── Landing Page ──────────────────────────────────────────────────────────
function Landing({ onStart }) {
  return (
    <div style={{ background:"#060606", fontFamily:M, color:"#fff", minHeight:"100vh" }}>
      <GS />
      <nav style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 40px", borderBottom:"1px solid #111", position:"sticky", top:0, background:"#060606", zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ color:"#00E5A0", fontSize:20 }}>◈</span>
          <span style={{ fontSize:16, letterSpacing:3, color:"#fff" }}>StackOrbit</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:28 }}>
          <a href="#how" style={{ color:"#888", fontSize:12, letterSpacing:1, textDecoration:"none" }}>How it works</a>
          <a href="#usecases" style={{ color:"#888", fontSize:12, letterSpacing:1, textDecoration:"none" }}>Use cases</a>
          <a href="#reviews" style={{ color:"#888", fontSize:12, letterSpacing:1, textDecoration:"none" }}>Reviews</a>
          <button onClick={onStart} style={{ background:"#00E5A0", color:"#000", border:"none", borderRadius:8, padding:"10px 20px", fontSize:12, fontWeight:500, cursor:"pointer", fontFamily:M, letterSpacing:1 }}>
            Get My Report →
          </button>
        </div>
      </nav>

      <section style={{ maxWidth:900, margin:"0 auto", padding:"100px 40px 80px", textAlign:"center" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#0a1a0f", border:"1px solid #0e2a18", borderRadius:100, padding:"7px 16px", marginBottom:32 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:"#00E5A0", display:"inline-block", animation:"pulse 2s infinite" }} />
          <span style={{ fontSize:11, color:"#00E5A0", letterSpacing:2 }}>STACKORBIT · AI STACK INTELLIGENCE</span>
        </div>
        <h1 style={{ fontSize:56, fontFamily:F, fontWeight:"normal", lineHeight:1.15, margin:"0 0 24px", color:"#fff" }}>
          StackOrbit gives your business<br />
          <em style={{ color:"#00E5A0" }}>the AI stack it actually needs.</em>
        </h1>
        <p style={{ fontSize:18, color:"#999", lineHeight:1.7, maxWidth:580, margin:"0 auto 48px", fontFamily:F }}>
          Answer 5 questions. Get a personalised AI stack with exact ROI projections — built for your revenue stage, team size, and biggest challenge.
        </p>
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:16, flexWrap:"wrap" }}>
          <button onClick={onStart} style={{ background:"#00E5A0", color:"#000", border:"none", borderRadius:10, padding:"18px 36px", fontSize:15, fontWeight:500, cursor:"pointer", fontFamily:M, letterSpacing:0.5 }}>
            Build My AI Stack →
          </button>
          <span style={{ fontSize:12, color:"#555" }}>Free · 2 minutes · No sign-up required</span>
        </div>
      </section>

      <section style={{ borderTop:"1px solid #111", borderBottom:"1px solid #111", padding:"40px 40px" }}>
        <div style={{ maxWidth:800, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign:"center", padding:"20px", borderRight: i < 3 ? "1px solid #111" : "none" }}>
              <p style={{ margin:0, fontSize:32, color:"#fff", fontFamily:F, fontWeight:"normal" }}>{s.val}</p>
              <p style={{ margin:"6px 0 0", fontSize:11, color:"#666", letterSpacing:1.5, textTransform:"uppercase" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" style={{ maxWidth:800, margin:"0 auto", padding:"100px 40px" }}>
        <p style={{ fontSize:10, color:"#00E5A0", letterSpacing:3, textTransform:"uppercase", margin:"0 0 16px" }}>HOW IT WORKS</p>
        <h2 style={{ fontSize:38, fontFamily:F, fontWeight:"normal", margin:"0 0 56px", color:"#fff" }}>Three steps to your AI stack.</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
          {HOW_IT_WORKS.map((h, i) => (
            <div key={i} style={{ display:"flex", gap:32, padding:"36px 0", borderBottom: i < HOW_IT_WORKS.length-1 ? "1px solid #111" : "none", alignItems:"flex-start" }}>
              <span style={{ fontSize:40, color:"#1a1a1a", fontFamily:F, flexShrink:0, lineHeight:1 }}>{h.step}</span>
              <div>
                <p style={{ margin:"0 0 8px", fontSize:20, color:"#fff", fontFamily:F, fontWeight:"normal" }}>{h.title}</p>
                <p style={{ margin:0, fontSize:14, color:"#888", lineHeight:1.7 }}>{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="usecases" style={{ background:"#080808", borderTop:"1px solid #111", borderBottom:"1px solid #111", padding:"100px 40px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <p style={{ fontSize:10, color:"#00E5A0", letterSpacing:3, textTransform:"uppercase", margin:"0 0 16px" }}>USE CASES</p>
          <h2 style={{ fontSize:38, fontFamily:F, fontWeight:"normal", margin:"0 0 56px", color:"#fff" }}>Built for every type of founder.</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {USE_CASES.map((u, i) => (
              <div key={i} className="card-hover" style={{ background:"#0c0c0c", border:"1px solid #161616", borderRadius:14, padding:"28px 24px", display:"flex", flexDirection:"column", gap:14 }}>
                <span style={{ fontSize:28 }}>{u.icon}</span>
                <p style={{ margin:0, fontSize:17, color:"#f0f0f0", fontFamily:F, fontWeight:"normal" }}>{u.title}</p>
                <p style={{ margin:0, fontSize:13, color:"#888", lineHeight:1.7 }}>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" style={{ maxWidth:960, margin:"0 auto", padding:"100px 40px" }}>
        <p style={{ fontSize:10, color:"#00E5A0", letterSpacing:3, textTransform:"uppercase", margin:"0 0 16px" }}>FOUNDER REVIEWS</p>
        <h2 style={{ fontSize:38, fontFamily:F, fontWeight:"normal", margin:"0 0 56px", color:"#fff" }}>What founders are saying.</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} className="card-hover" style={{ background:"#0a0a0a", border:"1px solid #141414", borderRadius:14, padding:"26px 24px", display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ display:"flex", gap:3 }}>
                {Array(r.stars).fill(0).map((_, j) => <span key={j} style={{ color:"#00E5A0", fontSize:13 }}>★</span>)}
              </div>
              <p style={{ margin:0, fontSize:14, color:"#ccc", lineHeight:1.75, fontFamily:F, fontStyle:"italic" }}>"{r.text}"</p>
              <div style={{ marginTop:"auto", paddingTop:12, borderTop:"1px solid #111" }}>
                <p style={{ margin:0, fontSize:13, color:"#f0f0f0", fontWeight:500 }}>{r.name}</p>
                <p style={{ margin:"3px 0 0", fontSize:11, color:"#666", letterSpacing:0.5 }}>{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background:"#0a1a0f", borderTop:"1px solid #0e2318", borderBottom:"1px solid #0e2318", padding:"80px 40px", textAlign:"center" }}>
        <h2 style={{ fontSize:42, fontFamily:F, fontWeight:"normal", margin:"0 0 16px", color:"#fff" }}>Ready to build your AI stack?</h2>
        <p style={{ fontSize:16, color:"#888", margin:"0 0 40px", fontFamily:F }}>Free. Personalised. Takes 2 minutes.</p>
        <button onClick={onStart} style={{ background:"#00E5A0", color:"#000", border:"none", borderRadius:10, padding:"18px 40px", fontSize:15, fontWeight:500, cursor:"pointer", fontFamily:M, letterSpacing:0.5 }}>
          Get My AI Stack Report →
        </button>
      </section>

      <footer style={{ padding:"32px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid #0e0e0e" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ color:"#00E5A0" }}>◈</span>
          <span style={{ fontSize:13, color:"#666", letterSpacing:2 }}>StackOrbit</span>
        </div>
        <p style={{ margin:0, fontSize:11, color:"#333" }}>Results are AI-generated estimates · May include affiliate links</p>
      </footer>
    </div>
  );
}

// ─── Email Gate ────────────────────────────────────────────────────────────
function EmailGate({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus(); }, []);
  const submit = () => {
    if (!name.trim()) { setErr("Please enter your name."); return; }
    if (!email.includes("@") || !email.includes(".")) { setErr("Please enter a valid email."); return; }
    onSubmit({ name: name.trim(), email: email.trim() });
  };
  return (
    <div style={{ background:"#0b0b0b", border:"1px solid #1c1c1c", borderRadius:18, padding:"44px 40px", display:"flex", flexDirection:"column", gap:16, maxWidth:420, width:"100%" }}>
      <div style={{ fontSize:26, color:"#00E5A0", textAlign:"center" }}>◈</div>
      <h2 style={{ margin:0, fontSize:28, color:"#fff", fontFamily:F, fontWeight:"normal", textAlign:"center", lineHeight:1.3 }}>Your report is ready.</h2>
      <p style={{ margin:0, fontSize:14, color:"#888", textAlign:"center", lineHeight:1.65 }}>Enter your details to unlock your personalised AI stack.</p>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:6 }}>
        <input ref={ref} style={{ background:"#111", border:"1px solid #1e1e1e", borderRadius:10, padding:"14px 16px", fontSize:15, color:"#f0f0f0", fontFamily:M, width:"100%", transition:"border-color 0.2s" }} placeholder="Your first name" value={name} onChange={e => { setName(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && submit()} />
        <input style={{ background:"#111", border:"1px solid #1e1e1e", borderRadius:10, padding:"14px 16px", fontSize:15, color:"#f0f0f0", fontFamily:M, width:"100%", transition:"border-color 0.2s" }} placeholder="Work email address" type="email" value={email} onChange={e => { setEmail(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && submit()} />
      </div>
      {err && <p style={{ margin:0, color:"#FF5C5C", fontSize:13 }}>{err}</p>}
      <button style={{ background:"#00E5A0", color:"#000", border:"none", borderRadius:10, padding:"15px", fontSize:14, fontWeight:500, cursor:"pointer", fontFamily:M, letterSpacing:0.5, marginTop:4 }} onClick={submit}>Unlock My Report →</button>
      <p style={{ margin:0, fontSize:11, color:"#555", textAlign:"center" }}>No spam. No sales calls. Just your report.</p>
    </div>
  );
}

// ─── Tool Card ─────────────────────────────────────────────────────────────
function ToolCard({ tool, locked }) {
  const buy = tool.action === "BUY";
  const accent = buy ? "#00E5A0" : "#FF5C5C";
  return (
    <div style={{ background:"#0b0b0b", border:"1px solid #181818", borderLeft:`3px solid ${locked?"#181818":accent}`, borderRadius:12, padding:"22px 24px", display:"flex", flexDirection:"column", gap:14, filter:locked?"blur(5px)":"none", userSelect:locked?"none":"auto", pointerEvents:locked?"none":"auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:34, height:34, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:500, border:`1px solid ${accent}33`, background:`${accent}0e`, color:accent, flexShrink:0, fontFamily:M }}>
            {buy ? `0${tool.priority}` : "✕"}
          </div>
          <div>
            <p style={{ margin:0, fontSize:17, color:"#f2f2f2", fontFamily:F, fontWeight:"normal" }}>{tool.name}</p>
            <p style={{ margin:"3px 0 0", fontSize:10, color:"#999", letterSpacing:2, textTransform:"uppercase" }}>{tool.category}</p>
          </div>
        </div>
        <span style={{ padding:"5px 10px", borderRadius:4, fontSize:9, letterSpacing:2, fontWeight:500, color:accent, background:`${accent}12`, flexShrink:0 }}>{tool.action}</span>
      </div>
      <div style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
        {[{ label:"Monthly Cost", val:tool.price, color:"#d0d0d0" },{ label:"ROI Impact", val:tool.roi, color:accent },{ label:"Fit Score", val:`${tool.matchScore}%`, color:"#d0d0d0" }, ...(tool.paybackPeriod ? [{ label:"Payback Period", val:tool.paybackPeriod, color:"#FFB547" }] : [])].map((m,i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", gap:4 }}>
            <p style={{ margin:0, fontSize:9, color:"#999", letterSpacing:2, textTransform:"uppercase" }}>{m.label}</p>
            <p style={{ margin:0, fontSize:16, color:m.color }}>{m.val}</p>
          </div>
        ))}
      </div>
      <div style={{ height:2, background:"#141414", borderRadius:2, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${tool.matchScore}%`, background:accent, borderRadius:2, transition:"width 1.3s ease" }} />
      </div>
      <p style={{ margin:0, fontSize:14, color:"#aaa", lineHeight:1.65 }}>{tool.roiDetail}</p>
      {buy && <a href={getLink(tool.name)} target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", border:`1px solid ${accent}33`, color:accent, borderRadius:7, padding:"10px 16px", fontSize:12, textDecoration:"none", alignSelf:"flex-start", fontFamily:M }}>Try {tool.name} →</a>}
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────
export default function StackOrbit() {
  const [phase, setPhase] = useState("landing");
  const [revenueTab, setRevenueTab] = useState(0);
  const [emailSent, setEmailSent] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ revenue:"", team:"", pain:"", budget:"", tools:"" });
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [result, setResult] = useState(null);
  const [user, setUser] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [loadMsg, setLoadMsg] = useState("Reading your business profile...");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const FIELDS = getFields(currency.symbol);

  useEffect(() => { if (phase==="form") inputRef.current?.focus(); }, [step, phase]);

  useEffect(() => {
    if (phase !== "loading") return;
    const msgs = ["Reading your business profile...","StackOrbit scanning 200+ AI tools...","Calculating ROI projections...","Building your personalised stack..."];
    let i = 0;
    const t = setInterval(() => { i++; if (i < msgs.length) setLoadMsg(msgs[i]); }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  const field = FIELDS[step];
  const val = form[field?.key] || "";

  const handleNext = async () => {
    if (step < FIELDS.length-1) { setStep(s=>s+1); return; }
    setPhase("loading"); setError("");
    try {
      const data = await getRecommendations(form, currency);
      setResult(data);
      setPhase("gate");
    } catch(e) {
      console.error("API error:", e);
      setError("Something went wrong — please try again.");
      setPhase("form");
    }
  };

  const reset = () => { setPhase("landing"); setStep(0); setForm({revenue:"",team:"",pain:"",budget:"",tools:""}); setResult(null); setUser(null); setIsPaid(false); setCurrency(CURRENCIES[0]); setRevenueTab(0); setEmailSent(false); };

  const centered = { minHeight:"100vh", background:"#060606", display:"flex", alignItems:"center", justifyContent:"center", padding:"32px 20px", fontFamily:M };

  if (phase === "landing") return <Landing onStart={() => setPhase("form")} />;

  if (phase === "loading") return (
    <div style={centered}><GS />
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
        <div style={{ width:48, height:48, borderRadius:"50%", border:"2px solid #161616", borderTopColor:"#00E5A0", animation:"spin 0.85s linear infinite" }} />
        <p style={{ margin:0, fontSize:22, color:"#fff", fontFamily:F, fontWeight:"normal" }}>{loadMsg}</p>
        <p style={{ margin:0, fontSize:12, color:"#888", letterSpacing:2 }}>Analysing your exact business situation</p>
      </div>
    </div>
  );

  if (phase === "gate") return (
    <div style={centered}><GS /><EmailGate onSubmit={u => { setUser(u); setPhase("report"); }} /></div>
  );

  if (phase === "report" && result) {
    const all = [...(result.recommendations||[]),...(result.cancelTools||[])];
    return (
      <div style={{ ...centered, alignItems:"flex-start" }}><GS />
        <div style={{ width:"100%", maxWidth:720, display:"flex", flexDirection:"column", gap:22, paddingBottom:60 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:8, flexWrap:"wrap", gap:10 }}>
            <div style={{ fontSize:15, color:"#00E5A0", letterSpacing:3 }}>◈ StackOrbit</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <button onClick={() => downloadPDF(result, user, currency)} style={{ background:"#00E5A0", color:"#000", border:"none", borderRadius:8, padding:"9px 16px", fontSize:11, fontWeight:500, cursor:"pointer", fontFamily:M, letterSpacing:0.5 }}>⬇ Download PDF</button>
              <button onClick={() => { setEmailSent(true); emailReport(result, user, currency); }} style={{ background: emailSent ? "#0a1a0f" : "#0e0e0e", color: emailSent ? "#00E5A0" : "#888", border:"1px solid", borderColor: emailSent ? "#0e2318" : "#1a1a1a", borderRadius:8, padding:"9px 16px", fontSize:11, cursor:"pointer", fontFamily:M, letterSpacing:0.5 }}>
                {emailSent ? "✓ Email Sent" : "✉ Email Report"}
              </button>
              <button style={{ background:"transparent", border:"1px solid #1a1a1a", color:"#555", borderRadius:8, padding:"9px 14px", fontSize:11, cursor:"pointer", fontFamily:M, letterSpacing:1 }} onClick={reset}>← Home</button>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6, paddingTop:6 }}>
            <p style={{ margin:0, fontSize:10, color:"#00E5A0", letterSpacing:3 }}>REPORT FOR {user?.name?.toUpperCase()}</p>
            <h1 style={{ margin:0, fontSize:36, color:"#fff", fontFamily:F, fontWeight:"normal" }}>Your AI Stack Report</h1>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <p style={{ margin:0, fontSize:13, color:"#888" }}>Sent to {user?.email}</p>
              <span style={{ background:"#0a1a0f", border:"1px solid #0e2318", borderRadius:100, padding:"3px 10px", fontSize:10, color:"#00E5A0", letterSpacing:1 }}>{currency.symbol} {currency.code}</span>
            </div>
          </div>

          <div style={{ background:"#0c0c0c", border:"1px solid #181818", borderRadius:14, padding:"26px 28px", display:"flex", flexDirection:"column", gap:20 }}>
            {result.stageContext && <p style={{ margin:0, fontSize:12, color:"#00E5A0", letterSpacing:1, textTransform:"uppercase", borderBottom:"1px solid #161616", paddingBottom:12 }}>{result.stageContext}</p>}
            <p style={{ margin:0, fontSize:16, color:"#c8c8c8", lineHeight:1.8, fontFamily:F }}>{result.summary}</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
              {[
                {label:"Potential Monthly ROI", val:result.potentialROI, color:"#00E5A0", icon:"↑"},
                {label:"Current Wasted Spend", val:result.wastedSpend, color:"#FF5C5C", icon:"↓"},
                {label:"Runway / Cost Impact", val:result.runway_impact || "See below", color:"#FFB547", icon:"⏱", small:true},
              ].map((s,i)=>(
                <div key={i} style={{ background:"#0a0a0a", border:"1px solid #161616", borderRadius:10, padding:"16px 18px", display:"flex", flexDirection:"column", gap:6 }}>
                  <span style={{ fontSize:18, color:s.color }}>{s.icon}</span>
                  <p style={{ margin:0, fontSize: s.small ? 13 : 24, color:s.color, fontWeight:500, lineHeight:1.3 }}>{s.val}</p>
                  <p style={{ margin:0, fontSize:9, color:"#888", letterSpacing:2, textTransform:"uppercase" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {result.cashBurners?.length > 0 && (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <p style={{ margin:0, fontSize:10, color:"#FF5C5C", letterSpacing:3 }}>🔥 WHERE YOUR CASH IS BURNING RIGHT NOW</p>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {result.cashBurners.map((b,i) => (
                  <div key={i} style={{ background:"#110a0a", border:"1px solid #2a1010", borderLeft:"3px solid #FF5C5C", borderRadius:10, padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16, flexWrap:"wrap" }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                        <span style={{ fontSize:13, color:"#FF5C5C", fontWeight:500 }}>{b.area}</span>
                        <span style={{ fontSize:9, padding:"2px 8px", borderRadius:100, background: b.urgency==="HIGH"?"#FF5C5C22":"#FFB54722", color: b.urgency==="HIGH"?"#FF5C5C":"#FFB547", letterSpacing:1 }}>{b.urgency}</span>
                      </div>
                      <p style={{ margin:0, fontSize:13, color:"#aaa", lineHeight:1.6 }}>{b.reason}</p>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <p style={{ margin:0, fontSize:20, color:"#FF5C5C", fontWeight:500 }}>{b.estimatedLoss}</p>
                      <p style={{ margin:0, fontSize:9, color:"#888", letterSpacing:1 }}>EST. MONTHLY LOSS</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ background:"#090f0c", border:"1px solid #0c1f15", borderRadius:10, padding:"18px 22px", display:"flex", gap:12, alignItems:"flex-start" }}>
            <span style={{ fontSize:18, flexShrink:0 }}>💡</span>
            <p style={{ margin:0, fontSize:14, color:"#6aaa85", lineHeight:1.75 }}><strong style={{ color:"#ccc" }}>Expert insight: </strong>{result.insight}</p>
          </div>

          <p style={{ margin:0, fontSize:10, color:"#666", letterSpacing:3 }}>RECOMMENDED AI STACK · IN PRIORITY ORDER</p>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {all.map((tool, i) => {
              const locked = !isPaid && i >= 2;
              return (
                <div key={i} style={{ position:"relative" }} className="fu">
                  <ToolCard tool={tool} locked={locked} />
                  {locked && i === 2 && (
                    <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(8px)", borderRadius:12, background:"#06060698" }}>
                      <div style={{ background:"#0e0e0e", border:"1px solid #00E5A020", borderRadius:14, padding:"30px 34px", display:"flex", flexDirection:"column", alignItems:"center", gap:12, textAlign:"center", maxWidth:310 }}>
                        <p style={{ margin:0, fontSize:20, color:"#fff", fontFamily:F, fontWeight:"normal" }}>Unlock Full Report</p>
                        <p style={{ margin:0, fontSize:13, color:"#888" }}>{all.length-2} more recommendations hidden</p>
                        <button style={{ background:"#00E5A0", color:"#000", border:"none", borderRadius:10, padding:"14px 24px", fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:M, width:"100%", marginTop:4 }} onClick={() => setIsPaid(true)}>Unlock for $29 / month →</button>
                        <p style={{ margin:0, fontSize:10, color:"#888" }}>Cancel anytime · Quarterly re-analysis included</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {result.implementationRoadmap?.length > 0 && (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <p style={{ margin:0, fontSize:10, color:"#00E5A0", letterSpacing:3 }}>📍 YOUR IMPLEMENTATION ROADMAP</p>
              <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                {result.implementationRoadmap.map((r,i) => (
                  <div key={i} style={{ display:"flex", gap:16, padding:"18px 0", borderBottom: i < result.implementationRoadmap.length-1 ? "1px solid #111" : "none", alignItems:"flex-start" }}>
                    <div style={{ flexShrink:0, width:80 }}>
                      <span style={{ fontSize:10, color:"#00E5A0", letterSpacing:1, fontFamily:M }}>{r.week}</span>
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ margin:"0 0 4px", fontSize:14, color:"#f0f0f0", fontFamily:F, fontWeight:"normal" }}>{r.action}</p>
                      <p style={{ margin:0, fontSize:12, color:"#888", lineHeight:1.5 }}>→ {r.outcome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display:"flex", justifyContent:"space-between", paddingTop:18, borderTop:"1px solid #0e0e0e", flexWrap:"wrap", gap:8 }}>
            <span style={{ fontSize:11, color:"#00E5A0", letterSpacing:2 }}>◈ StackOrbit · stackorbit.io</span>
            <span style={{ fontSize:10, color:"#666" }}>Results are AI-generated estimates · May include affiliate links</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={centered}><GS />
      <div style={{ width:"100%", maxWidth:560, display:"flex", flexDirection:"column", gap:40 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <button onClick={reset} style={{ background:"transparent", border:"none", color:"#00E5A0", fontSize:20, cursor:"pointer", padding:0, lineHeight:1 }}>◈</button>
          <span style={{ fontSize:16, color:"#fff", letterSpacing:3 }}>StackOrbit</span>
          <span style={{ fontSize:10, color:"#666", letterSpacing:2, marginLeft:6, borderLeft:"1px solid #1a1a1a", paddingLeft:12 }}>AI Stack Intelligence</span>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          {STEPS.map((label, i) => (
            <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, flex:1 }}>
              <div style={{ width:9, height:9, borderRadius:"50%", background:i<step?"#00E5A0":i===step?"#fff":"#1a1a1a", boxShadow:i===step?"0 0 0 3px #00E5A025":"none", transition:"all 0.3s" }} />
              <span style={{ fontSize:9, letterSpacing:1.5, textTransform:"uppercase", color:i<=step?"#00E5A0":"#555", transition:"color 0.3s" }}>{label}</span>
            </div>
          ))}
        </div>
        <div key={step} className="fu" style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <span style={{ fontSize:11, color:"#00E5A0", letterSpacing:3 }}>{step+1} OF {FIELDS.length}</span>
          <h2 style={{ margin:0, fontSize:30, color:"#fff", lineHeight:1.3, fontFamily:F, fontWeight:"normal" }}>{field.question}</h2>
          <p style={{ margin:0, fontSize:14, color:"#999", lineHeight:1.55 }}>{field.hint}</p>
          {field.type === "revenue_or_funding" ? (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <div style={{ display:"flex", gap:0, background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:10, padding:4 }}>
                {["Revenue", "Funding Round"].map((tab, i) => (
                  <button key={i}
                    style={{ flex:1, padding:"10px", border:"none", borderRadius:8, fontSize:12, cursor:"pointer", fontFamily:M, letterSpacing:0.5, transition:"all 0.2s",
                      background: revenueTab===i ? "#00E5A0" : "transparent",
                      color: revenueTab===i ? "#000" : "#666",
                      fontWeight: revenueTab===i ? 500 : 400
                    }}
                    onClick={() => { setRevenueTab(i); setForm({...form, revenue:""}); }}
                  >{tab}</button>
                ))}
              </div>
              {revenueTab === 0 ? (
                <div style={{ display:"flex", gap:10 }}>
                  <div style={{ position:"relative", flexShrink:0 }}>
                    <select style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:10, padding:"16px 40px 16px 14px", fontSize:13, color:"#f0f0f0", fontFamily:M, appearance:"none", cursor:"pointer", transition:"border-color 0.2s", height:"100%", minWidth:130 }}
                      value={currency.code} onChange={e => setCurrency(CURRENCIES.find(c => c.code === e.target.value))}>
                      <optgroup label="Americas" style={{ background:"#111", color:"#666" }}>
                        {CURRENCIES.filter(c => ["USD","CAD","MXN","BRL","ARS","COP","CLP","PEN"].includes(c.code)).map(c => <option key={c.code} value={c.code} style={{ background:"#111" }}>{c.label}</option>)}
                      </optgroup>
                      <optgroup label="Europe" style={{ background:"#111", color:"#666" }}>
                        {CURRENCIES.filter(c => ["EUR","GBP","CHF","SEK","NOK","DKK","PLN","CZK","HUF","RON","TRY","UAH"].includes(c.code)).map(c => <option key={c.code} value={c.code} style={{ background:"#111" }}>{c.label}</option>)}
                      </optgroup>
                      <optgroup label="Middle East & Africa" style={{ background:"#111", color:"#666" }}>
                        {CURRENCIES.filter(c => ["AED","SAR","QAR","KWD","BHD","ILS","EGP","NGN","KES","GHS","ZAR","MAD","TZS","ETB"].includes(c.code)).map(c => <option key={c.code} value={c.code} style={{ background:"#111" }}>{c.label}</option>)}
                      </optgroup>
                      <optgroup label="Asia & Pacific" style={{ background:"#111", color:"#666" }}>
                        {CURRENCIES.filter(c => ["INR","PKR","BDT","LKR","NPR","JPY","CNY","KRW","HKD","TWD","SGD","MYR","THB","IDR","PHP","VND","MMK","KHR","AUD","NZD"].includes(c.code)).map(c => <option key={c.code} value={c.code} style={{ background:"#111" }}>{c.label}</option>)}
                      </optgroup>
                    </select>
                    <div style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#00E5A0", fontSize:11 }}>▾</div>
                  </div>
                  <input ref={inputRef} style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:10, padding:"16px 18px", fontSize:16, color:"#f0f0f0", fontFamily:M, flex:1, transition:"border-color 0.2s" }}
                    placeholder={field.placeholder} value={val}
                    onChange={e => setForm({...form, revenue: e.target.value})}
                    onKeyDown={e => e.key==="Enter" && val.trim() && handleNext()} />
                </div>
              ) : (
                <div style={{ position:"relative" }}>
                  <select ref={inputRef} style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:10, padding:"16px 18px", fontSize:14, color:val?"#f0f0f0":"#555", fontFamily:M, width:"100%", appearance:"none", cursor:"pointer", transition:"border-color 0.2s" }}
                    value={val} onChange={e => setForm({...form, revenue: e.target.value})}>
                    {FUNDING_STAGES.map((opt,i) => <option key={i} value={opt.value} style={{ background:"#111", color:opt.value?"#f0f0f0":"#555" }}>{opt.label}</option>)}
                  </select>
                  <div style={{ position:"absolute", right:18, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#00E5A0", fontSize:12 }}>▾</div>
                </div>
              )}
            </div>
          ) : field.type === "dropdown" ? (
            <div style={{ position:"relative" }}>
              <select ref={inputRef} style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:10, padding:"16px 18px", fontSize:14, color:val?"#f0f0f0":"#555", fontFamily:M, width:"100%", appearance:"none", cursor:"pointer", transition:"border-color 0.2s" }} value={val} onChange={e => setForm({...form,[field.key]:e.target.value})}>
                {field.options.map((opt,i) => <option key={i} value={opt.value} style={{ background:"#111", color:opt.value?"#f0f0f0":"#555" }}>{opt.label}</option>)}
              </select>
              <div style={{ position:"absolute", right:18, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#00E5A0", fontSize:12 }}>▾</div>
            </div>
          ) : field.type === "tool_picker" ? (
            <ToolPicker selected={val} onChange={v => setForm({...form, tools: v})} />
          ) : field.type === "textarea" ? (
            <textarea ref={inputRef} style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:10, padding:"16px 18px", fontSize:15, color:"#f0f0f0", fontFamily:M, width:"100%", resize:"none", lineHeight:1.7, transition:"border-color 0.2s" }} placeholder={field.placeholder} value={val} rows={4} onChange={e => setForm({...form,[field.key]:e.target.value})} />
          ) : (
            <input ref={inputRef} style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:10, padding:"16px 18px", fontSize:16, color:"#f0f0f0", fontFamily:M, width:"100%", transition:"border-color 0.2s" }} placeholder={field.placeholder} value={val} onChange={e => setForm({...form,[field.key]:e.target.value})} onKeyDown={e => e.key==="Enter" && val.trim() && handleNext()} />
          )}
          {error && <p style={{ margin:0, color:"#FF5C5C", fontSize:13 }}>{error}</p>}
          <div style={{ display:"flex", alignItems:"center", gap:16, marginTop:4 }}>
            {step>0 && <button style={{ background:"transparent", color:"#888", border:"none", fontSize:13, cursor:"pointer", fontFamily:M, padding:0 }} onClick={() => setStep(s=>s-1)}>← Back</button>}
            <button style={{ background:"#00E5A0", color:"#000", border:"none", borderRadius:10, padding:"15px 26px", fontSize:14, fontWeight:500, fontFamily:M, letterSpacing:0.5, opacity:(val.trim() || field.type==="tool_picker")?1:0.3, cursor:(val.trim() || field.type==="tool_picker")?"pointer":"default", transition:"opacity 0.2s", flexShrink:0 }} onClick={handleNext} disabled={!(val.trim() || field.type==="tool_picker")}>
              {step===FIELDS.length-1 ? "Generate My AI Stack →" : "Continue →"}
            </button>
          </div>
        </div>
        <p style={{ margin:0, fontSize:11, color:"#666", textAlign:"center", letterSpacing:1 }}>Free · No account required · 2 minutes · Powered by AI</p>
      </div>
    </div>
  );
}
