import { provideNgDocApp, provideSearchEngine, NgDocDefaultSearchEngine, providePageSkeleton, NG_DOC_DEFAULT_PAGE_SKELETON, provideMainPageProcessor, NG_DOC_DEFAULT_PAGE_PROCESSORS, provideMermaid } from "@ng-doc/app";
import { NG_DOC_ROUTING, provideNgDocContext } from "@ng-doc/generated";
import { provideHttpClient, withInterceptorsFromDi, withFetch } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideNgDocContext(),
    provideNgDocApp(),
    provideSearchEngine(NgDocDefaultSearchEngine),
    providePageSkeleton(NG_DOC_DEFAULT_PAGE_SKELETON),
    provideMainPageProcessor(NG_DOC_DEFAULT_PAGE_PROCESSORS),
    provideMermaid(),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideRouter(
      [
        ...NG_DOC_ROUTING.map((route) => {
          if (route.path === 'home') {
            route.path = '';
            route.pathMatch = 'full';
          }
          return route;
        }),
        {
          path: '**',
          redirectTo: '',
        },
      ],
      withInMemoryScrolling()
    ),
  ],
};
