User session management
=======================
Every user has its own session in MapStore GeOrchestra, where current state is saved,
so that it can be restored the next time the user will visit the same context / map again.

A different user session is saved for every:
 * context (when the user is visiting a context default map)
 * map (when the user is visiting a map of the default context)
 * context and map (when the user is visiting a custom map of a given context)

The following information are stored in the session:
 * map position (center and zoom)
 * TOC layers and their status (visible, invisible, etc.)
 * user extensions
 * favourites map templates

The user session is collected every 30 seconds (not configurable at the moment),
and persisted on the application database.

The user also has the ability to restore the default configuration for the actual
context / map combination using the "Remove session" item in the BurgerMenu.

