/**
 * MediGuide Reasoning Engine
 * Combines Knowledge Representation, Fuzzy Logic, Bayesian Update, and Decision Rules.
 * Pure local JavaScript implementation. Strictly educational prototype.
 */

// Numerical symptom mappings
export const SYMPTOM_LEVELS = {
  None: 0.0,
  Mild: 0.25,
  Moderate: 0.60,
  Severe: 1.0,
};

export const DEMO_CASE = {
  dizziness: 'Severe',
  sweating: 'Moderate',
  weakness: 'Severe',
  chestDiscomfort: 'Mild',
  medicalHistory: 'Unknown',
  newEvidence: 'Positive evidence',
};

export const INITIAL_INPUTS = {
  dizziness: 'None',
  sweating: 'None',
  weakness: 'None',
  chestDiscomfort: 'None',
  medicalHistory: 'Unknown',
  newEvidence: 'None',
};

/**
 * Main Reasoning Pipeline Execution
 */
export function runReasoningEngine(inputs) {
  const dizzinessVal = SYMPTOM_LEVELS[inputs.dizziness] || 0;
  const sweatingVal = SYMPTOM_LEVELS[inputs.sweating] || 0;
  const weaknessVal = SYMPTOM_LEVELS[inputs.weakness] || 0;
  const chestVal = SYMPTOM_LEVELS[inputs.chestDiscomfort] || 0;

  // 1. STAGE 1: Knowledge Representation (Facts & Rules)
  const facts = [
    { label: 'Dizziness', value: inputs.dizziness, level: getQualitativeLabel(dizzinessVal) },
    { label: 'Sweating', value: inputs.sweating, level: getQualitativeLabel(sweatingVal) },
    { label: 'Weakness', value: inputs.weakness, level: getQualitativeLabel(weaknessVal) },
    { label: 'Chest Discomfort', value: inputs.chestDiscomfort, level: getQualitativeLabel(chestVal) },
    { label: 'History', value: inputs.medicalHistory, level: inputs.medicalHistory === 'Relevant history' ? 'RELEVANT' : 'PARTIAL/NONE' },
    { label: 'Evidence', value: inputs.newEvidence, level: inputs.newEvidence.toUpperCase() },
  ];

  const rules = [];

  if (dizzinessVal >= 0.6 && weaknessVal >= 0.6) {
    rules.push({
      id: 'R1',
      text: 'IF dizziness is HIGH AND weakness is HIGH THEN severity is HIGH',
      triggered: true,
      category: 'Symptom Cluster'
    });
  }

  if (chestVal === 1.0) {
    rules.push({
      id: 'R2',
      text: 'IF chest discomfort is SEVERE THEN safety override = URGENT',
      triggered: true,
      category: 'Safety Rule'
    });
  }

  if (sweatingVal >= 0.6 && chestVal >= 0.25) {
    rules.push({
      id: 'R3',
      text: 'IF sweating is MODERATE/HIGH AND chest discomfort present THEN elevate risk context',
      triggered: true,
      category: 'Context Rule'
    });
  }

  if (inputs.medicalHistory === 'Relevant history') {
    rules.push({
      id: 'R4',
      text: 'IF medical history is RELEVANT THEN increase baseline prior weighting',
      triggered: true,
      category: 'History Rule'
    });
  }

  if (inputs.newEvidence === 'Positive evidence') {
    rules.push({
      id: 'R5',
      text: 'IF new evidence is POSITIVE THEN apply positive Bayesian likelihood multiplier',
      triggered: true,
      category: 'Evidence Rule'
    });
  } else if (inputs.newEvidence === 'Negative evidence') {
    rules.push({
      id: 'R5_NEG',
      text: 'IF new evidence is NEGATIVE THEN dampen Bayesian belief for primary hypothesis',
      triggered: true,
      category: 'Evidence Rule'
    });
  }

  if (rules.length === 0) {
    rules.push({
      id: 'R_DEFAULT',
      text: 'IF symptoms are LOW THEN severity baseline remains ROUTINE',
      triggered: true,
      category: 'Baseline Rule'
    });
  }

  // 2. STAGE 2: Fuzzy Logic & Severity Calculation
  // Weights: Chest (0.30), Dizziness (0.20), Weakness (0.20), Sweating (0.15), Context (0.15)
  const symptomWeightedSum = (dizzinessVal * 0.20) + (sweatingVal * 0.15) + (weaknessVal * 0.20) + (chestVal * 0.30);
  
  let historyModifier = 0;
  if (inputs.medicalHistory === 'Relevant history') historyModifier = 0.08;
  if (inputs.medicalHistory === 'No relevant history') historyModifier = -0.04;

  let evidenceModifier = 0;
  if (inputs.newEvidence === 'Positive evidence') evidenceModifier = 0.10;
  if (inputs.newEvidence === 'Negative evidence') evidenceModifier = -0.10;

  const contextModifier = (historyModifier + evidenceModifier);
  const rawSeverity = (symptomWeightedSum / 0.85) * 0.85 + (contextModifier * 0.15);
  const overallSeverity = Math.min(1.0, Math.max(0.0, parseFloat(rawSeverity.toFixed(2))));

  // Triangular Membership Functions
  // Low: 1 at 0, 0 at 0.5
  const lowMembership = Math.max(0, 1 - overallSeverity / 0.5);
  
  // Medium: 1 at 0.5, 0 at 0 and 1.0
  const mediumMembership = Math.max(0, 1 - 2 * Math.abs(overallSeverity - 0.5));
  
  // High: 0 at <=0.5, 1 at 1.0
  const highMembership = Math.max(0, (overallSeverity - 0.5) / 0.5);

  let classification = 'LOW';
  if (overallSeverity >= 0.65) classification = 'HIGH';
  else if (overallSeverity >= 0.35) classification = 'MEDIUM';

  const fuzzyMemberships = {
    low: parseFloat(lowMembership.toFixed(2)),
    medium: parseFloat(mediumMembership.toFixed(2)),
    high: parseFloat(highMembership.toFixed(2)),
  };

  // 3. STAGE 3: Bayesian Inference (Belief Update)
  // Labeled strictly as Illustrative Hypotheses
  const priors = {
    hypothesisA: 0.40, // High-weight pattern
    hypothesisB: 0.35, // Moderate pattern
    hypothesisC: 0.25, // Low pattern / Benign
  };

  // Likelihood Multipliers based on severity and evidence
  let likelihoodA = 1.0 + (overallSeverity * 1.5);
  let likelihoodB = 1.0 + (mediumMembership * 0.8);
  let likelihoodC = 1.0 + (lowMembership * 1.2);

  if (inputs.newEvidence === 'Positive evidence') {
    likelihoodA *= 1.45;
    likelihoodB *= 1.05;
    likelihoodC *= 0.55;
  } else if (inputs.newEvidence === 'Negative evidence') {
    likelihoodA *= 0.55;
    likelihoodB *= 0.95;
    likelihoodC *= 1.45;
  }

  if (inputs.medicalHistory === 'Relevant history') {
    likelihoodA *= 1.25;
    likelihoodB *= 1.10;
  }

  if (chestVal === 1.0) {
    likelihoodA *= 1.5;
  }

  // Calculate Unnormalized Posteriors
  const unnormA = priors.hypothesisA * likelihoodA;
  const unnormB = priors.hypothesisB * likelihoodB;
  const unnormC = priors.hypothesisC * likelihoodC;
  const sumUnnorm = unnormA + unnormB + unnormC;

  // Normalize to sum to 1.00
  const posteriorA = parseFloat((unnormA / sumUnnorm).toFixed(2));
  const posteriorB = parseFloat((unnormB / sumUnnorm).toFixed(2));
  // Guarantee exact sum of 1.00
  const posteriorC = parseFloat((1.0 - (posteriorA + posteriorB)).toFixed(2));

  const bayesianResults = [
    {
      name: 'Hypothesis A',
      description: 'Acute Systemic Stress Pattern',
      prior: priors.hypothesisA,
      posterior: posteriorA,
    },
    {
      name: 'Hypothesis B',
      description: 'Autonomic Dysregulation Pattern',
      prior: priors.hypothesisB,
      posterior: posteriorB,
    },
    {
      name: 'Hypothesis C',
      description: 'Transient Physiological Pattern',
      prior: priors.hypothesisC,
      posterior: posteriorC,
    },
  ];

  // 4. STAGE 4: Decision Engine
  let priority = 'ROUTINE';
  let overrideTriggered = false;

  if (overallSeverity >= 0.70) {
    priority = 'URGENT';
  } else if (chestVal === 1.0) {
    priority = 'URGENT';
    overrideTriggered = true;
  } else if (overallSeverity >= 0.45) {
    priority = 'PRIORITY';
  } else {
    priority = 'ROUTINE';
  }

  let recommendation = '';
  if (priority === 'URGENT') {
    recommendation = 'Seek prompt professional evaluation.';
  } else if (priority === 'PRIORITY') {
    recommendation = 'Consider discussing these symptoms with a healthcare professional.';
  } else {
    recommendation = 'Monitor the situation and consider professional advice if symptoms persist or worsen.';
  }

  const rationale = [];
  if (overallSeverity >= 0.70) {
    rationale.push(`High fuzzy severity score (${overallSeverity} ≥ 0.70 threshold)`);
  } else if (overallSeverity >= 0.45) {
    rationale.push(`Moderate fuzzy severity score (${overallSeverity} ≥ 0.45 threshold)`);
  } else {
    rationale.push(`Low fuzzy severity score (${overallSeverity} < 0.45)`);
  }

  if (posteriorA > priors.hypothesisA) {
    rationale.push(`Bayesian belief for Hypothesis A increased from ${priors.hypothesisA.toFixed(2)} to ${posteriorA.toFixed(2)} after evidence update`);
  } else if (posteriorC > priors.hypothesisC) {
    rationale.push(`Bayesian belief shifted toward benign Hypothesis C (${posteriorC.toFixed(2)}) based on negative/low evidence`);
  }

  if (overrideTriggered) {
    rationale.push('Safety rule triggered: Severe chest discomfort forced URGENT priority override');
  } else if (rules.some(r => r.id === 'R1')) {
    rationale.push('Knowledge rule matched: High dizziness + High weakness cluster');
  } else if (inputs.newEvidence === 'Positive evidence') {
    rationale.push('Positive evidence multiplier updated belief distribution');
  } else {
    rationale.push('Safety guidelines evaluated against current parameter values');
  }

  // 5. EXPLANATION TRACE TIMELINE
  const trace = [
    {
      step: 1,
      title: 'Input Received',
      detail: `Extracted quantitative levels: Dizziness (${inputs.dizziness}), Sweating (${inputs.sweating}), Weakness (${inputs.weakness}), Chest (${inputs.chestDiscomfort}).`,
    },
    {
      step: 2,
      title: 'Relevant Rules Retrieved',
      detail: `Checked Knowledge Base. ${rules.length} rule(s) matched user symptom pattern.`,
    },
    {
      step: 3,
      title: 'Fuzzy Severity Calculated',
      detail: `Calculated weighted average & triangular membership functions: Overall severity = ${overallSeverity} (${classification}).`,
    },
    {
      step: 4,
      title: 'Bayesian Beliefs Updated',
      detail: `Updated belief distribution based on evidence multipliers. Hypothesis A posterior = ${posteriorA}.`,
    },
    {
      step: 5,
      title: 'Decision Rules Evaluated',
      detail: `Safety rules evaluated against severity threshold (${overallSeverity}) -> Priority tier assigned as ${priority}.`,
    },
    {
      step: 6,
      title: 'Recommendation Generated',
      detail: `Formatted decision support guidance: "${recommendation}"`,
    },
  ];

  return {
    facts,
    rules,
    overallSeverity,
    fuzzyMemberships,
    classification,
    bayesianResults,
    priority,
    recommendation,
    rationale,
    trace,
  };
}

function getQualitativeLabel(val) {
  if (val >= 0.8) return 'HIGH';
  if (val >= 0.4) return 'MODERATE';
  if (val > 0.0) return 'LOW';
  return 'NONE';
}
