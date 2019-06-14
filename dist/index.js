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
var edgeCases = ["http", "https"].join("|");
function asciiRegex () {
    return new RegExp("(" + edgeCases + ")?(" + names + ")((?!(" + edgeCases + "))[a-z0-9_\\-\\+]+:)?", "g");
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
function replaceAsciiAliases() {
    var match = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        match[_i] = arguments[_i];
    }
    var asciiAliasKeys = Object.keys(asciiAliases);
    for (var i in asciiAliasKeys) {
        var alias = asciiAliasKeys[i];
        var data = asciiAliases[alias];
        var aliasFound = match[2];
        if (data.includes(aliasFound)) {
            var isEdgeCase = match[1];
            var fullMatchContent = match[0].slice(1, -1); // remove ":" at the beginning and end
            var validAsciiAlias = !aliases[fullMatchContent]; // ":" + fullMatchContent + ":" alias doesn't exist
            if (!isEdgeCase && validAsciiAlias) {
                return aliases[alias];
            }
            // return the original word to replace its value in aliasesRegex
            return match[0];
        }
    }
}
function replace(text) {
    return text.replace(asciiAliasesRegex, replaceAsciiAliases);
}

module.exports = replace;
