import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input, OnDestroy,
  OnInit, TemplateRef,
  ViewContainerRef
} from "@angular/core";
import {TooltipComponent} from "../components/tooltip/tooltip.component";

@Directive({
  selector: 'button[disabled][tooltip]',
  standalone: true
})
export class TooltipForDisabledBtnDirective implements OnInit, OnDestroy {
  private readonly vcr = inject(ViewContainerRef);
  private readonly el = inject(ElementRef);

  // --------------- //

  @Input() tooltipText: string | TemplateRef<any> = '';
  @Input() tooltipPlacement = 'bottom';
  @Input('disabled')
  set disabled(val: boolean) {
    const el = this.el.nativeElement;
    if(val) {
      el.setAttribute('disabled', val);
    } else {
      el.removeAttribute('disabled');
    }

    this.componentRef?.setInput('show', val);
  }

  private componentRef: ComponentRef<any> | undefined;

  ngOnInit() {
    this.create();
  }

  ngOnDestroy() {
    this.componentRef?.destroy();
  }

  private create(): void {
    this.componentRef = this.vcr.createComponent(TooltipComponent, {
      projectableNodes: [[this.el.nativeElement]],
    });

    this.componentRef.setInput('text', this.tooltipText);
    this.componentRef.setInput('placement', this.tooltipPlacement);
  }
}
