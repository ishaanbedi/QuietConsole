#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
async function getConsoleCommands(dir, remove = false) {
  const commands = [];
  const files = await fs.promises.readdir(dir);
  for (const file of files) {
    if (file.includes("node_modules")) {
      continue;
    }
    const filePath = path.join(dir, file);
    if (
      file.endsWith(".js") ||
      file.endsWith(".ts") ||
      file.endsWith(".jsx") ||
      file.endsWith(".tsx")
    ) {
      let contents = await fs.promises.readFile(filePath, "utf8");
      const lines = contents.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const matches = line.match(/console\.\w+\(.*\)?;?/g);
        if (matches) {
          commands.push(
            ...matches.map((command) => ({
              command,
              file,
              filePath,
              line: i + 1,
            }))
          );
        }
      }
      if (remove) {
        contents = contents.replace(
          new RegExp(/console\.\w+\(.*\)?;?/g, "g"),
          ""
        );
        await fs.promises.writeFile(filePath, contents, "utf8");
      }
    } else {
      const stat = await fs.promises.stat(filePath);
      if (stat.isDirectory()) {
        commands.push(...(await getConsoleCommands(filePath, remove)));
      }
    }
  }
  return commands;
}
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  args[i] = args[i].toLowerCase();
}
if (args.length === 0) {
  console.log("\nPlease specify a command.");
  console.log("Use --help to see all available commands.\n");
  console.log(
    `If you think something is broken, please open an issue on GitHub:\n\u001b[4mhttps://www.github.com/ishaanbedi/quietconsole/issues\u001b[0m\n`
  );
  process.exit(1);
}
if (args.includes("-h") || args.includes("--help")) {
  console.log(`
  \u001b[1mUsage: quietconsole [options]\u001b[0m

  \u001b[1mOptions:\u001b[0m
    
  \u001b[32m-h\u001b[0m, \u001b[32m--help\u001b[0m\tShow this help message
  \u001b[32m-v\u001b[0m, \u001b[32m--view\u001b[0m\tView all console commands in all files of this project
  \u001b[32m-r\u001b[0m, \u001b[32m--remove\u001b[0m\tRemove the specified console command from all files of this project
  \u001b[32m-object\u001b[0m\tView all console commands in all files of this project in an object
  `);
  process.exit(0);
}
if (args.includes("-v") || args.includes("--view")) {
  var localExecutor = async () => {
    const commands = await getConsoleCommands(".", (remove = false));
    if (commands.length === 0) {
      console.log("\nNo console commands found in the current project.\n");
      process.exit(0);
    }
    for (const command of commands) {
      console.log(
        `\n-> \u001b[1m${command.command}\u001b[0m in \u001b[2m/\u001b[32m${command.filePath}\u001b[0m on line ${command.line}.`
      );
    }
  };
  localExecutor();
}
if (args.includes("-object") || args.includes("--object")) {
  var localExecutor = async () => {
    const commands = await getConsoleCommands(".", (remove = false));
    if (commands.length === 0) {
      console.log("\nNo console commands found in the current project.\n");
      process.exit(0);
    }
    console.log(commands);
  };
  localExecutor();
}
if (args.includes("-r") || args.includes("--remove")) {
  var localExecutor = async () => {
    const commands = await getConsoleCommands(".", (remove = true));
    for (const command of commands) {
      console.log(
        `-> \u001b[31mRemoved\u001b[0m ${command.command} in /${command.filePath} from line ${command.line}.`
      );
    }
  };
  localExecutor();
}
