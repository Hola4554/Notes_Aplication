import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

@NgModule({

  imports:[
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  exports:[
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ]

})

export class SharedModule { }
