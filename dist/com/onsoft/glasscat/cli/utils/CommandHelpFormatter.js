"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
class CommandHelpFormatter {
    constructor() { }
    format(command) {
        let msg = chalk.blue(`\ncommand: ${command.name}`) +
            `\n         ${command.description}`;
        let desc = null;
        let type = null;
        let params = command.parameters;
        if (params) {
            msg += "\n";
            params.forEach((desc, index, array) => {
                type = desc.type;
                msg += chalk.blue(`\n       --${desc.name}`);
                if (type)
                    msg += chalk.green(`\n         type: ${type}`);
                if (desc.required)
                    msg += chalk.green(" - ") + chalk.red("required");
                msg += `\n         ${desc.description}`;
            });
        }
        return msg;
    }
}
exports.CommandHelpFormatter = CommandHelpFormatter;
