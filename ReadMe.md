# CLI obfuscator for js, html, css

What this package can do:

1. This package can obfuscate the files you specify to it, as well as move to a new directory if necessary.
2. It can obfuscate the folder you specify and create a new one where the result will be placed.

## Usage:

<div>
After installing a package, open a terminal in the same folder where the files you want to obfuscate are located and run the command.
</div>
<br />
<div>
1. If you want to obfuscate a specific file, write the name of this file, as well as the destination directory where you want to put obfuscated files. Also you can specify multiple files for this. Here is an example of command:
</div>

```diff
npx obfor index.html script.js styles.css *dir=./output
```

<div>
<strong>./output</strong> - it is the name of the folder where the obfuscated files will be placed. You can use any name and any path. If a folder with the specified name does not exist, it will be created automatically. If you want to overwrite the original files, just use <strong>*dir=.</strong>
</div>

<div>
<strong>
Be aware that you may lose your code if you encrypt the original files.
</strong>
</div>
<br />

<div>
2. If you want to obfuscate folder, also open a terminal in the same folder where the files you want to obfuscate are located and run the command:
</div>

```diff
npx obfor --all *dir=./output
```

Files with extensions <strong>js, html, css</strong> will be obfuscated, but other files and folders will be copied to the folder you specified.
