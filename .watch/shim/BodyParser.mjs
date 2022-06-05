import { Record } from "../.fable/fable-library.3.2.9/Types.js";
import { record_type, lambda_type, obj_type, unit_type } from "../.fable/fable-library.3.2.9/Reflection.js";

export class BodyParser extends Record {
    constructor(json, raw) {
        super();
        this.json = json;
        this.raw = raw;
    }
}

export function BodyParser$reflection() {
    return record_type("BodyParser.BodyParser", [], BodyParser, () => [["json", lambda_type(unit_type, obj_type)], ["raw", lambda_type(unit_type, obj_type)]]);
}

