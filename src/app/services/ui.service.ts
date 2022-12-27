import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackbarNotificationComponent} from '../shared/components/ui/snackbar-notification/snackbar-notification.component';
import {MatDialog} from '@angular/material/dialog';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomSheetViewComponent} from '../shared/components/ui/bottom-sheet-view/bottom-sheet-view.component';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private router: Router,
  ) {
  }


  /**
   * SNACKBAR
   */
  success(msg: string) {
    this.snackBar.openFromComponent(SnackbarNotificationComponent, {
      data: msg,
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['notification', 'success-new']
    });
  }

  warn(msg: any) {
    this.snackBar.openFromComponent(SnackbarNotificationComponent, {
      data: msg,
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['notification', 'warn']
    });
  }

  wrong(msg: string) {
    this.snackBar.openFromComponent(SnackbarNotificationComponent, {
      data: msg,
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['notification', 'wrong']
    });
  }

 
  /**
   * OPEN BOTTOM SHEET
   */
  bottomSheetPrimary(data: {message: string; btnName?: string; routerLink?: string; timeOut?: number}) {
    const sheetRef = this.bottomSheet.open(BottomSheetViewComponent, {
      panelClass: ['bottom-sheet-primary', 'primary'],
      data
    });
  }

  bottomSheetSuccess(data: {message: string; btnName?: string; routerLink?: string; timeOut?: number}) {
    const sheetRef = this.bottomSheet.open(BottomSheetViewComponent, {
      panelClass: ['bottom-sheet-primary', 'success'],
      data
    });
    sheetRef.afterDismissed().subscribe((comData: { routerLink: any; }) => {
      if (comData.routerLink) {
        this.router.navigate([comData.routerLink]);
      }
    });
  }


}
