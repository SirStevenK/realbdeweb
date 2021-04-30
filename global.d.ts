declare namespace NodeJS {
  interface ProcessEnv {
    APP_AWS_ACCESS_KEY_ID?: string;
    APP_AWS_SECRET_ACCESS_KEY?: string;

    MONGO_URL?: string;

    NEXT_PUBLIC_IMAGE_PREFIX?: string;

    NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY?: string;
    MAGIC_SECRET_KEY?: string;
    TOKEN_SECRET?: string;

    MAX_AGE?: string;
    TOKEN_NAME?: string;

    WEBSITE_EMAIL?: string;
    WEBSITE_EMAIL_PASSWORD?: string;
  }
}
