export const wait = async (ms: number = 100): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const cssFilter = (
  ...args: (string | Record<string, boolean>)[]
): string => {
  return args.reduce<string>((classes, arg) => {
    if (typeof arg === "string") {
      classes += arg;
    } else if (typeof arg === "object") {
      for (const [key, value] of Object.entries(arg)) {
        if (value) classes += key;
      }
    }
    return classes;
  }, "");
};
