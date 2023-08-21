import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getIndexNameFromUrl(url: string): string {
  // Extract the domain name from the URL and replace dots with spaces
  const domain = new URL(url).hostname.replace(/\./g, ' ');
  // Capitalize the first letter of each word and remove spaces
  return domain.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}


export function extractMetadataKeys(responseObject: any): string[] {
  // Extract all keys from the root object
  const metadataKeys = Object.keys(responseObject);
  return metadataKeys;
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}