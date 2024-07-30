
# Taskerr - A Task Manager System

## Summary - Project Description

Taskerr is a task manager application. It allows users to manage
their tasks and monitor their porgress. The application allows users
to create tasks and rank them from 1 being very important to 5 being 
a low priority. Also, the application comes with three defined lists:
'Tasks', 'In Progress', and 'Completed' by default, but users have the 
option to add seven more lists to their workspace. Finally, lists in the
applicaton hold cards, but lists and cards can be added, updated, or deleted.

You can view the deployed application here: `https://capstone-two-4wnd.onrender.com`

## Tech Stack

### Frontend

Angular, TypeScript, HTML, SCSS

### Backend

Express.js, Apache Cassandra

## Features

### Secure User Sign-in / Middleware

User sign-in routes are protected using bcrypt hashed passwords and middleware
is used to validate user input for adding or updating cards or lists.

### Responsive Layout

The content of the application shrinks or enlarges to fit the size of the screen regardless of 
whether the application is viewed on a smartphone, tablet, or a computer.

## Project setup and build

### A) Apache Cassandra setup
1. If you don't have Homebrew, go to https://brew.sh/, copy the link provided under 'Install Homebrew'
   and run it on your Terminal or Command Prompt if you are a Window or Linux user.
2. Once you are done, you can install Cassandra using brew install cassandra.
3. If you already have Python or a Java development Kit installed, download the version of Python or
   JDK that Homebrew supports using this link: https://formulae.brew.sh/formula/cassandra. Otherwise,
   Homebrew will install them for you automatically as it installs cassandra.  
4. Once Cassandra is installed, you can test in your Command Prompt by typing `cqlsh`. If you see a prompt
   open for you to write commands, you don't have to do anything. Otherwise, use this link for help:
   https://cassandra.apache.org/doc/stable/cassandra/tools/cqlsh.html
   
### B) VSCode IDE setup
1. Go to the official VSCode website by typing "VSCode download" in the search bar in Google. Click on the first link.
   Once you are on the site, click on the 'Download' button to the left of the VSCode image.
2. Once the IDE has installed, launch the application from your computer. Then, choose to create a new
   project or open an existing one.

### C) Other steps
1. Before you start your project, you need to create an assets folder. Go to the frontend folder, use the Command
   Prompt to get to the app folder which will be located under src.
2. Next, create an Assets folder by right-clicking `app`, and create 'New File' or highlighting the `app`folder
   and selecting the new file next to the options that are to the right of your project name in VS Code.
3. Once you finish this step, copy the .png image that is outside the task-manger folder.
4. Go to the assets folder and paste the image.
5. If you update the project according to your needs, keep in mind that GitHub will not track your assets or
   environments folders because of the .gitignore files in the frontedn and backend folders. In this case,
   save your image either within the scope of your project or somewhere else which is very secure but easy
   to remember.
   
### D) Project build
1. From the github repository, go to Code and copy the HTTPS github repository url to your clipboard.
2. In your command prompt, find or create an empty directory and run `git clone git_repo_url_link` to
clone the repository to your local machine. If you don't have `git` installed, follow the instructions 
on this website: https://github.com/git-guides/install-git.
3. On your command prompt, go to the directory with your `git` repo using a command like `cd folder_with_repo`
from macOS to make sure you can access the project content. 
4. Launch VSCode from your computer, click on 'Open project', and select the folder with the git 
repository.
5. Inside your IDE, open a new command prompt window and navigate to your `git` repo.
6. The application will have two folders, frontend and backend. First, go to the frontend folder under the
   Task manager folder in the Command Prompt and enter `npm install` to install all of the frontend packages.
   Do the same for the backend folder.
7. Once VSCode finishes downloading the required libraries, you can run the app in the command prompt using
   the command, `ng serve`. Make suere you are in the frontend directory of the project.
8. To stop your project from running, enter `Ctr+C` if you are using Windows or Linux or `Cmd+C` if you are
   a macOs user.

## Tips and Troubleshooting

1. If you can't use the `cql` command to interact with Cassandra DB, consult this
   link for reference: https://cassandra.apache.org/doc/latest/.
2. You can check the data types of the values when you update a list name or a card body 
   by going over the routes and models sub-folders in the backend folder of the project located
   under task-management.
3. If you get a TypeError warning when you run the application, check both directories. The issue
   could be as simple as a different type of a parameter. For example, the parameter, name, could be
   mistakenly declared to have number as a type instead of string.
4. If you get permission errors while running `npm install` on MacOs, try running `sudo npm install`
   instead.
5. You don't have to worry about additional steps if you are a Windows or Linux user. Homebrew and VSCode
   will work on any operating system.
6. If you are a macOs user and you are worried that you don't have Python installed, you don't have to
   worry. Users running the macOs operating system will have Python by default.

## Future Development

1. Allow users to change password / have a forgotten password system in place.
2. Allow users to delete their own accounts.
3. Implement automatic light/dark theme toggle for application based on the time
of day and season.
4. Integrate app with Google Calendar to make task management simpler, flexible, and easier to update.
5. Allow users to select different backgrounds for their Taskerr workspace.


