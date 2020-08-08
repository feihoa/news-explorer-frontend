import { BaseComponent } from "./BaseComponent";

export class MobileMenu extends BaseComponent {
  constructor() {
    super();
  }
  toggle(elemChange, elemClass) {
    if (elemChange.classList.contains(elemClass)) {
      elemChange.classList.remove(elemClass);
    } else {
      elemChange.classList.add(elemClass);
    }
  }
}
