# MediGuide – Uncertainty-Aware Medical Decision Support

> **IMPORTANT DISCLAIMER**  
> **Educational decision-support prototype — not a medical diagnosis.**  
> MediGuide is an academic AI case-study prototype designed to demonstrate reasoning under uncertainty. It does not provide medical diagnosis or replace a qualified healthcare professional.

---

## 📌 Overview

MediGuide is an educational AI decision-support prototype that demonstrates how **Knowledge Representation**, **Fuzzy Logic**, and **Bayesian Inference** can be combined to reason about uncertain medical situations.

All reasoning calculations run entirely locally in client-side JavaScript.

---

## 🧠 Demonstrated AI Concepts

1. **Knowledge Representation (Facts + Rules)**:
   - Extracts qualitative clinical facts (e.g., `Dizziness → HIGH`, `Weakness → HIGH`) from user inputs.
   - Evaluates symbolic domain rules in an IF-THEN heuristic knowledge base.

2. **Fuzzy Logic (Handles Vague Severity)**:
   - Models continuous, ambiguous symptom intensities instead of rigid binary true/false classifications.
   - Computes weighted severity scores (0.0 to 1.0) and triangular set membership functions ($\mu_{\text{Low}}$, $\mu_{\text{Medium}}$, $\mu_{\text{High}}$).

3. **Bayesian Inference (Belief Updates with Evidence)**:
   - Maintains probability distributions over candidate hypotheses (Hypothesis A, B, and C).
   - Dynamically updates prior beliefs into posterior probabilities when clinical observations and new evidence are provided:
     $$\text{Posterior} \propto \text{Prior} \times \text{Likelihood}$$

4. **Decision Engine & Explainable AI**:
   - Synthesizes fuzzy severity, Bayesian posterior beliefs, and safety override rules.
   - Generates priority classifications (`URGENT`, `PRIORITY`, `ROUTINE`) and explainable next-step recommendations.
   - Produces an end-to-end sequential explanation trace timeline.

---

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Architecture**: Clean component-based modular structure
- **Runtime**: Pure client-side JavaScript execution (no external backend required)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/NagellaPranathi/Nagella_Pranathi_CH.SC.U4CSE23131.git
cd Nagella_Pranathi_CH.SC.U4CSE23131

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

---

## 📄 License

This project is open-source and intended solely for educational and academic evaluation purposes.
