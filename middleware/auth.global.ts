const noAuthRoutes = ['/', '/login', '/about', '/events']
export default defineNuxtRouteMiddleware(async (to) => {
  // client only
  if (!process.server) {
    const { checkAuthState, token } = useAuth()
    // await afterSignIn()
    await checkAuthState()
    // ログインしてない時
    if (!token.value) {
      if (to.path.includes('/manage-club'))
        return await navigateTo('/login', { replace: true })
    }
    // ログインしている時
    else if (to.path === '/login') {
      // ログインしている時はログインページには行けない。
      // twitterログインにリダイレクトして帰ってきた時
      return await navigateTo('/manage-club', { replace: true })
    }
  }
})
