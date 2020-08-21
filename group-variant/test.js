
var StateMap = {
	
	test_array: {
		
		container: "test_container",
		props: ["test_group", "main_text"],
		methods: {
			
			
		},		
	},
	virtualArrayComponents: {
		
		group_array_1:{
			container: "group_cont_1",
			props: ["text", "style"],
			methods: {
			
				
			}			
		},
		group_array_2:{
			container: "group_cont_2",
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
	
					console.log(componentArr.getAll({main_text: "", test_group: {text: "", text2: ""} }));
	
					console.log(componentArr.getAll({main_text: "",  test_group: {componentName: "", text: "", text2: ""} }));
				}		
			}
		}		
	},
	stateMethods: {
		
		sendResp: function* (componentArr){
			
			yield componentArr.reuseAll(resp1);
			yield componentArr.reuseAll(resp2);
			yield componentArr.reuseAll(resp3);;
			
			
			
		}
	}
	
	
	
}
    //т.к в каждом контейнере у нас используются группы из разных виртуальных массивов, то при создании контейнеров и обновлении необходимо указать 
	//виртуальный массив к которому они относятся - componentName, а сами объекты помещаются в поле group
	var resp1 = [
	
	{main_text: "Название 1",  test_group: {componentName: "group_array_1", group:[{text: "оновной текст 2", style: "color: yellow;"}, {text: "оновной текст gg", style: "color: red;"}   ] } },
	{main_text: "Название 2", test_group: {componentName: "group_array_2", group:[{text: "оновной текст 3", text2: "дополнительный текст3", style: "color: red;"} , {text: "оновной текст 4", text2: "дополнительный текст4", style: "color: blue;"}   ] } },
	{main_text: "Название 3", test_group: {componentName: "group_array_1", group:[{text: "оновной текст 2", style: "color: yellow;"}, {text: "оновной текст gg", style: "color: red;"}, {text: "оновной текст gg", style: "color: black;"}    ] } },
	{main_text: "Название 4", test_group: {componentName: "group_array_2", group:[{text: "оновной текст gg", text2: "дополнительный текст2", style: "color: blue;"}, {text: "оновной текст gg", text2: "дополнительный текст5", style: "color: green;"}, {text: "оновной текст gg", text2: "дополнительный текст6", style: "color: blue;"}   ] } },
	
	];
	
		var resp2 = [
	{main_text: "Название yyte", test_group: {componentName: "group_array_2", group:[{text: "оновной текст 5235", text2: "дополнительный текст2", style: "color: green;"}, {text: "оновной jgj", text2: "дополнительнfh", style: "color: green;"}, {text: "оновной sgsgg", text2: "дополнительный текст6", style: "color: blue;"}   ] } },	
	{main_text: "Название yu",  test_group: {componentName: "group_array_1", group:[{text: "оновной текст 435", style: "color: red;"}, {text: "оновной текст gg", style: "color: black;"}   ] } },

	];
	
		var resp3 = [
	
	{main_text: "Название 1",  test_group: {componentName: "group_array_1", group:[{text: "оновной текст 2", style: "color: yellow;"}, {text: "оновной текст gg", style: "color: red;"}   ] } },
	{main_text: "Название 3", test_group: {componentName: "group_array_1", group:[{text: "оновной текст 2", style: "color: yellow;"}, {text: "оновной текст gg", style: "color: red;"}, {text: "оновной текст gg", style: "color: black;"}    ] } },
	{main_text: "Название 2", test_group: {componentName: "group_array_2", group:[{text: "оновной текст 3", text2: "дополнительный текст3", style: "color: red;"} , {text: "оновной текст 4", text2: "дополнительный текст4", style: "color: blue;"}   ] } },	
	{main_text: "Название 4", test_group: {componentName: "group_array_2", group:[{text: "оновной текст gg", text2: "дополнительный текст2", style: "color: blue;"}, {text: "оновной текст gg", text2: "дополнительный текст5", style: "color: green;"}, {text: "оновной текст gg", text2: "дополнительный текст6", style: "color: blue;"}   ] } },
	
	];


window.onload = function(){
	
	var HM = new HTMLixState(StateMap);
	
	console.log(HM);

}