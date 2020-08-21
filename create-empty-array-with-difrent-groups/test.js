
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
	fetchComponents: {	
		
		///указывается для загрузки шаблонов виртуальных массивов, виртуальные массивы в данный объект не помещяются
	},
    stateSettings: {
		
		templatePath: "./template.html"
		
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
     //создание контейнера с грруппой из виртуального массива "group_array_1"
	var resp1 = [
	
	{main_text: "Название 1",  test_group: {componentName: "group_array_1", group:[{text: "оновной текст 1", style: "color: yellow;"}, {text: "оновной текст 2", style: "color: red;"}   ] } },

	];
	
	///добавление элемента в группу  первого контейнера на позицию 1, и создание второго контейнера с группой из массива "group_array_2"
		var resp2 = [
	{test_group: {location: 1, text: "111111111111111111111111111", style: "color: blue;"} },	
	
	{main_text: "Название 2", test_group: {componentName: "group_array_2", group:[{text: "оновной текст 1", text2: "дополнительный текст1", style: "color: red;"} , {text: "оновной текст 2", text2: "дополнительный текст2", style: "color: blue;"}   ] } },

	];
	
	//обновление группы первого и второго контейнера, и создание третьего контейнера с группой из массива  group_array_2
	var resp3 = [
	
	{test_group: [{text: "новый оновной текст 1", style: "color: yellow;"}, {text: "новый основной текст 2", style: "color: red;"}   ]} ,
	{test_group: [{text: "новый оновной текст 1", text2: "дополнительный текст3", style: "color: red;"} , {text: "новый основной текст 2", text2: "дополнительный текст4", style: "color: blue;"}   ]},	
	
	{main_text: "Название 3", test_group: {componentName: "group_array_2", group:[{text: "оновной текст gg", text2: "дополнительный текст2", style: "color: blue;"}, {text: "оновной текст gg", text2: "дополнительный текст5", style: "color: green;"}, {text: "оновной текст gg", text2: "дополнительный текст6", style: "color: blue;"}   ] } },
	
	];


window.onload = function(){
	
	var HM = new HTMLixState(StateMap);
	
	console.log(HM);

}