const { VITE_API_PATH } = import.meta.env;

const ENV = {
  API_PATH: VITE_API_PATH as string
};

export { ENV };
