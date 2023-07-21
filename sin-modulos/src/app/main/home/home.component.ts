import { Component } from '@angular/core';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [NgSwitch, NgSwitchDefault, NgSwitchCase]
})
export class HomeComponent {
  title = 'Hola mundo';

  // constructor(private log: LoggerService) {
  //   log.error('Es un error')
  //   log.warn('Es un warn')
  //   log.info('Es un info')
  //   log.log('Es un log')
  // }

  // constructor(private notify: NotificationService) {}
  // ngOnInit(): void {
  //   this.notify.add('Inicio la aplicación', NotificationType.info)
  // }

}
