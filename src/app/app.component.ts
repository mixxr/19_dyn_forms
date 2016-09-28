import { Component} from "@angular/core";
import { WidgetRegistry } from "angular2-schema-form";
import { TinyMCEWidget } from "ng2sf-tinymce";

require("style!../bootstrap.min.css");
require("style!./app.css");

@Component({
	selector: "schema-form-demo-app",
	template: require("./app.component.html"),
})
export class AppComponent {
	private schema:any;
	private model:any;
	private actions:any;
	private validators = {};

	setNestedField(obj:any, fieldName:string, fieldValue:any){
		if(obj.properties){
			Object.keys(obj.properties).forEach((p:any)=>this.setNestedField(obj.properties[p],fieldName,fieldValue));
		}else{
			if (fieldName === 'disabled' || fieldName == 'readOnly'){
				if (fieldValue)
					obj[fieldName] = fieldName;
				else
					delete obj[fieldName];
			}else 		
				obj[fieldName] = fieldValue;
		}
			
	}

	inReadOnlyMode:boolean = false;

	constructor(registry: WidgetRegistry) {
		console.log("demo-app:constructor");
		this.schema = require("./sampleschema.json");
		this.model = require("./samplemodel.json");
		
		if (this.schema.mainOperation){
			this.inReadOnlyMode = (this.schema.mainOperation === 'readOnly');
			this.setNestedField(this.schema, "readOnly", this.inReadOnlyMode);
		}			
		this.actions = require("./actions.json");
		if (this.actions)
			Object.keys(this.actions).forEach((k)=>
				this.actions[k] = eval(this.actions[k]));

		registry.register("tinymce", TinyMCEWidget);

		this.validators["/student/id"] = this.validateId;
	}

	validateId(value, property, form) {
		if (value.length === 11) { 
			let list = value.substr(0,10).split('');
			if (list.reduce((p, c, i) => { return p - (i%2 ? +c : -c);}, 0) ) {
				let error = {"INE": {"checksum": "INVALID CHECKSUM"}};
				return error;
			}
		}
		return null;
	}

	onEdit() {
		this.inReadOnlyMode = false;
		this.setNestedField(this.schema, "readOnly", this.inReadOnlyMode);	
	}

	onRead() {
		this.inReadOnlyMode = true;
		this.setNestedField(this.schema, "readOnly", this.inReadOnlyMode);	
	}

}
