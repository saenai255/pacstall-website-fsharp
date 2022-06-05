import express from "express";
import parse_body from "../../src/js/parse-body.mjs";
import { Record } from "../.fable/fable-library.3.2.9/Types.js";
import { union_type, anonRecord_type, record_type, string_type } from "../.fable/fable-library.3.2.9/Reflection.js";
import { FSharpResult$2, Result_Map } from "../.fable/fable-library.3.2.9/Choice.js";
import { toConsole, interpolate, toText } from "../.fable/fable-library.3.2.9/String.js";
import { SimpleJson_tryParse } from "../.fable/Fable.SimpleJson.3.23.0/SimpleJson.mjs";
import { createTypeInfo } from "../.fable/Fable.SimpleJson.3.23.0/TypeInfo.Converter.mjs";
import { Convert_serialize, Convert_fromJson } from "../.fable/Fable.SimpleJson.3.23.0/Json.Converter.mjs";
import { HttpStatus_BadRequest, StandardHttpResponse, HttpStatus_HttpResponse$1, sendJson } from "../shim/Express.mjs";
import { map } from "../.fable/fable-library.3.2.9/Option.js";

export const app = express();

app.use(parse_body);

export const port = 3000;

export class Greet extends Record {
    constructor(greet) {
        super();
        this.greet = greet;
    }
}

export function Greet$reflection() {
    return record_type("Pacstall.WebServer.Greet", [], Greet, () => [["greet", string_type]]);
}

export class GreetPathParams extends Record {
    constructor(name) {
        super();
        this.name = name;
    }
}

export function GreetPathParams$reflection() {
    return record_type("Pacstall.WebServer.GreetPathParams", [], GreetPathParams, () => [["name", string_type]]);
}

export function onApiGreet(req, res) {
    let arg00_1, input_7, asError_1, tupledArg_1, result_10, typeInfo_7, result_11, result_12, result_13, result_9, typeInfo_6, status_1, body_1, input_5, asError, tupledArg, result_4, typeInfo_4, result_5, result_6, result_7, result_3, typeInfo_3, status, body;
    const _arg1 = Result_Map((name) => Result_Map((greet) => (new Greet(toText(interpolate("Hello, %P()! You said: %P()", [name, greet.greet])))), (() => {
        let matchValue_1, inputJson_1, typeInfo_1;
        try {
            return new FSharpResult$2(0, (matchValue_1 = SimpleJson_tryParse(req.body), (matchValue_1 != null) ? ((inputJson_1 = matchValue_1, (typeInfo_1 = createTypeInfo(Greet$reflection()), Convert_fromJson(inputJson_1, typeInfo_1)))) : (() => {
                throw (new Error("Couldn\u0027t parse the input JSON string because it seems to be invalid"));
            })()));
        }
        catch (ex_1) {
            return new FSharpResult$2(1, ex_1.message);
        }
    })()), Result_Map((param) => param.name, (arg00_1 = JSON.stringify(req.params), (() => {
        let matchValue, inputJson, typeInfo;
        try {
            return new FSharpResult$2(0, (matchValue = SimpleJson_tryParse(arg00_1), (matchValue != null) ? ((inputJson = matchValue, (typeInfo = createTypeInfo(GreetPathParams$reflection()), Convert_fromJson(inputJson, typeInfo)))) : (() => {
                throw (new Error("Couldn\u0027t parse the input JSON string because it seems to be invalid"));
            })()));
        }
        catch (ex) {
            return new FSharpResult$2(1, ex.message);
        }
    })())));
    if (_arg1.tag === 0) {
        const result_8 = _arg1.fields[0];
        sendJson(res, (input_7 = (new HttpStatus_HttpResponse$1(0, result_8)), (asError_1 = ((message_2) => {
            const value_3 = {
                error: message_2,
            };
            const typeInfo_5 = createTypeInfo(anonRecord_type(["error", string_type]));
            return Convert_serialize(value_3, typeInfo_5);
        }), (tupledArg_1 = ((input_7.tag === 1) ? ((result_10 = input_7.fields[0], [201, (typeInfo_7 = createTypeInfo(union_type("Microsoft.FSharp.Core.FSharpResult`2", [Greet$reflection(), string_type], FSharpResult$2, () => [[["ResultValue", Greet$reflection()]], [["ErrorValue", string_type]]])), Convert_serialize(result_10, typeInfo_7))])) : ((input_7.tag === 2) ? ((result_11 = input_7.fields[0], [404, map(asError_1, result_11)])) : ((input_7.tag === 3) ? ((result_12 = input_7.fields[0], [400, map(asError_1, result_12)])) : ((input_7.tag === 4) ? ((result_13 = input_7.fields[0], [500, map(asError_1, result_13)])) : ((result_9 = input_7.fields[0], [200, (typeInfo_6 = createTypeInfo(union_type("Microsoft.FSharp.Core.FSharpResult`2", [Greet$reflection(), string_type], FSharpResult$2, () => [[["ResultValue", Greet$reflection()]], [["ErrorValue", string_type]]])), Convert_serialize(result_9, typeInfo_6))])))))), (status_1 = (tupledArg_1[0] | 0), (body_1 = tupledArg_1[1], new StandardHttpResponse(status_1, body_1)))))));
    }
    else {
        const message = _arg1.fields[0];
        sendJson(res, (input_5 = HttpStatus_BadRequest.Of(message), (asError = ((message_1) => {
            const value = {
                error: message_1,
            };
            const typeInfo_2 = createTypeInfo(anonRecord_type(["error", string_type]));
            return Convert_serialize(value, typeInfo_2);
        }), (tupledArg = ((input_5.tag === 1) ? ((result_4 = input_5.fields[0], [201, (typeInfo_4 = createTypeInfo(string_type), Convert_serialize(result_4, typeInfo_4))])) : ((input_5.tag === 2) ? ((result_5 = input_5.fields[0], [404, map(asError, result_5)])) : ((input_5.tag === 3) ? ((result_6 = input_5.fields[0], [400, map(asError, result_6)])) : ((input_5.tag === 4) ? ((result_7 = input_5.fields[0], [500, map(asError, result_7)])) : ((result_3 = input_5.fields[0], [200, (typeInfo_3 = createTypeInfo(string_type), Convert_serialize(result_3, typeInfo_3))])))))), (status = (tupledArg[0] | 0), (body = tupledArg[1], new StandardHttpResponse(status, body)))))));
    }
}

app.get("/api/greet/:name", (req, res) => {
    onApiGreet(req, res);
});

app.listen(port, () => {
    toConsole(interpolate("Server started listening on port %P()", [port]));
});

