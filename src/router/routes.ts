import { RouteDefinition } from '@open-cells/core/types'; 

export const routes: RouteDefinition[] = [
  {
    path: '/',
    name: 'home',
    component: 'home-page',
    action: async () => {
      await import('../pages/home/home-page.js');
    },
  },
  {
    path: '/second',
    name: 'second',
    component: 'second-page',
    action: async () => {
      await import('../pages/second/second-page.js');
    },
  },
    {
      path: '/create-task',
      name: 'create-task',
      component: 'create-task-page',
      action: async () => {
        await import('../pages/tasks/create-task-page.js');
      },
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: 'tasks-page',
    action: async () => {
      await import('../pages/tasks/tasks-page.js');
    },
  },
  {
    path: '/login',
    name: 'login',
    component: 'login-page',
    action: async () => {
      await import('../pages/login/login-page.js');
    },
  },

];
