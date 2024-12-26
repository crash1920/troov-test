export default defineNuxtRouteMiddleware((to, from) => {
    const token = localStorage.getItem('token');
  
    // Bloquer l'accès à /login si déjà connecté
    if (token && to.path === '/login') {
      return navigateTo('/');
    }
  
    // Bloquer les pages protégées si pas connecté
    if (!token && to.path !== '/login') {
      return navigateTo('/login');
    }

    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token && to.path === '/login') {
        return navigateTo('/');
        }
    }
      
  });
  