const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, HeadingLevel, PageBreak, TabStopType, TabStopPosition
} = require('docx');
const fs = require('fs');

// ─── Color Palette ───────────────────────────────────────────────────────────
const GREEN     = "1A6B2A";   // Academy deep green
const GOLD      = "C8A84B";   // Gold accent
const DARKGRAY  = "2C2C2C";
const LIGHTBG   = "F4F8F0";   // Very light green tint
const WHITE     = "FFFFFF";
const MIDGREEN  = "2E7D32";
const LINECOLOR = "D4E8D0";

// ─── Helper: thin border set ─────────────────────────────────────────────────
const thinBorder = (color = LINECOLOR) => ({
  top:    { style: BorderStyle.SINGLE, size: 1, color },
  bottom: { style: BorderStyle.SINGLE, size: 1, color },
  left:   { style: BorderStyle.SINGLE, size: 1, color },
  right:  { style: BorderStyle.SINGLE, size: 1, color },
});

// ─── Helper: heading paragraph ────────────────────────────────────────────────
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: GOLD, space: 4 } },
    children: [new TextRun({ text, font: "Arial", size: 32, bold: true, color: GREEN })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    children: [new TextRun({ text, font: "Arial", size: 26, bold: true, color: MIDGREEN })],
  });
}

function body(text, options = {}) {
  return new Paragraph({
    spacing: { before: 60, after: 120 },
    children: [new TextRun({ text, font: "Arial", size: 22, color: DARKGRAY, ...options })],
  });
}

function spacer() {
  return new Paragraph({ spacing: { before: 0, after: 60 }, children: [new TextRun("")] });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, font: "Arial", size: 22, color: DARKGRAY })],
  });
}

// ─── Highlight box (shaded paragraph) ────────────────────────────────────────
function highlight(text, fillColor = LIGHTBG) {
  return new Paragraph({
    shading: { fill: fillColor, type: ShadingType.CLEAR },
    spacing: { before: 120, after: 120 },
    indent: { left: 360, right: 360 },
    children: [new TextRun({ text, font: "Arial", size: 22, color: DARKGRAY, italics: true })],
  });
}

// ─── Full-width data table ────────────────────────────────────────────────────
function dataRow(label, value, shade = false) {
  const fill = shade ? "EAF4EA" : WHITE;
  const b = thinBorder(LINECOLOR);
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 4680, type: WidthType.DXA },
        borders: b,
        shading: { fill, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 160, right: 80 },
        children: [new Paragraph({ children: [new TextRun({ text: label, font: "Arial", size: 20, bold: true, color: GREEN })] })],
      }),
      new TableCell({
        width: { size: 4680, type: WidthType.DXA },
        borders: b,
        shading: { fill, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 160, right: 80 },
        children: [new Paragraph({ children: [new TextRun({ text: value, font: "Arial", size: 20, color: DARKGRAY })] })],
      }),
    ],
  });
}

function headerRow(col1, col2) {
  const b = thinBorder(GREEN);
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 4680, type: WidthType.DXA },
        borders: b,
        shading: { fill: GREEN, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 160, right: 80 },
        children: [new Paragraph({ children: [new TextRun({ text: col1, font: "Arial", size: 20, bold: true, color: WHITE })] })],
      }),
      new TableCell({
        width: { size: 4680, type: WidthType.DXA },
        borders: b,
        shading: { fill: GREEN, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 160, right: 80 },
        children: [new Paragraph({ children: [new TextRun({ text: col2, font: "Arial", size: 20, bold: true, color: WHITE })] })],
      }),
    ],
  });
}

function twoColTable(rows) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [4680, 4680],
    rows,
  });
}

