const noAuthRoutes = ['/', '/login', '/about', '/events']
export default defineNuxtRouteMiddleware(async (to, from) => {
  // client only
  if (!process.server) {
    const { checkAuthState, token, afterSignIn } = useAuth()
    await afterSignIn()
    await checkAuthState()
    // ログインしてない時
    if (!token.value) {
      // ログインする時はそのまま通す
      if (noAuthRoutes.includes(to.path)) return
      // ログインしないと入れないページはログインページにリダイレクト
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
