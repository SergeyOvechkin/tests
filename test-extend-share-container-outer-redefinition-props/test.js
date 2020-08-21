
var StateMap = {
	
	test_container: {
		
		container: "test_container",
		
		///разрешает унаследовать только первые два свойства "main_text", ["click"
		share_props: 2,
		
		props: [ "main_text", "click", ["hover", "mouseover", ""] ],
		methods: {
			
			click: function(){
				
				var text = this.parent.props.main_text.getProp();
				
				this.parent.htmlLink.removeAttribute("data-test_container") 
				
				this.parent.props.main_text.setProp(text + " 1");
				
			},
			hover: function(){
				
				var text = this.parent.props.main_text.getProp();
				
				this.parent.props.main_text.setProp(text + " 2");
				
			}
		},		
	},
	test_container_2: {
		
		container: "test_container_2",
		
		///наследует свойства контейнера - компонента test_container, 
		container_extend: "test_container",
		
		///переопределяет унаследованное свойство ckick 
		props: ["text2", ['click', "click", "[data-test_container_2-text2='text']"] ],
		methods: {
			
			click: function(){
				
				var text = this.parent.props.main_text.getProp();
				
				this.parent.props.main_text.setProp(text + " 2");							
				
			}

		},		
	},
	

}


window.onload = function(){
	
	var HM = new HTMLixState(StateMap);

	console.log(HM);
	
}