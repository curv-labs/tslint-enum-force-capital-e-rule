import * as Lint from 'tslint';
import * as ts from 'typescript';

class EnumNameWalker extends Lint.RuleWalker {
  public visitEnumDeclaration(node: ts.EnumDeclaration) {

    const actual = (<any>node.name).escapedText;

    if (!actual.startsWith('E')) {

      const expected = "E" + actual;

      const failure = this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING(expected, actual));

      this.addFailure(failure);
    }

    super.visitEnumDeclaration(node);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = (expected: string, actual: string) =>
    `Incorrect enum name. Expected: ${expected}. Actual: ${actual}.`;

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new EnumNameWalker(sourceFile, this.getOptions()));
  }
}
