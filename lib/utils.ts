import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export function addDollarSigns(str: string) {
  // Check if the string already contains a $ sign (except in range-like scenarios)
  if (str.includes('$') && !str.match(/\d+\s*-\s*\d+/)) {
    return str;
  }
  
  // Replace numbers with dollar signs, preserving ranges and handling K/M suffixes
  return str.replace(/\b(\d+(?:,\d{3})*(?:K|M)?)\b/g, '$$$1');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addPeriodsBetweenChars(str: string) {
  return str.split("").join(".");
}

export function capitalizeFirstLetters(str: string) {
  return str
    .split(" ")
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

export function padWithZeros(str: string): string {
  return str.padStart(8, '0');
}

export function truncateString(str: string, num: number) {
  if (str){
    if (str.length <= 0) {
      return str;
    }
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  } else {
    return ""
  }
}

export function capitaliseString(str: string) {
  if (str.length <= 0) {
    return str;
  }
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function formatReport(text: string) {
  // Define the keywords to identify sections
  const sections = [
    "Summary of Findings",
    "Lessons Learned",
    "Recommendations",
  ];

  // Initialize an empty string to hold the formatted result
  let formattedText = "";

  // Loop through each section to find and format its content
  sections.forEach((section) => {
    // Create a regular expression to match the section and its contents
    let sectionRegex = new RegExp(
      `${section}:(.*?)(?=(Summary of Findings|Lessons Learned|Recommendations|$))`,
      "gs",
    );
    let match = sectionRegex.exec(text);

    // If the section is found, process its content
    if (match) {
      // Add the section heading
      formattedText += `<h2>${section}</h2>`;

      // Extract the content of the section
      let content = match[1].trim();

      // Split the content by numbers and format as list items
      let points = content.split(/\d+\.\s+/).filter(Boolean);
      formattedText += "<ul>";
      points.forEach((point) => {
        formattedText += `<li>${point.trim()}</li>`;
      });
      formattedText += "</ul>";
    }
  });

  return formattedText;
}
