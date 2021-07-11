import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KanbanDragService {

  isDragging = false;
  category;
  issue;

  constructor() { }

  release() {
    this.isDragging = false;
    this.category = null;
    this.issue = null;
  }
}
