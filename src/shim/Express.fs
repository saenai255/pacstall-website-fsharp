module Express

open Fable.Core
open Fable.SimpleJson

type ListenFunction = int -> (unit -> unit) -> unit
type ExpressRequest = { body: string; ``params``: obj }

type ExpressResponse =
    { header: string * string -> ExpressResponse
      status: int -> ExpressResponse
      send: string option -> unit }

type PathMatcher = string

type Middleware = ExpressRequest -> ExpressResponse -> unit

type Application =
    { get: PathMatcher -> Middleware -> Unit
      post: PathMatcher -> Middleware -> Unit
      put: PathMatcher -> Middleware -> Unit
      delete: PathMatcher -> Middleware -> Unit
      options: PathMatcher -> Middleware -> Unit
      listen: ListenFunction }

[<ImportDefault("express")>]
let express: Unit -> Application = jsNative

module HttpStatus =
    type HttpResponse<'a> =
        | Ok of 'a
        | Created of 'a
        | NotFound of string option
        | BadRequest of string option
        | InternalServerError of string option

    type Status =
        { Of: string -> HttpResponse<string>
          Empty: HttpResponse<string> }

    let BadRequest =
        { Of = fun message -> BadRequest(Some message)
          Empty = BadRequest(None) }

    let NotFound =
        { Of = fun message -> NotFound(Some message)
          Empty = NotFound(None) }

    let InternalServerError =
        { Of = fun message -> InternalServerError(Some message)
          Empty = InternalServerError(None) }


type StandardHttpResponse = { status: int; body: string option }

let inline asResponse (input: HttpStatus.HttpResponse<'a>) =
    let asError (message: string) = Json.serialize {| error = message |}


    match input with
    | HttpStatus.Ok result -> (200, Json.serialize result |> Some)
    | HttpStatus.Created result -> (201, Json.serialize result |> Some)
    | HttpStatus.NotFound result -> (404, result |> Option.map asError)
    | HttpStatus.BadRequest result -> (400, result |> Option.map asError)
    | HttpStatus.InternalServerError result -> (500, result |> Option.map asError)
    |> fun (status, body) -> { status = status; body = body }


let sendJson (res: ExpressResponse) (data: StandardHttpResponse) =
    res
        .header("Content-Type", "application/json")
        .status(data.status)
        .send (data.body)

let inline parsePathParams (req: ExpressRequest) =
    req.``params``
    |> JS.JSON.stringify
    |> Json.tryParseAs<'a>


[<ImportDefault("../js/parse-body.mjs")>]
let parseBody: obj = jsNative

[<Emit("$0.use($1)")>]
let useMiddleware (_app: Application) (_middleware: obj) = jsNative
