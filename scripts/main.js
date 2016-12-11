import angular from 'angular';
import ngRoute from 'angular-route';

import AppComponent from './components/app/app.component';
import ContentComponent from './components/content/content.component';

angular.module('app', [
  'ngRoute'
])
.component('app', AppComponent)
.component('content', ContentComponent);