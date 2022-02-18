import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from './common/common.module';
import { TokenInterceptor } from './common/interceptors/token.interceptor';
import { AuthInterceptor } from './common/interceptors/auth.interceptor';

//#region idiomas
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LoginComponent } from './auth/login.component';
import { FormsModule } from '@angular/forms';

registerLocaleData(localeEs, 'es');
//#endregion idiomas

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ComponentsModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        CommonModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'es' },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
