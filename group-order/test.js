
	
	
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
			
			//меняем последовательность контейнеров вгруппе и html разметке
			componentArr.data[0].props.test_group.order([3,2,1,0]);
			yield 
			componentArr.data[0].props.test_group.order([0,2,3,1]);
			yield 
			
			
		}
	}

}



window.onload = function(){
	
	var HM = new HTMLixState(StateMap);
	
	console.log(HM);

}