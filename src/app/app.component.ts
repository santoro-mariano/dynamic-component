import {
  Compiler,
  Component,
  ElementRef,
  Injector,
  NgModule,
  NgModuleRef,
  TemplateRef,
  Type,
  VERSION,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AppModule } from './app.module';
import { ComponentFactory } from './helpers/component-factory';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  constructor(
    private _compiler: Compiler,
    private _injector: Injector,
    private _m: NgModuleRef<any>
  ) {}

  ngAfterViewInit(): void {
    // console.log((<any>this.testTemplate)._declarationTContainer.)
    // const result = this.searchString(this.testTemplate, '#testTemplate');
    // console.log(result);
    // this.testDynamicComponentType = Component({
    //   templateUrl: 'test.template.html',
    // })(class DynamicComponent {});
    // const template = '<span>generated on the fly: {{name}}</span>';
    // console.log(this.template);
    const testComponent = ComponentFactory.createComponent(
      'test1.template.html'
    );
    console.log((<any>testComponent).decorators);
  }

  // private objectQueue = new Array<object>();

  // private searchString<T>(
  //   object: T,
  //   text: string,
  //   path = ''
  // ): Map<string, string> {
  //   const result = new Map<string, string>();
  //   for (let prop in object) {
  //     try {
  //       const propValue = object[prop];
  //       if (typeof propValue === 'string' && propValue.includes(text)) {
  //         result.set(path, propValue);
  //       }

  //       if (
  //         typeof propValue === 'object' &&
  //         this.objectQueue.indexOf(propValue as any) === -1
  //       ) {
  //         this.objectQueue.push(propValue as any);
  //         this.searchString(propValue, text, `${path}.${prop}`).forEach(
  //           (value, key) => result.set(key, value)
  //         );
  //       }
  //     } catch {}
  //   }
  //   return result;
  // }
}

declare let Reflect: any;
export function getAnnotation(typeOrFunc: Type<any>): any | null {
  // Prefer the direct API.
  if ((<any>typeOrFunc).annotations) {
    let annotations = (<any>typeOrFunc).annotations;
    if (typeof annotations === 'function' && annotations.annotations) {
      annotations = annotations.annotations;
    }
    return annotations[0];
  }

  // API of tsickle for lowering decorators to properties on the class.
  if ((<any>typeOrFunc).decorators) {
    return convertTsickleDecoratorIntoMetadata((<any>typeOrFunc).decorators)[0];
  }

  // API for metadata created by invoking the decorators.
  if (Reflect && Reflect.getOwnMetadata) {
    return Reflect.getOwnMetadata('annotations', typeOrFunc)[0];
  }
  return null;
}

function convertTsickleDecoratorIntoMetadata(
  decoratorInvocations: any[]
): any[] {
  if (!decoratorInvocations) {
    return [];
  }
  return decoratorInvocations.map((decoratorInvocation) => {
    const decoratorType = decoratorInvocation.type;
    const annotationCls = decoratorType.annotationCls;
    const annotationArgs = decoratorInvocation.args
      ? decoratorInvocation.args
      : [];
    return new annotationCls(...annotationArgs);
  });
}
