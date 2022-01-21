const DELIMITER = ": ";

export function cleanUpString(input: string): string {
  const indexOfDelimiter = input.indexOf(DELIMITER);
  return input.slice(indexOfDelimiter + DELIMITER.length);
}
