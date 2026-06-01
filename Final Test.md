# 🧪 Final Testing Guide: Perplexity Decision Brief Protocol (PDBP)

Welcome to the final testing phase of the PDBP prototype! 

This guide is written to map exactly to the **5 Core Solutions** outlined in the project architecture. Follow this step-by-step guide to test every single feature we have built into this HTML/CSS prototype.

---

## Step 1: Fire Up the Engine
1. Open your browser and go to your live GitHub Pages URL: `https://srivenurajulu.github.io/NLGP2-Perplexity/`
*(If you are testing locally, run `python3 -m http.server 8000` and open `http://localhost:8000`)*

*What you should see:* A beautiful, dark-themed homepage. The title "Perplexity Decision Brief Protocol" should be centered at the top. The 5 Protocol Modules should be lined up in a neat straight row across your screen.

---

## 🎯 How to Test the 5 Core Solutions

### Solution 1: The Intent Contract
**What it is:** Capturing the decision, stakes, and "good enough" criteria *before* retrieving information to prevent mindless browsing.

**How to test it:**
1. On the Homepage, click the Demo Query: **"What are the market size projections for AI search in 2026?"**
2. A modal titled **"Intent Contract"** will immediately appear.
3. Review the dropdown for "Stakes Level" (Exploratory, Operational, Irreversible).
4. Click **"Lock Contract & Generate Brief"** to proceed to the Decision Brief.

### Solution 2: The Epistemic Fork
**What it is:** Presenting two conflicting, valid viewpoints for high-stakes, irreversible decisions to prevent a single authoritative narrative.

**How to test it:**
1. Go back to the Homepage.
2. Click the Demo Query: **"How should I prepare for a senior PM interview at a FAANG company?"**
3. Notice the red warning at the top: **"Irreversible stakes"**.
4. Below it, you will see the **Epistemic Fork Required** section. The rest of the brief is blurred out and unclickable.
5. Click either the **Conservative** or **Expansive** reading. Watch the full Decision Brief unlock below!

### Solution 3: The Calibrated Commit Gate
**What it is:** Forcing users to rate their confidence on claims blindly before revealing the evidence.

**How to test it:**
1. Scroll to the very bottom of any Decision Brief (e.g., the PM interview query) and click the **"Calibrated Commit"** button.
2. **The Rating Phase:** A modal appears with 3 claims. Rate your confidence from 1 (Guess) to 5 (Certain) for all of them. Notice you cannot submit until all three are rated.
3. **The Reveal Phase:** Click "Submit Ratings & Reveal Evidence".
4. The screen will flip to show you the truth. Look for the yellow **"⚠ Overconfident"** badges if you rated an inference highly (4 or 5).
5. Read the "Evidence check" box to see how your assumption mismatched the actual sources.
6. Click "Acknowledge & Complete Protocol".

### Solution 4: Research Debt Quantifier
**What it is:** A progress meter showing how much verification work the user still owes the decision.

**How to test it:**
1. On any Decision Brief, look at the right sidebar for the **"Research Debt"** meter.
2. Notice it tracks "Sources Inspected" and the "Commit Gate".
3. Scroll to the **"Your Verification Duties"** section in the main brief. Check the checkboxes next to the duties.
4. Click on any of the blue citation links (e.g., `[1]`, `[2]`) in the text. Watch the "Sources Inspected" progress bar fill up in real-time as the source is highlighted in the right sidebar!
5. Once you complete the Calibrated Commit (Solution 3), watch the "Commit Gate" progress bar turn green!

### Solution 5: Epistemic Fitness & Calibration Engine
**What it is:** Daily 3-minute challenges to train judgment skill, plus a dashboard to track your confidence calibration over time.

**How to test it:**
1. Click the **"Epistemic Fitness"** card on the homepage (or use the link in the top header).
2. Click **Start Challenge**.
3. Read the source text, type a claim, rate your confidence (1-5), select a category (Factual/Inferential/Normative), and click **Submit Claim**.
4. View your streak on the completion screen.
5. Next, click **"Calibration"** in the top right header to view the Calibration Engine.
6. Review your "Calibration Delta" dashboard and read the dynamic insights box.
7. **Crucial:** Click on the bars in the timeline chart! A detailed "Session Detail" modal will slide into view, showing a breakdown of your past sessions.

---

## 🎯 Final Verification Checklist
If you can answer "Yes" to all of these, the prototype perfectly demonstrates the architecture:
- [ ] Are the 5 Protocol Modules on the homepage in a single straight line?
- [ ] Does clicking a query trigger the **Intent Contract** (Solution 1)?
- [ ] Does the PM Interview query trigger the **Epistemic Fork** (Solution 2)?
- [ ] Can you complete the **Calibrated Commit** blind rating and see the evidence reveals (Solution 3)?
- [ ] Does clicking citations fill up the **Research Debt** meter (Solution 4)?
- [ ] Can you complete an **Epistemic Fitness** challenge and view the **Calibration** chart (Solution 5)?
- [ ] Is the search bar on the results page large and full-width?
