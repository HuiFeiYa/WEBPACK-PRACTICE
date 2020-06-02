interface myLib {
  name: string;
  length: number;
  extras?: string[];
}

export namespace lib {
  // ~ We can write 'myLib.timeout = 50;'
   const timeout: number
   type stringOrNumber = string | number
  // ~ We can access 'myLib.version', but not change it
  const version: string
}