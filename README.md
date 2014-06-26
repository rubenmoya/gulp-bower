Information
================

This is a orking environment to develop a frontend website with:

* Gulp
* Bower
* CoffeeScript
* Stylus

## How to use it.

Clone the repository, then install the node modules with:

```
npm install
```

Add bower dependencies and install it with:

```
bower install
```

Now you can start the server with:

```
gulp
```

And access it in ``localhost:3000``


If you want to clean the ``./public`` directory you can use:

```
gulp clean
```

Then start the server again with ``gulp`` and you will have your vendor files recompiled.
