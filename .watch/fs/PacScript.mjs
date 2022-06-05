import { Record, Union } from "../.fable/fable-library.3.2.9/Types.js";
import { record_type, option_type, list_type, string_type, union_type } from "../.fable/fable-library.3.2.9/Reflection.js";
import { endsWith } from "../.fable/fable-library.3.2.9/String.js";

export class UpdateStatus extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Major", "Minor", "Patch", "Latest", "Unknown"];
    }
}

export function UpdateStatus$reflection() {
    return union_type("Pacstall.WebServer.Pacscript.UpdateStatus", [], UpdateStatus, () => [[], [], [], [], []]);
}

export class PacScript extends Record {
    constructor(name, prettyName, packageName, repology, updateStatus, description, version, latestVersion, ppa, maintaier, runtimeDependencies, buildDependencies, optionalDependencies, pacstallDependencies, pacstallOptionalDependencies, gives, url, hash, patch, requiredBy, breaks, replaces) {
        super();
        this.name = name;
        this.prettyName = prettyName;
        this.packageName = packageName;
        this.repology = repology;
        this.updateStatus = updateStatus;
        this.description = description;
        this.version = version;
        this.latestVersion = latestVersion;
        this.ppa = ppa;
        this.maintaier = maintaier;
        this.runtimeDependencies = runtimeDependencies;
        this.buildDependencies = buildDependencies;
        this.optionalDependencies = optionalDependencies;
        this.pacstallDependencies = pacstallDependencies;
        this.pacstallOptionalDependencies = pacstallOptionalDependencies;
        this.gives = gives;
        this.url = url;
        this.hash = hash;
        this.patch = patch;
        this.requiredBy = requiredBy;
        this.breaks = breaks;
        this.replaces = replaces;
    }
}

export function PacScript$reflection() {
    return record_type("Pacstall.WebServer.Pacscript.PacScript", [], PacScript, () => [["name", string_type], ["prettyName", string_type], ["packageName", string_type], ["repology", list_type(string_type)], ["updateStatus", UpdateStatus$reflection()], ["description", string_type], ["version", string_type], ["latestVersion", option_type(string_type)], ["ppa", list_type(string_type)], ["maintaier", option_type(string_type)], ["runtimeDependencies", list_type(string_type)], ["buildDependencies", list_type(string_type)], ["optionalDependencies", list_type(string_type)], ["pacstallDependencies", list_type(string_type)], ["pacstallOptionalDependencies", list_type(string_type)], ["gives", string_type], ["url", string_type], ["hash", option_type(string_type)], ["patch", option_type(string_type)], ["requiredBy", list_type(string_type)], ["breaks", list_type(string_type)], ["replaces", list_type(string_type)]]);
}

export class PacScriptKind extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Git", "Deb", "AppImage", "Binary", "GitRelease"];
    }
}

export function PacScriptKind$reflection() {
    return union_type("Pacstall.WebServer.Pacscript.PacScriptKind", [], PacScriptKind, () => [[], [], [], [], []]);
}

export class PacScriptModule_Model extends Record {
    constructor(name, prettyName, packageName, repology, updateStatus, description, version, latestVersion, ppa, maintaier, runtimeDependencies, buildDependencies, optionalDependencies, pacstallDependencies, pacstallOptionalDependencies, gives, url, hash, patch, requiredBy, breaks, replaces) {
        super();
        this.name = name;
        this.prettyName = prettyName;
        this.packageName = packageName;
        this.repology = repology;
        this.updateStatus = updateStatus;
        this.description = description;
        this.version = version;
        this.latestVersion = latestVersion;
        this.ppa = ppa;
        this.maintaier = maintaier;
        this.runtimeDependencies = runtimeDependencies;
        this.buildDependencies = buildDependencies;
        this.optionalDependencies = optionalDependencies;
        this.pacstallDependencies = pacstallDependencies;
        this.pacstallOptionalDependencies = pacstallOptionalDependencies;
        this.gives = gives;
        this.url = url;
        this.hash = hash;
        this.patch = patch;
        this.requiredBy = requiredBy;
        this.breaks = breaks;
        this.replaces = replaces;
    }
}

export function PacScriptModule_Model$reflection() {
    return record_type("Pacstall.WebServer.Pacscript.PacScriptModule.Model", [], PacScriptModule_Model, () => [["name", string_type], ["prettyName", string_type], ["packageName", string_type], ["repology", list_type(string_type)], ["updateStatus", UpdateStatus$reflection()], ["description", string_type], ["version", string_type], ["latestVersion", option_type(string_type)], ["ppa", list_type(string_type)], ["maintaier", option_type(string_type)], ["runtimeDependencies", list_type(string_type)], ["buildDependencies", list_type(string_type)], ["optionalDependencies", list_type(string_type)], ["pacstallDependencies", list_type(string_type)], ["pacstallOptionalDependencies", list_type(string_type)], ["gives", string_type], ["url", string_type], ["hash", option_type(string_type)], ["patch", option_type(string_type)], ["requiredBy", list_type(string_type)], ["breaks", list_type(string_type)], ["replaces", list_type(string_type)]]);
}

export function PacScriptModule_kind(pacscript) {
    if (endsWith(pacscript.name, "-git")) {
        return new PacScriptKind(0);
    }
    else if (endsWith(pacscript.name, "-deb")) {
        return new PacScriptKind(1);
    }
    else if (endsWith(pacscript.name, "-app")) {
        return new PacScriptKind(2);
    }
    else if (endsWith(pacscript.name, "-bin")) {
        return new PacScriptKind(3);
    }
    else {
        return new PacScriptKind(4);
    }
}

