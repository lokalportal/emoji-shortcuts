import asciiAliases from "../data/asciiAliases";
import flatten from "lodash.flatten";

function quoteRE(str: string) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}

const x = Object.keys(asciiAliases)

const names = flatten(
  Object.keys(asciiAliases).map(name =>
    asciiAliases[name].map(alias => quoteRE(alias)))
).join("|");

export default function() {
  return new RegExp(
    `(?:\\s|^)(${names})(?=\\s|$)`,
    "g"
  );
}
