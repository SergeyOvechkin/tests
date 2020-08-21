
var StateMap = {
	
	test_container: {
		
		container: "test_container",
		props: ["variant", "main_text", "change"],
		methods: {
			change: function(){
				//меняем отображаемый компонент и обновляем сразу его свойства, где componentName имя обновляемого компонента
				this.parent.props.variant.setProp({componentName: "variant_cont_2", text: "новый текст 1", text2: "новый текст 2", style: "color: red;"});
				
				 console.log(this.parent.props.variant.getProp());
			}
			
		},		
	},
		
		variant_cont_1:{
			container: "variant_cont_1",
			props: ["text", "style"],
			methods: {
			
				
			}			
		},
		
	fetchComponents: {
		
		variant_cont_2:{
			container: "variant_cont_2",
			props: ["text", "style", "text2"],
			methods: {
			
				
			}			
		},	
	},
    stateSettings: {
		
		templatePath: "./template.html"
		
	}	
}


window.onload = function(){
	
	var HM = new HTMLixState(StateMap);
	
	console.log(HM);
}