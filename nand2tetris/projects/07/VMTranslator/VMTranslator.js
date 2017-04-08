const fs = require('fs');
const translator = require('./translator');

function writeFile(filename, result) {
  function cb(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  }

  fs.writeFile(filename, result, cb);
}

function readFile(filename) {
  function cb(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was readed!");
  }

  return fs.readFileSync(filename, "UTF-8", cb);
}

function parseStringToArray(data) {
  const re = /\s*\n\s*/;
  return data.split(re);
}

function removeUselessElement(vmCommands) {
  // remove empty string
  return vmCommands.filter((command) => {
    if (command.length === 0) {
      return false;
    }

    if (/\/\//.test(command)) {
      return false;
    }

    if (/\/\*/.test(command)) {
      return false;
    }

    return true;
  })
}

function translate() {
  // read file with name args[0]
  const inputFilename = process.argv[2];
  const inputFile = readFile(inputFilename);

  // parse input file
  const vmCommands = removeUselessElement(parseStringToArray(inputFile));

  // translate with diff translators
  vmCommands.forEach((vmCommand) => {
    const action = vmCommand.split(' ')[0];
    switch (action) {
      case "push":
        translator.push(vmCommand);
        break;
      case "pop":
        translator.pop(vmCommand);
        break;
      case "add":
        translator.add(vmCommand);
        break;
      case "sub":
        translator.sub(vmCommand);
        break;
      case "neg":
        translator.neg(vmCommand);
        break;
      case "and":
        translator.and(vmCommand);
        break;
      case "or":
        translator.or(vmCommand);
        break;
      case "not":
        translator.not(vmCommand);
        break;
      case "eq":
        translator.eq(vmCommand);
        break;
      case "lt":
        translator.lt(vmCommand);
        break;
      case "gt":
        translator.gt(vmCommand);
        break;
      default:
        translator.notFound(vmCommand);
    }
  });

  result = String.prototype.concat.call(
    translator.content,
    translator.conditionBlock
  );

  // get outputFileName
  const outputFilename = `${inputFilename.split('.')[0]}.asm`;

  // write to outputFile
  writeFile(outputFilename, result);
}

translate();
