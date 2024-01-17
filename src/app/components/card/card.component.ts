import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() product: any;

  heartIconSrc = 'assets/heart.png';
  isHeartClicked = false;

  toggleHeart() {
    this.isHeartClicked = !this.isHeartClicked;
    this.heartIconSrc = this.isHeartClicked ? 'assets/red-heart.png' : 'assets/heart.png';
  }
}