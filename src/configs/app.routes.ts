// Root
const authRoot = 'auth';
const usersRoot = 'users';
const hierarchyRoot = 'hierarchy';
const typesRoot = 'types';
const hierarchyTypesRoot = 'hierarchy';
const workTypesRoot = 'work';
const permissionRoot = 'permission';
const roleRoot = 'role';
const employeeRoot = 'employee';

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
    list: `/${usersRoot}/list`,
  },
  hierarchy: {
    root: hierarchyRoot,
    create: `/${hierarchyRoot}/create`,
    list: `/${hierarchyRoot}/list`,
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
  permission: {
    root: permissionRoot,
    create: `/${permissionRoot}/create`,
    list: `/${permissionRoot}/list`,
  },
  role: {
    root: roleRoot,
    create: `/${roleRoot}/create`,
    list: `/${roleRoot}/list`,
  },
  employee: {
    root: employeeRoot,
    create: `/${employeeRoot}/create`,
    list: `/${employeeRoot}/list`,
  },
};
