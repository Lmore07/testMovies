import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableHeader } from '../../libs/interfaces/generalInterface';
import { ButtonComponent } from '../button/button.component';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent, PaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() headers: TableHeader[] = [];
  @Input() pageSize: number = 10;
  @Input() totalCount: number = 0;
  @Input() totalPages: number = 0;
  @Output() viewItem = new EventEmitter<any>();
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<number>();

  currentPage: number = 0;

  onPageChange(event: any) {
    this.currentPage = event.page;
    console.log(event);
    this.pageChange.emit(event.page+1);
  }

  get pages(): number[] {
    const pagesArray = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }

  onView(item: any) {
    this.viewItem.emit(item);
  }

  onEdit(item: any) {
    this.editItem.emit(item);
  }

  onDelete(item: any) {
    this.deleteItem.emit(item);
  }
}
