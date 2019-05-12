module.exports = function(plop) {
  plop.setGenerator('graphql-server', {
    description: 'GraphQL server module generator',
    prompts: [
      {
        name: 'type',
        type: 'list',
        choices: ['rest data source'],
        message: 'What do want to do?',
      },
      {
        type: 'input',
        name: 'entity',
        message: 'What is the entity name?',
        filter: value => plop.getHelper('kebabCase')(value),
      },
    ],
    actions: inputs => {
      const data = {
        entity: inputs.entity,
        entityClass: plop.getHelper('pascalCase')(inputs.entity),
        entityInstance: plop.getHelper('camelCase')(inputs.entity),
        package: 'typegraphql-server',
        directory: inputs.entity,
      };

      let actions = [
        {
          type: 'add',
          data,
          path: 'packages/{{package}}/src/{{directory}}/{{entity}}.entity.ts',
          templateFile: 'plop-templates/entity.ts.tpl',
        },
        {
          type: 'add',
          data,
          path: 'packages/{{package}}/src/{{directory}}/{{entity}}.resolver.ts',
          templateFile: 'plop-templates/resolver.ts.tpl',
        },
        {
          type: 'add',
          data,
          path: 'packages/{{package}}/src/{{directory}}/{{entity}}.datasource.ts',
          templateFile: 'plop-templates/datasource.ts.tpl',
        },
      ];

      return actions;
    },
  });
};
