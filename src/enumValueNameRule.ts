import * as Lint from 'tslint';
import * as ts from 'typescript';
import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';

class EnumValueNameWalker extends Lint.RuleWalker {
  public visitEnumMember(node: ts.EnumMember) {
    const actual = (<any>node.name).escapedText;
    const expected = upperFirst(camelCase(actual));

    if (actual !== expected) {
      const failure = this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING(expected, actual));

      this.addFailure(failure);
    }

    super.visitEnumMember(node);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = (expected: string, actual: string) =>
    `Incorrect enum value casing. Expected: ${expected}. Actual: ${actual}.`;

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new EnumValueNameWalker(sourceFile, this.getOptions()));
  }
}
