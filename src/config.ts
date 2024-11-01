process.loadEnvFile();

const requiredVariables = Object.freeze([
  'APP_ID',
  'DISCORD_TOKEN',
  'PUBLIC_KEY'
])

requiredVariables.forEach(envVar => {
  if (!process.env[envVar]) throw new Error(`Env variable "${envVar}" is required`)
});

export const Config = Object.freeze({
  discord: {
    appId: process.env.APP_ID!,
    token: process.env.DISCORD_TOKEN!,
    publicKey: process.env.PUBLIC_KEY!,
  }
})

export default Config