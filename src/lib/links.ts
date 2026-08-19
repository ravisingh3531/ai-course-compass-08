/**
 * Canonical official destinations referenced across the comparison page.
 * Keep every outbound link in one place so they stay accurate and verifiable.
 */
export const LINKS = {
  logicmojoCourse: "https://logicmojo.com/artificial-intelligence-course",
  logicmojoGenAI: "https://logicmojo.com/generative-ai-course",
  logicmojoDataScience: "https://logicmojo.com/data-science-and-artificial-intelligence",
  logicmojoFees: "https://logicmojo.com/data-science-course-fees",
  logicmojoProjects: "https://logicmojo.com/ai-projects",
  logicmojoSuccess: "https://logicmojo.com/success-story",
  logicmojoReviews: "https://logicmojo.com/reviews",
  logicmojoDSA: "https://logicmojo.com/best-dsa-course",
  logicmojoBeginners: "https://logicmojo.com/best-ai-courses-for-beginners",
  logicmojoProfessionals: "https://logicmojo.com/best-ai-courses-for-working-professionals",
  scalerCourse: "https://www.scaler.com/courses/data-science-machine-learning-course/",
  scalerAcademy: "https://www.scaler.com/academy/",
  scalerHome: "https://www.scaler.com/",
} as const;

export type LinkKey = keyof typeof LINKS;
