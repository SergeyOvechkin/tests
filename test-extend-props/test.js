///при наследовании отдельных свойств нужно указать имя свойства, тип="extend", имя компонента, 
//а также тип наследуемых свойств: arrayProps - свойства массива, props - свойства контейнера 

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
	test_array: {
		selector: "div:first-of-type",
	/// наследует два свойства props из контейнера test_container
		arrayProps: [  ["main_text", "extend", "test_container", "props"], ["click", "extend", "test_container", "props"] ],
		arrayMethods: {},
		
		container: "test_container_2",	
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
		props: ["text3", 'click3',
                /// наследует два унаследованных свойства arrayProps из компонента test_array 		
				["main_text", "extend", "test_array", "arrayProps"], ["click", "extend", "test_array", "arrayProps"],	

				//и два props из контейнера компонента test_array
				["text2", "extend", "test_array", "props"], ["click2", "extend", "test_array", "props"] 
		],
		methods: {
			
			click3: function(){
				
				var text = this.parent.props.text3.getProp();
				
				this.parent.props.text3.setProp(text + " 3");										
			}
		},		
	},
   
	test_container_4: {
		
		container: "test_container_4",
	
		props: [ "text4", "click4", ["messege", "aux"] ],
		methods: {
			click4: function(){
				
				var text = this.parent.props.text4.getProp();
				    text = this.parent.methods.messege(text);
				
				this.parent.props.text4.setProp(text + " 4");
				
			}, 
			messege: function(mess){
								
				return mess+" auxiliary method";
			}
			
		},		
	},
	
		test_container_5: {
		
		
		container: "test_container_5",		
		//наследует все свойства test_container_3
		container_extend: "test_container_3",
		
		//и два свойства + вспомогательный метод test_container_4
		props: [ ["text4", "extend", "test_container_4", "props"], ["click4", "extend", "test_container_4", "props"], ["messege", "extend", "test_container_4", "props"]  ],
		methods: {
			
		},		
	},
	
	
	
	
}
window.onload = function(){
	
	var HM = new HTMLixState(StateMap);

	console.log(HM);
	
}