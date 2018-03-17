/*!
 * JEC GlassCat CLI Node Module
 * Copyright(c) 2017-2018 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC Projects: <https://github.com/pechemann/JEC>
 */

declare module "jec-glasscat-cli" {

import { Logger } from "jec-commons";

export class CommandManager {    constructor();    private static INSTANCE;    private static _locked;    static getInstance(): CommandManager;    private _logger;    private static readonly LOG_CONTEXT;    execute(command: ScriptCommand, callback?: (err: GlassCatCliError) => void): void;}export abstract class AbstractScriptCommand implements ScriptCommand {    constructor();    protected __logger: Logger;    execute(argv: any, callback: (err: any) => void): void;    setLogger(logger: Logger): void;    getHelp(argv: any): CommandDescriptor;}export class CommandDescriptor {    constructor();    name: string;    description: string;    parameters: ParameterDescriptor[];}export class ParameterDescriptor {    constructor();    name: string;    description: string;    type: string;    required: boolean;}export class GlassCatCliError extends Error {    constructor(message: string, originalStack: string);    private _originalStack;    private initObj(originalStack);    getStack(): string;}export interface ScriptCommand {    execute(argv: any, callback: (err: any) => void): void;    setLogger(logger: Logger): void;    getHelp(argv: any): CommandDescriptor;}export class CommandDescriptorBuilder {    constructor();    build(name: string, description: string, parameters?: ParameterDescriptor[]): CommandDescriptor;}export class CommandHelpFormatter {    constructor();    format(command: CommandDescriptor): string;}export class ParameterDescriptorBuilder {    constructor();    build(name: string, description: string, type: string, required?: boolean): ParameterDescriptor;}}