import { Component } from '@angular/core';
import { LoggerService } from '@my/core';
import { NotificationService, NotificationType } from './common-services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hola mundo';

  // constructor(private log: LoggerService) {
  //   log.error('Es un error')
  //   log.warn('Es un warn')
  //   log.info('Es un info')
  //   log.log('Es un log')
  // }

  constructor(private notify: NotificationService) {}
  ngOnInit(): void {
    this.notify.add('Inicio la aplicación', NotificationType.info)
  }
}
