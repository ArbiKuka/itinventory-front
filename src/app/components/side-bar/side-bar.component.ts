import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChevronRightSvgComponent } from '../../svg-icons/chevron-right-svg.component';
import { ChevronLeftSvgComponent } from '../../svg-icons/chevron-left-svg.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, ChevronRightSvgComponent, ChevronLeftSvgComponent],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {}
