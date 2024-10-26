const getEnvVar = (key: string) => {
  if (import.meta.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`)
  }
  return import.meta.env[key] || ''
}
export const config = {
  API_URL: getEnvVar('VITE_API_URL'),
  API_USERNAME: getEnvVar('VITE_API_USERNAME'),
  API_PASSWORD: Number(getEnvVar('VITE_API_PASSWORD')),
} as const
