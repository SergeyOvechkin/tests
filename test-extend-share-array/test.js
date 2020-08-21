
var StateMap = {
	
	test_array: {
		
		container: "test_container",
		
		///разрешает унаследовать только первые два свойства "main_text", ["click"
		///если не указать то унаследует все свойства
		share_props: 2,
		props: [ "main_text", ["click", "click", "button:first-of-type"], ["hover", "mouseover", ""] ],
		methods: {
			
			click: function(){
				
				var text = this.parent.props.main_text.getProp();
				
				this.parent.props.main_text.setProp(text + " 1");
				
			},
			hover: function(){
				
				var text = this.parent.props.main_text.getProp();
				
				this.parent.props.main_text.setProp(text + " 2");
				
			}
		},		
	},
	test_array_2: {
		
		container: "test_container_2",
		
		///наследует свойства контейнера - компонента test_array, 
		//здесь указывается имя компонента из контейнера которого будут унаследованы свойства, 
		//если бы это был контейнер из виртуального массива, нужно указать имя виртуального массива
		container_extend: "test_array",
		
		///и добавляет два своих "text2", ['click2'
		props: ["text2", ['click2', "click", "[data-test_container_2-text2='text']"] ],
		methods: {
			
			click2: function(){
				
				var text2 = this.parent.props.text2.getProp();
				
				this.parent.props.text2.setProp(text2 + " 2");			
				
				
			}

		},		
	},
	

}


window.onload = function(){
	
	var HM = new HTMLixState(StateMap);

	console.log(HM);
	
}