export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export function removeHtmlTags(input: string): string {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}
