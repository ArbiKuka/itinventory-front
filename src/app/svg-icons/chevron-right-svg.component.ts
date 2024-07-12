import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chevron-right-svg',
  standalone: true,
  imports: [CommonModule],
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="15px"
    height="15px"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M9 6L15 12L9 18"
      stroke="rgb(23, 63, 83)"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `,
})
export class ChevronRightSvgComponent {}
