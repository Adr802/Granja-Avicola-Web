import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  slideIndex = 0;
  slides!: NodeListOf<Element>;
  prevBtn!: HTMLButtonElement;
  nextBtn!: HTMLButtonElement;

  ngOnInit() {
    this.slides = document.querySelectorAll(".slide");
    this.prevBtn = document.querySelector(".prev") as HTMLButtonElement;
    this.nextBtn = document.querySelector(".next") as HTMLButtonElement;
    this.updateButtons();
  }

  showSlide(index: number) {
    this.slides.forEach((slide: Element) => {
      slide.setAttribute('style', `transform: translateX(-${index * 100}%);`);
    });
  }

  prevSlide() {
    if (this.slideIndex > 0) {
      this.slideIndex--;
      this.showSlide(this.slideIndex);
      this.updateButtons();
    }
  }

  nextSlide() {
    if (this.slideIndex < this.slides.length - 1) {
      this.slideIndex++;
      this.showSlide(this.slideIndex);
      this.updateButtons();
    }
  }

  updateButtons() {
    this.prevBtn.classList.toggle("disabled", this.slideIndex === 0);
    this.nextBtn.classList.toggle("disabled", this.slideIndex === this.slides.length - 1);
  }
}

