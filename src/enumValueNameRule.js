"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lint = __importStar(require("tslint"));
const lodash_camelcase_1 = __importDefault(require("lodash.camelcase"));
const lodash_upperfirst_1 = __importDefault(require("lodash.upperfirst"));
class EnumValueNameWalker extends Lint.RuleWalker {
    visitEnumMember(node) {
        const actual = node.name.escapedText;
        const expected = lodash_upperfirst_1.default(lodash_camelcase_1.default(actual));
        if (actual !== expected) {
            const failure = this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING(expected, actual));
            this.addFailure(failure);
        }
        super.visitEnumMember(node);
    }
}
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new EnumValueNameWalker(sourceFile, this.getOptions()));
    }
}
Rule.FAILURE_STRING = (expected, actual) => `Incorrect enum value casing. Expected: ${expected}. Actual: ${actual}.`;
exports.Rule = Rule;
