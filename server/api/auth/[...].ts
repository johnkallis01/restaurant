import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: process.env.SIDEBASE_SECRET,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET
    })
  ]
})