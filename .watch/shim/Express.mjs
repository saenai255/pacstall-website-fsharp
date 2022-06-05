import { Union, Record } from "../.fable/fable-library.3.2.9/Types.js";
import { union_type, unit_type, option_type, int32_type, lambda_type, tuple_type, record_type, obj_type, string_type } from "../.fable/fable-library.3.2.9/Reflection.js";

export class ExpressRequest extends Record {
    constructor(body, params) {
        super();
        this.body = body;
        this.params = params;
    }
}

export function ExpressRequest$reflection() {
    return record_type("Express.ExpressRequest", [], ExpressRequest, () => [["body", string_type], ["params", obj_type]]);
}

export class ExpressResponse extends Record {
    constructor(header, status, send) {
        super();
        this.header = header;
        this.status = status;
        this.send = send;
    }
}

export function ExpressResponse$reflection() {
    return record_type("Express.ExpressResponse", [], ExpressResponse, () => [["header", lambda_type(tuple_type(string_type, string_type), ExpressResponse$reflection())], ["status", lambda_type(int32_type, ExpressResponse$reflection())], ["send", lambda_type(option_type(string_type), unit_type)]]);
}

export class Application extends Record {
    constructor(get$, post, put, delete$, options, listen) {
        super();
        this.get = get$;
        this.post = post;
        this.put = put;
        this.delete = delete$;
        this.options = options;
        this.listen = listen;
    }
}

export function Application$reflection() {
    return record_type("Express.Application", [], Application, () => [["get", lambda_type(string_type, lambda_type(lambda_type(ExpressRequest$reflection(), lambda_type(ExpressResponse$reflection(), unit_type)), unit_type))], ["post", lambda_type(string_type, lambda_type(lambda_type(ExpressRequest$reflection(), lambda_type(ExpressResponse$reflection(), unit_type)), unit_type))], ["put", lambda_type(string_type, lambda_type(lambda_type(ExpressRequest$reflection(), lambda_type(ExpressResponse$reflection(), unit_type)), unit_type))], ["delete", lambda_type(string_type, lambda_type(lambda_type(ExpressRequest$reflection(), lambda_type(ExpressResponse$reflection(), unit_type)), unit_type))], ["options", lambda_type(string_type, lambda_type(lambda_type(ExpressRequest$reflection(), lambda_type(ExpressResponse$reflection(), unit_type)), unit_type))], ["listen", lambda_type(int32_type, lambda_type(lambda_type(unit_type, unit_type), unit_type))]]);
}

export class HttpStatus_HttpResponse$1 extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Ok", "Created", "NotFound", "BadRequest", "InternalServerError"];
    }
}

export function HttpStatus_HttpResponse$1$reflection(gen0) {
    return union_type("Express.HttpStatus.HttpResponse`1", [gen0], HttpStatus_HttpResponse$1, () => [[["Item", gen0]], [["Item", gen0]], [["Item", option_type(string_type)]], [["Item", option_type(string_type)]], [["Item", option_type(string_type)]]]);
}

export class HttpStatus_Status extends Record {
    constructor(Of, Empty) {
        super();
        this.Of = Of;
        this.Empty = Empty;
    }
}

export function HttpStatus_Status$reflection() {
    return record_type("Express.HttpStatus.Status", [], HttpStatus_Status, () => [["Of", lambda_type(string_type, HttpStatus_HttpResponse$1$reflection(string_type))], ["Empty", HttpStatus_HttpResponse$1$reflection(string_type)]]);
}

export const HttpStatus_BadRequest = new HttpStatus_Status((message) => (new HttpStatus_HttpResponse$1(3, message)), new HttpStatus_HttpResponse$1(3, void 0));

export const HttpStatus_NotFound = new HttpStatus_Status((message) => (new HttpStatus_HttpResponse$1(2, message)), new HttpStatus_HttpResponse$1(2, void 0));

export const HttpStatus_InternalServerError = new HttpStatus_Status((message) => (new HttpStatus_HttpResponse$1(4, message)), new HttpStatus_HttpResponse$1(4, void 0));

export class StandardHttpResponse extends Record {
    constructor(status, body) {
        super();
        this.status = (status | 0);
        this.body = body;
    }
}

export function StandardHttpResponse$reflection() {
    return record_type("Express.StandardHttpResponse", [], StandardHttpResponse, () => [["status", int32_type], ["body", option_type(string_type)]]);
}

export function sendJson(res, data) {
    res.header(["Content-Type", "application/json"]).status(data.status).send(data.body);
}

