module TypeORM

open System
open Fable.Core
open Fable.Core.JsInterop


/// Shim for Record<string, T>
type Record<'Key, 'Value> = RecordShim

module rec TypeORMShim =
    type EntitySchemaOptions = {
        name: string
        tableName: string option
        database: string option
        schema: string option
        columns: Record<string, string>
    }
        

type TypeORMShim =
    abstract member EntitySchema: unit

[<ImportAll("typeorm")>]
let TypeORM: TypeORMShim = jsNative



let valueOf (key: 'Key) (record: Record<'Key, 'Value>) : 'Value option =
    let hasKey: bool = emitJsExpr (record, key) "$1 in $0"
    if hasKey = true then
        Some(emitJsExpr (record, key) "$0[$1]")
    else
        None

let withKey (key: 'Key) (value: 'Value) (record: Record<'Key, 'Value>) : Record<'Key, 'Value> =
    emitJsExpr (record, key, value) "{ ...$0, [$1]: $2 }"

let createRecord (pairs: List<'Key * 'Value>) : Record<'Key, 'Value> =
    emitJsExpr () "const __out = {}"
    for (key, value) in pairs do
        emitJsExpr (key, value) "__out[$0] = $1"
    
    emitJsExpr () "__out"

    
