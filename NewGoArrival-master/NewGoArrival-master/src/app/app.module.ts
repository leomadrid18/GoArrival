import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/logins/login/login.component';
import { LoginConsolidatorComponent } from './pages/logins/login-consolidator/login-consolidator.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { myObjectReducer } from './app-state/reducers/login.reducer';
import { CookieService } from 'ngx-cookie-service';





const routes: Routes = [
  { path: 'login', component: LoginConsolidatorComponent, runGuardsAndResolvers: 'always' },
  { path: '', component: LoginComponent, runGuardsAndResolvers: 'always' }
];

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    
    LoginConsolidatorComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ myObject: myObjectReducer }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
