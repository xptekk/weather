import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Weather';

  constructor(
    private swUpdate: SwUpdate,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.listenForUpdates();
  }

  private listenForUpdates() {
    this.swUpdate.versionUpdates
      .pipe(
        filter(event => event.type === 'VERSION_READY'),
        switchMap(() =>
          this.snackbar.open(
            'A new version is available!',
            'Update now'
          ).afterDismissed()),
        filter(result => result.dismissedByAction),
        map(() => this.swUpdate.activateUpdate()
          .then(() => location.reload()))
      )
      .subscribe();
  }
}
