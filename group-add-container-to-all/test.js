
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
	
					console.log(componentArr.getAll({main_text: "",  test_group: {componentName: "", text: ""} }));
	
					console.log(componentArr.getAll({main_text: "",  test_group: { text: ""} }));
				}		
			}
		}		
	},
	stateMethods: {
		
		sendResp: function* (componentArr){
			
			yield componentArr.reuseAll(resp1);
			yield componentArr.reuseAll(resp2);
			yield componentArr.reuseAll(resp3);
			
			///удаление всех элементов группы нулевого контейнера
			componentArr.data[0].props.test_group.removeProp();
			///удаление первого элемента группы первого контейнера
			componentArr.data[1].props.test_group.removeProp(1);
			yield
			
			///удаление первого родительского контейнера
		    componentArr.removeIndex(1, true);
			yield
			///удаление всех родительских контейнеров
		    componentArr.removeAll(true);
			yield
			
			
			
		}
	}

}

	var resp1 = [
	//добавление элемента в конец группы
	{  test_group: {text: "текст 2", style: "color: red;"}    },
	{ test_group: {text: " текст 1", style: "color: blue;"}  },
	
	////////////////добавление элемента в указаную позицию location = 1
	{ test_group: {location: 1, text: " текст 3", style: "color: yellow;"}  },
	
	//создание нового контейнера с одним компонентом группы
	{main_text: "Название 3", test_group:[ {text: " текст 1", style: "color: blue;"},  ]  },
	


	];
	var resp2 = [
    
	////////////////добавление элемента в указаную позицию location = 1
	{  test_group: {location: 1, text: "geghehgeefef", style: "color: red;"}    },
	
	///добавление элемента в конец группы
	{ test_group: {text: " fafaafafs", style: "color: blue;"}  },
	
	
	{ test_group: { text: " affasfsfsasfaf", style: "color: yellow;"}  },
	
	{ test_group: {location: 0, text: " 00000000000000", style: "color: red;"}  },
	
	


	];
	
	var resp3 = [
    

	{  test_group: { text: "----------------", style: "color: green;"}    },
		////////////////добавление элемента в указаную позицию location = 0
	{ test_group: {location: 0, text: " 00000000000000000", style: "color: black;"}  },
	
	
	{ test_group: { text: " affasfsfsasfaf", style: "color: yellow;"}  },
	
	{ test_group: {location: 1, text: " 11111111111111", style: "color: yellow;"}  },
	
	


	];

window.onload = function(){
	
	var HM = new HTMLixState(StateMap);
	
	console.log(HM);

}