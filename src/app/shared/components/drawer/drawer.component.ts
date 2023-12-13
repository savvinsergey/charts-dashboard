import {
  ChangeDetectionStrategy,
  Component, inject, TemplateRef, ViewChild,
} from '@angular/core';
import {NgbOffcanvas, NgbOffcanvasModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-drawer',
  standalone: true,
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgbOffcanvasModule
  ]
})
export class DrawerComponent {
  private offCanvasService = inject(NgbOffcanvas);

  // ---------------- //

  @ViewChild('drawer') drawer!: TemplateRef<any>

  public open() {
    this.offCanvasService.open(this.drawer);
  }

  public close() {
    this.offCanvasService.dismiss();
  }
}
