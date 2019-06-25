'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var flatten = _interopDefault(require('lodash.flatten'));

var asciiAliases = {
    angry: [">:(", ">:-("],
    blush: [':")', ':-")'],
    broken_heart: ["</3", "<\\3"],
    confused: [":/", ":-/"],
    cry: [":'(", ":'-(", ":,(", ":,-("],
    frowning: [":(", ":-("],
    heart: ["<3"],
    imp: ["]:(", "]:-("],
    innocent: ["o:)", "O:)", "o:-)", "O:-)", "0:)", "0:-)"],
    joy: [":')", ":'-)", ":,)", ":,-)", ":'D", ":'-D", ":,D", ":,-D"],
    kissing: [":*", ":-*"],
    laughing: ["x-)", "X-)"],
    neutral_face: [":|", ":-|"],
    open_mouth: [":o", ":-o", ":O", ":-O"],
    rage: [":@", ":-@"],
    smile: [":D", ":-D"],
    smiley: [":)", ":-)"],
    smiling_imp: ["]:)", "]:-)"],
    sob: [":,'(", ":,'-(", ";(", ";-("],
    stuck_out_tongue: [":P", ":-P", ":p", ":-p"],
    sunglasses: ["8-)", "B-)"],
    sweat: [",:(", ",:-("],
    sweat_smile: [",:)", ",:-)"],
    unamused: [":s", ":-S", ":z", ":-Z", ":$", ":-$"],
    wink: [";)", ";-)"]
};

function quoteRE(str) {
    return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
var names = flatten(Object.keys(asciiAliases).map(function (name) {
    return asciiAliases[name].map(function (alias) { return quoteRE(alias); });
})).join("|");
function asciiRegex () {
    return new RegExp("(?:\\s|^)(" + names + ")(?=\\s|$)", "g");
}

var aliases = {
    angry: "😠",
    blush: "😊",
    broken_heart: "💔",
    confused: "😕",
    cry: "😢",
    frowning: "😦",
    heart: "❤️",
    imp: "👿",
    innocent: "😇",
    joy: "😂",
    kissing: "😗",
    laughing: "😆",
    neutral_face: "😐",
    open_mouth: "😮",
    rage: "😡",
    smile: "😄",
    smiley: "😃",
    smiling_imp: "😈",
    sob: "😭",
    stuck_out_tongue: "😛",
    sunglasses: "😎",
    sweat: "😓",
    sweat_smile: "😅",
    unamused: "😒",
    wink: "😉",
};

var asciiAliasesRegex = asciiRegex();
function replaceAsciiAliases(match) {
    var fullMatch = match;
    var trimMatch = fullMatch.trim();
    for (var alias in asciiAliases) {
        var data = asciiAliases[alias];
        if (data.includes(trimMatch)) {
            return fullMatch.replace(trimMatch, aliases[alias]);
        }
    }
    return fullMatch; // In cas there is a problem with the replacement
}
function replace(text) {
    return text.replace(asciiAliasesRegex, replaceAsciiAliases);
}

module.exports = replace;
