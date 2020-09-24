User session management
=======================
Every user has its own session in MapStore GeOrchestra, where current state is saved,
so that it can be restored the next time the user will visit the same context / map again.

A different user session is saved for every:

 * context (when the user is visiting a context)
 * map (when the user is visiting a map of the default context)

The following information are stored in the session:

 * map position (center and zoom)
 * TOC layers and their status (visible, invisible, etc.)
 * user extensions
 * favorites map templates

The user session is collected every 5 seconds and persisted in the browser
localStorage: this means that a different session will be available for every
device / browser.

It is also possible to use a database persisted session (that will be shared by
different devices and browsers of the same user).
To enable database persisted sessions you have to change the ``localConfig.json``
userSessions section:

 .. code-block:: javascript

    "userSessions": {
        "enabled": true,
        "contextOnly": true,
        "provider": "georchestra",
        "saveFrequency": 5000,
        "backupFrequency": 6
    }

With this new configuration, the session is saved both on the browser localStorage,
every 5 seconds (saveFrequency: 5000), and also to the database, every 30 seconds
(every 6 local saves).

The user has the ability to restore the default configuration for the actual
context / map combination using the "Reset session" item in the BurgerMenu.

