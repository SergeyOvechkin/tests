
var StateMap = {
	
	test_array: {
		
		container: "test_container",
		props: [ "main_text"],
		methods: {
			
			
		},		
	},

}


window.onload = function(){
	
	var HM = new HTMLixState(StateMap);

	console.log(HM);
	
	window.setTimeout(function(){
		
		//меняем последовательность контейнеров в массиве "test_array" 
		
		HM.state["test_array"].order([1,3,0,2]);
		
		//выводим контейнеры массива "test_array" в консоль
		console.log(HM.state["test_array"].data)
		
	}, 3000);

	
}