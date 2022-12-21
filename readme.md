
# shut-console

***
A utility tool that removes console.* statements from a project to prevent publishing on production and exposing sensitive information.
***


## Installation

Install shut-console with npm

```zsh
  npm install -g shut-console
```
    

## Usage
```
shut-console [options]
```
### Options
```
-h, --help    Show this help message
-v, --view    View all console commands in all files of this project
-r, --remove  Remove the specified console command from all files of this project
-object       View all console commands in all files of this project in an object
```
## Examples
### To view all console commands in all files of the project:

```
shut-console -v
```
### To remove all instances of the console commands from all files of the project:

```
shut-console -r
```

### To view all console commands in all files of the project as an object:

```
shut-console -object
```

[![npm version](https://badge.fury.io/js/shut-console.svg)](https://badge.fury.io/js/shut-console)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## Feedback

If you have any feedback, please reach out to me at hi@ishaanbedi.in

## License

[MIT](https://choosealicense.com/licenses/mit/)


## Related

Here are some related projects

- [swiflicense](https://www.github.com/ishaanbedi/swiflicense)
- [swiftup](https://www.github.com/ishaanbedi/swiftup)






