/**
 * Google Apps Script to generate the PDBP presentation in Google Slides.
 * To use this:
 * 1. Go to https://script.google.com/
 * 2. Create a new project.
 * 3. Replace the default Code.gs content with this script.
 * 4. Run the `createNLPerplexitySlides` function.
 * 5. Grant permissions when prompted.
 * 6. The new presentation will be created in your Google Drive.
 */

function createNLPerplexitySlides() {
  var prs = SlidesApp.create("NL Perplexity");
  var defaultSlide = prs.getSlides()[0];
  
  // ── Design tokens ────────────────────────────────────────────
  var colors = {
    TEAL: "E6B675",
    TEAL_DARK: "D99477",
    TEAL_LIGHT: "F5E3D2",
    AMBER: "E08C75",
    AMBER_LIGHT: "FADCC6",
    WHITE: "FFFDF9",
    OFF_WHITE: "FAECE1",
    DARK: "2B1B12",
    MID: "4A3222",
    LIGHT_GREY: "EFE1D5",
    BORDER: "CFA185",
    RED_LIGHT: "F8D3C5",
    RED_MED: "D98A71",
    GREEN_LIGHT: "EAE5AE",
    GREEN_MED: "C8C16D",
    NAVY: "C7A583"
  };

  // Helper functions
  var applyGradientBackground = function(slide) {
    var w = 10, h = 5.625, numSteps = 40, stepW = w / numSteps;
    for (var i = 0; i < numSteps; i++) {
       var t = i / (numSteps - 1);
       var r = t < 0.5 ? Math.round(255 * (1 - t*2) + 240 * (t*2)) : Math.round(240 * (1 - (t-0.5)*2) + 210 * ((t-0.5)*2));
       var g = t < 0.5 ? Math.round(235 * (1 - t*2) + 160 * (t*2)) : Math.round(160 * (1 - (t-0.5)*2) + 180 * ((t-0.5)*2));
       var b = t < 0.5 ? Math.round(153 * (1 - t*2) + 150 * (t*2)) : Math.round(150 * (1 - (t-0.5)*2) + 160 * ((t-0.5)*2));
       var hex = "#" + ( (1 << 24) + (r << 16) + (g << 8) + b ).toString(16).slice(1);
       var shape = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, pt(i * stepW), 0, pt(stepW + 0.1), pt(h));
       shape.getFill().setSolidFill(hex);
       shape.getBorder().setTransparent();
       shape.sendToBack();
    }
  };

  var pt = function(inches) {
    return inches * 72; // 1 inch = 72 points in GAS
  };

  var resolveColor = function(c) {
    if (!c) return null;
    return c.indexOf("#") === 0 ? c : "#" + c;
  };

  var addShape = function(slide, type, opts) {
    var shape = slide.insertShape(type, pt(opts.x), pt(opts.y), pt(opts.w), pt(opts.h));
    if (opts.fill && opts.fill.color) {
      shape.getFill().setSolidFill(resolveColor(opts.fill.color));
    } else {
      shape.getFill().setTransparent();
    }
    if (opts.line && opts.line.color) {
      shape.getBorder().getLineFill().setSolidFill(resolveColor(opts.line.color));
      shape.getBorder().setWeight(1);
    } else {
      shape.getBorder().setTransparent();
    }
    return shape;
  };

  var addText = function(slide, textOrArray, opts) {
    var textBox = slide.insertTextBox("", pt(opts.x), pt(opts.y), pt(opts.w), pt(opts.h));
    var textRange = textBox.getText();
    
    if (Array.isArray(textOrArray)) {
      var fullText = textOrArray.map(function(s) { return s.text || ""; }).join("");
      textRange.setText(fullText);
      var startIndex = 0;
      textOrArray.forEach(function(segment) {
        var text = segment.text || "";
        var endIndex = startIndex + text.length;
        if (text.length > 0) {
          var tRange = textRange.getRange(startIndex, endIndex);
          var tOpts = segment.options || {};
          var style = tRange.getTextStyle();
          style.setFontSize(tOpts.fontSize || opts.fontSize || 14);
          style.setFontFamily("Times New Roman");
          if (tOpts.bold !== undefined ? tOpts.bold : opts.bold) style.setBold(true);
          if (tOpts.italic !== undefined ? tOpts.italic : opts.italic) style.setItalic(true);
          style.setForegroundColor(resolveColor(colors.DARK));
        }
        startIndex = endIndex;
      });
    } else {
      textRange.setText(textOrArray);
      var style = textRange.getTextStyle();
      style.setFontSize(opts.fontSize || 14);
      style.setFontFamily("Times New Roman");
      if (opts.bold) style.setBold(true);
      if (opts.italic) style.setItalic(true);
      style.setForegroundColor(resolveColor(colors.DARK));
    }
    
    var paraStyle = textRange.getParagraphStyle();
    var align = opts.align || "left";
    if (align === "center") paraStyle.setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
    else if (align === "right") paraStyle.setParagraphAlignment(SlidesApp.ParagraphAlignment.END);
    else paraStyle.setParagraphAlignment(SlidesApp.ParagraphAlignment.START);
    
    // Attempt to reset margins
    paraStyle.setSpaceAbove(0);
    paraStyle.setSpaceBelow(0);
    
    var valign = opts.valign || "top";
    if (valign === "middle") textBox.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE);
    else if (valign === "bottom") textBox.setContentAlignment(SlidesApp.ContentAlignment.BOTTOM);
    else textBox.setContentAlignment(SlidesApp.ContentAlignment.TOP);
    
    return textBox;
  };

  var addTable = function(slide, rowsData, opts) {
    var numRows = rowsData.length;
    var numCols = rowsData[0].length;
    var table = slide.insertTable(numRows, numCols, pt(opts.x), pt(opts.y), pt(opts.w), pt(opts.h));
    
    // Note: Google Apps Script SlidesApp does not support explicitly setting column widths natively.
    // The table will automatically divide the total width (opts.w) evenly among columns.
    
    for (var r = 0; r < numRows; r++) {
      for (var c = 0; c < numCols; c++) {
        var cellData = rowsData[r][c];
        var cell = table.getCell(r, c);
        
        var text = "";
        var cellOpts = {};
        
        if (typeof cellData === "object" && cellData !== null) {
          text = cellData.text || "";
          cellOpts = cellData.options || {};
        } else {
          text = cellData || "";
        }
        
        var cellText = cell.getText();
        cellText.setText(text);
        
        var style = cellText.getTextStyle();
        style.setFontSize(cellOpts.fontSize || opts.fontSize || 14);
        style.setFontFamily("Times New Roman");
        if (cellOpts.bold !== undefined ? cellOpts.bold : opts.bold) style.setBold(true);
        if (cellOpts.italic !== undefined ? cellOpts.italic : opts.italic) style.setItalic(true);
        
        style.setForegroundColor(resolveColor(colors.DARK));
        
        var fill = cellOpts.fill || opts.fill;
        if (fill && fill.color) {
          cell.getFill().setSolidFill(resolveColor(fill.color));
        }
        
        var paraStyle = cellText.getParagraphStyle();
        var align = cellOpts.align || opts.align || "left";
        if (align === "center") paraStyle.setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
        else if (align === "right") paraStyle.setParagraphAlignment(SlidesApp.ParagraphAlignment.END);
        else paraStyle.setParagraphAlignment(SlidesApp.ParagraphAlignment.START);
        
        paraStyle.setSpaceAbove(0);
        paraStyle.setSpaceBelow(0);
      }
    }
    return table;
  };

  // ── SLIDE 1 — Title ──────────────────────────────────────────
  (function slide1() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(resolveColor(colors.NAVY));
    applyGradientBackground(s);

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0, y: 0, w: 0.18, h: 5.625,
      fill: { color: colors.TEAL }, line: { color: colors.TEAL }
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.18, y: 0, w: 0.06, h: 5.625,
      fill: { color: colors.AMBER }, line: { color: colors.AMBER }
    });

    addText(s, "AI Outputs Are Trusted Before\nThey're Understood", {
      x: 0.55, y: 0.45, w: 9.1, h: 1.5,
      fontSize: 36, fontFace: "Calibri", bold: true,
      color: colors.WHITE, align: "left", valign: "middle"
    });

    addText(s, "Building Decision Infrastructure for the Age of AI Research", {
      x: 0.55, y: 1.9, w: 9.1, h: 0.45,
      fontSize: 16, fontFace: "Calibri", color: "A0D4DA",
      align: "left", valign: "middle"
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.55, y: 2.45, w: 7.2, h: 0.42,
      fill: { color: colors.TEAL }, line: { color: colors.TEAL }
    });
    addText(s, "Perplexity Decision Brief Protocol (PDBP)  —  Five Modules. One Goal: Judgment-Ready Research.", {
      x: 0.55, y: 2.45, w: 7.2, h: 0.42,
      fontSize: 12, fontFace: "Calibri", bold: true,
      color: colors.WHITE, align: "center", valign: "middle", margin: 0
    });

    var stats = [
      { val: "780M", label: "queries/month\nat Perplexity scale" },
      { val: "37%",  label: "error rate\nTow Center 2025" },
      { val: "21.87",label: "citations/response\n— citation theater" },
    ];
    stats.forEach(function(st, i) {
      var sx = 0.55 + i * 3.1;
      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: sx, y: 3.05, w: 2.9, h: 1.7,
        fill: { color: "1C3A5A" }, line: { color: colors.TEAL }
      });
      addText(s, st.val, {
        x: sx, y: 3.15, w: 2.9, h: 0.7,
        fontSize: 38, fontFace: "Calibri", bold: true,
        color: colors.AMBER, align: "center", valign: "middle", margin: 0
      });
      addText(s, st.label, {
        x: sx, y: 3.85, w: 2.9, h: 0.7,
        fontSize: 11, fontFace: "Calibri", color: "A0C8D0",
        align: "center", valign: "top"
      });
    });

    addText(s, "All user research conducted with informed consent  ·  All data anonymised  ·  No sensitive prompts stored", {
      x: 0.3, y: 5.3, w: 9.4, h: 0.25,
      fontSize: 9, fontFace: "Calibri", color: "5A7A8A",
      align: "center", italic: true
    });
  })();

  // ── SLIDE 2 — Market Landscape ───────────────────────────────
  (function slide2() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(resolveColor(colors.OFF_WHITE));
    applyGradientBackground(s);

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.75,
      fill: { color: colors.TEAL }, line: { color: colors.TEAL }
    });
    addText(s, "Users Trust Citation Count & Fluency — Neither Predicts Accuracy", {
      x: 0.3, y: 0, w: 9.4, h: 0.75,
      fontSize: 18, fontFace: "Calibri", bold: true,
      color: colors.WHITE, align: "left", valign: "middle", margin: 0
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 0.85, w: 4.55, h: 0.32,
      fill: { color: colors.TEAL_DARK }, line: { color: colors.TEAL_DARK }
    });
    addText(s, "HOW USERS EVALUATE AI OUTPUTS TODAY  (Survey n=5)", {
      x: 0.2, y: 0.85, w: 4.55, h: 0.32,
      fontSize: 9, fontFace: "Calibri", bold: true,
      color: colors.WHITE, align: "left", valign: "middle", margin: 5
    });

    var behaviours = [
      { pct: "80%", desc: "skim citation badges — never open a single source" },
      { pct: "60%", desc: "cannot distinguish factual from inferential claims in prose" },
      { pct: "60%", desc: "describe AI trust as 'unpredictable' — no calibration loop" },
      { pct: "60%", desc: "want to know what was EXCLUDED (top open-ended request)" },
      { pct: "40%", desc: "surprised by unstated assumptions discovered post-action" },
    ];
    behaviours.forEach(function(b, i) {
      var by = 1.22 + i * 0.65;
      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: 0.2, y: by, w: 0.8, h: 0.55,
        fill: { color: colors.TEAL }, line: { color: colors.TEAL }
      });
      addText(s, b.pct, {
        x: 0.2, y: by, w: 0.8, h: 0.55,
        fontSize: 18, fontFace: "Calibri", bold: true,
        color: colors.WHITE, align: "center", valign: "middle", margin: 0
      });
      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: 1.05, y: by, w: 3.7, h: 0.55,
        fill: { color: colors.WHITE }, line: { color: colors.BORDER }
      });
      addText(s, b.desc, {
        x: 1.1, y: by, w: 3.6, h: 0.55,
        fontSize: 10.5, fontFace: "Calibri", color: colors.DARK,
        align: "left", valign: "middle"
      });
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 5.0, y: 0.85, w: 4.8, h: 0.32,
      fill: { color: colors.TEAL_DARK }, line: { color: colors.TEAL_DARK }
    });
    addText(s, "WHY EXISTING APPROACHES FAIL", {
      x: 5.0, y: 0.85, w: 4.8, h: 0.32,
      fontSize: 9, fontFace: "Calibri", bold: true,
      color: colors.WHITE, align: "left", valign: "middle", margin: 5
    });

    var tableData = [
      [
        { text: "Approach", options: { bold: true, color: colors.WHITE, fill: { color: colors.TEAL }, fontSize: 9 } },
        { text: "Optimises", options: { bold: true, color: colors.WHITE, fill: { color: colors.TEAL }, fontSize: 9 } },
        { text: "Why It Fails", options: { bold: true, color: colors.WHITE, fill: { color: colors.TEAL }, fontSize: 9 } }
      ],
      ["Inline Citations",       "Provenance",         "80% never click; visibility ≠ verification"],
      ["Trust Scores",           "Speed of decision",  "Black-box; scores don't predict reliance"],
      ["Fact-Check Bots",        "Binary correctness", "Ignores inference, normative claims, gaps"],
      ["Reasoning Traces",       "Transparency",       "Post-hoc narrative, not ground truth"],
      ["Explainability Panels",  "Info volume",        "80% don't open optional panels"],
      ["Confidence Labels",      "Model uncertainty",  "Model confidence ≠ decision appropriateness"],
    ];
    addTable(s, tableData, {
      x: 5.0, y: 1.22, w: 4.8, h: 3.3,
      fontSize: 9, fontFace: "Calibri", color: colors.DARK,
      border: { pt: 0.5, color: colors.BORDER },
      fill: { color: colors.WHITE },
      rowH: 0.44,
      colW: [1.35, 1.2, 2.25]
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 5.0, w: 9.6, h: 0.5,
      fill: { color: colors.AMBER_LIGHT }, line: { color: colors.AMBER }
    });
    addText(s, "CORE GAP: Tow Center 2025 — Perplexity Pro was MORE definitively wrong, not less. Qwairy 2026 — 21.87 citations vs ChatGPT 7.92: more provenance surface, zero improvement in verification behaviour. No product ties output format to user decision context AND calibration training simultaneously.", {
      x: 0.25, y: 5.0, w: 9.5, h: 0.5,
      fontSize: 9, fontFace: "Calibri", color: "78350F",
      align: "left", valign: "middle", bold: false
    });
  })();

  // ── SLIDE 3 — Business Outcomes ──────────────────────────────
  (function slide3() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(resolveColor(colors.OFF_WHITE));
    applyGradientBackground(s);

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.75, fill: { color: colors.TEAL }, line: { color: colors.TEAL }
    });
    addText(s, "Appropriate Reliance Is the Moat — Not More Citations, Not Faster Answers", {
      x: 0.3, y: 0, w: 9.4, h: 0.75,
      fontSize: 18, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 0.85, w: 9.6, h: 0.48,
      fill: { color: colors.TEAL_LIGHT }, line: { color: colors.TEAL }
    });
    addText(s, "STRATEGIC THESIS: PDBP repositions Perplexity from 'best answer engine' to 'best decision support infrastructure' — a category change, not a feature addition. The moat is becoming the system professionals reach for when stakes are high and judgment must stay human.", {
      x: 0.28, y: 0.85, w: 9.44, h: 0.48,
      fontSize: 9.5, fontFace: "Calibri", color: colors.TEAL_DARK,
      align: "left", valign: "middle", italic: true
    });

    var quads = [
      {
        title: "LONG-TERM USER TRUST",
        body: "Appropriate reliance eliminates the structural cause of 'AI betrayed me' moments. Every high-stakes failure = churned Pro user + reputation event. PDBP prevents both by changing how outputs are evaluated, not just what they say.",
        icon: "🔒"
      },
      {
        title: "HIGH-STAKES WORKFLOW ADOPTION",
        body: "Professionals exclude AI from irreversible decisions because they cannot document their verification process. PDBP creates that audit trail. Enterprise legal, finance, and medical teams need audit trails — this is the enterprise conversion mechanism.",
        icon: "📋"
      },
      {
        title: "RETENTION & ENGAGEMENT QUALITY",
        body: "North star is Judgment-Ready Session Rate, not raw dwell time. JRSR correlates with decision quality outcomes, which drive word-of-mouth in professional communities. One trusted Pro user in a law firm refers three colleagues.",
        icon: "📈"
      },
      {
        title: "DEPTH & QUALITY OF USAGE",
        body: "Users who engage with PDBP develop better prompting skills, better evaluation instincts, and ask sharper follow-up questions. Epistemic Fitness compounds this across sessions. Better users generate better sessions.",
        icon: "🎯"
      },
    ];

    var qPositions = [
      { x: 0.2, y: 1.42 }, { x: 5.1, y: 1.42 },
      { x: 0.2, y: 3.1  }, { x: 5.1, y: 3.1  },
    ];
    quads.forEach(function(q, i) {
      var pos = qPositions[i];
      var x = pos.x, y = pos.y;
      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: x, y: y, w: 4.7, h: 1.55,
        fill: { color: colors.WHITE }, line: { color: colors.BORDER }
      });
      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: x, y: y, w: 4.7, h: 0.32,
        fill: { color: colors.TEAL }, line: { color: colors.TEAL }
      });
      addText(s, q.icon + "  " + q.title, {
        x: x + 0.08, y: y, w: 4.54, h: 0.32,
        fontSize: 9, fontFace: "Calibri", bold: true, color: colors.WHITE,
        align: "left", valign: "middle", margin: 0
      });
      addText(s, q.body, {
        x: x + 0.1, y: y + 0.35, w: 4.5, h: 1.15,
        fontSize: 9, fontFace: "Calibri", color: colors.MID,
        align: "left", valign: "top"
      });
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 4.75, w: 9.6, h: 0.24,
      fill: { color: colors.TEAL_DARK }, line: { color: colors.TEAL_DARK }
    });
    addText(s, "KEY TRADE-OFFS", {
      x: 0.28, y: 4.75, w: 9.44, h: 0.24,
      fontSize: 8, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });
    var toffs = [
      { label: "Speed vs Accuracy", body: "Exploratory = fast essay. Irreversible = full protocol. 30-60s added. Accepted trade-off: 5-10% exploratory drop for high-stakes quality gains." },
      { label: "Assistance vs Dependence", body: "System never verdicts. User commits in writing. Locus of judgment stays human by design. The protocol structures evidence; humans decide." },
      { label: "Transparency vs Overload", body: "Progressive disclosure. Brief sections collapsible. Narrative toggle available. Cognitive Load Monitor adapts density in real time." },
    ];
    toffs.forEach(function(t, i) {
      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: 0.2 + i * 3.25, y: 5.02, w: 3.12, h: 0.5,
        fill: { color: colors.AMBER_LIGHT }, line: { color: colors.AMBER }
      });
      addText(s, [
        { text: t.label + "\n", options: { bold: true, fontSize: 9, color: "78350F" } },
        { text: t.body, options: { fontSize: 8, color: colors.MID } }
      ], {
        x: 0.25 + i * 3.25, y: 5.04, w: 3.02, h: 0.48,
        align: "left", valign: "top"
      });
    });
  })();

  // ── SLIDE 4 — User Journey Map ───────────────────────────────
  (function slide4() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(resolveColor(colors.OFF_WHITE));
    applyGradientBackground(s);

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.75, fill: { color: colors.TEAL }, line: { color: colors.TEAL }
    });
    addText(s, "PEC Strikes Between Evaluation & Trust — Where No Product Currently Intervenes", {
      x: 0.3, y: 0, w: 9.4, h: 0.75,
      fontSize: 18, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });

    var stages = [
      {
        n: "1", label: "PROMPTING", failure: "Low",
        breakdown: "Stakes unstated. No decision frame. Generic retrieval. No contract criteria.",
        pdbp: "Intent Contract: captures decision, stakes & 'good enough' before retrieval begins.",
        failBg: colors.GREEN_LIGHT, failBorder: colors.GREEN_MED
      },
      {
        n: "2", label: "RECEIVING OUTPUT", failure: "High",
        breakdown: "Polished essay + 21 citation badges signal 'research complete'. PEC triggered. Investigation urge drops.",
        pdbp: "Decision Brief replaces essay. Output structurally divided. Incompleteness made visible.",
        failBg: colors.RED_LIGHT, failBorder: colors.RED_MED
      },
      {
        n: "3", label: "EVALUATING OUTPUT", failure: "HIGH",
        breakdown: "80% skim. 60% can't tell fact from inference. Single heuristic applied to all claim types.",
        pdbp: "Claims typed: Factual / Inferential / Normative. Reasoning chains shown for inferences.",
        failBg: colors.RED_LIGHT, failBorder: colors.RED_MED
      },
      {
        n: "4", label: "REVISING / TRUSTING", failure: "HIGH",
        breakdown: "No devil's advocate. Single narrative hides that same sources support multiple readings.",
        pdbp: "Epistemic Fork: Conservative + Expansive readings from identical source pool. User selects & documents why.",
        failBg: colors.RED_LIGHT, failBorder: colors.RED_MED
      },
      {
        n: "5", label: "TAKING ACTION", failure: "Medium",
        breakdown: "No audit trail. No record of decision supported, claims evaluated, or verification skipped.",
        pdbp: "Calibrated Commit Gate: blind rating → reveal → typed rationale. Judgment documented.",
        failBg: colors.AMBER_LIGHT, failBorder: colors.AMBER
      },
    ];

    var sw = 1.82;
    stages.forEach(function(st, i) {
      var sx = 0.18 + i * (sw + 0.04);

      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: sx, y: 0.85, w: sw, h: 0.32,
        fill: { color: colors.TEAL }, line: { color: colors.TEAL }
      });
      addText(s, st.n + "  " + st.label, {
        x: sx + 0.05, y: 0.85, w: sw - 0.1, h: 0.32,
        fontSize: 8, fontFace: "Calibri", bold: true, color: colors.WHITE,
        align: "left", valign: "middle", margin: 0
      });

      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: sx, y: 1.2, w: sw, h: 1.55,
        fill: { color: st.failBg }, line: { color: st.failBorder }
      });
      addText(s, "BREAKDOWN", {
        x: sx + 0.05, y: 1.22, w: sw - 0.1, h: 0.22,
        fontSize: 7.5, fontFace: "Calibri", bold: true, color: "991B1B",
        align: "left", valign: "middle", margin: 0
      });
      addText(s, st.breakdown, {
        x: sx + 0.05, y: 1.44, w: sw - 0.1, h: 1.28,
        fontSize: 8.5, fontFace: "Calibri", color: colors.DARK,
        align: "left", valign: "top"
      });

      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: sx, y: 2.78, w: sw, h: 1.65,
        fill: { color: colors.TEAL_LIGHT }, line: { color: colors.TEAL }
      });
      addText(s, "▶  PDBP INTERVENTION", {
        x: sx + 0.05, y: 2.80, w: sw - 0.1, h: 0.22,
        fontSize: 7.5, fontFace: "Calibri", bold: true, color: colors.TEAL_DARK,
        align: "left", valign: "middle", margin: 0
      });
      addText(s, st.pdbp, {
        x: sx + 0.05, y: 3.02, w: sw - 0.1, h: 1.38,
        fontSize: 8.5, fontFace: "Calibri", color: colors.DARK,
        align: "left", valign: "top"
      });

      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: sx, y: 4.46, w: sw, h: 0.28,
        fill: { color: st.failBg }, line: { color: st.failBorder }
      });
      addText(s, "Failure: " + st.failure, {
        x: sx, y: 4.46, w: sw, h: 0.28,
        fontSize: 8.5, fontFace: "Calibri", bold: true, color: colors.DARK,
        align: "center", valign: "middle", margin: 0
      });
    });

    addText(s, "J1: Wrong claim-type heuristic  ·  J2: Context collapse  ·  J3: Provenance without inspection  ·  J4: No calibration feedback  ·  J5: Action without audit trail", {
      x: 0.2, y: 4.82, w: 9.6, h: 0.32,
      fontSize: 8.5, fontFace: "Calibri", color: colors.MID,
      align: "center", valign: "middle", italic: true
    });
  })();

  // ── SLIDE 5 — Target Segment ─────────────────────────────────
  (function slide5() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(resolveColor(colors.OFF_WHITE));
    applyGradientBackground(s);

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.75, fill: { color: colors.TEAL }, line: { color: colors.TEAL }
    });
    addText(s, "High-Stakes Knowledge Workers Are Underserved by Every AI Search Product Today", {
      x: 0.3, y: 0, w: 9.4, h: 0.75,
      fontSize: 18, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 0.85, w: 3.0, h: 0.3,
      fill: { color: colors.TEAL_DARK }, line: { color: colors.TEAL_DARK }
    });
    addText(s, "PRIMARY SEGMENT", {
      x: 0.28, y: 0.85, w: 2.84, h: 0.3,
      fontSize: 9, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });
    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 1.18, w: 3.0, h: 2.0,
      fill: { color: colors.WHITE }, line: { color: colors.BORDER }
    });
    addText(s, [
      { text: "Power users: ", options: { bold: true } },
      { text: "2+ Perplexity sessions/day for research synthesis, competitive analysis, regulatory navigation, financial due diligence, and career-defining decisions.\n\n" },
      { text: "Profiles:\n", options: { bold: true } },
      { text: "Product managers  ·  Lawyers  ·  Medical professionals\nInvestors  ·  Executives  ·  Senior candidates\n\n" },
      { text: "Excluded:\n", options: { bold: true, color: "991B1B" } },
      { text: "Casual curiosity search, entertainment queries, users wanting one-click answers without reflection." }
    ], {
      x: 0.28, y: 1.2, w: 2.84, h: 1.95,
      fontSize: 9, fontFace: "Calibri", color: colors.DARK,
      align: "left", valign: "top"
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 3.25, w: 3.0, h: 0.3,
      fill: { color: colors.TEAL_DARK }, line: { color: colors.TEAL_DARK }
    });
    addText(s, "WHY THIS SEGMENT", {
      x: 0.28, y: 3.25, w: 2.84, h: 0.3,
      fontSize: 9, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });
    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 3.58, w: 3.0, h: 1.85,
      fill: { color: colors.TEAL_LIGHT }, line: { color: colors.TEAL }
    });
    addText(s, [
      { text: "• ", options: { bold: true, color: colors.TEAL } }, { text: "Highest cost of getting it wrong\n" },
      { text: "• ", options: { bold: true, color: colors.TEAL } }, { text: "Highest capacity to engage with a structured protocol\n" },
      { text: "• ", options: { bold: true, color: colors.TEAL } }, { text: "Highest willingness to pay for decision quality\n" },
      { text: "• ", options: { bold: true, color: colors.TEAL } }, { text: "Highest word-of-mouth leverage in professional communities\n\n" },
      { text: "One trusted Pro user in a law firm refers three colleagues. One burned user writes a blog post.", options: { italic: true, fontSize: 8.5 } }
    ], {
      x: 0.28, y: 3.62, w: 2.84, h: 1.78,
      fontSize: 9, fontFace: "Calibri", color: colors.DARK,
      align: "left", valign: "top"
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 3.4, y: 0.85, w: 6.4, h: 0.3,
      fill: { color: colors.TEAL_DARK }, line: { color: colors.TEAL_DARK }
    });
    addText(s, "UNMET NEEDS — MAPPED TO EVIDENCE", {
      x: 3.48, y: 0.85, w: 6.24, h: 0.3,
      fontSize: 9, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });
    var needsData = [
      [
        { text: "Unmet Need", options: { bold: true, color: colors.WHITE, fill: { color: colors.TEAL } } },
        { text: "Prev.", options: { bold: true, color: colors.WHITE, fill: { color: colors.TEAL } } },
        { text: "Evidence", options: { bold: true, color: colors.WHITE, fill: { color: colors.TEAL } } },
        { text: "Current Gap", options: { bold: true, color: colors.WHITE, fill: { color: colors.TEAL } } }
      ],
      ["Know what was excluded", "60%", "Survey Q8 — top open-ended request", "No product surfaces gaps vs user's decision"],
      ["Surface unstated assumptions", "40%", "Survey Q8/Q10", "Assumptions invisible in polished prose"],
      ["Separate sourced vs inferred", "60%", "60% struggle in practice", "All claims rendered identically in essay"],
      ["Stress-test / Devil's Advocate", "60%", "High-stakes query request", "No honest alternative readings from same sources"],
      ["Avoid repeating flagged errors", "—", "Vikas observation (qualitative)", "No session-level claim memory in any product"],
      ["Know when AI is unsure", "—", "Srivatsan observation (qualitative)", "Confidence presentation uniform regardless of quality"],
      ["Calibration feedback over time", "60%", "Unpredictable trust reported", "No product tracks confidence vs evidence over time"],
    ];
    addTable(s, needsData, {
      x: 3.4, y: 1.18, w: 6.4, h: 3.4,
      fontSize: 8.5, fontFace: "Calibri", color: colors.DARK,
      border: { pt: 0.5, color: colors.BORDER },
      fill: { color: colors.WHITE },
      rowH: 0.4,
      colW: [1.7, 0.45, 1.65, 2.6]
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 5.12, w: 9.6, h: 0.32,
      fill: { color: colors.AMBER_LIGHT }, line: { color: colors.AMBER }
    });
    addText(s, "Internal team needs — Trust & Safety: no measure of over-trust in high-stakes domains  ·  Research/Alignment: no signal for appropriate vs inappropriate reliance  ·  Growth: no mechanism converting curiosity users to decision users", {
      x: 0.28, y: 5.12, w: 9.44, h: 0.32,
      fontSize: 8.5, fontFace: "Calibri", color: "78350F",
      align: "left", valign: "middle"
    });
  })();

  // ── SLIDE 6 — Problem Analysis ───────────────────────────────
  (function slide6() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(resolveColor(colors.OFF_WHITE));
    applyGradientBackground(s);

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.75, fill: { color: colors.TEAL }, line: { color: colors.TEAL }
    });
    addText(s, "The Root Cause Is Premature Epistemic Closure — A Product Design Failure, Not a Model Failure", {
      x: 0.3, y: 0, w: 9.4, h: 0.75,
      fontSize: 18, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 0.85, w: 9.6, h: 0.52,
      fill: { color: colors.NAVY }, line: { color: colors.TEAL }
    });
    addText(s, "PEC DEFINITION: Premature Epistemic Closure occurs when a person feels investigation is complete when they have NOT performed verification appropriate to their decision stakes. This is a product design failure. Fixing hallucination does not fix PEC — the format of consumption dominates label content.", {
      x: 0.28, y: 0.85, w: 9.44, h: 0.52,
      fontSize: 9, fontFace: "Calibri", color: colors.WHITE, italic: true,
      align: "left", valign: "middle"
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 1.45, w: 4.45, h: 0.28,
      fill: { color: colors.TEAL_DARK }, line: { color: colors.TEAL_DARK }
    });
    addText(s, "4 STRUCTURAL REASONS PERPLEXITY IS UNIQUELY EXPOSED", {
      x: 0.28, y: 1.45, w: 4.29, h: 0.28,
      fontSize: 8, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });
    var reasons = [
      { n: "1", title: "Synthesis-as-Answer", body: "RAG compresses heterogeneous sources into one voice. User loses awareness of contradictory or thin evidence." },
      { n: "2", title: "Citation Theater", body: "21.87 badges signal diligence done on user's behalf. 80% never open them — provenance visibility ≠ verification behaviour." },
      { n: "3", title: "Pro Tier Overconfidence", body: "Tow Center: Pro answers wrong MORE definitively, not less. Premium product amplifies PEC in highest-stakes users." },
      { n: "4", title: "No Decision Object", body: "Every output optimised for reading, not deciding. No structure for: what we found, didn't find, and what you must still do." },
    ];
    reasons.forEach(function(r, i) {
      var ry = 1.78 + i * 0.62;
      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: 0.2, y: ry, w: 0.42, h: 0.52,
        fill: { color: colors.TEAL }, line: { color: colors.TEAL }
      });
      addText(s, r.n, {
        x: 0.2, y: ry, w: 0.42, h: 0.52,
        fontSize: 18, fontFace: "Calibri", bold: true, color: colors.WHITE,
        align: "center", valign: "middle", margin: 0
      });
      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: 0.65, y: ry, w: 4.0, h: 0.52,
        fill: { color: colors.WHITE }, line: { color: colors.BORDER }
      });
      addText(s, [
        { text: r.title + "\n", options: { bold: true, fontSize: 9 } },
        { text: r.body, options: { fontSize: 8.5 } }
      ], {
        x: 0.72, y: ry, w: 3.88, h: 0.52,
        fontFace: "Calibri", color: colors.DARK,
        align: "left", valign: "middle"
      });
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 4.85, y: 1.45, w: 4.95, h: 0.28,
      fill: { color: colors.TEAL_DARK }, line: { color: colors.TEAL_DARK }
    });
    addText(s, "SIX-STAGE BREAKDOWN — WHERE JUDGMENT FAILS", {
      x: 4.93, y: 1.45, w: 4.79, h: 0.28,
      fontSize: 8, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });
    var stageRows = [
      [{ text: "Stage", options: { bold: true, color: colors.WHITE, fill: { color: colors.TEAL } } },
       { text: "Should Happen", options: { bold: true, color: colors.WHITE, fill: { color: colors.TEAL } } },
       { text: "Actually Happens", options: { bold: true, color: colors.WHITE, fill: { color: colors.TEAL } } },
       { text: "Failure", options: { bold: true, color: colors.WHITE, fill: { color: colors.TEAL } } }],
      ["User Intent",         "Define decision context",          "Unstated stakes",               "J2: Context collapse"],
      ["Prompting",           "Decision-weighted retrieval",      "Generic retrieval",             "J2 persists"],
      ["Output Generation",   "Preserve source heterogeneity",    "Single authority voice",        "J1: Wrong heuristic"],
      [{ text: "Output Interpretation", options: { fill: { color: colors.RED_LIGHT } } },
       { text: "Type claims correctly",   options: { fill: { color: colors.RED_LIGHT } } },
       { text: "All claims look identical", options: { fill: { color: colors.RED_LIGHT } } },
       { text: "J1: Inference = Fact",   options: { fill: { color: colors.RED_LIGHT }, bold: true } }],
      [{ text: "Output Evaluation", options: { fill: { color: colors.RED_LIGHT } } },
       { text: "Inspect and calibrate",  options: { fill: { color: colors.RED_LIGHT } } },
       { text: "80% skim; no feedback",  options: { fill: { color: colors.RED_LIGHT } } },
       { text: "J3 + J4",               options: { fill: { color: colors.RED_LIGHT }, bold: true } }],
      ["Action-Taking",       "Document verification",            "No record exists",              "J5: No audit trail"],
    ];
    addTable(s, stageRows, {
      x: 4.85, y: 1.76, w: 4.95, h: 2.7,
      fontSize: 8, fontFace: "Calibri", color: colors.DARK,
      border: { pt: 0.5, color: colors.BORDER },
      fill: { color: colors.WHITE },
      rowH: 0.38,
      colW: [1.1, 1.25, 1.3, 1.3]
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 4.52, w: 9.6, h: 0.26,
      fill: { color: colors.TEAL_DARK }, line: { color: colors.TEAL_DARK }
    });
    addText(s, "FIVE NAMED JUDGMENT FAILURES", {
      x: 0.28, y: 4.52, w: 9.44, h: 0.26,
      fontSize: 8, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });
    var jf = [
      "J1  Wrong claim-type heuristic — inferences look like facts in prose",
      "J2  Context collapse — 'good answer' judged without decision reference",
      "J3  Provenance without inspection — citations present; chain never walked",
      "J4  No calibration feedback — confidence never compared to evidence quality",
      "J5  Action without audit trail — no record when harm occurs",
    ];
    jf.forEach(function(j, i) {
      var jx = 0.2 + i * 1.94;
      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: jx, y: 4.82, w: 1.88, h: 0.65,
        fill: { color: colors.WHITE }, line: { color: colors.TEAL }
      });
      addText(s, j, {
        x: jx + 0.05, y: 4.84, w: 1.78, h: 0.61,
        fontSize: 8, fontFace: "Calibri", color: colors.DARK,
        align: "left", valign: "middle"
      });
    });
  })();

  // ── SLIDE 7 — Solution Ideation ──────────────────────────────
  (function slide7() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(resolveColor(colors.OFF_WHITE));
    applyGradientBackground(s);

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.75, fill: { color: colors.TEAL }, line: { color: colors.TEAL }
    });
    addText(s, "Three Directions Explored — Two Annotate the Problem, One Eliminates It at the Source", {
      x: 0.3, y: 0, w: 9.4, h: 0.75,
      fontSize: 18, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });

    addText(s, "10 directions explored · 6 eliminated at concept stage · 3 developed into full concepts · scored on: User Insight Fit 25%  ·  Judgment Development 25%  ·  Trust Ethics 20%  ·  Differentiation 15%  ·  Feasibility 15%", {
      x: 0.2, y: 0.82, w: 9.6, h: 0.3,
      fontSize: 9, fontFace: "Calibri", color: colors.MID, italic: true,
      align: "left", valign: "middle"
    });

    var dirs = [
      {
        title: "DIRECTION 1 — Passive Judgment Sidebar",
        badge: "REJECTED", badgeFill: colors.AMBER_LIGHT, badgeLine: colors.AMBER, badgeColor: "78350F",
        desc: "Essay answer unchanged. Side panel shows claim types, assumptions, gaps, source disagreements, and devil's advocate. User opens panel at will.",
        analysis: "Essay arrives first and induces PEC before panel is opened. 80% never open optional panels even when they want the information. Adding metadata to a closure-inducing artifact is like putting calorie labels on a buffet — format dominates content. Innovation ceiling too low.",
        scores: "User Insight 4/5  ·  Judgment Dev 3/5  ·  Trust Ethics 4/5  ·  Differentiation 3/5  ·  Feasibility 5/5",
        total: "Weighted: 3.85"
      },
      {
        title: "DIRECTION 2 — Autonomous Fact-Verification Agent",
        badge: "REJECTED", badgeFill: colors.AMBER_LIGHT, badgeLine: colors.AMBER, badgeColor: "78350F",
        desc: "Second AI model labels each sentence Supported / Unsupported / Contested. Labels are inline and visible to the user.",
        analysis: "Three failures: (1) AI-on-AI black box — users transfer over-trust to verifier. (2) Fact-checking ignores inferential, normative, and completeness claims — the majority of problematic outputs. (3) Economically implausible at 780M queries/month without severe quality trade-offs.",
        scores: "User Insight 3/5  ·  Judgment Dev 2/5  ·  Trust Ethics 2/5  ·  Differentiation 3/5  ·  Feasibility 3/5",
        total: "Weighted: 2.55"
      },
      {
        title: "DIRECTION 3 — Perplexity Decision Brief Protocol",
        badge: "CHOSEN ✓", badgeFill: colors.GREEN_LIGHT, badgeLine: colors.GREEN_MED, badgeColor: "065F46",
        desc: "Replace essay with structured Decision Brief. Intent Contract before retrieval. Calibrated Commit before action. Epistemic Fork on irreversible queries. Research Debt Meter + Epistemic Fitness training layer.",
        analysis: "Only direction that: (1) changes the primary output artifact, (2) builds measurable user evaluation skill over time, (3) issues no AI verdicts, (4) surfaces two honest readings from same sources, and (5) creates a documented audit trail. No competitor ships any of these mechanisms.",
        scores: "User Insight 5/5  ·  Judgment Dev 5/5  ·  Trust Ethics 5/5  ·  Differentiation 5/5  ·  Feasibility 4/5",
        total: "Weighted: 4.85"
      },
    ];

    dirs.forEach(function(d, i) {
      var dy = 1.18 + i * 1.38;
      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: 0.2, y: dy, w: 9.6, h: 1.3,
        fill: { color: colors.WHITE }, line: { color: i === 2 ? colors.TEAL : colors.BORDER }
      });
      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: 8.2, y: dy + 0.08, w: 1.4, h: 0.26,
        fill: { color: d.badgeFill }, line: { color: d.badgeLine }
      });
      addText(s, d.badge, {
        x: 8.2, y: dy + 0.08, w: 1.4, h: 0.26,
        fontSize: 9, fontFace: "Calibri", bold: true, color: d.badgeColor,
        align: "center", valign: "middle", margin: 0
      });
      addText(s, d.title, {
        x: 0.32, y: dy + 0.06, w: 7.8, h: 0.26,
        fontSize: 10, fontFace: "Calibri", bold: true, color: colors.TEAL,
        align: "left", valign: "middle", margin: 0
      });
      addText(s, "Description: " + d.desc, {
        x: 0.32, y: dy + 0.34, w: 9.3, h: 0.28,
        fontSize: 8.5, fontFace: "Calibri", color: colors.MID,
        align: "left", valign: "top"
      });
      addText(s, "Analysis: " + d.analysis, {
        x: 0.32, y: dy + 0.62, w: 9.3, h: 0.38,
        fontSize: 8.5, fontFace: "Calibri", color: colors.DARK,
        align: "left", valign: "top"
      });
      addText(s, d.scores + "    " + d.total, {
        x: 0.32, y: dy + 1.0, w: 9.3, h: 0.24,
        fontSize: 8, fontFace: "Calibri", color: colors.MID, italic: true,
        align: "left", valign: "middle"
      });
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 5.28, w: 9.6, h: 0.26,
      fill: { color: colors.TEAL_LIGHT }, line: { color: colors.TEAL }
    });
    addText(s, "DECISION RATIONALE: Directions 1 & 2 annotate the closure problem. Direction 3 eliminates it by changing what the primary output artifact IS.", {
      x: 0.28, y: 5.28, w: 9.44, h: 0.26,
      fontSize: 9, fontFace: "Calibri", bold: true, color: colors.TEAL_DARK,
      align: "left", valign: "middle"
    });
  })();

  // ── SLIDE 8 — Solution Detail ────────────────────────────────
  (function slide8() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(resolveColor(colors.OFF_WHITE));
    applyGradientBackground(s);

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.75, fill: { color: colors.TEAL }, line: { color: colors.TEAL }
    });
    addText(s, "PDBP: Five Modules That Transform AI Research From Narrative Delivery to Documented Judgment", {
      x: 0.3, y: 0, w: 9.4, h: 0.75,
      fontSize: 18, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });

    var modules = [
      {
        n: "1", icon: "📋",
        name: "INTENT CONTRACT",
        sub: "Pre-retrieval · 15 seconds",
        body: "User specifies: decision, stakes (Exploratory / Operational / Irreversible), 'good enough' criteria, deadline. Retrieval reranks to contract. Auto-populates for returning users via NLP query analysis. No AI search competitor does this."
      },
      {
        n: "2", icon: "📄",
        name: "DECISION BRIEF",
        sub: "Replaces the essay",
        body: "Five sections: (A) Sourced Findings — Factual badge, direct sources only. (B) Inferred Conclusions — Inferential badge, explicit reasoning chain. (C) Not Addressed — gaps vs contract. (D) Verification Duties — ranked specific actions. (E) Source Disagreement Map — conflicts shown, no winner picked."
      },
      {
        n: "3", icon: "🎯",
        name: "CALIBRATED COMMIT",
        sub: "Pre-action gate",
        body: "User rates 3-5 blind claims (no labels, no sources) 1-5. System reveals: claim type, source quality, mismatch alerts ('You rated 5/5; single weak source'). User writes typed rationale min 10 chars. Export gated on irreversible queries. Inspired by meteorological forecaster calibration training."
      },
      {
        n: "4", icon: "🔀",
        name: "EPISTEMIC FORK",
        sub: "Irreversible stakes · 8+ sources",
        body: "Same source pool → Conservative reading (emphasises uncertainty, conflicts, oldest corroborated claims) + Expansive reading (emphasises opportunity, convergent trends, forward projections). User selects fork + writes rationale. Stored as audit trail. Breaks the single-narrative illusion structurally."
      },
      {
        n: "5", icon: "⚡",
        name: "EPISTEMIC FITNESS",
        sub: "Between-session training",
        body: "Daily 3-min exercises: Claim Typing · Confidence Calibration · Gap Detection · Source Evaluation. Accuracy tracked over weeks. Monthly calibration digest (opt-in). Example: detected inferential claims correctly 40% → 78% in 4 weeks. Changes the user, not just the answer format."
      },
    ];

    var mw = 1.84;
    modules.forEach(function(m, i) {
      var mx = 0.18 + i * (mw + 0.06);

      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: mx, y: 0.85, w: mw, h: 0.56,
        fill: { color: colors.TEAL }, line: { color: colors.TEAL }
      });
      addText(s, m.icon + " " + m.n, {
        x: mx + 0.05, y: 0.85, w: mw - 0.1, h: 0.28,
        fontSize: 14, fontFace: "Calibri", bold: true, color: colors.WHITE,
        align: "left", valign: "middle", margin: 0
      });
      addText(s, m.name, {
        x: mx + 0.05, y: 1.06, w: mw - 0.1, h: 0.22,
        fontSize: 8, fontFace: "Calibri", bold: true, color: colors.WHITE,
        align: "left", valign: "middle", margin: 0
      });

      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: mx, y: 1.44, w: mw, h: 0.22,
        fill: { color: colors.TEAL_LIGHT }, line: { color: colors.TEAL }
      });
      addText(s, m.sub, {
        x: mx + 0.04, y: 1.44, w: mw - 0.08, h: 0.22,
        fontSize: 7.5, fontFace: "Calibri", italic: true, color: colors.TEAL_DARK,
        align: "left", valign: "middle", margin: 0
      });

      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: mx, y: 1.68, w: mw, h: 2.68,
        fill: { color: colors.WHITE }, line: { color: colors.BORDER }
      });
      addText(s, m.body, {
        x: mx + 0.06, y: 1.72, w: mw - 0.12, h: 2.6,
        fontSize: 8.5, fontFace: "Calibri", color: colors.DARK,
        align: "left", valign: "top"
      });
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.18, y: 4.42, w: 9.64, h: 0.22,
      fill: { color: colors.TEAL_DARK }, line: { color: colors.TEAL_DARK }
    });
    addText(s, "SYSTEM FLOW", {
      x: 0.26, y: 4.42, w: 9.48, h: 0.22,
      fontSize: 8, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });
    addText(s, "User Query  →  Intent Contract  →  RAG (contract-weighted)  →  Decision Brief Engine  →  Calibrated Commit Gate  →  [if irreversible] Epistemic Fork  →  Export + Documented Judgment Record", {
      x: 0.18, y: 4.66, w: 9.64, h: 0.3,
      fontSize: 9, fontFace: "Calibri", color: colors.TEAL_DARK, bold: true,
      align: "center", valign: "middle"
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.18, y: 5.0, w: 9.64, h: 0.22,
      fill: { color: colors.AMBER }, line: { color: colors.AMBER }
    });
    addText(s, "EDGE CASES", {
      x: 0.26, y: 5.0, w: 9.48, h: 0.22,
      fontSize: 8, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });
    addText(s, "Conflicting sources → Disagreement Map, no resolution  ·  Thin retrieval → Not Addressed dominates  ·  No contract → banner + gap note  ·  Overconfident prose → mismatch alert  ·  User wants speed → quick answer escape with banner  ·  Repeat flagged claim → session memory highlights dispute", {
      x: 0.18, y: 5.24, w: 9.64, h: 0.3,
      fontSize: 8.5, fontFace: "Calibri", color: colors.MID,
      align: "left", valign: "middle"
    });
  })();

  // ── SLIDE 9 — Metrics ────────────────────────────────────────
  (function slide9() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(resolveColor(colors.OFF_WHITE));
    applyGradientBackground(s);

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.75, fill: { color: colors.TEAL }, line: { color: colors.TEAL }
    });
    addText(s, "JRSR Is the North Star — A Session Only Counts If the User Completed the Full Judgment Loop", {
      x: 0.3, y: 0, w: 9.4, h: 0.75,
      fontSize: 18, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 0.85, w: 7.5, h: 1.08,
      fill: { color: colors.NAVY }, line: { color: colors.TEAL }
    });
    addText(s, "⭐  NORTH STAR — Judgment-Ready Session Rate (JRSR)", {
      x: 0.32, y: 0.88, w: 7.26, h: 0.28,
      fontSize: 11, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });
    addText(s, "% of Pro sessions where user: (a) completes Intent Contract with stakes + goodEnough, (b) reviews Decision Brief through Verification Duties, (c) completes Calibrated Commit with typed rationale ≥10 chars on ≥1 claim, (d) for irreversible queries — selects Epistemic Fork with rationale ≥15 chars. All four required.", {
      x: 0.32, y: 1.17, w: 7.26, h: 0.7,
      fontSize: 9, fontFace: "Calibri", color: "A0D4DA",
      align: "left", valign: "top"
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 7.8, y: 0.85, w: 2.0, h: 1.08,
      fill: { color: colors.AMBER }, line: { color: colors.AMBER }
    });
    addText(s, "TARGET", {
      x: 7.8, y: 0.88, w: 2.0, h: 0.25,
      fontSize: 9, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "center", valign: "middle", margin: 0
    });
    addText(s, "32%", {
      x: 7.8, y: 1.1, w: 2.0, h: 0.5,
      fontSize: 36, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "center", valign: "middle", margin: 0
    });
    addText(s, "at 6 months\nbaseline: 0%", {
      x: 7.8, y: 1.62, w: 2.0, h: 0.28,
      fontSize: 8.5, fontFace: "Calibri", color: colors.WHITE,
      align: "center", valign: "middle"
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 2.05, w: 4.75, h: 0.28,
      fill: { color: colors.TEAL_DARK }, line: { color: colors.TEAL_DARK }
    });
    addText(s, "LEADING INDICATORS", {
      x: 0.28, y: 2.05, w: 4.59, h: 0.28,
      fontSize: 9, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });
    var leads = [
      [{ text: "Metric", options: { bold: true, color: colors.WHITE, fill: { color: colors.TEAL } } },
       { text: "Target", options: { bold: true, color: colors.WHITE, fill: { color: colors.TEAL } } },
       { text: "Rationale", options: { bold: true, color: colors.WHITE, fill: { color: colors.TEAL } } }],
      ["Intent Contract completion rate", "55% of Pro high-stakes", "Gateway to full Brief — drop signals friction"],
      ["Verification duty click-through", "+50% vs citation CTR baseline", "Measures whether Brief changes inspection behaviour"],
      ["Calibration delta narrowing (90-day)", "15% overconfidence improvement", "Measures whether Commit builds user skill over time"],
      ["Fork completion rate (irreversible)", "70% of fork-triggered sessions", "Abandonment signals overload — key friction signal"],
      ["Epistemic Fitness weekly active users", "15% of Pro at 30 days", "Fitness engagement predicts Commit quality in search"],
    ];
    addTable(s, leads, {
      x: 0.2, y: 2.36, w: 4.75, h: 2.7,
      fontSize: 8, fontFace: "Calibri", color: colors.DARK,
      border: { pt: 0.5, color: colors.BORDER },
      fill: { color: colors.WHITE },
      rowH: 0.42,
      colW: [1.8, 1.3, 1.65]
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 5.15, y: 2.05, w: 4.65, h: 0.28,
      fill: { color: colors.AMBER }, line: { color: colors.AMBER }
    });
    addText(s, "GUARDRAIL METRICS", {
      x: 5.23, y: 2.05, w: 4.49, h: 0.28,
      fontSize: 9, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });
    var guards = [
      [{ text: "Metric", options: { bold: true, color: colors.WHITE, fill: { color: colors.AMBER } } },
       { text: "Target", options: { bold: true, color: colors.WHITE, fill: { color: colors.AMBER } } },
       { text: "Why It Matters", options: { bold: true, color: colors.WHITE, fill: { color: colors.AMBER } } }],
      ["p95 time-to-brief", "<8s additional vs legacy", "JRSR gains worthless if unusable"],
      ["Session abandonment rate", "No >5% increase", "Highest adoption risk signal"],
      ["Quick-answer escape (irreversible)", "<40%", "Above 40% = routing around the protocol"],
      ["Self-reported harm incidents", "Downward trend QoQ", "Ultimate guardrail — if users still harmed, product fails"],
      ["Calibration delta direction", "Must not widen", "Any widening → immediate design investigation"],
    ];
    addTable(s, guards, {
      x: 5.15, y: 2.36, w: 4.65, h: 2.7,
      fontSize: 8, fontFace: "Calibri", color: colors.DARK,
      border: { pt: 0.5, color: colors.BORDER },
      fill: { color: colors.WHITE },
      rowH: 0.42,
      colW: [1.7, 1.1, 1.85]
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 5.12, w: 9.6, h: 0.38,
      fill: { color: colors.TEAL_LIGHT }, line: { color: colors.TEAL }
    });
    addText(s, "EXPERIMENT PLAN:  Wk 0-4: 5% Pro A/B — abandonment + JRSR leading indicators only  ·  Wk 4-12: 25% rollout — add calibration delta + Fitness engagement  ·  Wk 12-24: Full Pro GA — add Epistemic Fork to irreversible segment  ·  Parallel: Qualitative cohort n=20 at 30-day & 90-day marks", {
      x: 0.28, y: 5.12, w: 9.44, h: 0.38,
      fontSize: 8.5, fontFace: "Calibri", color: colors.TEAL_DARK,
      align: "left", valign: "middle"
    });
  })();

  // ── SLIDE 10 — Risks ─────────────────────────────────────────
  (function slide10() {
    var s = prs.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    s.getBackground().setSolidFill(resolveColor(colors.OFF_WHITE));
    applyGradientBackground(s);

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.75, fill: { color: colors.NAVY }, line: { color: colors.NAVY }
    });
    addText(s, "The Users Who Need PDBP Most Are Most Likely to Skip It — Here Is How We Solve That", {
      x: 0.3, y: 0, w: 9.4, h: 0.75,
      fontSize: 18, fontFace: "Calibri", bold: true, color: colors.WHITE,
      align: "left", valign: "middle", margin: 0
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 0.82, w: 9.6, h: 0.4,
      fill: { color: colors.AMBER_LIGHT }, line: { color: colors.AMBER }
    });
    addText(s, "The most important intellectual exercise in product design is not justifying your solution — it is finding the conditions under which it fails. PDBP has seven identified failure modes. Three are high-likelihood. Two of those three are high-impact. The protocol's survival depends on how well we design against them.", {
      x: 0.28, y: 0.82, w: 9.44, h: 0.4,
      fontSize: 8.5, fontFace: "Calibri", color: "78350F", italic: true,
      align: "left", valign: "middle"
    });

    var risks = [
      { title: "R1 — Friction Kills Usage",           lh: "HIGH", imp: "HIGH",    lhBg: colors.RED_LIGHT,   impBg: colors.RED_LIGHT,
        analysis: "Users want 3s answers. PDBP adds 30-60s. Friction is invisible in qualitative research — users say they want thoroughness but behave for speed.",
        mitigation: "Stakes-based activation. Exploratory keeps essay. NLP auto-populates contract. Progressive commitment — one question on first use. Smart defaults from prior sessions. Accepted trade-off: 5-10% exploratory drop." },
      { title: "R2 — Calibrated Commit Gamed",         lh: "HIGH", imp: "MEDIUM", lhBg: colors.RED_LIGHT,   impBg: colors.AMBER_LIGHT,
        analysis: "Users click through without thinking. Overconfident users — who most need calibration — are most likely to skip it. JRSR becomes a vanity metric if trivially achievable.",
        mitigation: "Min 10-char rationale required. Random spot-check on 20% of sessions. JRSR requires min 45s time-in-commit. High-risk cohorts trigger non-skippable mode." },
      { title: "R3 — Fork Doubles Hallucination Surface", lh: "MEDIUM", imp: "HIGH", lhBg: colors.AMBER_LIGHT, impBg: colors.RED_LIGHT,
        analysis: "Two syntheses = two failure modes. Expansive fork may overstate projections. The one case where PDBP could make outcomes worse than current essay format.",
        mitigation: "Same-source constraint enforced technically. Fork only with ≥8 sources. Conservative shown first by default. Human eval gate before GA on medical/regulatory query types." },
      { title: "R4 — Brief Feels Bureaucratic",         lh: "MEDIUM", imp: "HIGH", lhBg: colors.AMBER_LIGHT, impBg: colors.RED_LIGHT,
        analysis: "Knowledge workers reject compliance theater. Users will hit Quick Answer escape and never return to PDBP mode.",
        mitigation: "Design partnership with 10 power users pre-launch. Brief reads like analyst output, not government form. Collapsible sections + narrative toggle as pressure valve." },
      { title: "R5 — Fitness Drops After Novelty",      lh: "HIGH", imp: "MEDIUM", lhBg: colors.RED_LIGHT,   impBg: colors.AMBER_LIGHT,
        analysis: "Gamified exercises lose engagement after initial curiosity. 30-day retention on daily habit products averages 15-20%. Long-term skill-building thesis fails.",
        mitigation: "Contextual integration: Fitness offered after Commit sessions. Vary exercise types weekly. Monthly calibration report email (opt-in). Target 15-20% sustained weekly engagement." },
      { title: "R6 — Debt Score Creates Anxiety",       lh: "MEDIUM", imp: "MEDIUM", lhBg: colors.AMBER_LIGHT, impBg: colors.AMBER_LIGHT,
        analysis: "'62% complete' may trigger abandonment or obsession with 100% when 75% is decision-appropriate. Quantification creates anchoring.",
        mitigation: "Language: 'Here is what you have covered' not 'incomplete'. Never show % on exploratory stakes. Allow marking duties as 'not relevant to my decision'." },
      { title: "R7 — Privacy Backlash on Calibration",  lh: "LOW-MED", imp: "MEDIUM", lhBg: colors.GREEN_LIGHT, impBg: colors.AMBER_LIGHT,
        analysis: "Enterprise users may fear calibration data could be accessed by managers or used in performance review.",
        mitigation: "All calibration opt-in only. No employer dashboards — ever, unconditionally. Local-first storage. Delete-all control. Third-party privacy audit before Enterprise launch." },
    ];

    var positions = [
      { x: 0.2,  y: 1.30, w: 4.73 },
      { x: 5.08, y: 1.30, w: 4.73 },
      { x: 0.2,  y: 2.58, w: 4.73 },
      { x: 5.08, y: 2.58, w: 4.73 },
      { x: 0.2,  y: 3.85, w: 3.12 },
      { x: 3.44, y: 3.85, w: 3.12 },
      { x: 6.68, y: 3.85, w: 3.12 },
    ];

    risks.forEach(function(r, i) {
      var pos = positions[i];
      var x = pos.x, y = pos.y, w = pos.w;
      var cardH = i < 4 ? 1.15 : 1.2;

      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: x, y: y, w: w, h: cardH,
        fill: { color: colors.WHITE }, line: { color: colors.BORDER }
      });

      addText(s, r.title, {
        x: x + 0.08, y: y + 0.04, w: w - 1.1, h: 0.22,
        fontSize: 8.5, fontFace: "Calibri", bold: true, color: colors.TEAL,
        align: "left", valign: "middle", margin: 0
      });

      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: x + w - 1.0, y: y + 0.04, w: 0.46, h: 0.22,
        fill: { color: r.lhBg }, line: { color: colors.BORDER }
      });
      addText(s, "LH: " + r.lh, {
        x: x + w - 1.0, y: y + 0.04, w: 0.46, h: 0.22,
        fontSize: 6.5, fontFace: "Calibri", bold: true, color: colors.DARK,
        align: "center", valign: "middle", margin: 0
      });

      addShape(s, SlidesApp.ShapeType.RECTANGLE, {
        x: x + w - 0.52, y: y + 0.04, w: 0.46, h: 0.22,
        fill: { color: r.impBg }, line: { color: colors.BORDER }
      });
      addText(s, "IMP: " + r.imp, {
        x: x + w - 0.52, y: y + 0.04, w: 0.46, h: 0.22,
        fontSize: 6.5, fontFace: "Calibri", bold: true, color: colors.DARK,
        align: "center", valign: "middle", margin: 0
      });

      addText(s, "Analysis: " + r.analysis, {
        x: x + 0.08, y: y + 0.28, w: w - 0.16, h: 0.38,
        fontSize: 7.5, fontFace: "Calibri", color: colors.MID,
        align: "left", valign: "top"
      });
      addText(s, "Mitigation: " + r.mitigation, {
        x: x + 0.08, y: y + 0.66, w: w - 0.16, h: 0.45,
        fontSize: 7.5, fontFace: "Calibri", color: "065F46",
        align: "left", valign: "top"
      });
    });

    addShape(s, SlidesApp.ShapeType.RECTANGLE, {
      x: 0.2, y: 5.1, w: 9.6, h: 0.4,
      fill: { color: colors.TEAL_LIGHT }, line: { color: colors.TEAL }
    });
    addText(s, "HONEST SELF-ASSESSMENT: PDBP will succeed if we design friction correctly — enough to require genuine engagement, not enough to drive abandonment. The line between 'productive friction that builds skill' and 'annoying friction that churns users' is narrow and determined by A/B testing, not prediction. We know where the risks are. Mitigations are ready. We will monitor aggressively and iterate fast.", {
      x: 0.28, y: 5.1, w: 9.44, h: 0.4,
      fontSize: 8.5, fontFace: "Calibri", color: colors.TEAL_DARK, italic: true,
      align: "left", valign: "middle"
    });
  })();

  // Remove the default blank slide that was created with the presentation
  defaultSlide.remove();
}
