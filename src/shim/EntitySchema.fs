// ts2fable 0.7.1
module rec EntitySchema
open System
open Fable.Core
open Fable.Core.JS

type Symbol = obj

type EntitySchemaOptions = __EntitySchemaOptions.EntitySchemaOptions

type [<AllowNullLiteral>] IExports =
    abstract EntitySchema: EntitySchemaStatic

type EntitySchema =
    EntitySchema<obj>

/// Interface for entity metadata mappings stored inside "schemas" instead of models decorated by decorators.
type [<AllowNullLiteral>] EntitySchema<'T> =
    abstract options: EntitySchemaOptions<'T> with get, set
    abstract ``@instanceof``: Symbol

/// Interface for entity metadata mappings stored inside "schemas" instead of models decorated by decorators.
type [<AllowNullLiteral>] EntitySchemaStatic =
    [<Emit "new $0($1...)">] abstract Create: options: EntitySchemaOptions<'T> -> EntitySchema<'T>
