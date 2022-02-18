import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[InputNullVacio]'})
export class InputNullVacioDirective {
	
	constructor(private el: ElementRef, private control: NgControl) {}
  
	@HostListener('input', ['$event.target'])
	onEvent(target: HTMLInputElement){
	  	this.control.viewToModelUpdate((target.value === '') ? null : target.value);
	}

}
