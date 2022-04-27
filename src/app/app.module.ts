import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import {
  ComponentDemoComponent,
  ComponentDemoTemplateDirective,
} from './component-demo/component-demo.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  exports: [HelloComponent],
  declarations: [
    AppComponent,
    HelloComponent,
    ComponentDemoComponent,
    ComponentDemoTemplateDirective,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
