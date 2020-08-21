
var StateMap = {
	
	test_container: {
		
		container: "test_container",
		props: ["variant", "main_text", "change"],
		methods: {
			change: function(){
				
				//меняем отображаемый компонент в свойстве, не обновляя его
				this.parent.props.variant.setProp("variant_cont_2");
				
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