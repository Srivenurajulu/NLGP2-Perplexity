export function claimTypeColor(type: string): string {
  switch (type) {
    case "factual":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "inferential":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "normative":
      return "bg-violet-100 text-violet-800 border-violet-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export function claimTypeLabel(type: string): string {
  switch (type) {
    case "factual":
      return "Factual";
    case "inferential":
      return "Inferential";
    case "normative":
      return "Normative";
    default:
      return type;
  }
}
