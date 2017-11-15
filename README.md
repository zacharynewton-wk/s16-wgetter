# Electron Playground
Using electron to build an app using web components.

## Setup
To help develop this application or use its code, use the following commands. Pretty standard stuff, but always good to write it down somewhere.

### Install
To install node dependencies:
```shell
npm install
```

At the time of the last update to this README, I am using web-skin via git, so to pull that in, run this script:
```shell
./git-deps.sh
```
That will hopefully be removed in the future.

### Run
```shell
npm start
```

### Build
```shell
npm run build
```

## Scripts
There are some scripts here that are useful for developing.

### new_component.sh
The following example will create a component boiler plate for a component named ComponentName in the directory `lib/src/components/ComponentName`.
```shell
./new_component.sh ComponentName
```
It also adds a link to that component in `lib/src/components/components.html`.

### remove_component.sh
The following example will remove component, ComponentName, and also remove its corresponding link in `lib/src/components/components.html`.
```shell
./remove_component.sh ComponentName
```