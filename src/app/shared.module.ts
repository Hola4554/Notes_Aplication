import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {ClipboardModule} from '@angular/cdk/clipboard';

import {
  DragDropModule,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';

@NgModule({

  imports:[
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    CdkDropListGroup, CdkDropList, CdkDrag, DragDropModule,
    MatExpansionModule,
    ClipboardModule,
  ],
  exports:[
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    MatExpansionModule,
    ClipboardModule,
  ]

})

export class SharedModule { }
