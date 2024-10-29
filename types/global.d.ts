declare namespace NodeJS {
  interface Global {
    mongoose: {
      conn: import('mongoose').Connection | null;
      promise: Promise<import('mongoose').Connection> | null;
    };
  }
}
