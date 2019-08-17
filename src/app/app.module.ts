// tslint:disable-next-line: quotemark
import { BrowserModule } from "@angular/platform-browser";
// tslint:disable-next-line: quotemark
import { NgModule } from "@angular/core";

// tslint:disable-next-line: quotemark
import { AppComponent } from "./app.component";
// tslint:disable-next-line: quotemark
import { PostCreateComponent } from "./posts/post-create/post-create.component";

@NgModule({
  declarations: [AppComponent, PostCreateComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
