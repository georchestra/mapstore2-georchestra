# Functionnal administration

To provide a suitable working environment for users, the functional administrator must understand certain concepts: context, maps, catalog.

## Context

To meet users’ needs, it is possible to offer predefined cartographic working environments, called **contexts**.

In MapStore, a **context** is defined as a **JSON document** that combines three fundamental elements:

- A **map** (“map”).
- **Tools** (“plugins”).
- A **theme**.

### Main Features

- **Creation and Administration**:  
  A context can only be created by **administrators** (holding the MapStore admin role) via the context manager interface (`/admin/`).

- **Access and Security**:  
  Each context has its own **dedicated URL**. Access can be restricted to specific user groups based on roles defined in geOrchestra’s LDAP.

- **Storage**:  
  Context information is stored in the application’s **database**.

- **The Context Map**:  
  This is a map specifically generated for this context by an administrator. By default, it uses the base configuration of a new context (`new.json`), but it is generally customized to meet a specific use case.

- **Extensions**:  
  During creation, the “Map” extension is enforced by default, but additional functionalities (layer list, search, zoom, etc.) can be added via the plugin configuration file.

### One Context, Multiple Maps

To meet specific needs, several types of maps can be used within a context.  
The **Map template** plugin should be used.

> **For further reading**: The use of contexts is detailed in [Managing contexts](https://docs.mapstore.geosolutionsgroup.com/en/latest/user-guide/exploring-contexts/)

## Different Types of Maps

In the MapStore ecosystem, map types can be organized according to a hierarchy ranging from structural configuration to the user's personal use:

### 1. Configuration Maps (Fundamental Level)
These maps define the basic behavior of the application:

- **The default viewer map (`config.json`)**: Global MapStore configuration.

- **The default map of a new context (`new.json`)**: Base proposed when creating a new context by an administrator.

### 2. Managed Maps (Strategic Level)
Created by experts for specific use cases:

- **The map of a context**: Specifically generated for a context, adapted to a particular use case.

- **The map template**: Managed by a content administrator, it allows quick display of a theme (e.g., urban planning, roads) with associated metadata.

### 3. User Maps (Operational Level)
Maps customized or saved by users:

- **Maps from the map catalog**: “Child” maps saved via “Save As,” inheriting the tools from a “parent” context.

- **The exported map (`map.json`)**: Customized map exported as a JSON file.

- **The user session map**: Automatically saved in the browser cache (LocalStorage), specific to each visited context.

### 4. Typology According to Functional Content
Maps are also distinguished by their composition:

- **Reference base map**: Contains styled layers representing the real world.

- **Composite reference base map**: Overlay of at least two base maps with transparency (e.g., city plan over aerial photo).

- **Thematic map template**: Organizes GIS layers to represent phenomena related to a specific profession.


> **For further reading**: The use of maps is detailed in [Exploring maps](https://mapstore.readthedocs.io/en/latest/user-guide/exploring-maps/)


## Catalog

In the MapStore ecosystem, the concept of **catalog** refers to the tool and interface that allow **searching, viewing, and loading geographic data** (layers) into a map.

### Key Points to Understand Its Function and Use

#### 1. A Data Search Tool
The catalog is primarily used to **identify individual layers** before adding them to a map composition. It is recommended to use the **“metadata catalog”**, which provides appropriate search tools and allows viewing the full description of a dataset.

#### 2. An Extension of the Viewer
Technically, the catalog is an **extension (plugin)** that can be added to a MapStore context. It appears in two ways in the interface:
- **The Catalog tab**: Located in the portal header, it allows global search.
- **The “Add Data” button**: Accessible in the map viewer (toolbar or layer list), it opens a window to query available catalogs.

#### 3. Diversity of Sources
It is possible to configure multiple catalogs.

#### 4. Role in Map Structure
Technically, a map (JSON document) contains a **list of authorized catalogs**, allowing dynamic loading of data by the user.

> **In summary**: The catalog is the **gateway to the geographic data assets** available on the portal, facilitating their discovery via metadata before integration into the map.