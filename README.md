## Features

The extension generates an index file which exports all typescript files in a directory. 

## Usage

In a directory when you want to generate an index, open a typescript file. Use a 'Generate index with exports' command or use shortcut 'Ctrl + Alt + G'. The index file will be create in a following form:


![animation](https://github.com/BoomSoftware/index-generator/blob/master/img/index-generator.gif)

## Extension Settings

Using the .prettierrc file in a directory it is possible to set a quotes type in generated index. 

* `singleQuote`: true/false set a qutes type

If the .prettierrc file does not exist quotes are automatically set as single.
If the line above is not inserted into .prettierrc file quotes are automatically set as double.
