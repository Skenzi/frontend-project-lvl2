### Hexlet tests and linter status:
[![Actions Status](https://github.com/Skenzi/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Skenzi/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/94069bd9f41759c651b7/maintainability)](https://codeclimate.com/github/Skenzi/frontend-project-lvl2/maintainability)
[![Node CI](https://github.com/Skenzi/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/Skenzi/frontend-project-lvl2/actions)
[![Test Coverage](https://api.codeclimate.com/v1/badges/94069bd9f41759c651b7/test_coverage)](https://codeclimate.com/github/Skenzi/frontend-project-lvl2/test_coverage)

# About this programm
The program compares two configuration files and shows the difference. The result of the work can be displayed in the following formats: stylish (default), plain, json.

## Help
```sh
gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>
Compares two configuration files and show a difference
Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```
## Examples:
### Demo:
![example gif](https://picusha.net/img/2021-02/27/nem6ydkxfbtluzsv5xfjh9qpy.gif)

### Flat files:
[![asciicast](https://asciinema.org/a/392839.svg)](https://asciinema.org/a/392839)
[![asciicast](https://asciinema.org/a/392839.svg)](https://asciinema.org/a/392838)

### Stylish format:
[![asciicast](https://asciinema.org/a/394873.svg)](https://asciinema.org/a/394873)

### Plain format:
[![asciicast](https://asciinema.org/a/394865.svg)](https://asciinema.org/a/394865)

### JSON format:
[![asciicast](https://asciinema.org/a/392839.svg)](https://asciinema.org/a/394866)

## Install
```sh
make install
```
