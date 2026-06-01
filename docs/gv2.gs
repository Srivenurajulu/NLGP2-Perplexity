/**
 * Google Apps Script — NL Perplexity PDBP (10-Slide Final Version)
 * Modeled after reference strategy deck layout.
 * Content sourced from docs/prompt.md and research/survey-summary.md.
 *
 * To use:
 * 1. Go to https://script.google.com/
 * 2. Create a new project.
 * 3. Replace Code.gs content with this script.
 * 4. Run createNLPerplexityFinal()
 * 5. Grant permissions when prompted.
 * 6. Presentation appears in your Google Drive as "NL Perplexity".
 */

function createNLPerplexityFinal() {
  var prs = SlidesApp.create("NL Perplexity");
  var defaultSlide = prs.getSlides()[0];

  // ── Design tokens ────────────────────────────────────────────
  var C = {
    TEAL:        "#20808D",
    TEAL_DARK:   "#165C66",
    TEAL_LIGHT:  "#E6F4F1",
    AMBER:       "#D97706",
    AMBER_LIGHT: "#FEF3C7",
    WHITE:       "#FFFFFF",
    OFF_WHITE:   "#FAFAFA",
    DARK:        "#1A1A1A",
    MID:         "#4A4A4A",
    LIGHT_GREY:  "#E5E7EB",
    BORDER:      "#D1D5DB",
    RED_LIGHT:   "#FEE2E2",
    GREEN_LIGHT: "#D1FAE5",
    GREEN_DARK:  "#065F46",
    NAVY:        "#0F172A",
    BLACK:       "#000000",
    LAVENDER:    "#EDE9FE"
  };

  var pt = function(inches) { return inches * 72; };

  var addShape = function(slide, opts) {
    var shape = slide.insertShape(SlidesApp.ShapeType.RECTANGLE,
      pt(opts.x), pt(opts.y), pt(opts.w), pt(opts.h));
    if (opts.fill) shape.getFill().setSolidFill(opts.fill);
    else shape.getFill().setTransparent();
    if (opts.line) {
      shape.getBorder().getLineFill().setSolidFill(opts.line);
      shape.getBorder().setWeight(opts.lineWeight || 1);
    } else {
      shape.getBorder().setTransparent();
    }
    return shape;
  };

  var addText = function(slide, text, opts) {
    var tb = slide.insertTextBox(text, pt(opts.x), pt(opts.y), pt(opts.w), pt(opts.h));
    var style = tb.getText().getTextStyle();
    style.setFontSize(opts.fontSize || 12);
    style.setFontFamily("Arial");
    if (opts.bold) style.setBold(true);
    if (opts.italic) style.setItalic(true);
    if (opts.color) style.setForegroundColor(opts.color);
    else style.setForegroundColor(C.DARK);
    var para = tb.getText().getParagraphStyle();
    if (opts.align === "center") para.setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
    else if (opts.align === "right") para.setParagraphAlignment(SlidesApp.ParagraphAlignment.END);
    else para.setParagraphAlignment(SlidesApp.ParagraphAlignment.START);
    para.setSpaceAbove(0);
    para.setSpaceBelow(0);
    if (opts.valign === "middle") tb.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE);
    else if (opts.valign === "bottom") tb.setContentAlignment(SlidesApp.ContentAlignment.BOTTOM);
    else tb.setContentAlignment(SlidesApp.ContentAlignment.TOP);
    return tb;
  };

  var addTable = function(slide, rows, opts) {
    var nR = rows.length, nC = rows[0].length;
    var table = slide.insertTable(nR, nC, pt(opts.x), pt(opts.y), pt(opts.w), pt(opts.h));
    for (var r = 0; r < nR; r++) {
      for (var c = 0; c < nC; c++) {
        var cellData = rows[r][c];
        var cell = table.getCell(r, c);
        var text = "", cellOpts = {};
        if (typeof cellData === "object" && cellData !== null) {
          text = cellData.text || "";
          cellOpts = cellData.options || {};
        } else { text = cellData || ""; }
        cell.getText().setText(text);
        var s = cell.getText().getTextStyle();
        s.setFontSize(cellOpts.fontSize || opts.fontSize || 10);
        s.setFontFamily("Arial");
        if (cellOpts.bold) s.setBold(true);
        if (r === 0 && opts.headerBold) s.setBold(true);
        if (cellOpts.color) s.setForegroundColor(cellOpts.color);
        else if (r === 0 && opts.headerColor) s.setForegroundColor(opts.headerColor);
        else s.setForegroundColor(C.DARK);
        if (cellOpts.fill) cell.getFill().setSolidFill(cellOpts.fill);
        else if (r === 0 && opts.headerFill) cell.getFill().setSolidFill(opts.headerFill);
        var p = cell.getText().getParagraphStyle();
        p.setSpaceAbove(0); p.setSpaceBelow(0);
      }
    }
    return table;
  };

  // Standard slide header — white band, teal top border, black title centered
  var addSlideHeader = function(slide, title) {
    addShape(slide, { x: 0, y: 0, w: 10, h: 0.85, fill: C.WHITE, line: C.BORDER });
    addShape(slide, { x: 0, y: 0, w: 10, h: 0.06, fill: C.TEAL });
    addText(slide, title, {
      x: 0.3, y: 0.12, w: 9.4, h: 0.6,
      fontSize: 22, bold: true, color: C.BLACK,
      align: "center", valign: "middle"
    });
    addShape(slide, { x: 0.3, y: 0.78, w: 9.4, h: 0.02, fill: C.TEAL });
  };

  // Section label — black banner with white ALL-CAPS text
  var addLabel = function(slide, text, x, y, w) {
    addShape(slide, { x: x, y: y, w: w || 4.6, h: 0.24, fill: C.BLACK });
    addText(slide, text, {
      x: x + 0.06, y: y, w: (w || 4.6) - 0.12, h: 0.24,
      fontSize: 8, bold: true, color: C.WHITE, valign: "middle"
    });
  };


  // ════════════════════════════════════════════════════════════════
  // SLIDE 1 — TITLE
  // ════════════════════════════════════════════════════════════════
  (function() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(C.NAVY);

    // Teal left accent bar
    addShape(s, { x: 0, y: 0, w: 0.18, h: 5.625, fill: C.TEAL });
    addShape(s, { x: 0.18, y: 0, w: 0.05, h: 5.625, fill: C.AMBER });

    addText(s, "AI Outputs Are Trusted Before\nThey're Understood", {
      x: 0.55, y: 0.6, w: 9.0, h: 1.3,
      fontSize: 36, bold: true, color: C.WHITE, valign: "middle"
    });
    addText(s, "Building Decision Infrastructure for the Age of AI Research", {
      x: 0.55, y: 1.9, w: 9.0, h: 0.4,
      fontSize: 16, color: "#A0D4DA", valign: "middle"
    });

    addShape(s, { x: 0.55, y: 2.4, w: 7.5, h: 0.4, fill: C.TEAL });
    addText(s, "Perplexity Decision Brief Protocol (PDBP) — Five Modules. One Goal: Judgment-Ready Research.", {
      x: 0.55, y: 2.4, w: 7.5, h: 0.4,
      fontSize: 11, bold: true, color: C.WHITE, align: "center", valign: "middle"
    });

    addText(s, "Perplexity processes 780 million queries per month. Its users are making financial decisions, regulatory filings, career pivots, and clinical judgments — based on outputs that signal 'research complete' before verification has begun. This deck proposes PDBP: a protocol that changes not just what AI returns, but how users engage with, evaluate, and take accountability for AI-generated research.", {
      x: 0.55, y: 2.95, w: 8.9, h: 0.7,
      fontSize: 10, color: "#B0C4CE", italic: true
    });

    var stats = [
      { val: "780M", label: "queries/month\nat Perplexity scale" },
      { val: "37%", label: "error rate\nTow Center 2025" },
      { val: "21.87", label: "citations/response\n— citation theater" }
    ];
    stats.forEach(function(st, i) {
      var sx = 0.55 + i * 3.15;
      addShape(s, { x: sx, y: 3.85, w: 2.95, h: 1.3, fill: "#1C3A5A", line: C.TEAL });
      addText(s, st.val, {
        x: sx, y: 3.92, w: 2.95, h: 0.6,
        fontSize: 36, bold: true, color: C.AMBER, align: "center", valign: "middle"
      });
      addText(s, st.label, {
        x: sx, y: 4.55, w: 2.95, h: 0.5,
        fontSize: 10, color: "#A0C8D0", align: "center", valign: "top"
      });
    });

    addText(s, "All user research conducted with informed consent  ·  All data anonymised  ·  No sensitive prompts stored", {
      x: 0.3, y: 5.3, w: 9.4, h: 0.25,
      fontSize: 8, color: "#5A7A8A", align: "center", italic: true
    });
  })();


  // ════════════════════════════════════════════════════════════════
  // SLIDE 2 — MARKET LANDSCAPE & THE STRATEGIC GROWTH OPPORTUNITY GAP
  // ════════════════════════════════════════════════════════════════
  (function() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(C.OFF_WHITE);
    addSlideHeader(s, "Market Landscape & The Strategic Growth Opportunity Gap");

    // LEFT COLUMN
    addLabel(s, "HOW USERS EVALUATE AI OUTPUTS TODAY (Survey n=5)", 0.2, 0.95, 4.6);
    var behaviours = [
      "80% skim citation badges — never open a single source",
      "60% cannot distinguish factual from inferential claims in prose",
      "60% describe AI trust as 'unpredictable' — no calibration loop",
      "60% want to know what was EXCLUDED (top open-ended request)",
      "40% surprised by unstated assumptions discovered post-action"
    ];
    behaviours.forEach(function(b, i) {
      addText(s, "➤  " + b, {
        x: 0.28, y: 1.24 + i * 0.22, w: 4.44, h: 0.22,
        fontSize: 8.5, color: C.DARK
      });
    });

    addLabel(s, "CORE ISSUE", 0.2, 2.4, 4.6);
    addText(s, "The gap is not between output quality and accuracy. The gap is between output quality and perceived quality. Perplexity Pro — the paid product positioned for serious research — was more definitively wrong, not less (Tow Center 2025). No existing product ties output format to user decision context and calibration training simultaneously.", {
      x: 0.28, y: 2.68, w: 4.44, h: 0.7,
      fontSize: 8.5, color: C.DARK
    });

    addLabel(s, "WHY CURRENT APPROACHES FAIL", 0.2, 3.44, 4.6);
    var failRows = [
      [
        { text: "Approach", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "Optimises", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "Why It Fails", options: { bold: true, color: C.WHITE, fill: C.BLACK } }
      ],
      ["Inline Citations", "Provenance", "80% never click; visibility ≠ verification"],
      ["Trust Scores", "Speed of decision", "Black-box; scores don't predict reliance"],
      ["Fact-Check Bots", "Binary correctness", "Ignores inference, normative claims, gaps"],
      ["Reasoning Traces", "Transparency", "Post-hoc narrative, not ground truth"],
      ["Explainability Panels", "Info volume", "80% don't open optional panels"],
      ["Confidence Labels", "Model uncertainty", "Model confidence ≠ decision appropriateness"]
    ];
    addTable(s, failRows, {
      x: 0.2, y: 3.72, w: 4.6, h: 1.8,
      fontSize: 7.5, headerBold: true, headerFill: C.BLACK, headerColor: C.WHITE
    });

    // RIGHT COLUMN
    addLabel(s, "HOW PERPLEXITY COMPARES", 5.0, 0.95, 4.8);
    var compRows = [
      [
        { text: "Feature", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "PDBP\n(Proposed)", options: { bold: true, color: C.WHITE, fill: C.TEAL } },
        { text: "Perplexity\n(Current)", options: { bold: true, color: C.WHITE, fill: C.MID } },
        { text: "ChatGPT", options: { bold: true, color: C.WHITE, fill: C.MID } },
        { text: "Google\nAI", options: { bold: true, color: C.WHITE, fill: C.MID } }
      ],
      ["Captures decision context\nbefore retrieval", { text: "Yes, via\nIntent Contract", options: { bold: true, fill: C.GREEN_LIGHT } }, "No", "No", "No"],
      ["Separates fact from\ninference visually", { text: "Yes, typed\nbadges", options: { bold: true, fill: C.GREEN_LIGHT } }, "No", "No", "No"],
      ["Generates alternative\nreadings from same sources", { text: "Yes, Epistemic\nFork", options: { bold: true, fill: C.GREEN_LIGHT } }, "No", "No", "No"],
      ["Calibration feedback\non trust patterns", { text: "Yes, Calibrated\nCommit", options: { bold: true, fill: C.GREEN_LIGHT } }, "No", "No", "No"],
      ["Surfaces gaps vs user's\nspecific decision", { text: "Yes, Brief §C", options: { bold: true, fill: C.GREEN_LIGHT } }, "No", "Partial", "No"],
      ["Audit trail for\ndecision rationale", { text: "Yes, auto", options: { bold: true, fill: C.GREEN_LIGHT } }, "No", "No", "No"]
    ];
    addTable(s, compRows, {
      x: 5.0, y: 1.24, w: 4.8, h: 2.65,
      fontSize: 7, headerBold: true, headerFill: C.BLACK, headerColor: C.WHITE
    });

    addLabel(s, "THE SCALE OF OPPORTUNITY", 5.0, 4.05, 4.8);
    var scaleStats = [
      { val: "780M", sub: "queries/month\nPerplexity scale" },
      { val: "37%", sub: "error rate\nTow Center 2025" },
      { val: "20-30M", sub: "monthly active\nusers" },
      { val: "$167B", sub: "AI productivity\nmarket by 2030" }
    ];
    scaleStats.forEach(function(st, i) {
      var sx = 5.0 + i * 1.2;
      addShape(s, { x: sx, y: 4.34, w: 1.12, h: 0.8, fill: C.WHITE, line: C.BORDER });
      addText(s, st.val, { x: sx, y: 4.36, w: 1.12, h: 0.38, fontSize: 14, bold: true, color: C.TEAL, align: "center", valign: "middle" });
      addText(s, st.sub, { x: sx, y: 4.74, w: 1.12, h: 0.38, fontSize: 6.5, color: C.MID, align: "center" });
    });
    addText(s, "At 20 to 30 million monthly active users, even a small improvement in session decision quality translates into significant retention and conversion uplift.", {
      x: 5.0, y: 5.2, w: 4.8, h: 0.32,
      fontSize: 7.5, italic: true, color: C.MID
    });
  })();


  // ════════════════════════════════════════════════════════════════
  // SLIDE 3 — PRODUCT FRICTION AUDIT
  // ════════════════════════════════════════════════════════════════
  (function() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(C.OFF_WHITE);
    addSlideHeader(s, "Product Friction Audit: Deconstructing the Activation Breakdown");

    // LEFT
    addLabel(s, "FOUR STRUCTURAL REASONS PERPLEXITY IS UNIQUELY EXPOSED TO PEC", 0.2, 0.95, 4.6);
    var reasons = [
      { t: "Synthesis-as-Answer: ", b: "RAG compresses multiple heterogeneous sources into a single coherent voice. The user reads one polished paragraph and loses awareness that the evidence may be contradictory, thin, or irrelevant to their decision." },
      { t: "Citation Theater: ", b: "21.87 citation badges per response. These badges signal diligence but 80% of users never open them. Citations provide provenance visibility without verification behaviour." },
      { t: "Pro Tier Overconfidence: ", b: "Tow Center finding — the paid product produces more definitively wrong outputs, not less. The premium product amplifies PEC in the users who can least afford it." },
      { t: "No Decision Object: ", b: "Every AI search output is optimised for reading, not deciding. No structure says: here is what we found, didn't find, and what you still need to do." }
    ];
    reasons.forEach(function(r, i) {
      addText(s, "➤  " + r.t + r.b, {
        x: 0.28, y: 1.24 + i * 0.52, w: 4.44, h: 0.5,
        fontSize: 8, color: C.DARK
      });
    });

    addLabel(s, "WHAT THE PRODUCT NEEDS TO DO", 0.2, 3.36, 4.6);
    addText(s, "Shift the experience from manual re-prompting to decision-context-aware output by surfacing Intent Contracts at the moment of query, when the cost of premature closure is highest. The product must replace the essay with a Decision Brief that makes incompleteness visible instead of hiding it in paragraph fluency.", {
      x: 0.28, y: 3.64, w: 4.44, h: 0.65,
      fontSize: 8.5, color: C.DARK
    });

    addLabel(s, "WHAT THE CURRENT UX OPTIMISES", 0.2, 4.36, 4.6);
    addText(s, "➤  Fast lookup: citation badges signal diligence without enabling it\n➤  Narrative fluency: polished prose induces closure before evaluation\n➤  Volume signalling: 21.87 citations/response substitutes quantity for verification\n\nIt was not designed for users who need to evaluate, verify, and audit AI research before making irreversible professional decisions.", {
      x: 0.28, y: 4.64, w: 4.44, h: 0.85,
      fontSize: 8, color: C.DARK
    });

    // RIGHT — UX AUDIT FAILURE POINTS
    addLabel(s, "UX AUDIT — FIVE FAILURE POINTS IN CURRENT AI SEARCH", 5.0, 0.95, 4.8);
    var auditRows = [
      [
        { text: "Failure Point", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "What Happens", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "User Impact", options: { bold: true, color: C.WHITE, fill: C.BLACK } }
      ],
      [
        { text: "Essay-first\ndesign", options: { fill: C.RED_LIGHT } },
        "Polished narrative arrives\nbefore any evaluation tool",
        "PEC triggers in <5 seconds.\nMost users never evaluate."
      ],
      [
        { text: "Citation\ntheater", options: { fill: C.RED_LIGHT } },
        "21 badges signal 'research\ndone' — 80% never click",
        "Provenance visible but\nverification never happens"
      ],
      [
        "No claim\ntyping",
        "Factual, inferential, and\nnormative claims look identical",
        "Users apply uniform trust\nto heterogeneous evidence"
      ],
      [
        "No decision\ncontext",
        "Query treated generically;\nno stakes or success criteria",
        "Answer optimised for query,\nnot for the actual decision"
      ],
      [
        { text: "No audit\ntrail", options: { fill: C.AMBER_LIGHT } },
        "No record of evaluation\nprocess or judgment rationale",
        "Cannot reconstruct why\na decision was trusted"
      ]
    ];
    addTable(s, auditRows, {
      x: 5.0, y: 1.24, w: 4.8, h: 2.4,
      fontSize: 7.5, headerBold: true, headerFill: C.BLACK, headerColor: C.WHITE
    });

    // SIX-STAGE BREAKDOWN TABLE
    addLabel(s, "SIX-STAGE BREAKDOWN — WHERE JUDGMENT FAILS", 5.0, 3.78, 4.8);
    var stageRows = [
      [
        { text: "Stage", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "Should Happen", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "Actually Happens", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "Failure", options: { bold: true, color: C.WHITE, fill: C.BLACK } }
      ],
      ["User Intent", "Define decision context", "Stakes unstated", "J2: Context collapse"],
      ["Prompting", "Decision-weighted retrieval", "Generic retrieval", "J2 persists"],
      [{ text: "Output Gen.", options: { fill: C.RED_LIGHT } }, { text: "Preserve heterogeneity", options: { fill: C.RED_LIGHT } }, { text: "Single authority voice", options: { fill: C.RED_LIGHT } }, { text: "J1: Wrong heuristic", options: { bold: true, fill: C.RED_LIGHT } }],
      [{ text: "Interpretation", options: { fill: C.RED_LIGHT } }, { text: "Type claims correctly", options: { fill: C.RED_LIGHT } }, { text: "All claims identical", options: { fill: C.RED_LIGHT } }, { text: "J1: Inference = Fact", options: { bold: true, fill: C.RED_LIGHT } }],
      [{ text: "Evaluation", options: { fill: C.RED_LIGHT } }, { text: "Inspect and calibrate", options: { fill: C.RED_LIGHT } }, { text: "80% skim; no feedback", options: { fill: C.RED_LIGHT } }, { text: "J3 + J4", options: { bold: true, fill: C.RED_LIGHT } }],
      ["Action", "Document verification", "No record exists", "J5: No audit trail"]
    ];
    addTable(s, stageRows, {
      x: 5.0, y: 4.06, w: 4.8, h: 1.45,
      fontSize: 7, headerBold: true, headerFill: C.BLACK, headerColor: C.WHITE
    });
  })();


  // ════════════════════════════════════════════════════════════════
  // SLIDE 4 — RESEARCH FRAMEWORK: VALIDATING CRITICAL ACTIVATION HYPOTHESES
  // ════════════════════════════════════════════════════════════════
  (function() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(C.OFF_WHITE);
    addSlideHeader(s, "Research Framework: Validating Critical Activation Hypotheses");

    // LEFT
    addLabel(s, "TARGET SEGMENT", 0.2, 0.95, 4.0);
    addText(s, "High-frequency, high-stakes knowledge workers: professionals using Perplexity 2+ times per day for research synthesis, competitive analysis, policy navigation, financial due diligence, regulatory interpretation, and career-defining decisions. Small as a proportion of all users but disproportionately responsible for retention, advocacy, and organic growth.", {
      x: 0.28, y: 1.24, w: 3.84, h: 0.72,
      fontSize: 8.5, color: C.DARK
    });

    // Research sample pills
    var pills = ["5 Survey respondents", "3 Task observations", "2 Recall walkthroughs"];
    pills.forEach(function(p, i) {
      addShape(s, { x: 0.28 + i * 1.32, y: 2.0, w: 1.24, h: 0.22, fill: C.WHITE, line: C.BORDER });
      addText(s, p, { x: 0.28 + i * 1.32, y: 2.0, w: 1.24, h: 0.22, fontSize: 7, color: C.DARK, align: "center", valign: "middle" });
    });

    addLabel(s, "USER'S UNMET NEEDS", 0.2, 2.32, 4.0);
    var needs = [
      "Persistent preference memory across sessions without manual setup",
      "In-conversation evaluation without leaving the chat interface",
      "Plain-English rules that are readable, editable, and inspectable",
      "Transparency into what AI observed, surfaced in the output",
      "Per-session toggle to disable a rule without deleting it permanently"
    ];
    needs.forEach(function(n, i) {
      addText(s, "➤  " + n, { x: 0.28, y: 2.6 + i * 0.2, w: 3.84, h: 0.2, fontSize: 8, color: C.DARK });
    });

    addLabel(s, "WHY THIS SEGMENT?", 0.2, 3.68, 4.0);
    var whySeg = [
      "Return for same task types repeatedly — pattern value highest",
      "Bring the highest contextual input per session",
      "Work across multiple workstreams with distinct decision needs",
      "Engage in longer sessions — more context built, more pain at session end",
      "Consistent output each time is a professional requirement",
      "Highest cost of getting it wrong (irreversible decisions)"
    ];
    whySeg.forEach(function(w, i) {
      addText(s, "➤  " + w, { x: 0.28, y: 3.96 + i * 0.2, w: 3.84, h: 0.2, fontSize: 7.5, color: C.DARK });
    });

    // RIGHT — HYPOTHESES TESTED TABLE
    addLabel(s, "HYPOTHESES TESTED", 4.4, 0.95, 5.4);
    var hypRows = [
      [
        { text: " ", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "The Hypothesis", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "Question Being Tested", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "Key Finding", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "Verdict", options: { bold: true, color: C.WHITE, fill: C.BLACK } }
      ],
      ["H1", "Users are already\nbuilding workarounds\non their own", "If this is a real problem,\nare they solving it\nthemselves?", "80% skim citations.\n60% can't tell fact from\ninference. No workaround.", { text: "Strongly\nConfirmed", options: { bold: true, fill: C.GREEN_LIGHT } }],
      ["H2", "Inconsistent outputs\ncause users to quit\nPerplexity for specific\ntasks", "Is the frustration bad\nenough to push users\naway entirely?", "60% describe trust as\n'unpredictable.' Users\nblame themselves, not\nthe product.", { text: "Strongly\nConfirmed", options: { bold: true, fill: C.GREEN_LIGHT } }],
      ["H3", "Users know what good\nlooks like but cannot\ncommunicate it to AI", "Is the gap about\nknowledge or\ncommunication?", "60% want excluded info\nsurfaced. 40% surprised\nby hidden assumptions.\n78-point gap.", { text: "Strongly\nConfirmed", options: { bold: true, fill: C.GREEN_LIGHT } }],
      ["H4", "The time lost to output\ncorrections is quantifiable\nand significant", "Can a concrete effort\ncost be attached to\nthis problem?", "80% never click citations.\nVerification effort >120s\nbaseline. 3+ rounds\ncorrecting prompts.", { text: "Confirmed", options: { bold: true, fill: C.GREEN_LIGHT } }],
      ["H5", "Users will trust AI-\nlearned preferences only\nwith visible control\nover what is saved", "How much control is\nneeded before users are\ncomfortable?", "100% accept extra friction\non high-stakes. 60% want\nDevil's Advocate. Suggest-\nand-confirm preferred.", { text: "Strongly\nConfirmed", options: { bold: true, fill: C.GREEN_LIGHT } }],
      ["H6", "Decision structure has\nnever been surfaced to\na user who needed it,\ninside the product", "Is this a discoverability\ngap or a product\nintelligence gap?", "No AI search product\ncaptures decision context.\nPDBP is structurally novel\nacross the category.", { text: "Partially\nConfirmed", options: { bold: true, fill: C.GREEN_LIGHT } }]
    ];
    addTable(s, hypRows, {
      x: 4.4, y: 1.24, w: 5.4, h: 4.3,
      fontSize: 6.5, headerBold: true, headerFill: C.BLACK, headerColor: C.WHITE
    });
  })();


  // ════════════════════════════════════════════════════════════════
  // SLIDE 5 — DATA SYNTHESIS
  // ════════════════════════════════════════════════════════════════
  (function() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(C.OFF_WHITE);
    addSlideHeader(s, "Data Synthesis: Quantifying Frustration & Inconsistency");

    // LEFT — Qualitative
    addLabel(s, "QUALITATIVE FINDINGS", 0.2, 0.95, 4.6);
    var findings = [
      { t: "The Quality Cliff: ", b: "Users describe receiving an exceptional output and then being unable to recreate it. The cause is unknown to them. Self-blame follows, leading to progressively longer prompts. Output quality does not return." },
      { t: "Scroll-Back Behaviour: ", b: "Users scroll chat history to locate the session where the AI produced the right output. This is a persistence problem, not a memory problem." },
      { t: "Reflection Mismatch: ", b: "Users want to understand why output quality drifted across sessions, not simply how many corrections were made." }
    ];
    findings.forEach(function(f, i) {
      addText(s, "➤  " + f.t + f.b, {
        x: 0.28, y: 1.24 + i * 0.46, w: 4.44, h: 0.44,
        fontSize: 8, color: C.DARK
      });
    });

    addLabel(s, "THE PATTERN THAT KEEPS REPEATING", 0.2, 2.66, 4.6);
    var patRows = [
      [
        { text: "What Triggers It", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "What Users Do", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "What They Think", options: { bold: true, color: C.WHITE, fill: C.BLACK } }
      ],
      [{ text: "Frustration after output\ngoes wrong", options: { fill: C.RED_LIGHT } }, "Scroll back through old\nchats for a good session", "They assume they\nprompted wrong"],
      [{ text: "Relief when it works\ntemporarily", options: { fill: C.AMBER_LIGHT } }, "Start maintaining a doc\nwith prompt instructions", "They think better\nprompting is the key"],
      ["Confusion when identical\ntasks differ", "Write longer prompts\neach time", "They accept inconsistency\nas how AI works"],
      [{ text: "Anxiety before a high-\nstake output", options: { fill: C.RED_LIGHT } }, "Spend 3+ rounds\ncorrecting the prompt", "They never connect to\na missing product feature"]
    ];
    addTable(s, patRows, {
      x: 0.2, y: 2.94, w: 4.6, h: 1.8,
      fontSize: 7, headerBold: true, headerFill: C.BLACK, headerColor: C.WHITE
    });

    addText(s, "Unprompted Upgrade Signal: 100% of interviewees accept extra friction on high-stakes queries. At approximately 20M monthly active users, even a 1% conversion lift from solving output trust represents significant incremental ARR at the Pro price point, making this the highest-leverage consumer monetisation opportunity currently untested.", {
      x: 0.2, y: 4.82, w: 4.6, h: 0.65,
      fontSize: 7.5, bold: true, color: C.TEAL_DARK
    });

    // RIGHT — Personas
    addLabel(s, "USER PERSONAS", 5.0, 0.95, 4.8);

    addShape(s, { x: 5.0, y: 1.24, w: 4.8, h: 1.35, fill: C.WHITE, line: C.BORDER });
    addText(s, "Vikas K · Product Manager · Enterprise PM · Perplexity Pro · 8 months", {
      x: 5.1, y: 1.26, w: 4.6, h: 0.2, fontSize: 8.5, bold: true, color: C.DARK
    });
    addText(s, "➤  Produces competitive analyses and market sizing memos weekly\n➤  Copied $28.4B market figure into slides without clicking citation\n➤  Source was actually a developer forum post quoting a 2-year-old Gartner article\n➤  Has never used any evaluation tool beyond skimming citation badges", {
      x: 5.1, y: 1.48, w: 4.6, h: 0.65, fontSize: 7.5, color: C.MID
    });
    addText(s, "\"I got this perfect output once. The structure was exactly right, the tone was mine. I have been trying to get back to that ever since. I never have.\"", {
      x: 5.1, y: 2.18, w: 4.6, h: 0.35, fontSize: 7.5, italic: true, color: C.TEAL_DARK
    });

    addShape(s, { x: 5.0, y: 2.68, w: 4.8, h: 1.35, fill: C.WHITE, line: C.BORDER });
    addText(s, "Srivatsan S · Sr Software Engineer · IT Consulting · Pro · 4 months", {
      x: 5.1, y: 2.7, w: 4.6, h: 0.2, fontSize: 8.5, bold: true, color: C.DARK
    });
    addText(s, "➤  Uses Perplexity for architecture decisions and technical documentation\n➤  Spent 15 minutes asking follow-ups — noticed AI skipped a concurrency risk\n➤  High cognitive load trying to track what AI assumed vs. what was backed by docs\n➤  Citations are 'like security theater at the airport'", {
      x: 5.1, y: 2.92, w: 4.6, h: 0.65, fontSize: 7.5, color: C.MID
    });
    addText(s, "\"The blank box with no guidance felt like writing code from scratch. I gave up and went back to re-prompting.\"", {
      x: 5.1, y: 3.62, w: 4.6, h: 0.35, fontSize: 7.5, italic: true, color: C.TEAL_DARK
    });

    addLabel(s, "USER'S RECALL-BASED WALKTHROUGH", 5.0, 4.12, 4.8);
    var recalls = [
      "I use Perplexity almost every day for work",
      "I always end up writing the same instructions, same format, same tone, same structure",
      "If Perplexity had just asked me two questions after a good output, I would have set it up that day",
      "I know the output can be wrong. I just never felt like the product helped me catch it",
      "The next day I opened a new chat and typed my instructions again from scratch"
    ];
    recalls.forEach(function(r, i) {
      addText(s, "➤  " + r, { x: 5.08, y: 4.4 + i * 0.18, w: 4.64, h: 0.18, fontSize: 7, color: C.DARK });
    });
  })();


  // ════════════════════════════════════════════════════════════════
  // SLIDE 6 — PROBLEM FRAMING CANVAS
  // ════════════════════════════════════════════════════════════════
  (function() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(C.OFF_WHITE);
    addSlideHeader(s, "Problem Framing Canvas");

    var cards = [
      // Row 1
      { x: 0.2,  y: 0.95, w: 3.12, h: 2.15, title: "⚠️  WHAT IS THE TRUE PROBLEM?",
        body: "Recurring structured tasks demand consistent output quality, yet users re-enter the same format, tone, and structure preferences every session. Perplexity has a native citation and synthesis layer built to solve exactly this, but it has never been triggered mid-conversation. The capability exists within the product. The mechanism to surface it at the moment it would matter most does not." },
      { x: 3.44, y: 0.95, w: 3.12, h: 2.15, title: "👥  WHO ARE THE CUSTOMERS?",
        body: "Recurring Task Power Users\n➤ Subscription Tier: Hold paid Pro or Max subscriptions and use Perplexity daily\n➤ Behaviour: Perform the same category of structured tasks repeatedly at least 2× per week\n➤ Workarounds: Have already built external manual memory systems, such as Notion prompt libraries, saved chats, and copy-paste templates\n➤ Status: Motivated and pattern-blind, frustrated that the tool does not learn their specific standards" },
      { x: 6.68, y: 0.95, w: 3.12, h: 2.15, title: "📊  HOW DO WE KNOW IT'S REAL?",
        body: "➤ Qualitative: Quality cliff described across all 3 observations. Users cannot recreate their best outputs. They scroll back through chat history. They blame themselves. They accept inconsistency as normal.\n➤ Quantitative: 80% citation blindness. 60% can't tell fact from inference. 60% unpredictable trust. 100% accept friction on high-stakes queries. The cost is measurable and large." },

      // Row 2
      { x: 0.2,  y: 3.2, w: 3.12, h: 2.25, title: "💡  VALUE FOR THE USER",
        body: "➤ Output matches their standard on the first attempt, every time\n➤ The correction loop is permanently broken. No re-prompting, no pasted instructions\n➤ Every preference is readable and editable before going live\n➤ Capture happens at peak satisfaction, right after a great output\n➤ Users shift from managing Perplexity to relying on it" },
      { x: 3.44, y: 3.2, w: 3.12, h: 2.25, title: "💰  VALUE FOR THE BUSINESS",
        body: "➤ Decision-quality users churn less. Each session with PDBP creates a personalised switching cost\n➤ Calibration and preference signals build a compounding dataset that grows more defensible over time\n➤ Confirm-first design is a trust advantage over competitors who apply silently\n➤ Enterprise legal, finance, and medical teams need audit trails. PDBP creates that documentation." },
      { x: 6.68, y: 3.2, w: 3.12, h: 2.25, title: "🔥  WHY SOLVE THIS NOW?", fill: C.AMBER_LIGHT,
        body: "➤ Competitive Urgency: Competitors are already shipping persistence features. As competitors add memory, the perception gap regarding Perplexity's decision support capability grows.\n➤ Untapped Revenue: 100% friction-tolerance signal from research — massive unexploited conversion lever.\n➤ Time-Sensitivity: The first AI to build reliable decision infrastructure creates compounding advantages that are difficult for late-movers to disrupt." }
    ];
    cards.forEach(function(c) {
      addShape(s, { x: c.x, y: c.y, w: c.w, h: c.h, fill: c.fill || C.WHITE, line: C.BLACK, lineWeight: 1.5 });
      addText(s, c.title, { x: c.x + 0.08, y: c.y + 0.04, w: c.w - 0.16, h: 0.26, fontSize: 8.5, bold: true, color: C.BLACK });
      addText(s, c.body, { x: c.x + 0.08, y: c.y + 0.32, w: c.w - 0.16, h: c.h - 0.38, fontSize: 7.5, color: C.DARK });
    });
  })();


  // ════════════════════════════════════════════════════════════════
  // SLIDE 7 — PROPOSED SOLUTIONS
  // ════════════════════════════════════════════════════════════════
  (function() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(C.OFF_WHITE);
    addSlideHeader(s, "Proposed Solutions");

    var solutions = [
      {
        title: "Solution 1: Passive Judgment Sidebar",
        badge: "",
        what: "Essay answer unchanged. Side panel shows claim types, assumptions, gaps, source disagreements, and a devil's advocate view. User can open panel at will.",
        why: "➤  Directly maps to 60% user request for gap visibility and 40% request for assumption surfacing\n➤  Low engineering lift — async metadata generation\n➤  High feasibility score",
        fail: "The essay still arrives first. The polished narrative induces closure before the user ever opens the panel. 80% of users never open optional panels even when they want the information. Adding metadata to a closure-inducing artifact is like putting calorie labels on a buffet. The format of consumption dominates the label content. Innovation ceiling too low.",
        hyp: "H2 Abandonment, H3 Communication gap, H5 Trust model and H6 Discovery"
      },
      {
        title: "Solution 2: Autonomous Fact-Verification Agent",
        badge: "",
        what: "Second AI model performs a pass over the generated output and labels each sentence as Supported / Unsupported / Contested. Labels are inline, color-coded.",
        why: "➤  Creates a Decision Object on day one, before any frustration accumulates\n➤  Requires no great output to exist yet; works at account creation\n➤  Confirm-first design aligns with H5 trust requirement\n➤  Surfaces verification proactively; closes H6 for new users",
        fail: "Three structural problems: (1) AI-on-AI verification is a black box on a black box. (2) Fact-checking ignores inferential, normative, and completeness claims. (3) At 780M queries/month, a second full model pass is economically implausible without severe quality trade-offs.",
        hyp: "H3 Communication gap and H6 Discovery"
      },
      {
        title: "Solution 3: PDBP (Selected) 🏆",
        badge: "CHOSEN",
        what: "Replace the essay with a structured Decision Brief. Capture decision context before retrieval via Intent Contract. Gate action on high-stakes sessions behind Calibrated Commit. Offer Epistemic Fork on irreversible queries. Build user skill via Epistemic Fitness.",
        why: "➤  Starts from evidence, not intent; encodes what great actually looks like (H3)\n➤  Surfaces at the highest-intent moment in any session, immediately post-output (H6)\n➤  Suggest-and-confirm design directly matches H5's 83% preference finding\n➤  Eliminates the quality cliff by making the exceptional output the new baseline (H2)",
        fail: "",
        hyp: "H2 Abandonment, H3 Communication gap, H5 Trust model and H6 Discovery"
      }
    ];
    solutions.forEach(function(sol, i) {
      var cx = 0.2 + i * 3.25;
      var isChosen = i === 2;
      addShape(s, { x: cx, y: 0.95, w: 3.12, h: 4.55, fill: C.WHITE, line: isChosen ? C.TEAL : C.BLACK, lineWeight: isChosen ? 2 : 1 });

      addText(s, sol.title, { x: cx + 0.08, y: 0.98, w: 2.96, h: 0.26, fontSize: 9, bold: true, color: isChosen ? C.TEAL : C.BLACK });

      addText(s, "WHAT IT DOES", { x: cx + 0.08, y: 1.28, w: 2.96, h: 0.18, fontSize: 7.5, bold: true, color: C.BLACK });
      addText(s, sol.what, { x: cx + 0.08, y: 1.46, w: 2.96, h: 0.65, fontSize: 7.5, color: C.DARK });

      addText(s, "WHY IT MIGHT WORK", { x: cx + 0.08, y: 2.16, w: 2.96, h: 0.18, fontSize: 7.5, bold: true, color: C.BLACK });
      addText(s, sol.why, { x: cx + 0.08, y: 2.34, w: 2.96, h: 0.75, fontSize: 7, color: C.DARK });

      if (sol.fail) {
        addText(s, isChosen ? "" : "WHY IT WAS DEPRIORITISED", { x: cx + 0.08, y: 3.14, w: 2.96, h: 0.18, fontSize: 7.5, bold: true, color: C.BLACK });
        addText(s, sol.fail, { x: cx + 0.08, y: 3.32, w: 2.96, h: 0.88, fontSize: 7, color: C.MID });
      }

      addText(s, "HYPOTHESES ADDRESSED", { x: cx + 0.08, y: 4.26, w: 2.96, h: 0.16, fontSize: 7, bold: true, color: C.BLACK });
      addText(s, sol.hyp, { x: cx + 0.08, y: 4.42, w: 2.96, h: 0.5, fontSize: 7, color: C.TEAL_DARK });
    });
  })();


  // ════════════════════════════════════════════════════════════════
  // SLIDE 8 — SOLUTION PRIORITISATION AND DESIGN
  // ════════════════════════════════════════════════════════════════
  (function() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(C.OFF_WHITE);
    addSlideHeader(s, "Solution Prioritization and Design");

    // LEFT — SCORING MATRIX
    addLabel(s, "PRIORITISATION FRAMEWORK: SCORING MATRIX", 0.2, 0.95, 3.5);
    var scoreRows = [
      [
        { text: "Solution", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "User\nInsight", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "Judgment\nDev", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "Trust\nEthics", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "Diff.", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "Feasib.", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "Score", options: { bold: true, color: C.WHITE, fill: C.BLACK } }
      ],
      [{ text: "✓ PDBP", options: { bold: true, fill: C.GREEN_LIGHT } }, { text: "5", options: { fill: C.GREEN_LIGHT } }, { text: "5", options: { fill: C.GREEN_LIGHT } }, { text: "5", options: { fill: C.GREEN_LIGHT } }, { text: "5", options: { fill: C.GREEN_LIGHT } }, { text: "4", options: { fill: C.GREEN_LIGHT } }, { text: "4.85", options: { bold: true, fill: C.GREEN_LIGHT } }],
      ["Passive Sidebar", "4", "3", "4", "3", "5", "3.85"],
      ["Fact-Check Agent", "3", "2", "2", "3", "3", "2.55"]
    ];
    addTable(s, scoreRows, {
      x: 0.2, y: 1.24, w: 3.5, h: 1.2,
      fontSize: 7.5, headerBold: true, headerFill: C.BLACK, headerColor: C.WHITE
    });
    addText(s, "Weights: User Insight 25% · Judgment Dev 25% · Trust Ethics 20% · Differentiation 15% · Feasibility 15%", {
      x: 0.2, y: 2.48, w: 3.5, h: 0.2, fontSize: 6.5, italic: true, color: C.MID
    });

    addLabel(s, "WHY PDBP WINS ON EVERY DIMENSION", 0.2, 2.76, 3.5);
    addText(s, "➤  Reach is highest because it activates on every high-stakes query from every Pro user. No opt-in required. It reaches the full eligible base automatically.\n\n➤  Impact is must-have because it is the only solution that solves both the quality cliff (H2) and the discovery gap (H6) at the same time. No other option does both.\n\n➤  Confidence is highest because three independent data points all point to the same design. H3 says capture from evidence not intent. H5 says confirm before applying. H6 says surface it in the chat.\n\n➤  Effort is manageable because the protocol runs on existing session data. No new infrastructure and no new data pipeline required.", {
      x: 0.28, y: 3.04, w: 3.34, h: 1.65,
      fontSize: 7.5, color: C.DARK
    });

    addShape(s, { x: 0.2, y: 4.76, w: 3.5, h: 0.38, fill: C.TEAL_LIGHT, line: C.TEAL });
    addText(s, "\"Every other approach asks users what they want before they have seen it. This one waits until they have seen it, then offers to save it.\"", {
      x: 0.28, y: 4.78, w: 3.34, h: 0.34, fontSize: 7.5, italic: true, color: C.TEAL_DARK
    });

    // CENTRE — USER FLOW DIAGRAM (blank placeholder)
    addLabel(s, "USER FLOW DIAGRAM", 3.85, 0.95, 2.8);
    addShape(s, { x: 3.85, y: 1.24, w: 2.8, h: 3.9, fill: C.WHITE, line: C.BORDER });
    addText(s, "[User Flow Diagram Placeholder]\n\nInsert user flow diagram here showing:\n\nUser Query → Intent Contract → RAG (contract-weighted) → Decision Brief Engine → Calibrated Commit Gate → [if irreversible] Epistemic Fork → Export + Documented Judgment Record", {
      x: 3.95, y: 1.6, w: 2.6, h: 3.2,
      fontSize: 8, color: C.MID, italic: true, align: "center", valign: "middle"
    });

    // RIGHT — SYSTEM ARCHITECTURE
    addLabel(s, "SYSTEM ARCHITECTURE", 6.8, 0.95, 3.0);
    var layers = [
      { name: "Perplexity Search", sub: "" },
      { name: "L1 — Session Telemetry", sub: "Query context · citation chains" },
      { name: "L2 — Intent Contract Engine", sub: "Decision · stakes · goodEnough" },
      { name: "L3 — Decision Brief Compiler", sub: "Claim typing · section assembly" },
      { name: "L4 — Calibration Engine", sub: "Blind rating · reveal · rationale" },
      { name: "L5 — Epistemic Fork Generator", sub: "Conservative · Expansive readings" },
      { name: "L6 — Feedback Loop", sub: "Calibration delta tracking" }
    ];
    layers.forEach(function(l, i) {
      var ly = 1.24 + i * 0.56;
      addShape(s, { x: 6.8, y: ly, w: 3.0, h: 0.48, fill: i === 0 ? C.TEAL : C.TEAL_LIGHT, line: C.TEAL });
      addText(s, l.name, { x: 6.88, y: ly + 0.02, w: 2.84, h: 0.2, fontSize: 8, bold: true, color: i === 0 ? C.WHITE : C.TEAL_DARK, align: "center", valign: "middle" });
      if (l.sub) addText(s, l.sub, { x: 6.88, y: ly + 0.22, w: 2.84, h: 0.2, fontSize: 7, color: C.MID, align: "center", valign: "middle" });
    });
    addText(s, "Output structure only · On-session · User-controlled", {
      x: 6.8, y: 5.2, w: 3.0, h: 0.2, fontSize: 7, italic: true, color: C.MID, align: "center"
    });
  })();


  // ════════════════════════════════════════════════════════════════
  // SLIDE 9 — WIREFRAMING AND PRODUCT FLOW (BLANK WITH HEADINGS)
  // ════════════════════════════════════════════════════════════════
  (function() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(C.OFF_WHITE);
    addSlideHeader(s, "Wireframing and Product Flow");

    // Placeholder screens with labels
    var screens = [
      { n: "1", desc: "User types a high-stakes query. PDBP detects stakes level via NLP and surfaces Intent Contract." },
      { n: "2", desc: "Intent Contract: user specifies decision, stakes (Exploratory/Operational/Irreversible), 'good enough' criteria." },
      { n: "3", desc: "Decision Brief generated — five sections: Sourced Findings, Inferred Conclusions, Not Addressed, Verification Duties, Source Disagreement Map." },
      { n: "4", desc: "Brief review: user inspects claim-type badges (Factual/Inferential/Normative) and reasoning chains." },
      { n: "5", desc: "Verification Duties: ranked specific actions the user should perform before acting." },
      { n: "6", desc: "Calibrated Commit: 3-5 key claims shown blind (no labels). User rates 1-5 trust." },
      { n: "7", desc: "Commit reveal: claim type, source quality, mismatch alerts shown. User writes typed rationale." },
      { n: "8", desc: "Epistemic Fork (irreversible only): Conservative + Expansive readings from same source pool." },
      { n: "9", desc: "User selects fork and writes rationale. Stored as audit trail for decision frame chosen." },
      { n: "10", desc: "Export with documented judgment record: Intent Contract + Brief + Commit rationale + Fork selection." }
    ];

    // 2 rows of 5
    screens.forEach(function(sc, i) {
      var row = Math.floor(i / 5);
      var col = i % 5;
      var sx = 0.18 + col * 1.96;
      var sy = 1.0 + row * 2.2;

      // Blank screen placeholder
      addShape(s, { x: sx, y: sy, w: 1.84, h: 1.15, fill: C.WHITE, line: C.BORDER });
      addText(s, "[Screen " + sc.n + "]", {
        x: sx, y: sy + 0.3, w: 1.84, h: 0.4,
        fontSize: 10, color: C.BORDER, align: "center", valign: "middle", italic: true
      });

      // Arrow between screens (except last in each row)
      if (col < 4) {
        addText(s, "→", {
          x: sx + 1.84, y: sy + 0.4, w: 0.12, h: 0.3,
          fontSize: 12, color: C.MID, align: "center", valign: "middle"
        });
      }

      // Description
      addText(s, "Screen " + sc.n + ": " + sc.desc, {
        x: sx, y: sy + 1.18, w: 1.84, h: 0.85,
        fontSize: 6.5, color: C.DARK, italic: true
      });
    });

    addText(s, "Prototype          Wireframe", {
      x: 7.5, y: 5.1, w: 2.3, h: 0.3,
      fontSize: 9, bold: true, color: C.MID, align: "right", valign: "middle"
    });
  })();


  // ════════════════════════════════════════════════════════════════
  // SLIDE 10 — MEASUREMENT, ROLLOUT & PRIVACY PROTECTIONS
  // ════════════════════════════════════════════════════════════════
  (function() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(C.OFF_WHITE);
    addSlideHeader(s, "Measurement: Growth Indicators, Rollout & Privacy Protections");

    // ── LEFT — METRICS ──
    addLabel(s, "NORTH STAR METRIC", 0.2, 0.95, 4.6);
    addText(s, "Judgment-Ready Session Rate (JRSR)\n% of Pro sessions where user completes: Intent Contract + Decision Brief review + Calibrated Commit with typed rationale ≥10 chars + (for irreversible) Epistemic Fork with rationale ≥15 chars.\n\nJRSR = (Completed Sessions) / (High-Stakes Sessions Shown) × 100\nTarget: 32% of Pro high-stakes sessions at 6 months  ·  Baseline: 0%", {
      x: 0.28, y: 1.24, w: 4.44, h: 0.92,
      fontSize: 8, color: C.DARK
    });

    addLabel(s, "LEADING INDICATORS: 0 to 30 DAYS", 0.2, 2.22, 4.6);
    var leadRows = [
      [
        { text: "Metric", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "What It Indicates", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "Target", options: { bold: true, color: C.WHITE, fill: C.BLACK } }
      ],
      ["Intent Contract\ncompletion rate", "Whether the contract feels\nrelevant and worth completing", "55% of Pro\nhigh-stakes"],
      ["Verification duty\nclick-through", "Whether Brief changes\ninspection behaviour", "+50% vs citation\nCTR baseline"],
      ["Calibration delta\nnarrowing (90-day)", "Whether Commit builds\nuser skill over time", "15% overconfidence\nimprovement"],
      ["Fork completion\nrate (irreversible)", "Whether fork is cognitively\nmanageable", ">70% of fork-\ntriggered sessions"]
    ];
    addTable(s, leadRows, {
      x: 0.2, y: 2.5, w: 4.6, h: 1.5,
      fontSize: 7, headerBold: true, headerFill: C.BLACK, headerColor: C.WHITE
    });

    addLabel(s, "GUARDRAIL METRICS", 0.2, 4.08, 4.6);
    addText(s, "➤  p95 time-to-brief: <8s additional vs legacy — JRSR gains worthless if unusable\n➤  Session abandonment rate: No >5% increase — highest adoption risk signal\n➤  Quick-answer escape (irreversible): <40% — above 40% = routing around protocol\n➤  Self-reported harm incidents: Downward trend QoQ — ultimate guardrail\n➤  Calibration delta direction: Must not widen — any widening triggers immediate investigation", {
      x: 0.28, y: 4.36, w: 4.44, h: 0.95,
      fontSize: 7.5, color: C.DARK
    });

    // ── RIGHT — ROLLOUT + ETHICS ──
    addLabel(s, "GO-TO-MARKET", 5.0, 0.95, 4.8);

    addText(s, "PHASE 1: WEEKS 0-4\nControlled Pilot (Trust and Accuracy Validation)\n\nAudience: Pro users with 5+ recurring task types in the last 30 days\nRollout: 5% Pro A/B. Surface PDBP on high-stakes queries only; conservative confidence threshold\nTrack: JRSR leading indicators, abandonment rate, Intent Contract completion\nKill threshold: Abandonment rate exceeds 5% increase\nSuccess criteria: JRSR above 15% · Abandonment below 5%", {
      x: 5.08, y: 1.24, w: 4.64, h: 1.05,
      fontSize: 7, color: C.DARK
    });
    addText(s, "PHASE 2: WEEKS 4-12\nTargeted Expansion (Relevance Scaling)\n\nAudience: 25% Pro rollout. Add calibration delta + Fitness engagement tracking.\nA/B test: Intent Contract auto-fill vs manual entry\nSuccess criteria: JRSR above 25% · Calibration delta narrowing 10%+", {
      x: 5.08, y: 2.34, w: 4.64, h: 0.75,
      fontSize: 7, color: C.DARK
    });
    addText(s, "PHASE 3: WEEKS 12-24\nFull Rollout\n\nAudience: All Pro/Max. Add Epistemic Fork to irreversible-stakes segment.\nParallel: Qualitative cohort n=20 at 30-day & 90-day marks\nSuccess criteria: JRSR 32% · Fork completion 70%", {
      x: 5.08, y: 3.14, w: 4.64, h: 0.65,
      fontSize: 7, color: C.DARK
    });

    addLabel(s, "ETHICAL GUIDELINES", 5.0, 3.86, 4.8);
    var ethicsRows = [
      [
        { text: "#", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "Principle", options: { bold: true, color: C.WHITE, fill: C.BLACK } },
        { text: "What This Means in Practice", options: { bold: true, color: C.WHITE, fill: C.BLACK } }
      ],
      ["1", "No AI verdicts", "System structures evidence; human commits judgment in writing. Locus of judgment stays human."],
      ["2", "On-session processing", "All analysis happens within the current session. No content leaves. No cross-session data without explicit confirmation."],
      ["3", "No output monetisation", "Calibration data never used for ads, targeting, or profiling. Solely to improve output quality for that user."],
      ["4", "Anonymised research data", "Everything from survey and interviews is anonymised. No names. No identifiable information stored."],
      ["5", "Right to opt out", "PDBP can be turned off in one tap. Quick-answer escape available. No lock-in of any kind."]
    ];
    addTable(s, ethicsRows, {
      x: 5.0, y: 4.14, w: 4.8, h: 1.38,
      fontSize: 6.5, headerBold: true, headerFill: C.BLACK, headerColor: C.WHITE
    });
  })();


  // Remove the default blank slide
  defaultSlide.remove();
  Logger.log("Presentation created: " + prs.getUrl());
}
