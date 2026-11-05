export const CAREERS_EMAIL = "careers@reflexivity.com";

export type Role = { title: string; team: "Engineering" | "Machine Learning" | "Product"; city: "New York" | "London"; location: string };

/** Open roles as listed on the Framer careers page. */
export const ROLES: Role[] = [
  { title: "Product Manager, Data", team: "Product", city: "New York", location: "New York, New York, United States" },
  { title: "Product Manager, Data", team: "Product", city: "London", location: "London, England, United Kingdom" },
  { title: "Tech Lead Manager", team: "Engineering", city: "New York", location: "New York, New York, United States" },
  { title: "Machine Learning and Quant Engineer", team: "Machine Learning", city: "London", location: "London, England, United Kingdom" },
  { title: "Machine Learning and AI Engineer", team: "Machine Learning", city: "New York", location: "New York, New York, United States" },
  { title: "Machine Learning and AI Engineer", team: "Machine Learning", city: "London", location: "London, England, United Kingdom" },
  { title: "Engineering Manager, Product Engineering", team: "Engineering", city: "New York", location: "New York, New York, United States" },
  { title: "Backend Software Engineer, Golang", team: "Engineering", city: "New York", location: "New York, New York, United States" },
  { title: "Backend Software Engineer, Golang", team: "Engineering", city: "London", location: "London, England, United Kingdom" },
];

export function applyHref(subject: string) {
  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
