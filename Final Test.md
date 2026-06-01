# 🧪 Final Testing Guide: Perplexity Decision Brief Protocol (PDBP)

Welcome to the final testing phase of the PDBP prototype! 

This guide is written for you (and anyone else reviewing the project) to walk through the application exactly as a user would. We've built a lot of unique features into this HTML/CSS prototype, and this document will make sure you don't miss a single one.

Let's dive in!

---

## Step 1: Fire Up the Engine
Before testing anything, make sure your local server is running. 
1. Open your terminal in the root of the `NLGP2-Perplexity` folder.
2. Run `python3 -m http.server 8000`.
3. Open your browser and go to `http://localhost:8000`.

*What you should see:* A beautiful, dark-themed homepage that feels spacious and premium. The title "Perplexity Decision Brief Protocol" should be sitting proudly and perfectly centered at the top. The 5 Protocol Modules should be lined up in a neat straight row across your screen.

---

## Step 2: Test the Core Queries (The Decision Briefs)
On the homepage, you’ll see four "Demo Queries". Each one of these is wired up to a **completely unique dataset**. Let's test them one by one.

**Click Query 1: "What are the market size projections for AI search in 2026?"**
- You should instantly transition to the output page.
- Notice the **Large Search Bar** at the top. It's full-width, giving you plenty of breathing room.
- Scroll through the brief. You'll see "Sourced Findings" (factual) separated from "Inferred Conclusions" (guesswork).
- At the bottom, click the **"Calibrated Commit"** button. This will reveal the blind-rating system where you assess claims before seeing the evidence.
- Finally, click the **"< Back to Home / New Search"** button right beneath the top search bar to return to the homepage.

**Click Query 2: "Compare Perplexity vs ChatGPT for research workflows"**
- Look closely at the content—it's entirely different from Query 1! 
- Check the "Sources" sidebar on the right. You'll see real links mapped to TechCrunch, The Verge, and OpenAI.
- This proves our logic engine successfully routes completely different topics to unique workflows. 
- Go back to the homepage.

**Click Query 3: "How should I prepare for a senior PM interview at a FAANG company?"**
- This one is special. Look for the **"Epistemic Fork"** section near the top.
- This demonstrates how the system handles high-stakes, irreversible decisions by presenting two conflicting viewpoints ("Standard Execution Focus" vs "Visionary Product Sense Focus").
- Go back to the homepage.

**Click Query 4: "Latest FDA guidance on AI medical devices"**
- A deeply technical query that showcases the system's ability to extract specific regulatory verification duties.
- Check the "Your Verification Duties" section to see actionable steps rather than just passive reading.
- Go back to the homepage.

---

## Step 3: Hit the Gym (Epistemic Fitness)
It's time to test the interactive gamified elements. 
From the homepage, click on the **"Epistemic Fitness"** card (or use the link in the top right navigation).

1. **The Setup:** You should see a "Daily 3-Minute Challenge" introduction. Click **Start Challenge**.
2. **The Test:** You are presented with a source document. 
   - Type a short claim into the text box based on the document.
   - Use the slider to rate your confidence from 1 to 5.
   - Categorize your claim (Factual, Inferential, or Normative).
   - Click **Submit Claim**.
3. **The Result:** The system processes your entry and takes you to the "Session Complete" page. Notice the checkmark is perfectly sized (we fixed that layout glitch!) and you can see your current streak.

---

## Step 4: Check Your Stats (Calibration Engine)
Now that you've completed a fitness session, let's look at your historical performance.
Click the **"Calibration"** link in the top right corner.

1. **The Dashboard:** You'll see a high-level overview of your "Calibration Delta" (whether you tend to over-trust or under-trust AI).
2. **The Insights:** Read the dynamic insights box. For example, it might warn you: *"You tend to over-trust AI claims... especially inferential ones."*
3. **The Timeline:** Look at the bar chart showing your performance over time. 
   - **Crucial step:** Click on one of the bars in the chart! 
   - A detailed "Session Detail" modal will slide into view, showing exactly which claims you got wrong, what your rating was, and whether you were overconfident.

---

## 🎯 Final Verification Checklist
If you can answer "Yes" to all of these, the prototype is perfectly complete and ready for your presentation:
- [ ] Is the header text "Perplexity Decision Brief Protocol" centered on all pages?
- [ ] Do the Protocol Modules on the homepage form a single straight line?
- [ ] Does clicking each of the 4 demo queries load a unique dataset?
- [ ] Is the search bar on the results page large, full-width, and easy to use?
- [ ] Is the "Back to Home" button clearly visible on the results page?
- [ ] Are all UI elements and SVGs (like the fitness checkmark) appropriately sized without blowing up?

Happy testing! This HTML/CSS prototype is lightweight, incredibly fast, completely bypasses the Next.js build errors, and is perfectly suited for direct hosting on GitHub Pages.
