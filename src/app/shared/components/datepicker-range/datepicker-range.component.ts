import {
  ChangeDetectionStrategy,
  Component, EventEmitter, inject, Input, Output,
} from '@angular/core';
import {
  NgbCalendar, NgbDate,
  NgbDateParserFormatter,
  NgbDatepickerModule
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-datepicker-range',
  standalone: true,
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgbDatepickerModule]
})
export class DatepickerRangeComponent {
  private readonly calendar = inject(NgbCalendar);
  public readonly formatter = inject(NgbDateParserFormatter);

  // ------------------------ //

  @Input() toDate: NgbDate | null = null;
  @Input() fromDate: NgbDate | null = null;

  @Output() changed = new EventEmitter<[number | null, number | null]>();

  public hoveredDate: NgbDate | null = null;

  public onDateSelected(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    const fromDate = this.fromDate &&
      new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day).getTime() || null;
    const toDate = this.toDate &&
      new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day).getTime() || null;

    this.changed.emit([fromDate, toDate]);
  }

  public onReset() {
    this.toDate = null;
    this.fromDate = null;

    this.changed.emit([this.fromDate , this.toDate ]);
  }

  public isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  public isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  public isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  public validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
