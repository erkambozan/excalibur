// Root
const usersRoot = 'users';
const hierarchies = 'hierarchies';

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,
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
};