// ─── Three-column use-of-funds table ─────────────────────────────────────────
function threeHeaderRow(c1, c2, c3) {
  const b = thinBorder(GREEN);
  const cell = (text, w) => new TableCell({
    width: { size: w, type: WidthType.DXA },
    borders: b,
    shading: { fill: GREEN, type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 160, right: 80 },
    children: [new Paragraph({ children: [new TextRun({ text, font: "Arial", size: 20, bold: true, color: WHITE })] })],
  });
  return new TableRow({ children: [cell(c1, 4500), cell(c2, 2430), cell(c3, 2430)] });
}

function threeDataRow(c1, c2, c3, shade = false) {
  const fill = shade ? "EAF4EA" : WHITE;
  const b = thinBorder(LINECOLOR);
  const cell = (text, w, bold = false) => new TableCell({
    width: { size: w, type: WidthType.DXA },
    borders: b,
    shading: { fill, type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 160, right: 80 },
    children: [new Paragraph({ children: [new TextRun({ text, font: "Arial", size: 20, bold, color: bold ? GREEN : DARKGRAY })] })],
  });
  return new TableRow({ children: [cell(c1, 4500), cell(c2, 2430), cell(c3, 2430)] });
}

// ─── Document ─────────────────────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
    ],
  },
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22 } },
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: GREEN },
        paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: MIDGREEN },
        paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 1 },
      },
    ],
  },
  sections: [
    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 1 — COVER PAGE
    // ═══════════════════════════════════════════════════════════════════════
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      children: [
        spacer(), spacer(), spacer(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 80 },
          children: [new TextRun({ text: "CAMEROON ALL STARS SPORTS ACADEMY", font: "Arial", size: 48, bold: true, color: GREEN })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 400 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: GOLD, space: 8 } },
          children: [new TextRun({ text: "WE DOMINATE", font: "Arial", size: 28, bold: true, color: GOLD })],
        }),
        spacer(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 120 },
          children: [new TextRun({ text: "FUNDING PROPOSAL", font: "Arial", size: 52, bold: true, color: DARKGRAY })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 80 },
          children: [new TextRun({ text: "Investment Opportunity to Establish a World-Class", font: "Arial", size: 26, color: DARKGRAY })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 400 },
          children: [new TextRun({ text: "Football Development Academy in Mmakau, North West Province, South Africa", font: "Arial", size: 26, color: DARKGRAY })],
        }),
        spacer(), spacer(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 80 },
          children: [new TextRun({ text: "Prepared by:", font: "Arial", size: 22, italics: true, color: DARKGRAY })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 40 },
          children: [new TextRun({ text: "Cameroon All Stars Sports Academy", font: "Arial", size: 24, bold: true, color: GREEN })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 40 },
          children: [new TextRun({ text: "R566 Road, Mmakau, North West Province, South Africa", font: "Arial", size: 22, color: DARKGRAY })],
        }),
        spacer(), spacer(), spacer(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 40 },
          children: [new TextRun({ text: "CONFIDENTIAL DOCUMENT", font: "Arial", size: 20, bold: true, color: GOLD })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "April 2026", font: "Arial", size: 20, color: DARKGRAY })],
        }),
        new Paragraph({ children: [new PageBreak()] }),
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 2 — BODY
    // ═══════════════════════════════════════════════════════════════════════
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
              border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GREEN, space: 4 } },
              spacing: { after: 0 },
              children: [
                new TextRun({ text: "Cameroon All Stars Sports Academy", font: "Arial", size: 18, bold: true, color: GREEN }),
                new TextRun({ text: "\tFunding Proposal | Confidential", font: "Arial", size: 18, color: DARKGRAY }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
              border: { top: { style: BorderStyle.SINGLE, size: 6, color: LINECOLOR, space: 4 } },
              spacing: { before: 40 },
              children: [
                new TextRun({ text: "We Dominate | Building Champions, Empowering Communities", font: "Arial", size: 16, italics: true, color: DARKGRAY }),
                new TextRun({ text: "\tPage ", font: "Arial", size: 16, color: DARKGRAY }),
                new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: DARKGRAY }),
              ],
            }),
          ],
        }),
      },
      children: [

        // ── 1. EXECUTIVE SUMMARY ─────────────────────────────────────────
        h1("1. Executive Summary"),
        body("Cameroon All Stars Sports Academy is seeking strategic investment to establish a premier, FIFA-standard residential football development academy on a 4.5-hectare site along R566 Road in Mmakau, North West Province, South Africa. The academy will serve as a transformative centre of sporting excellence, youth development, and community-driven economic growth for the Mmakau-Garankuwa region."),
        spacer(),
        highlight("Only 3% of talented African youth currently access quality football development programmes. Cameroon All Stars exists to change that — one champion at a time."),
        spacer(),
        body("This proposal outlines the vision, social impact, site infrastructure, market opportunity, and financial framework of the academy. We invite impact-driven investors, corporate sponsors, development finance institutions (DFIs), and philanthropic funders to partner with us in building a lasting legacy for the region."),
        spacer(),
        twoColTable([
          headerRow("Key Fact", "Detail"),
          dataRow("Project Name", "Cameroon All Stars Sports Academy", false),
          dataRow("Location", "R566 Road, Mmakau, North West Province, South Africa", true),
          dataRow("Site Size", "4.5 hectares of undeveloped land", false),
          dataRow("Target Beneficiaries", "Youth aged 10-18 from Mmakau, Garankuwa, Temba & Mabopane", true),
          dataRow("Catchment Population", "500,000+ people within a 20 km radius", false),
          dataRow("Youth Population", "140,000 young people aged 10-18 within 20 km", true),
          dataRow("Permanent Jobs Created", "50+ direct employment opportunities", false),
          dataRow("Graduation Rate Target", "95%+ academic participation rate for all athletes", true),
        ]),
        spacer(),

        // ── 2. ABOUT THE ORGANIZATION ─────────────────────────────────────
        h1("2. About Cameroon All Stars Sports Academy"),
        body("Cameroon All Stars Sports Academy is a community-centred football development institution founded with a single, powerful purpose: to unlock Africa's immense athletic potential by providing structured, world-class pathways to professional football — directly in the communities where talent lives."),
        spacer(),
        body("Our academy is built on a holistic development model that treats athletic excellence and academic achievement as inseparable. Every young athlete who passes through our programme receives:"),
        spacer(),
        bullet("Elite, professional-standard football coaching and sports science support"),
        bullet("Full academic schooling in partnership with accredited local institutions"),
        bullet("Life skills, financial literacy, and leadership development curricula"),
        bullet("Character formation, mentorship, and pastoral care from professional staff"),
        bullet("Direct pathways to professional football through European and African club partnerships"),
        bullet("Comprehensive scouting networks and talent placement services"),
        spacer(),
        body("Our motto — WE DOMINATE — is not merely a statement of sporting ambition. It is a declaration that our communities deserve to be at the centre of African football's future."),
        spacer(),

        // ── 3. THE PROBLEM ────────────────────────────────────────────────
        h1("3. The Problem We Are Solving"),
        body("Africa is the world's richest untapped reservoir of football talent. Yet the vast majority of that talent is never realised — not for lack of ability, but for lack of access."),
        spacer(),
        body("Young players in Central and Southern Africa face three impossible choices:"),
        spacer(),
        bullet("Relocate to expensive academies far from home — an option most families cannot afford"),
        bullet("Miss critical development windows entirely — losing years they can never recover"),
        bullet("Abandon their dreams altogether — settling for a future far below their potential"),
        spacer(),
        body("The consequences of this broken system are severe:"),
        spacer(),
        twoColTable([
          headerRow("The Challenge", "The Human Cost"),
          dataRow("Only 3% of talented African youth access quality football development", "Generational talent is lost every year, never discovered or nurtured", false),
          dataRow("No FIFA-standard residential academies within 50 km of Mmakau", "Local families must choose between football dreams and family stability", true),
          dataRow("European clubs seek African talent but lack development pipelines", "The commercial value of African talent goes unrealised at the source", false),
          dataRow("Relocation costs are prohibitive for most NW Province families", "Economic background determines athletic destiny, not talent or effort", true),
        ]),
        spacer(),
        body("South African players currently active abroad collectively earn between R2 billion and R5 billion annually — proof of the extraordinary commercial value of properly developed African football talent. The infrastructure to cultivate that talent, however, barely exists in the communities that produce it."),
        spacer(),

        // ── 4. OUR SOLUTION ───────────────────────────────────────────────
        h1("4. Our Solution"),
        body("Cameroon All Stars Academy brings world-class football development directly into the community — eliminating the relocation barrier, reducing costs, and ensuring that geography and family income no longer determine a young person's footballing future."),
        spacer(),
        h2("4.1 Elite Athletic Infrastructure"),
        bullet("Two FIFA-standard full-size football pitches"),
        bullet("Professional gymnasium and sports science facilities"),
        bullet("Optional covered training pitch for year-round capability in all weather"),
        bullet("Two 22-seater transport vehicles for player and operational logistics"),
        bullet("Optional aquatic recovery pools"),
        spacer(),
        h2("4.2 Residential & Educational Facilities"),
        bullet("Four residential accommodation blocks providing a safe, structured home environment"),
        bullet("Two professional changing rooms and ablution blocks"),
        bullet("Dedicated tutorial hall for academic education sessions"),
        bullet("Administration and office hub for academy operations"),
        bullet("Visitor and scouting reception and entrance facilities"),
        spacer(),
        h2("4.3 Holistic Development Programmes"),
        bullet("Year-round structured football coaching by UEFA/CAF-licensed coaches"),
        bullet("Academic school partnerships ensuring 95%+ student graduation rates"),
        bullet("Life skills, financial literacy, and leadership development modules"),
        bullet("Character formation and mentorship from elite coaches and alumni"),
        bullet("Psychological support and pastoral care services"),
        spacer(),
        h2("4.4 Professional Pathways"),
        bullet("Active partnerships with European and African professional clubs"),
        bullet("Comprehensive scouting network and regional talent identification drives"),
        bullet("Transfer fee revenue model generating income from player placements"),
        bullet("Alumni network sustaining community connection and role-model pipeline"),
        spacer(),

        // ── 5. LOCATION ───────────────────────────────────────────────────
        h1("5. Location & Strategic Advantage"),
        body("The academy will be developed on R566 Road in Mmakau, a site of approximately 4.5 hectares of undeveloped land with direct road frontage, excellent visibility, and strong accessibility from surrounding communities."),
        spacer(),
        twoColTable([
          headerRow("Location Metric", "Detail"),
          dataRow("Distance to Pretoria", "45 kilometres", false),
          dataRow("Distance to Johannesburg", "65 kilometres", true),
          dataRow("Population within 20 km", "500,000+ residents", false),
          dataRow("Youth aged 10-18 within 20 km", "140,000 young people", true),
          dataRow("Nearest comparable academy", "50+ kilometres away (Pretoria / Johannesburg)", false),
          dataRow("Site topography", "Relatively flat — minimises preparation costs", true),
          dataRow("Existing infrastructure", "Municipal water & electricity access on R566", false),
          dataRow("Water supply potential", "Excellent borehole water potential", true),
        ]),
        spacer(),
        body("There are no comparable FIFA-standard residential football academies within 50 kilometres of Mmakau. This gives Cameroon All Stars a clear first-mover advantage in a dramatically underserved market. By locating the academy at the heart of the community, we eliminate:"),
        spacer(),
        bullet("Relocation barriers that prevent talented youth from accessing development"),
        bullet("The high fees charged by distant urban academies"),
        bullet("Family separation that forces impossible choices between sport and home"),
        spacer(),

        // ── 6. SOCIAL IMPACT ──────────────────────────────────────────────
        h1("6. Social Impact & Community Benefit"),
        body("Cameroon All Stars Academy is not simply a football facility. It is a catalyst for lasting socio-economic transformation in one of South Africa's most underserved regions."),
        spacer(),
        h2("6.1 Youth Empowerment"),
        bullet("Direct sporting and educational pathways out of poverty for talented young people"),
        bullet("Academic education guaranteed for every athlete regardless of football outcomes"),
        bullet("Positive alternatives to negative community influences"),
        bullet("Mentorship and role models from professional coaches and successful alumni"),
        spacer(),
        h2("6.2 Economic Development"),
        bullet("50+ permanent jobs created for community members across coaching, administration, grounds, transport, catering, and security"),
        bullet("Increased local business demand for supplies, services, and equipment"),
        bullet("Property value uplift from quality infrastructure investment"),
        bullet("Tourism and visitors from matches, scouting events, and training camps supporting the local economy"),
        spacer(),
        h2("6.3 Educational Advancement"),
        bullet("No athlete sacrifices schooling for sport — both run concurrently"),
        bullet("Active partnerships with local schools maintaining academic standards"),
        bullet("Life skills curriculum preparing youth for diverse career paths beyond football"),
        bullet("95%+ graduation rate target for all academy participants"),
        spacer(),
        h2("6.4 Community Pride & Regional Identity"),
        bullet("Establishing Mmakau-Garankuwa as a recognised centre of sporting excellence"),
        bullet("Success stories inspiring the next generation across the North West Province"),
        bullet("Community ownership and participation in academy activities"),
        bullet("National and international recognition raising the community's global profile"),
        spacer(),
        h2("6.5 Gender Inclusion"),
        body("Future expansion plans include dedicated girls' football programmes, equal access to facilities and education, and dedicated pathways for women into coaching and sports management careers — cementing the academy as a truly inclusive institution."),
        spacer(),

        // ── 7. MARKET OPPORTUNITY ─────────────────────────────────────────
        h1("7. Market Opportunity"),
        body("The global football industry generates revenues exceeding USD 50 billion annually. Within this ecosystem, African player development represents one of the most commercially compelling — and most underinvested — opportunities in the sport."),
        spacer(),
        bullet("South African football players active abroad generate R2 to R5 billion in annual earnings, demonstrating the proven commercial value of well-developed African talent"),
        bullet("European clubs are actively expanding their African scouting and acquisition pipelines, seeking reliable development academies as upstream partners"),
        bullet("Central and Southern Africa remain structurally underserved in terms of elite youth development infrastructure, representing a first-mover opportunity with significant barriers to entry for later competitors"),
        bullet("The catchment area of 500,000 people and 140,000 youth within 20 km of the proposed site represents an abundant and immediately accessible talent pool"),
        spacer(),
        highlight("Cameroon All Stars Academy positions itself at the intersection of community need, commercial demand, and sporting excellence — a rare alignment that creates both impact and returns."),
        spacer(),

        // ── 8. REVENUE MODEL ──────────────────────────────────────────────
        h1("8. Business Model & Revenue Streams"),
        body("The academy is designed as a financially sustainable institution. Revenue will be derived from multiple streams, reducing risk and ensuring operational continuity:"),
        spacer(),
        twoColTable([
          headerRow("Revenue Stream", "Description"),
          dataRow("Player Transfer Fees", "Fees generated when academy graduates are placed with professional clubs — the primary long-term revenue driver", false),
          dataRow("Scouting & Talent Placement Services", "Retainer and placement fees from European and African clubs utilising the academy's scouting network", true),
          dataRow("Academy Tuition Fees (Tiered)", "Means-tested fees for students from families with capacity to contribute, ensuring broad accessibility", false),
          dataRow("Corporate Partnerships & Sponsorships", "Branded facility rights, kit sponsorship, event hosting, and community CSI partnerships", true),
          dataRow("Training Camps & Tournament Hosting", "Facility hire for external teams, regional tournaments, and scouting events", false),
          dataRow("Grants & Development Finance", "Targeted funding from sport development bodies, DFIs, and government programmes", true),
        ]),
        spacer(),

        // ── 9. USE OF FUNDS ───────────────────────────────────────────────
        h1("9. Use of Funds"),
        body("Investment raised will be deployed across five critical work streams to deliver a fully operational, professionally managed academy:"),
        spacer(),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [4500, 2430, 2430],
          rows: [
            threeHeaderRow("Investment Category", "Allocation (%)", "Purpose"),
            threeDataRow("Site Development & Civil Works", "30%", "Land preparation, fencing, access roads, drainage, utilities", false),
            threeDataRow("FIFA-Standard Pitches (x2)", "20%", "Full synthetic or hybrid pitch surfaces, floodlights, line marking", true),
            threeDataRow("Residential & Education Facilities", "20%", "4 accommodation blocks, 2 change rooms, tutorial hall, admin offices", false),
            threeDataRow("Gymnasium & Sports Science Centre", "10%", "Gym equipment, physiotherapy, strength & conditioning lab", true),
            threeDataRow("Transport & Operational Equipment", "8%", "Two 22-seater minibuses, training equipment, IT systems", false),
            threeDataRow("Pre-Opening Staffing & Programmes", "7%", "Coach recruitment, curriculum development, admin onboarding", true),
            threeDataRow("Working Capital & Contingency", "5%", "12-month operational buffer and project contingency reserve", false),
          ],
        }),
        spacer(),

        // ── 10. INVESTMENT PROPOSITION ────────────────────────────────────
        h1("10. Investment Proposition"),
        body("We welcome interest from a diverse range of funders and partners, and are open to structuring investment in a manner that aligns with each partner's mandate, risk appetite, and reporting requirements:"),
        spacer(),
        twoColTable([
          headerRow("Investor Type", "Value Proposition"),
          dataRow("Impact Investors & DFIs", "Measurable social return: 140,000 youth served, 50+ jobs created, 95%+ graduation rates, community economic uplift", false),
          dataRow("Corporate Sponsors (CSI/ESG)", "Brand visibility, community association, youth development credentials, B-BBEE alignment", true),
          dataRow("Sports Development Bodies", "Alignment with national football development mandates, regional talent pipeline, SAFA/FIFA grassroots objectives", false),
          dataRow("Government & Public Sector", "Infrastructure investment in an underserved region, skills development, employment creation, social cohesion", true),
          dataRow("Private Equity / Family Offices", "Long-term transfer fee revenue, facility value appreciation, first-mover positioning in an underserved market", false),
          dataRow("Philanthropic Foundations", "Direct, measurable youth upliftment, educational access, community transformation in a high-need area", true),
        ]),
        spacer(),
        body("We are committed to full financial transparency, regular investor reporting, independent auditing, and governance structures commensurate with the scale of investment received. A detailed financial model and projected five-year cash flow analysis are available upon request under a signed Non-Disclosure Agreement."),
        spacer(),

        // ── 11. FACILITIES OVERVIEW ───────────────────────────────────────
        h1("11. Planned Facilities Overview"),
        body("The academy campus has been designed to deliver an integrated, self-sufficient centre of excellence:"),
        spacer(),
        twoColTable([
          headerRow("Facility", "Status"),
          dataRow("Pitch 1 & Pitch 2 (FIFA Standard)", "Core — Phase 1"),
          dataRow("Shades & Spectator Seating", "Core — Phase 1"),
          dataRow("Accommodation Blocks (x4)", "Core — Phase 1"),
          dataRow("Professional Changing Rooms (x2)", "Core — Phase 1"),
          dataRow("Offices & Administration Block", "Core — Phase 1"),
          dataRow("Entrance & Tutorial Hall", "Core — Phase 1"),
          dataRow("Restrooms & Ablution Facilities", "Core — Phase 1"),
          dataRow("Parking Lots", "Core — Phase 1"),
          dataRow("Gymnasium", "Core — Phase 1"),
          dataRow("Transport Fleet (22-Seater x2)", "Core — Phase 1"),
          dataRow("Covered Training Pitch", "Optional — Phase 2"),
          dataRow("Aquatic Recovery Pools", "Optional — Phase 2"),
          dataRow("Additional Gymnasium Hall", "Optional — Phase 2"),
        ]),
        spacer(),

        // ── 12. VISION ────────────────────────────────────────────────────
        h1("12. Vision & Long-Term Legacy"),
        body("The Cameroon All Stars Academy Sports Park represents a transformative vision for youth development, community upliftment, and long-term economic growth. It is more than a sports facility — it is a cornerstone for nurturing talent, inspiring future leaders, and creating opportunities that extend far beyond the football field."),
        spacer(),
        body("At its core, the academy seeks to unlock Africa's immense athletic potential by providing world-class training grounds, mentorship, and holistic development programmes. Many young talents never reach their peak due to a lack of structured support, and this facility directly addresses that challenge."),
        spacer(),
        highlight("In building this academy, we are not just constructing facilities — we are shaping futures, empowering communities, and laying the foundation for a new era of opportunity. This project stands as a testament to what is possible when vision meets action."),
        spacer(),
        body("We envision Cameroon All Stars Academy becoming:"),
        spacer(),
        bullet("A recognised pipeline for professional football teams worldwide"),
        bullet("A symbol of African excellence and community-driven transformation"),
        bullet("A home for champions — and a beacon of hope for generations to come"),
        bullet("A replicable model for community football academy development across Africa"),
        spacer(),

        // ── 13. CALL TO ACTION ────────────────────────────────────────────
        h1("13. Next Steps & Call to Action"),
        body("We invite you to be part of something permanent. Cameroon All Stars Academy offers a rare opportunity to invest in both people and performance — with measurable impact that will outlast any individual contribution."),
        spacer(),
        body("To proceed to the next stage of engagement, we invite interested parties to:"),
        spacer(),
        bullet("Request a full financial model and five-year operational projections"),
        bullet("Schedule a site visit to the proposed location on R566 Road, Mmakau"),
        bullet("Meet the founding team for a detailed presentation and Q&A session"),
        bullet("Review the full pitch deck which accompanies this proposal"),
        bullet("Sign an NDA to access commercially sensitive development documents"),
        spacer(),
        body("We are open to co-investment structures, phased funding commitments, and partnership models that align with our investors' mandates and timelines."),
        spacer(),
        spacer(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          border: {
            top:    { style: BorderStyle.SINGLE, size: 6, color: GOLD },
            bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD },
          },
          spacing: { before: 160, after: 160 },
          shading: { fill: LIGHTBG, type: ShadingType.CLEAR },
          children: [
            new TextRun({ text: "\"Africa is not just a source of talent — it is the future of global football.", font: "Arial", size: 24, italics: true, color: GREEN }),
            new TextRun({ text: " Join us in building that future.\"", font: "Arial", size: 24, italics: true, bold: true, color: GREEN }),
          ],
        }),
        spacer(), spacer(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "CAMEROON ALL STARS SPORTS ACADEMY", font: "Arial", size: 26, bold: true, color: GREEN })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "R566 Road, Mmakau, North West Province, South Africa", font: "Arial", size: 20, color: DARKGRAY })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Confidential | April 2026", font: "Arial", size: 20, italics: true, color: DARKGRAY })],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("C:/Users/x beast/Downloads/Cameroon_All_Stars_Funding_Proposal.docx", buffer);
  console.log("Document written successfully.");
});
