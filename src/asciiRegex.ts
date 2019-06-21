import asciiAliases from "../data/asciiAliases";
import flatten from "lodash.flatten";

function quoteRE(str: string) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}

const names = flatten(
  Object.keys(asciiAliases).map(name =>
    (asciiAliases as any)[name].map((alias: any) => quoteRE(alias)))
).join("|");

const edgeCases = ["http", "https"].join("|");

export default function() {
  return new RegExp(
    `(?:\\s|^)(${names})(?=\\s|$)`,
    "g"
  );
}
