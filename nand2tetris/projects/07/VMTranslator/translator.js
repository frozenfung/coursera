class Translator {
  constructor() {
    this.constant = 0;
    this.content = '';
    this.conditionBlock = '(END)\n@END\n0;JMP\n';
  }

  _getTransferKey(condition) {
    return `${condition}${this.constant}`
  }

  _getBackKey() {
    return `BACK${this.constant}`
  }

  _addToContent(assembly) {
    this.content = this.content.concat(assembly);
  }

  _addToConditionBlock(assembly) {
    this.conditionBlock = this.conditionBlock.concat(assembly);
  }

  _getLastestTwoElementsFromStack() {
    this.content = this.content.concat(
      `@0\nD=M-1\nM=M-1\nA=D\nD=M\n@13\nM=D\n@0\nMD=M-1\nA=D\nD=M\n@13\n`
    );
  }

  _saveToSPAndMoveForward() {
    this.content = this.content.concat(
     `@0\nA=M\nM=D\n@0\nM=M+1\n`
    );
  }

  _incrementConstant() {
    this.constant += 1;
  }

  _compare(condition, jumpCondition) {
    const tKey = this._getTransferKey(condition);
    const bKey = this._getBackKey();

    this._getLastestTwoElementsFromStack();
    this._addToContent(`D=D-M\n@${tKey}\nD;${jumpCondition}\n@N${tKey}\n0;JMP\n(${bKey})\n`);
    this._addToConditionBlock(`(N${tKey})\n@0\nA=M\nM=0\n@0\nM=M+1\n@${bKey}\n0;JMP\n(${tKey})\n@0\nA=M\nM=-1\n@0\nM=M+1\n@${bKey}\n0;JMP\n`);

    this._incrementConstant();
  }

  notFound(command) {
    this._addToContent(`${command} -> not found!\n`);
  }

  push(command) {
    const constant = command.match(/\d+/)[0];

    this._addToContent(
      `@${constant}\nD=A\n@0\nA=M\nM=D\n@0\nM=M+1\n`
    );
  }

  add(command) {
    this._getLastestTwoElementsFromStack();
    this._addToContent('D=D+M\n');
    this._saveToSPAndMoveForward()
  }

  sub(command) {
    this._getLastestTwoElementsFromStack();
    this._addToContent('D=D-M\n');
    this._saveToSPAndMoveForward();
  }

  neg(command) {
    this._addToContent(
      '@0\nD=M-1\nM=D\n@0\nA=M\nD=-M\n'
    );
    this._saveToSPAndMoveForward();
  }

  and(command) {
    this._getLastestTwoElementsFromStack();
    this._addToContent('D=D&M\n');
    this._saveToSPAndMoveForward();
  }

  or(command) {
    this._getLastestTwoElementsFromStack();
    this._addToContent('D=D|M\n');
    this._saveToSPAndMoveForward();
  }

  not(command) {
    this._addToContent(
      '@0\nD=M-1\nM=D\n@0\nA=M\nD=!M\n'
    );
    this._saveToSPAndMoveForward();
  }

  eq(command) {
    this._compare('EQ', 'JEQ');
  }

  lt(command) {
    this._compare('LT', 'JLT');
  }

  gt(command) {
    this._compare('GT', 'JGT');
  }
}

const translator = new Translator();

module.exports = translator;
