// Root
const authRoot = 'auth';
const usersRoot = 'users';
const hierarchies = 'hierarchies';
const typesRoot = 'types';
const hierarchyTypesRoot = 'hierarchy';
const workTypesRoot = 'work';

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  auth: {
    root: authRoot,
    login: `/${authRoot}/login`,
    register: `/${authRoot}/register`,
  },
  user: {
    root: usersRoot,
    create: `/${usersRoot}/create`,
    delete: `/${usersRoot}/:id`,
  },
  hierarchies: {
    root: hierarchies,
    add: `/${hierarchies}/add`,
    delete: `/${hierarchies}/:id`,
  },
  type: {
    root: typesRoot,
    hierarchy: {
      root: hierarchyTypesRoot,
      create: `${typesRoot}/${hierarchyTypesRoot}/create`,
      delete: `${typesRoot}/${hierarchyTypesRoot}/:id`,
    },
    work: {
      root: workTypesRoot,
      create: `${typesRoot}/${workTypesRoot}/create`,
      delete: `${typesRoot}/${workTypesRoot}/:id`,
    },
  },
};
