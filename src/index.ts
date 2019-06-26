import asciiRegex from "./asciiRegex";
import asciiAliases from "../data/asciiAliases";
import aliases from "../data/emoji_aliases";


const asciiAliasesRegex = asciiRegex();

function replaceAsciiAliases(match: string) {
  const trimMatch = match.trim();

  for (const alias in asciiAliases) {
    const data = (asciiAliases as any)[alias];
    if (data.includes(trimMatch)) {
      return match.replace(trimMatch, (aliases as any)[alias]);
    }
  }

  return match; // In case there is a problem with the replacement
}

function replace(text: string) {
  return text.replace(asciiAliasesRegex, replaceAsciiAliases)
}

export default replace;
