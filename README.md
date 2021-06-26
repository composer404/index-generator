## Features

The extension generates an index file with exports and imports in case of stylesheet files. The elements and text format that will appear in the index depend on the selected command and selected configuration in <strong>.prettierrc</strong> file.

![animation](https://github.com/BoomSoftware/index-generator/blob/master/img/index-generator.gif?raw=true)

## Usage

<h3><strong>Generate index file</strong></h3>
<p>In a directory, where you want to generate an index, open a file. Use a 'Generate/Update index with files' command or use <span style="background-color:grey; padding: 1px 5px; border-radius:5px">Ctrl + Alt + G</span> shortcut. The index file will be created.
</p>

<h3><strong>Generate index with folders and files</strong></h3>
<p>In a directory, where you want to generate an index, open a file. Use a 'Generate/Update index with folders and files' command or use <span style="background-color:grey; padding: 1px 5px; border-radius:5px">Ctrl + Alt + F</span> shortcut. The index file will be created.
</p>

## Extension Settings

Using the <strong>.prettierrc</strong> file in a selected directory, it is possible to set extension's configuration:

* `singleQuote`: true/false - provides a possibility to set type of quotes in the generated index file

If the .prettierrc file does not exist quotes are automatically set as single.
If the line above is not inserted into the .prettierrc file quotes are automatically set as double.

* `semi`: true/false - provides a possibility to set semicolons in the generated index

If the .prettierrc file does not exist semicolons are inserted automatically.
If the line above is not inserted into the .prettierrc file semicolons are not inserted.

## Availiable extansions

<li>.ts</li>
<li>.css</li>
<li>.scss</li>