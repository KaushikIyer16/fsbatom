# fsbatom package

A simple but elegant way to create a huge number of files or directories or any combination of both without much hassle.
The package also supports multiple extensions and custom extensions, in a simple and easy syntax.

On installing the package the user will see "File System Builder" menu in the packages dropdown. The first option you will see is to create File/Folder. On clicking this a modal will appear, in which the commands can be given.

 <!-- ![screenshot of fsb modal](https://github.com/KaushikIyer16/AndroProjects/blob/master/AndroidStudioProjects/AndroidStudioProjects/BugBook/app/src/main/res/BugBook.jpg) -->

# Creating a simple file/ directory

1. Open the Create File/Folder modal.
2. Simply type the type the names of the directories or files separated by a space.
3. give a root path in the text space provided below the first text input.
4. Most importantly hit Enter/Return Key :P.

<!-- ![creating a simple file/ directory](https://github.com/KaushikIyer16/AndroProjects/blob/master/AndroidStudioProjects/AndroidStudioProjects/BugBook/app/src/main/res/BugBook.jpg) -->

# Creating nested Directories and Files

1. Open the Create File/Folder modal.
2. Type the folder name in the order of the hierarchy required. For nesting the files/folders use a "/" next to the directory name to go inside the directory. Use a "^" to go up in the folder hierarchy. Eg.
<!-- To create a file structure of the format:

The command used will be: -->

3. Hit enter/return to create the files/folders.

# Creating a file with an extension using options

1. Open the Create File/Folder modal.
2. Use an option with a "-" operator before the file names to create multiple files with a same extension. Eg. To create Javascript files one, two and three use the command '-js one two three'.
3. Multiple options can be used to create files with multiple extensions like '.scala.js'.
4. Hit enter/return to create the files.
5. A list of the options is given below:

# Using the -d option:

the -d option stands for delimiting. consider the scenario where you type the command "-p phpfile1 dir1". even though
you want dir1 to be read as a directory, the package will understand it as another php file. So it is important for the
package to understand that the user doesn't want the extension to continue from this point on. So we have the -d option.
it is to tell Rapido-File that from this point on the extension is reset. so the command "-p phpfile1 -d dir1" will be
understood as though dir1 is a directory. The command "-p phpfile1 -d dir1 phpfile2" will be understood as if phpfile2
is also a directory, hence it is important to understand the application of the "-d" option, so for telling Rapido-File
that phpfile2 is a php file the following command has to be executed, "-p phpfile1 -d dir1 -p phpfile2". It is also
possible to continue to create directories after using the "-d" option, such as: "-p phpfile1 -d dir1 / some.txt ^ dir2"
where dir1 and dir2 will be interpreted as directories.
