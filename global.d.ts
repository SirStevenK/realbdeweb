declare namespace NodeJS {
  interface ProcessEnv {
    APP_AWS_ACCESS_KEY_ID?: string;
    APP_AWS_SECRET_ACCESS_KEY?: string;

    ACCESS_TOKEN_EXPIRE_AT?: string;
    REFRESH_TOKEN_EXPIRE_AT?: string;
    MONGO_URL?: string;
    IMAGE_PREFIX_HOST?: string;

    HOST_URL?: string;
    MONGO_URL?: string;

    NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY?: string;
    MAGIC_SECRET_KEY?: string;
    TOKEN_SECRET?: string;

    MAX_AGE?: string;
    TOKEN_NAME?: string;
  }
}
