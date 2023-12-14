import {
  ChangeDetectionStrategy,
  Component, Input, TemplateRef
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-tooltip',
  standalone: true,
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NgbTooltipModule
  ]
})
export class TooltipComponent {
  @Input() show = false;
  @Input() text: string = '';
  @Input() placement: 'start' | 'end' | 'top' | 'bottom' = 'bottom';
}
