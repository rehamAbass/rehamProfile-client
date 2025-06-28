import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';

import { appConfig } from './app.config';
// import { serverRoutes } from './app.routes.server';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// import { provideServerRendering, withRoutes } from '@angular/ssr';

const serverConfig: ApplicationConfig = {
  providers: [
    // provideServerRendering(withRoutes(serverRoutes)),
    provideHttpClient(withInterceptorsFromDi()),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
