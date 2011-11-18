# Whip

A simple, tiny, blazing fast, extendable, node.js based github hook receiver service.

## Installation

```git clone git://github.com/troufster/whip.git```

:)

## Configuration

Edit config.json with credentials, port/path, log path and repository.

The repository url should be in the form https://github.com/[username]/[reponame]

Configure which plugins are to be executed for each repo (exec or execpy)

## Running

Whip requires Node.js,

```node bin/whip.js``` 