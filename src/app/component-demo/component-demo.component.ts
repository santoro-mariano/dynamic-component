import {
  Compiler,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  NgModule,
  NgModuleRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AppModule } from '../app.module';

@Directive({
  selector: '[slot=template]',
})
export class ComponentDemoTemplateDirective {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@Component({
  selector: 'component-demo',
  templateUrl: 'component-demo.component.html',
})
export class ComponentDemoComponent {
  private static components = new Array<Type<any>>();

  @ContentChild(ComponentDemoTemplateDirective)
  private readonly templateDirective: ComponentDemoTemplateDirective;

  @ViewChild('componentContainer', { read: ViewContainerRef })
  private readonly container: ViewContainerRef;

  public get template(): string {
    return this.templateDirective?.elementRef?.nativeElement?.innerHTML;
  }

  constructor(
    private readonly compiler: Compiler,
    private readonly module: NgModuleRef<any>
  ) {}

  public async ngAfterViewInit(): Promise<void> {
    const currentModuleType: Type<any> = this.module.instance.constructor;
    const currentModuleMetadata: NgModule = (<any>currentModuleType)
      .decorators[0].args[0];

    const tmpCmp = this.createComponent(this.template);

    const tmpModule = NgModule({
      declarations: [tmpCmp],
      imports: [...(currentModuleMetadata.imports ?? []), currentModuleType],
    })(class {});

    // const moduleRef = await this.compiler.compileModuleAsync(tmpModule);
    const componentRef = this.container.createComponent(tmpCmp);
  }

  public ngOnDestroy(): void {}

  private createComponent(template: string): Type<any> {
    return Component({
      template: template,
    })(class {});
  }
}
