import App from './app';
import PropertyRouter from './routers/propertyrouter';
import ZipRouter from './routers/ziprouter';
import { getConfigOrDefault } from './util/util';

const host: string = getConfigOrDefault('HOST', 'localhost');
const port: number = getConfigOrDefault('process.env.PORT', 3000, (x: string) => Number(x));


const app = new App({
    host,
    port,
    routers: [
        new ZipRouter(),
        new PropertyRouter(),
    ],
});

app.listen();
