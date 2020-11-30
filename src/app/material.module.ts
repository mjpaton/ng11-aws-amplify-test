import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  exports: [
    MatCardModule,
    MatIconModule,
    MatInputModule
  ]
})
export class MaterialModule {}
