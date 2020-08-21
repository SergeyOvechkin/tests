
////при создании цепочки наследований наследуемые компоненты в описании приложения должны располагаться в той последовательности в которой
//они наследуют свойства. Если переместить контейнер test_container_3 и зданного примера вверх списка, он не унаследует свойства первого контейнера
//т.к. инициализируется раньше test_container_2 в котором еще нет свойств из контейнера test_container

///при использовании fetchComponents наследование свойств от уже унаследованных компонентов, может вести себя непредсказуемо,
///поэтому лучше загружать недостающие шаблоны с помощью stateSettings:{ templateVar: templ,} 

/// в контейнере сначала создаются унаследованные свойства, а затем собственные свойства, это необходимо  учитывать при объявлении share_props 

var StateMap = {
	
	test_container: {
		
		container: "test_container",
		props: [ "main_text", "click" ],
		methods: {
			
			click: function(){
				
				var text = this.parent.props.main_text.getProp();
				
				this.parent.props.main_text.setProp(text + " 1");
				
			},
		},		
	},
	test_container_2: {
		
		container: "test_container_2",
		container_extend: "test_container",
		//share_props: 2,
		/// добавляет два свойства "text2", ['click2'
		props: ["text2", 'click2', ],
		methods: {
			
			click2: function(){
				
				var text = this.parent.props.text2.getProp();
				
				this.parent.props.text2.setProp(text + " 2");			
							
			}
		},		
	},
	test_container_3: {
		
		container: "test_container_3",
		container_extend: "test_container_2",
		
		///добавляет два своих "text3", ['click3'
		props: ["text3", 'click3' ],
		methods: {
			
			click3: function(){
				
				var text = this.parent.props.text3.getProp();
				
				this.parent.props.text3.setProp(text + " 3");			
								
			}
		},		
	},
}
window.onload = function(){
	
	var HM = new HTMLixState(StateMap);

	console.log(HM);
	
}