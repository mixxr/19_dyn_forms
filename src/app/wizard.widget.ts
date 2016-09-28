import { ObjectLayoutWidget } from "angular2-schema-form";
import { Component } from "@angular/core";

@Component({
	selector: "my-wizard-widget",
	template: require("./wizard.widget.html"),
	styles: [require("./wizard.widget.css")]
})
export class WizardWidget extends ObjectLayoutWidget {
	private currentPage = null;

	ngOnInit() {
		this.currentPage = 0;
		console.log("ww:init");
		 
	}

	goTab(i:number) {
		console.log('curr=',i);
		
		this.currentPage = i;
	}

	nextPage() {
		if (this.hasNextPage())
			++this.currentPage;
	}

	previousPage() {
		if (this.currentPage>0)
			--this.currentPage;
	}

	hasPreviousPage() {
		return this.currentPage > 0;
	}

	hasNextPage() {
		return this.currentPage + 1 < this.schema.formtabs.length;
	}

}
