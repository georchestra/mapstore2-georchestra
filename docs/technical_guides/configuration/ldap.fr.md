# Configuration du LDAP

MapStore utilise le LDAP  de geOrchestra pour utiliser les rôles applicatifs adaptés


## Mapping des rôles LDAP Mapstore et rôles LDAP geOrchestra

TODO
## Paramètres de connexion

Les paramètres de connexion sont généralement hérités de `default.properties` dans geOrchestra 

## Surcharger la configuration du LDAP

`mapstore/geostore.properties` contient les paramètres spécifiques à MapStore qui ne peuvent pas être lus directement depuis `default.properties`.

Ce fichier peut aussi servir à surcharger les paramètres de connexion si MapStore doit utiliser une configuration de base différente du reste de la plateforme.

```
### LDAP properties

# LDAP server domain name
# Domain name, or IP address, of the LDAP server
# ldapHost=localhost

# LDAP server port
# Listening port of the LDAP server
# ldapPort=389

# LDAP Scheme
# ldap or ldaps
# ldapScheme=ldap

# Base DN of the LDAP directory
# Base Distinguished Name of the LDAP directory. Also named root or suffix, see
# http://www.zytrax.com/books/ldap/apd/index.html#base
# ldapBaseDn=dc=georchestra,dc=org

# Administrator DN
# Distinguished name of the administrator user that connects to the LDAP server
# ldapAdminDn=cn=admin,dc=georchestra,dc=org

# Administrator password
# Password of the administrator user that connects to the LDAP server
# ldapAdminPassword=xxxx

# Users RDN
# Relative distinguished name of the "users" LDAP organization unit. E.g. if the
# complete name (or DN) is ou=users,dc=georchestra,dc=org, the RDN is ou=users.
# ldapUsersRdn=ou=users

# Roles RDN
# Relative distinguished name of the "roles" LDAP organization unit. E.g. if the
# complete name (or DN) is ou=roles,dc=georchestra,dc=org, the RDN is ou=roles.
# ldapRolesRdn=ou=roles

```
