// Template — every chapter file must follow this exact shape.
const content = {
  subsections: [
    {
      id: "",          // format: c{chapter}_s{index}, e.g. "c1_s0"
      title: "",       // exact subsection title
      objectives: [],  // empty array for now
      notes: "",       // empty string for now
      examples: [],    // empty array for now
      diagrams: []     // empty array for now
    }
  ]
}

const questions = []

export const CH_TEMPLATE = {
  id: 0,
  title: "",
  summary: "",
  content,
  questions,
}
