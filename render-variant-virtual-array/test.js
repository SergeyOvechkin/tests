
var StateMap = {
	
	test_array: {
		
		container: "test_container",
		props: ["variant", "main_text", 'remove'],
		methods: {
			
			remove: function(){
				
				this.parent.remove(true);
				console.log(this.component());
				
			}
			
			
		},		
	},
	virtualArrayComponents: {
		
		var_array_1:{
			container: "variant_cont_1",
			props: ["text", "style"],
			methods: {
			
				
			}			
		},
		var_array_2:{
			container: "variant_cont_2",
			props: ["text", "style", "text2"],
			methods: {
			
				
			}			
		},			
	},
	button: {
		container: "button",
		props: [["next", "click", ""]],
		methods: {
			
			next: function(){
				
				var componentArr = this.rootLink.state["test_array"];
				
				if(this.prop == null)this.prop = this.rootLink.stateMethods.sendResp(componentArr);
				
				var isDone = this.prop.next().done;
				
				if(!isDone){
					console.log(componentArr);
					
					console.log(componentArr.getAll());	
					console.log(componentArr.getAll({main_text: "", variant: {text: "", text2: "", componentName: ""}  }));

				}		
			}
		}		
	},
	stateMethods: {
		
		sendResp: function* (componentArr){
			
			yield componentArr.reuseAll(resp1);
			yield componentArr.reuseAll(resp2);
			yield componentArr.reuseAll(resp3);			
			
		}
	}
}
window.onload = function(){
	
	var HM = new HTMLixState(StateMap);
	
	console.log(HM);
	
}
    ///обновляем массив "test_array" передав данные для свойств контейнеров, а в свойство variant передаем объект с именем виртуального массива для отображаемых элементов,
	///а также данные для свойств
	var resp1 = [
	
	{main_text: "Название 1", variant: {componentName: "var_array_2", text: "оновной текст 1", style: "color: red;", text2: "дополнительный текст1"} },

	{main_text: "название 3", variant: {componentName: "var_array_2", text: "оновной текст 3", style: "color: red;", text2: "дополнительный текст2"} },
	{main_text: "название 2", variant: {componentName: "var_array_1", text: "оновной текст 2", style: "color: yellow;"} },
	{main_text: "название 2", variant: {componentName: "var_array_1", text: "оновной текст 2", style: "color: yellow;"} },
	{main_text: "название 2", variant: {componentName: "var_array_1", text: "оновной текст 2", style: "color: yellow;"} },
	{main_text: "название 3", variant: {componentName: "var_array_2", text: "оновной текст 3", style: "color: red;", text2: "дополнительный текст2"} },
	
	];
	
		var resp2 = [
	
	{main_text: "Название 1", variant: {componentName: "var_array_2", text: "uuuuuuuuu", style: "color: red;", text2: "дополнительный текст1"} },
	{main_text: "название 2", variant: {componentName: "var_array_1", text: "wttwtw", style: "color: yellow;"} },
	{main_text: "название 3", variant: {componentName: "var_array_2", text: "wreyywe", style: "color: red;", text2: "дополнительный текст2"} },
	{main_text: "название 2", variant: {componentName: "var_array_1", text: "ttttt", style: "color: yellow;"} },

	
	
	];
	
		var resp3 = [
	
	{main_text: "Название 1", variant: {componentName: "var_array_2", text: "оновной текст 1", style: "color: red;", text2: "дополнительный текст1"} },
	{main_text: "название 3", variant: {componentName: "var_array_2", text: "оновной текст 3", style: "color: red;", text2: "дополнительный текст2"} },
	{main_text: "название 3", variant: {componentName: "var_array_2", text: "оновной текст 3", style: "color: red;", text2: "дополнительный текст2"} },
	{main_text: "название 2", variant: {componentName: "var_array_1", text: "оновной текст 2", style: "color: yellow;"} },
	{main_text: "название 2", variant: {componentName: "var_array_1", text: "оновной текст 2", style: "color: yellow;"} },
	{main_text: "название 2", variant: {componentName: "var_array_1", text: "оновной текст 2", style: "color: yellow;"} },
	{main_text: "название 2", variant: {componentName: "var_array_1", text: "oooooooooooooo", style: "color: yellow;"} },
	{main_text: "название 3", variant: {componentName: "var_array_2", text: "opuy", style: "color: red;", text2: "дополнительный текст2"} },
	
	];
