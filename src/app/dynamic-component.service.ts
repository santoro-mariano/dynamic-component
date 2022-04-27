import { Injectable } from '@angular/core';

@Injectable({ provideIn: 'root' })
export class DynamicComponentService {
  private module: Type<any>;

  constructor() {
    this.createDynamicModule();
  }

  private createDynamicModule(): void {
    const tmpModule = NgModule({
      declarations: [tmpCmp],
      imports: [...(currentModuleMetadata.imports ?? []), currentModuleType],
    })(class {});
    tmpModule.;
  }
}
