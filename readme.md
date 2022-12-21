# quietconsole
***
A utility tool that removes console.* statements from a project to prevent publishing on production and exposing sensitive information.
***
## Usage
```
quietconsole [options]
```
### Options
```
-h, --help    Show this help message
-v, --view    View all console commands in all files of this project
-r, --remove  Remove the specified console command from all files of this project
-object       View all console commands in all files of this project in an object
```

## Examples
To view all console commands in all files of the project:

```
quietconsole -v
```
### To remove all instances of the console commands from all files of the project:

```
quietconsole -r
```

To view all console commands in all files of the project as an object:

```
quietconsole -object
```

## License
MIT