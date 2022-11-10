import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { miAnimacion } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    miAnimacion
  ]
})
export class AppComponent {
  title = 'clinica-pavon';
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
