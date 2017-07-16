"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const jec_glasscat_core_1 = require("jec-glasscat-core");
const minimist = require("minimist");
const CommandHelpFormatter_1 = require("./utils/CommandHelpFormatter");
class CommandManager {
    constructor() {
        this._logger = null;
        if (CommandManager._locked || CommandManager.INSTANCE) {
            new jec_commons_1.SingletonError(CommandManager);
        }
        else {
            CommandManager._locked = true;
            let manager = jec_glasscat_core_1.LoggerManager.getInstance();
            this._logger = manager.isInitialized() ? manager : new jec_commons_1.ConsoleLogger();
        }
    }
    static getInstance() {
        if (CommandManager.INSTANCE === null) {
            CommandManager._locked = false;
            CommandManager.INSTANCE = new CommandManager();
        }
        return CommandManager.INSTANCE;
    }
    execute(command, callback) {
        let formater = null;
        let commandDescriptor = null;
        let argv = process.argv.splice(2);
        let name = command.constructor.name;
        let msg = "running command: name='" +
            name + "', arguments='" + argv + "'";
        let args = minimist(argv);
        let help = args.help || args.h || null;
        this._logger.info(msg, CommandManager.LOG_CONTEXT);
        command.setLogger(this._logger);
        if (help) {
            msg = "running command help: '" + help + "'";
            this._logger.info(msg, CommandManager.LOG_CONTEXT);
            commandDescriptor = command.getHelp(help);
            if (commandDescriptor) {
                formater = new CommandHelpFormatter_1.CommandHelpFormatter();
                console.log(formater.format(commandDescriptor));
            }
            else {
                console.log("No help information is available for this command.");
            }
            if (callback) {
                msg = "callback is not allowed for help commands";
                this._logger.warn(msg, CommandManager.LOG_CONTEXT);
            }
        }
        else {
            command.execute(args, (err) => {
                if (err) {
                    msg = "command error: name='" + name + "', error='" + err + "'";
                    this._logger.error(msg, CommandManager.LOG_CONTEXT);
                    if (callback)
                        callback(err);
                }
                else {
                    msg = "command success: name='" + name + "'";
                    this._logger.info(msg, CommandManager.LOG_CONTEXT);
                    if (callback)
                        callback(null);
                }
            });
        }
    }
}
CommandManager.INSTANCE = null;
CommandManager._locked = true;
CommandManager.LOG_CONTEXT = "[GLASSCAT COMMAND MANAGER]";
exports.CommandManager = CommandManager;
;
