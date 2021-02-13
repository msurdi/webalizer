# Webalizer

## Intro

Webalizer is a web interface for running local programs and scripts remotely.

It is implemented as a command line application that reads command definition
configurations and exposes those commands with a simple, easy to use UI. I use
it for running tasks and scripts in my home server.

Despite it has authentication and I do my best to make it as secure as possible,
it is intended to be used in a trusted environment, such as your home network
and not directly exposed to the internet. Be careful. This is just a side
project.

Here is a screenshot:

![Screenshot](/docs/screenshot.png?raw=true)

## Installation

Ensure you have a recent version of node and npm, then:

```sh
npm i -g webalizer
```

## Configuration

By default, webalizer will look for command definition files at
`~/.webalizer/*.json`, here is an example configuration file which you can
create for example at `~/.webalizer/start_vm.json`:

```json
{
  "command": "VBoxManage startvm Windows --type headless",
  "name": "Start windows VM",
  "description": "Starts the windows VM",
  "button": "Start",
  "shell": "true",
  "confirm": "Are you sure you want to start this VM?",
  "timeout": 5000
}
```

The following configuration options are available:

**command**: Required. Actual program or shell script to run. Note that if your
command depends on any shell feature, you will need to set also `shell: true`
for it to work correctly.

**name**: Required. Name of this script to be shown in the UI

**description**: Optional. An explanatory description of what this command does.

**button**: Optional, defaults to "Run". Label the button for running this
command will have in the UI

**shell**: Optional, defaults to `false`. If set to true, the `command` will be
run inside a shell. *warning* This might be more insecure than running just a
program. Use with caution.

**confirm**: Optional, defaults to `false`. If set to `true`, it will prompt for
confirmation with a default message when the user clicks the button to run the
command. If set to a non empty message, it will show this message to the user
instead of the default one

**timeout**: Optional, defaults to 1 minute. Maximum time for the script to run.
After this time is reached, the script will be killed.

## Running

```sh
ADDRESS=0.0.0.0 PORT=8088 USERNAME=someuser PASSWORD=somepass NEXTAUTH_URL=http://yourPublicServerAddressOrIP:8088 webalizer
```

The following environment variables are available:

**ADDRESS**: Optional, defaults to 127.0.0.1. IP address where the web
application will listen for connections

**PORT**: Optional, defaults to 3000. Port where the web application will listen
for connections

**USERNAME**: Optional. if this and the PASSWORD options are set to non empty
values, the application will ask for logging in.

**PASSWORD**: Optional. if this and the USERNAME options are set to non empty
values, the application will ask for logging in.

**NEXTATUH_URL**: Optional, only required if USERNAME and PASSWORD are set.
Public URL you will use to reach your application.

**SCRIPTS_ROOT**: Optional, defaults to `~/.webalizer`. Directory where to look
for command definition files.

## Development

Clone this repository, and then:

```sh
npm install
npm run dev
```

You can optionally customize development time env vars by doing `cp app/.env.example app/.env` and customizing the values in `app/.env`

There are not many tests yet, as most of the testing is being done manually as I'm the only user and I use it on a daily basis.

To run tests:

 ```sh
npm test
 ```
