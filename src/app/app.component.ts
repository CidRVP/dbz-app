import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule], // ← REMOVA HttpClientModule daqui
})
export class AppComponent {
  constructor() {}
}