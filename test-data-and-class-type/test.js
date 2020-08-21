
var StateMap = {
	
	test_container: {
		
		container: "test_container",
		//первые три свойства указываем обычным способом, с помощью data свойств, а вторые два с помощью селекторов
		props: [ "main_text", "data_key", "data", ["data_key2", "data", "p:last-of-type"], ["classes", "class", "p:last-of-type"]  ],
		methods: {
			
			
		},		
	},

}


window.onload = function(){
	
	var HM = new HTMLixState(StateMap);

	console.log(HM);
	
    console.log(HM.state["test_container"].props.data_key.getProp());
	
	HM.state["test_container"].props.data_key.setProp("557");
	
	 console.log(HM.state["test_container"].props.data_key.getProp());
	
	console.log(HM.state["test_container"].props.data.getProp());

	console.log(HM.state["test_container"].props.data_key2.getProp());
	
	console.log(HM.state["test_container"].props.classes.getProp());
	
	///удаляем все классы из свойства classes и устанавливаем новые из массива
	
	HM.state["test_container"].props.classes.setProp(["four", "five"]);
	
	console.log(HM.state["test_container"].props.classes.getProp());
	
	///добавляем класс в свойство classes 
	
	HM.state["test_container"].props.classes.setProp("six");
	
	console.log(HM.state["test_container"].props.classes.getProp());
}