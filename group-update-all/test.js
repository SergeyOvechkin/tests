
	
	
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
			yield componentArr.reuseAll(resp3);;
			
			
			
		}
	}

}

    ///если во всех группах используются контейнеры из одного и того-же виртуального массива, то для обновления и создания новой группы его указывать необязательно
	//т.к. при инициализации приложение добавляет ссылку на массив в свойство группы groupArray
	var resp1 = [
	
	{main_text: "Название 1",  test_group: [{text: " текст 1", style: "color: yellow;"}, {text: "текст 2", style: "color: red;"}   ]  },
	{main_text: "Название 3", test_group:[{text: " текст 2", style: "color: blue;"}, {text: "оновной текст ", style: "color: green;"}, {text: "оновной текст gg", style: "color: black;"}    ]  },
	{main_text: "Название 1",  test_group: [{text: " текст 1", style: "color: yellow;"}  ]  },
	{main_text: "Название 3", test_group:[{text: " текст 5", style: "color: blue;"}, {text: "оновной текст 6", style: "color: green;"}, {text: "оновной текст 9", style: "color: red;"}    ]  },
	{main_text: "Название 1",  test_group: [  ]  },	
	];
	
    var resp2 = [
	
	{main_text: "Название 67",  test_group: [{text: " текст 19", style: "color: red;"}, {text: "текст lkk", style: "color: red;"}   ]  },
	{main_text: "Название 56", test_group:[{text: " текст 20", style: "color: black;"}, {text: "оновной khh ", style: "color: green;"}, {text: "оновной текст gg", style: "color: black;"}    ]  },
	
	];
	
		var resp3 = [
	
	{main_text: "Название 44",  test_group: [{text: " текст 5", style: "color: yellow;"}, {text: "текст 89", style: "color: red;"}   ]  },
	{main_text: "Название 78", test_group:[{text: " текст 6", style: "color: blue;"}, {text: "оновной текст kj ", style: "color: green;"}, {text: "оновной текст uu", style: "color: black;"}    ]  },
	{main_text: "Название 87",  test_group: [{text: " текст 7", style: "color: yellow;"}  ]  },
	{main_text: "Название 90", test_group:[{text: " текст 9", style: "color: blue;"}, {text: "оновной текст 90", style: "color: green;"}, {text: "оновной текст dg", style: "color: red;"}    ]  },

	];


window.onload = function(){
	
	var HM = new HTMLixState(StateMap);
	
	console.log(HM);

}