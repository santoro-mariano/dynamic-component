import { Component, Type } from '@angular/core';

export class ComponentFactory {
  public static createComponent(templateUrl: string): Type<any> {
    return Component({ templateUrl: templateUrl })(class {});
  }
}
