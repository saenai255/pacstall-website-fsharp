module Pacstall.WebServer

open Express
open Fable.SimpleJson

let app = express ()
parseBody |> useMiddleware app
let port = 3000

type Greet = { greet: string }
type GreetPathParams = { name: string }

let onApiGreet (req: ExpressRequest) (res: ExpressResponse) =
    req
    |> parsePathParams
    |> Result.map (fun param -> param.name)
    |> Result.map (fun name ->
        req.body
        |> Json.tryParseAs<Greet>
        |> Result.map (fun greet -> { greet = $"Hello, {name}! You said: {greet.greet}" }))
    |> function
        | Error message ->
            HttpStatus.BadRequest.Of message
            |> asResponse
            |> sendJson res
        | Ok result -> HttpStatus.Ok result |> asResponse |> sendJson res





app.get "/api/greet/:name" onApiGreet

app.listen port (fun () -> printfn $"Server started listening on port {port}")
