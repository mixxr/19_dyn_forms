import { ObjectLayoutWidget } from "angular2-schema-form";
import { Component } from "@angular/core";

@Component({
	selector: "my-wizard-widget",
	template: `
	<button (click)="previousPage()" class="btn btn-default wizardBtn" [attr.disabled]="!hasPreviousPage()?true:null"> &lt; </button>
	<div class="wizardContent container"> <!-- form -->
		<form class="form-horizontal" role="form">
		<span *ngFor="let formtab of schema.formtabs; let i=index">
			<fieldset *ngIf="currentPage === i"> <!-- tab -->
			<div class="row">
				<span class="col-xs-12"><legend *ngIf="formtab.title">Tab: {{formtab.title}}</legend></span>
			</div>
			<span *ngFor="let field of formtab.fields">
					<h4 *ngIf="field.title">{{field.title}}</h4>
					<formelement  [formProperty]="formProperty.getProperty(field.id)"  [formRendering]="field.rows">
					</formelement>
			</span>
			</fieldset>
		</span>
		</form>
	</div>
	<button (click)="nextPage()" class="btn btn-default wizardBtn" [attr.disabled]="!hasNextPage()?true:null"> &gt; </button>
	`,
	styles: [require("./wizard.widget.css")]
})
export class WizardWidget extends ObjectLayoutWidget {
	private currentPage = null;

	ngOnInit() {
		this.currentPage = 0;
		console.log("ww:init");
		 
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
