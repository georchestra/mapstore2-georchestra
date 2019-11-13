Security Integration
====================
MapStore is integrated with the geOrchestra security infrastructure. This happens thanks to:
 * an authentication filter using the geOrchestra security proxy headers to authenticate the user and assign proper MapStore groups and roles
 * LDAP enabled DAOs to get available roles from the geOrchestra LDAP repository

Authentication Filter
^^^^^^^^^^^^^^^^^^^^^
The authentication filter intercepts every MapStore backend request to extract the headers forwarded by the geOrchestra security-proxy,
and use them to properly authenticate and authorize the current user, in particular:

 * sec-username is used to authenticate the current user (anonymous access is assigned if the header does not exist)
 * sec-roles is used to assign MapStore groups to the current user (groups will be used by the admin to assign permissions for the MapStore resources, e.g. maps)
 * a particular role (MAPSTORE_ADMIN) is mapped to the MapStore ADMIN role

The filter is configured in the geostore-security-proxy.xml file:

 .. code-block:: xml

    <security:http auto-config="true" create-session="never" >
		...
        <!-- include filter to capture geOrchestra security proxy headers -->
		<security:custom-filter ref="headersProcessingFilter" before="FORM_LOGIN_FILTER"/>
		...
	</security:http>

    <!-- GeOrchestra header based Auth Provider -->
    <bean id="georchestraAuthenticationProvider"
		class="it.geosolutions.geostore.services.rest.security.PreAuthenticatedAuthenticationProvider">
	</bean>
    
    <!-- GeOrchestra header based Auth Filter -->
    <bean class="it.geosolutions.geostore.services.rest.security.HeadersAuthenticationFilter"
        id="headersProcessingFilter">
            <property name="addEveryOneGroup" value="true"/>
            <property name="usernameHeader" value="sec-username"/>
            <property name="groupsHeader" value="sec-roles"/>
            <property name="listDelimiter" value=";"/>
            <property name="authoritiesMapper" ref="rolesMapper"/>
	</bean>

    <bean id="rolesMapper" class="it.geosolutions.geostore.core.security.SimpleGrantedAuthoritiesMapper">
        <constructor-arg>
            <map>
                <!-- add more entries to map other roles to MapStore ADMIN -->
                <entry key="ROLE_MAPSTORE_ADMIN" value="ADMIN"/>
            </map>
        </constructor-arg>
    </bean>

LDAP Integration
^^^^^^^^^^^^^^^^
MapStore is integrated with the geOrchestra LDAP repository, to be able to fetch users and roles information
and use it in the Admin UI, to assign permissions to MapStore resources and functionalities (maps, contexts, etc.).

This ia also configured in the geostore-security-proxy.xml file:

 .. code-block:: xml
    
    <!-- GeOrchestra LDAP DAOs -->
    <bean id="ldap-context" class="org.springframework.security.ldap.DefaultSpringSecurityContextSource">
		<constructor-arg value="${ldapScheme}://${ldapHost}:${ldapPort}/${ldapBaseDn}" />
        <property name="userDn" value="${ldapAdminDn}"/>
        <property name="password" value="${ldapAdminPassword}"/>
	</bean>
    <bean id="ldapUserDAO" class="it.geosolutions.geostore.core.dao.ldap.impl.UserDAOImpl">
        <constructor-arg ref="ldap-context"/>
        <property name="searchBase" value="${ldapUsersRdn}"/>
        <!-- membership attribute (member) has the syntax uid=username,ou=users,... -->
        <property name="memberPattern" value="^uid=([^,]+).*$"/>
        <property name="attributesMapper">
            <map>
                <!-- optional, LDAP attribute to internal user attribute -->
                <entry key="mail" value="email"/>
                <entry key="givenName" value="fullname"/>
                <entry key="description" value="description"/>
            </map>
        </property>
    </bean>
    <bean id="ldapUserGroupDAO" class="it.geosolutions.geostore.core.dao.ldap.impl.UserGroupDAOImpl">
        <constructor-arg ref="ldap-context"/>
        <property name="searchBase" value="${ldapRolesRdn}"/>
        <property name="addEveryOneGroup" value="true"/>
    </bean>
    <alias name="ldapUserGroupDAO" alias="userGroupDAO"/>
    <alias name="ldapUserDAO" alias="userDAO"/>

LDAP connection settings are taken from the geOrchestra default.properties configuration file, and mapped to
internal configuration variables (e.g. ${ldapHost}).

To configure the default.properties location and environment variable (georchestra-config) needs to be configured for
the MapStore JVM:

 .. code-block:: console

    -Dgeorchestra-config=file:/etc/georchestra/default.properties

Here a diagram of how the various pieces work together:

.. image:: security_architecture.svg

Here some of the most important MapStore workflows and their relation to the security infrastructure:

.. image:: security_flows.svg