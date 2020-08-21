
var StateMap = {
	
	test_array: {
		
		container: "test_container",
		props: ["test_group", "main_text","remove"],
		methods: {
			
			remove: function(){
				
				this.parent.remove(true);
				console.log(this.component());
				
			}
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
		group_array_3:{
			container: "group_cont_3",
			props: ["text", "style", "img"],
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
					
					///здесь в каждом объекте содержится имя виртуального массива componentName тогда как в обычной группе оно было отдельно для всех контейнеров группы
					
					console.log(componentArr.getAll());
	
					console.log(componentArr.getAll({main_text: "", test_group: {text: "", img: ""} }));
	
					console.log(componentArr.getAll({main_text: "",  test_group: {componentName: "", text: "", text2: ""} }));
				}		
			}
		}		
	},
	stateMethods: {
		
		sendResp: function* (componentArr){
			
			yield componentArr.reuseAll(resp1);
			yield componentArr.reuseAll(resp2);
			
			///удаляем из первого контейнера пунк группы с индексом = 1
			componentArr.data[0].props.test_group.removeProp(1);
			yield 
			
			
			
		}
	}
	
	
	
}
    ///обновляем группу первого контейнера и создаем второй контейнер с пустой группой
	var resp1 = [
	///здесь в каждом объекте - элементе группы указываем имя виртуального массива componentName
	{ test_group: [{componentName: "group_array_1", text: "новый текст 1", style: "color: yellow;"}, {componentName: "group_array_2", text: "новый текст 2", text2: "новый текст 2",  style: "color: red;"}, {componentName: "group_array_3", text: "новый текст 3", img: "./img2.jpg",},   ] },
	{main_text: "Название 2", test_group: [ ]},

	];
	///добавляем контейнер массива group_array_3 в группу первого контейнера на позицию location = 1 и добавляем два контейнера в пустую группу второго контейнера
	var resp2 = [
		{ test_group:	{componentName: "group_array_3", location: 1, text: "1111111111111", img: "./imag.png",} },
		
		{ test_group:	[{componentName: "group_array_3",  text: "000000000", img: "./imag.png",}, {componentName: "group_array_3",  text: "1111111111111", img: "./img2.jpg",}] },
		

	];
	


window.onload = function(){
	
	var HM = new HTMLixState(StateMap);
	
	console.log(HM);

}