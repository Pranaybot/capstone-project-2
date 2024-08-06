
# Taskerr - A Task Manager System

## Summary - Project Description

Taskerr is a task manager application. It allows users to manage
their tasks and monitor their porgress. The application allows users
to create tasks and move them from the 'Tasks' list to 'In Progress' and
'Completed' lists which are made by default. Moreover, users have the 
option to adjust their work accordingly by using up to ten lists in their workspace. 
Finally, lists in the applicaton hold cards, but lists and cards can be added, updated, or deleted.

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
1. In VSCode, go to the `backend` directory and create a folder called `.env` under the 'src' folder.
2. In the `.env` file, add some entries like this: `CASSANDRA_HOST=127.0.0.1`
                                                   `CASSANDRA_DATACENTER=datacenter1`
                                                   `CASSANDRA_KEYSPACE=my_keyspace`
                                                   `CASSANDRA_USERNAME=""`
                                                   `CASSANDRA_PASSWORD=""`
3. The `.env` file already contains a keyspace name. While you can't rename a keyspace directly, here are some steps you can follow to work around it:

   # Steps
   a) Create a new keyspace with a desired name using the `CREATE KEYSPACE` command like this: `CREATE KEYSPACE new_keyspace_name WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};`
   b) Next, you should copy the schema from the old keyspace to the new one. You do this by getting the
   schema from the old keyspace table like this: `DESCRIBE TABLE old_keyspace_name.table_name;`. Once
   you get the details, you copy the schema details and paste it into this command as follows: `CREATE TABLE new_keyspace_name.table_name (
   -- Table schema goes here)`;
   c) After the second step, you can migrate data from the old keyspace to the new one by using the `COPY` command or an external tool like `sstableloader` or `cassandra-loader`. Here is an example for how you can achive this: `-- Copy data from the old keyspace to the new keyspace COPY old_keyspace_name.table_name TO 'data.csv'; COPY new_keyspace_name.table_name FROM 'data.csv'`;
   d) Update the keyspace entry in the configuration file to use the new keypace by renaming the old one to the new one you created.
   e) If you wish to drop the old keyspace, use this command, `DROP KEYSPACE old_keyspace_name;`. In this case, the keyspace name would be `my_keyspace`.

   
5. You will also notice that the `.env` file has empty credential values for username and pasword. For the application, you can leave this blank. However, if you wish to create credential details, follow these steps:

   # Steps
   a) Locate the `cassandra.yaml` file. It is typically located in the `conf` directory of your Cassandra installation like this: `/etc/cassandra/cassandra.yaml`.
   b) To open the file, you can open it using `nano` or `vim` like this: `sudo nano /path/to/cassandra/conf/cassandra.yaml`. Also, you can open it using 'Notepad' if you are on Windows, 'TextEdit' on macOs, or something similar on 'Linux' or 'Ubuntu'.
   c) Find and modify the `authenticator` line in the yaml file to use `PasswordAuthenticator` as follows:
   `authenticator: PasswordAuthenticator`. Then, save the changes and close the text editor.
   d) Restart the Cassandra service. You can do it like this method or something similar to it: `sudo systemctl restart cassandra`. You can also try this command: `sudo service cassandra restart`.
   e) Connect to Cassandra DB by typing `cqlsh` in 'Command Prompt' or 'Terminal' if you are using macOs.
   f) Create a new user using this command: `CREATE USER username WITH PASSWORD 'password' NOSUPERUSER;`
   You can set the name of `USER` and `PASSWORD` to something you like.
   g) Optionally, you can grant permissions to the user. One command you could use is this one: `GRANT ALL PERMISSIONS ON KEYSPACE keyspace_name TO username;`
   h) Exit the `cqlsh` instance by typing `exit`; or Ctr+d. In the env file, enter the values you created for username and password.
   i) If you wish to interact with Cassandra directly, use the command here with the username and password you specified: `cqlsh -u username -p password`.

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
6. The application will have two folders, `angular-express-app` and `backend`. First, go to the second folder under the
   root directory, 'capstone-project-2, in the Command Prompt and enter `npm install` to install all of the backend packages.
7. Install Anglar CLI by using the command, `npm install -g @angular/cli`. If you are a macOS user, include sudo before the
   actual command.
8. Once the library is installed, go to the `angular-express-app` folder and install the packages listed in the package.json
   file like this: `npm install`.
10. Once VSCode finishes downloading the required libraries, you can run the app in the command prompt using
   the command, `ng serve`. Make sure you are in the `angular-express-app` directory of the project.
11. To stop your project from running, enter `Ctr+C` if you are using Windows or Linux or `Cmd+C` if you are
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
6. You may notice that Homebrew installs Python and Java under different foldesr. This means that you have to accept
   this installations when installing cassandra with HomeBrew. Not only that, if you are working on a Python or Java
   application, you must change your interpreter settings for the app to run properly. 
7. Drop the old keypsace if you verifed that all of your data has successfully migrated, the new keypace
is functioning, and you don't have any use cases that
depend on the old keyspace.
8. When you enter your credential details for username and password in the `.env` file, you will be connected to Cassandra automatically.
9. If you want to re-configure the Apache Cassandra to have distributed nodes, you can refer to these links: `docs.datastax.com` and
   `cassandra.apache.org`.

## Future Development

1. Allow users to change password / have a forgotten password system in place.
2. Allow users to delete their own accounts.
3. Implement automatic light/dark theme toggle for application based on the time
of day and season.
4. Integrate app with Google Calendar to make task management simpler, flexible, and easier to update.
5. Allow users to select different backgrounds for their Taskerr workspace.


