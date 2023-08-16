import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isNavbarScrolled: boolean = false;
  isIconLight: boolean = false;
  isScrolling: boolean = false;
  public isNavItemSelected: boolean = false;
  isNavSidebarOpen: boolean = false;
  scrollThreshold = 10;
  imageSource: string = './assets/group.PNG';

  activeLink: string = ''; // Variable to track the active link

  setActiveLink(link: string) {
    this.activeLink = link;
  }

  @ViewChild('blbla', { static: false }) navSidebar!: ElementRef;
  

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isNavbarScrolled = window.pageYOffset > this.scrollThreshold;
    this.isIconLight = this.isNavbarScrolled;
    this.imageSource = this.isNavbarScrolled ? './assets/logohighspeededit-1.png' : './assets/group.PNG';
  }

  @HostListener('window:wheel', [])
  onWindowWheel() {
    // Toggle the scrolling state
    this.isScrolling = true;
  }

  @HostListener('window:click', [])
  onWindowClick() {
    // Reset the scrolling state
    this.isScrolling = false;
  }


  setNavItemColor(isLight: boolean) {
    this.isNavItemSelected = isLight;
  }
 

  toggleNavSidebar() {
    this.isNavSidebarOpen = !this.isNavSidebarOpen;
  }

  setNavItemColorAndClose(isLight: boolean) {
    this.isNavItemSelected = isLight;
    this.isNavSidebarOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const element = this.elementRef.nativeElement.querySelector('.nav-sidebar');
    const button = this.elementRef.nativeElement.querySelector('.buttonTog');

    if (element && !element.contains(event.target) && !button.contains(event.target) && this.isNavSidebarOpen) {
      this.isNavSidebarOpen = false;

    }

  }

  // Attach the click event listener to the entire document
  ngOnInit() {
    this.renderer.listen('document', 'click', (event: Event) => {
      this.onDocumentClick(event as MouseEvent);
    });
  }
}
