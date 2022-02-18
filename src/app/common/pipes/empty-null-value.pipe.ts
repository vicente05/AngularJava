import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'emptyNullValue' })
export class EmptyNullValuePipe implements PipeTransform {

	transform(value: string, ...args: unknown[]): unknown {
		return value.trim().length === 0 ? null : value;
	}

}
