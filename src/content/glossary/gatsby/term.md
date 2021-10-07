Title: Gatsby

-----

Description: An open-source static site generator which is based on GraphQL and React.

-----

Authors: rasshofer

-----

Text:

Gatsby is strongly plugin-oriented. It separates between source plugins and transformer plugins. Source plugins provide data from a specific data source such as a headless CMS (like Contentful or WordPress) or the filesystem. The format of the data provided by the source plugin is not specified as this is the responsibility of the respective transformer plugins.

During the build process, Gatsby provides a dynamically generated (term: GraphQL) schema that makes the data of the configured plugins available centrally.

To display and render the data, Gatsby uses (term: React).
