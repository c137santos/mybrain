---
title: "Hiding sensitive information in a Django application"
date: 2022-06-30
tags: [python, django, environment-variables, security, backend]
---

# Hiding sensitive information in a Django application

Without Docker — using Pycharm, VSCode, and `.env` with `python-decouple`.

- [a) First in Pycharm](#a-first-in-pycharm)
- [b) Now VSCode](#b-now-in-vscode)
- [c) .env file and Python-decouple](#c-env-file-and-python-decouple)

---

After pushing our initial project, me and [Marília Borgo](https://medium.com/@mariliaborg) received a mysterious email from GitHub. A GitHub Guardian email with the message **"Django Secret Key exposed on GitHub"**. WTF? What just happened? What even is a secret key?

We were at the very beginning of learning the Django framework — our first steps into web development, really. In Django, the secret key is a variable responsible for signing, and therefore validating, some specific processes triggered within the project.

Without knowing much at the time, I ended up pushing my key hardcoded to GitHub. GitHub Guardian, a GitHub application, came to warn me that sensitive information had been exposed.

If I simply removed that variable from the code — just deleted that line — everything would break! Thinking of a solution, devs **Bruno Picinin** and **Erle Carrara** explained a way out. I didn't want to use Docker (maybe because I had no idea what it even was at the time). And EVERY SINGLE TUTORIAL HAD DOCKER! So here's a recipe without Docker, using environment variables.

Through environment variables it's possible to hide secret information like the `SECRET_KEY`!

Environment variables are variables just like the ones we create in our applications (`a = 1 + 1`, `a = 2`). However, they "live" outside the code and are used to pass information to a specific process running our application. Environment variables are a great way to define variables your application needs — especially Django on Heroku.

What does it mean to export an environment variable? Simply put, it means placing a variable and its value into a common process in your OS.

Since I use Pycharm, the recipe will use its interface. There's also a VSCode tutorial, written by Marília Borgo. However, if you want to fully understand the topic, it's really important that you read the Pycharm section first — that's where I add more conceptual explanations of the problem. The VSCode section is straight to the point and might cause some confusion without the background.

In the future, we plan to write something using only terminal commands, because writing about IDE buttons goes out of date really fast.

Always remember: the interface is just running terminal commands under the hood.

---

## a) First in Pycharm

### Step 1 — Import os

First thing: import the library that will allow us to access the value of the environment variable. Import `os` at the top of your `settings.py` file in the Django project.

```python
import os
```

### Step 2 — Replacing the hardcoded value with an environment variable

Choose a variable whose value you want to replace with an environment variable.

In my case, the problem was `SECRET_KEY`. In my project, as mentioned, it was hardcoded — exposing my key right there on GitHub. So, using the `getenv` function from the `os` library, we'll fetch the value of the environment variable we're about to export.

As a best practice, the exported environment variable name should match the name of the variable it's replacing. So swap it out for something like:

```python
SECRET_KEY = os.getenv('SECRET_KEY')
```

Write `os`, dot (`.`), write `getenv` right next to it, open parenthesis, open quotes, name of the exported variable, close quotes, close parenthesis.

> Environment variables created inside a venv won't exist for other processes, ok? That's why each project should export and import its own environment variables — so they don't interfere with each other if you happen to export them to the OS-wide environment.

### Step 3 — Exporting the environment variable

In Pycharm, environment variables can be added in the run configuration editor.

The button sits between "code with me" (the two little people icons) and the run play button. In my case, since I'm running Django, my button says `manage`, but it might say the name of another module — the most common one is `main`.

It's the second button from the left. I cannot be clearer than this!

Click the button and then **edit configurations**. When the Run/Debug Configuration window opens, the section we'll work with is called **Environment**. Specifically, we'll edit the first field: **Environment Variables**. Click the list icon at the end of the text box.

After clicking the icon, the dialog lets you export environment variables via the IDE for that specific project only. You might notice that in my case there's already a variable `PYTHONUNBUFF…` with value `1` — it was already there when I arrived.

Clicking the `+` to add a User Environment Variable lets you set a name and a value. The `SECRET_KEY` value needs to be long and random enough to be accepted as a valid secret key.

Now you can see it as an environment variable in your project through the IDE.

As a best practice, you should not only provide the real secret value that works in your own environment, but also a **default value** — because if another dev forks the project and tries to run it, without a default value the project will break, since `os.getenv` won't find anything for that variable.

The second parameter is exactly that default value, so `os.getenv` can run with something and not crash the entire application.

The final form should be:

```python
SECRET_KEY = os.getenv('SECRET_KEY', 'default-value-for-other-devs')
```

We delete the old form that had the key written in plain text and replace it with this new syntax. Now we know how to hide our information, create environment variables, and still leave the code ready for other devs to run without breaking it.

> **Essential note from Victor Augusto — thank you so much for contributing!**
>
> "If you follow this procedure to hide environment variables through Pycharm using 'Environment Variables', remember that everything you add there will be sent to the hidden `.idea/` folder — the IDE's configuration folder.
>
> What happens is that hiding credentials through Pycharm's configuration causes the keys to be saved in `.idea/workspace.xml`, inside the `<envs>` key.
>
> GitHub's default `.gitignore` does NOT ignore the `.idea/` folder, so this file will be committed to the repository along with your keys.
>
> Always remember to add the `.idea/` folder to your `.gitignore_global` to avoid this problem with keys and IDE configurations."

---

## b) Now in VSCode

To configure this environment variable in VSCode and at the same time set yourself up for better debugging in the future! The first thing to do is open the debug section and click the hyperlink that says "to customize Run and Debug, open a folder and create a `launch.json` file."

So, the file that handles these things is called `launch.json`. After clicking, select that you're working on a Python project. VSCode will even suggest it.

It will create a file with a default template — and here we need to add two things. Pay attention to the commas, ok?

**1 —** Below `program`, add another key-value pair for the argument to run your `runserver` through the IDE. This will help with debugging later. Add:

```json
"args": ["runserver"],
```

**2 —** The environment variable goes inside an `env` key. The `env` key holds a dictionary of the environment variables your app needs. In this case, the `SECRET_KEY`:

```json
"env": {"SECRET_KEY": "thisPasswordShouldBeRandomAndLongEnoughToBeAccepted"},
```

The complete file should look like this:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Django",
            "type": "python",
            "request": "launch",
            "program": "${workspaceFolder}/manage.py",
            "args": ["runserver"],
            "env": {
                "SECRET_KEY": "thisPasswordShouldBeRandomAndLongEnoughToBeAccepted"
            }
        }
    ]
}
```

Understanding the config:

- **Django** — the name of the debug configuration. This will help you in VSCode later.
- **cwd** — (change working directory) where the command runs.
- **program: manage.py** — the file used to run the program.
- **args** — the argument passed to `manage.py`.
- **env** — where we add environment variables like `SECRET_KEY`.

Now:

a) Go back to your `settings.py` file.  
b) Import the `os` library at the top.  
c) Use the `getenv` function to fetch the value of the `SECRET_KEY` environment variable:

```python
SECRET_KEY = os.getenv('SECRET_KEY')
```

d) Now run the server, and hopefully everything works!

Special thanks to Marília Borgo for her material.

---

## c) .env file and Python-decouple

`python-decouple` lets you create a file to hold all sensitive information. It's great for storing things like database login and password. The way decouple works: it looks for environment variables it can't find in the code, then searches the `.env` file.

### Step 1 — Install python-decouple

First, install `python-decouple` with your `.venv` active in the terminal.

```bash
pip install python-decouple
```

### Step 2 — Create a .env file at the project root

Create a `.env` file in your project at the same level as `manage.py`, and add your variables with their values.

```
SECRET_KEY=your-long-and-random-secret-key
DB_NAME=database_name
DB_USER=username
DB_PASSWORD=password
```

You don't need quotes around the values — everything in a `.env` file is treated as a string. Decouple also converts everything to string, so don't worry about that.

> **Important:** there must be NO SPACE between the variable name, the `=`, and the value. Everything must be right next to each other, otherwise it won't work.

Other frameworks are smart enough to automatically detect the `.env` file and fetch values from it. Django isn't quite that automatic — it needs a library to help manage the environment and variables. The goal is to stop scattering sensitive variables across `settings.py`.

That's where `python-decouple` comes in. With this library, you no longer need to set environment variables through the IDE or manually in code.

### Step 3 — Update settings.py

In your `settings.py` (or any other file that needs to hide sensitive info), import `decouple` alongside your other libraries:

```python
from decouple import config
```

Now you can replace the hardcoded value the same way we did with `os`, but instead of `os.getenv`, use the `config` function — passing the variable name, and optionally a default value:

```python
SECRET_KEY = config('SECRET_KEY', default='default value if the variable does not exist')
```

Example with database settings:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', default=''),
        'USER': config('DB_USER', default=''),
        'PASSWORD': config('DB_PASSWORD', default=''),
    }
}
```

> **One last important detail:** if you're pushing this to git, make sure your `.gitignore` is configured to NOT include the `.env` file! Otherwise all our work goes down the drain.

Well folks, it can't get any clearer than this.
