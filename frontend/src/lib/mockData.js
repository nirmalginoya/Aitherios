// Core Assets for AITHERIOS platform.
// All business data (products, drops, categories) is now fetched from the backend.

export const HERO_IMG =
  "https://static.prod-images.emergentagent.com/jobs/26a36313-2740-4e70-83dd-9e41e39ac3a9/images/43e52943e50bf42a07a2701952455f614a7d35e5b526a5d537bcee1981fcd07c.png";

export const LOOKBOOK_IMGS = [
  "https://static.prod-images.emergentagent.com/jobs/26a36313-2740-4e70-83dd-9e41e39ac3a9/images/8a8a8b284b03872cf39e957dbcdaa5a0a03a29fccd340766f832ff9592132a01.png",
  "https://images.pexels.com/photos/16376546/pexels-photo-16376546.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.unsplash.com/photo-1722625957003-4f1f1f6942e3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHw0fHxzdHJlZXR3ZWFyJTIwbW9kZWx8ZW58MHx8fHwxNzc4ODM2NjcxfDA&ixlib=rb-4.1.0&q=85",
];

// Fallback values for UI components while backend is being populated
export const CATEGORIES = [
  { slug: "all", name: "All" },
  { slug: "outerwear", name: "Outerwear" },
  { slug: "tops", name: "Tops" },
  { slug: "bottoms", name: "Bottoms" },
  { slug: "accessories", name: "Accessories" },
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const COLORS = [
  { name: "Obsidian", hex: "#0A0A0A" },
  { name: "Blood", hex: "#FF0000" },
  { name: "Bone", hex: "#E5E2DC" },
  { name: "Ash", hex: "#4B4B4B" },
];

// Placeholder reviews
export const REVIEWS = [
  { user: "Kai R.", rating: 5, body: "Heaviest hoodie I own. Worth every penny." },
  { user: "M. Ortega", rating: 5, body: "Fit is exactly as described. Bone color is gorgeous." },
  { user: "Vex", rating: 4, body: "Sizing runs slightly oversized — perfect if that's the vibe." },
];
