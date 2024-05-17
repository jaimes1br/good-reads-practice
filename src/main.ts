import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';


bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(appRoutes),
      importProvidersFrom(BrowserModule)
    ]
})
  .catch(err => console.error(err));
