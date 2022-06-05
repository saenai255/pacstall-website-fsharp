module Pacstall.WebServer.Pacscript

type AptPackage = string
type PacScriptRef = string

type UpdateStatus =
    | Major
    | Minor
    | Patch
    | Latest
    | Unknown

type PacScript =
    { name: string
      prettyName: string
      packageName: string
      repology: string list
      updateStatus: UpdateStatus
      description: string
      version: string
      latestVersion: string option
      ppa: string list
      maintaier: string option
      runtimeDependencies: AptPackage list
      buildDependencies: AptPackage list
      optionalDependencies: AptPackage list
      pacstallDependencies: PacScriptRef list
      pacstallOptionalDependencies: PacScriptRef list
      gives: string
      url: string
      hash: string option
      patch: string option
      requiredBy: PacScriptRef list
      breaks: string list
      replaces: string list }

type PacScriptKind =
    | Git
    | Deb
    | AppImage
    | Binary
    | GitRelease

module PacScript =
    type Model =
        { name: string
          prettyName: string
          packageName: string
          repology: string list
          updateStatus: UpdateStatus
          description: string
          version: string
          latestVersion: string option
          ppa: string list
          maintaier: string option
          runtimeDependencies: AptPackage list
          buildDependencies: AptPackage list
          optionalDependencies: AptPackage list
          pacstallDependencies: PacScriptRef list
          pacstallOptionalDependencies: PacScriptRef list
          gives: string
          url: string
          hash: string option
          patch: string option
          requiredBy: PacScriptRef list
          breaks: string list
          replaces: string list }

    let kind (pacscript: PacScript) =
        if pacscript.name.EndsWith "-git" then
            Git
        else if pacscript.name.EndsWith "-deb" then
            Deb
        else if pacscript.name.EndsWith "-app" then
            AppImage
        else if pacscript.name.EndsWith "-bin" then
            Binary
        else
            GitRelease
