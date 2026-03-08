export const config = {
  env: {
    appwrite: {
      endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
      projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
      projectName: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME!,
      platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
    },
  },
};
