
var StateMap = {
	
	test_container: {
		
		container: "test_container",
		props: ["variant", "main_text", "change"],
		methods: {
			change: function(){
				//componentName имя нового компонента
				this.parent.props.variant.setProp({componentName: "variant_arr_2",
                    
					//сразу обновляем контейнеры компонента variant_arr_2 передав в него поле data - массив с объектами, ключи которого имена обновляемых свойств, а данные - данные для этих свойств
					data: [	{text: "новый текст 1", text2: "новый текст 2", style: "color: red;", style_cont: "border: 1px solid red;"},
							{text: "новый текст 3", text2: "новый текст 4", style: "color: blue;", style_cont: "border: 1px solid green;"},

				     ]});
					 
               console.log(this.parent.props.variant.getProp())	;				 
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
		
		variant_arr_2:{
			container: "variant_cont_2",
			props: ["text", "style", "text2", "style_cont"],
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