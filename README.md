## Features

The extension generates an index file which exports all typescript files in a directory. 

## Usage

In a directory, where you want to generate an index, open a typescript file. Use a 'Generate index with exports' command or use 'Ctrl + Alt + G' shortcut. The index file will be created.

![animation](https://github.com/BoomSoftware/index-generator/blob/master/img/index-generator.gif?raw=true)

## Extension Settings

Using the .prettierrc file in a selected directory, it is possible to set extension's configuration:

* `singleQuote`: true/false - provides a possibility to set type of quotes in the generated index file

If the .prettierrc file does not exist quotes are automatically set as single.
If the line above is not inserted into the .prettierrc file quotes are automatically set as double.

* `semi`: true/false - provides a possibility to set semicolons in the generated index

If the .prettierrc file does not exist semicolons are inserted automatically.
If the line above is not inserted into the .prettierrc file semicolons are not inserted.