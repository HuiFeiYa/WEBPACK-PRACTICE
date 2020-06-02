
declare module 'koa-static-server' {
  import Koa from 'koa'

  interface Options {
    rootDir: string;
    rootPath?: string;
    gzip?: boolean;
  }

  export default function staticServer(options: Options): Koa.Middleware
}
