import AppComponent from './app.component';
import { LoginComponent } from './login/login';
import { provide } from 'angular2/core';
import {
  describe,
  expect,
  it,
  inject,
  beforeEach,
  beforeEachProviders } from 'angular2/testing';
import {
  Router,
  RouteRegistry,
  RouterOutlet,
  ROUTER_PRIMARY_COMPONENT } from 'angular2/router';
import { Location } from 'angular2/platform/common';
import { SpyLocation } from 'angular2/router/testing';
import { RootRouter } from 'angular2/src/router/router';

describe('AppComponent', () => {
  let location: Location, router: Router;

  // We override the Router and Location providers and its own dependencies
  // in order to instantiate a fixture router to trigger routing actions
  // and a location spy to inspect the URL state
  beforeEachProviders(() => [
    RouteRegistry,
    provide(Location, { useClass: SpyLocation }),
    provide(Router, { useClass: RootRouter }),
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: AppComponent })
  ]);

  // We instantiate Router and Location objects before each test
  beforeEach(inject([Router, Location], (_router, _location) => {
    router = _router;
    location = _location;
  }));

  // Specs with assertions
  it('should be able to navigate to the main tasks component', done => {
    // We navigate to a component and check the resulting state in the URL
    router.navigate(['TasksComponent'])
      .then(() => {
        expect(location.path()).toBe('/tasks');
        done();
      })
      .catch(e => done.fail(e));
  });

  it('should be able to navigate to the login component', done => {
    // We navigate to an URL and check the resulting state in the URL
    router.navigateByUrl('/login').then(() => {
      expect(router.currentInstruction.component.componentType).toBe(LoginComponent);
      done();
    }).catch(e => done.fail(e));
  });

  it('should redirect users to the main tasks component from root', done => {
    // We navigate to an URL and check the resulting state in the URL
    router.navigateByUrl('/').then(() => {
      expect(location.path()).toBe('/tasks');
      done();
    }).catch(e => done.fail(e));
  });
});
