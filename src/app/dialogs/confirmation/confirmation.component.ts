import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {

  public title: string;
    public message: string;

    constructor(
        public dialogRef: MatDialogRef<ConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}


    public onConfirm(): void {
        this.dialogRef.close(true);
    }

    public onDismiss(): void {
        this.dialogRef.close(false);
    }

  ngOnInit(): void {
  }

}
