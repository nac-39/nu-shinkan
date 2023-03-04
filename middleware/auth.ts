export default defineNuxtRouteMiddleware(async (to, from) => {
  // client only
  if (!process.server) {
    const { checkAuthState, user, token, afterSignIn } = useAuth()
    await afterSignIn()
    await checkAuthState()
    if (!token.value) {
      // ログインする時はそのまま通す
      if (to.path === '/login') return
      // ログインしないと入れないページはログインページにリダイレクト
      return await navigateTo('/login', { replace: true })
    } else if (to.path === '/login') {
      // ログインしている時はログインページには行けない。
      // twitterログインにリダイレクトして帰ってきた時きた時
      return await navigateTo('/about', { replace: true })
    }
  }
})
