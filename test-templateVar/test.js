
/*
Второй способ подключения недостающих шаблонов (которых нет в файле) index.html
Добавляем их в переменную templete файла template.js
И указываем ее в настройках templateVar: template,
Теперь все компоненты создадутся синхронно при инициализации приложения.

При создании роутера таким способом поля first и templatePath можно не указывать, и останентся только поле routComponent
Если данные поля останутся то будут проигнорированы

var routes = {
	
	 ["/"]:  { 
	           routComponent: {
			
					router_main: "home",   //компоненты соответствующие данному роуту
			
				},
	          },
	
	["/"+SITE_NAME+"/"]:  {  
	           routComponent: {
			
					router_main: "home",   //компоненты соответствующие данному роуту
			
				},
	}


*/
var StateMap = {
	
	test_container: {
		
		container: "test_container",
		props: ["variant", "main_text", ],
		methods: {

			
		},		
	},
		//компоненты отображаемые в свойстве variant компонента test_container
		variant_cont_1:{
			container: "variant_cont_1",
			props: ["text", "style"],
			methods: {
			
				
			}			
		},		
		variant_cont_2:{
			container: "variant_cont_2",
			props: ["text", "style", "text2"],
			methods: {
			
				
			}			
		},
     virtualArrayComponents: {
		 
		 variant_arr_3:{ 
			container: "variant_cont_3",
			props: ["text", "style"],
			methods: {
			
				
			}			
		},
 
	 },	 
    stateSettings: {
		///имя переменной из файла template.js
		templateVar: template,
		
	},
	button: {
		container: "button",
		props: [["next", "click", ""]],
		methods: {
			
			next: function(){
				
				var component = this.rootLink.state["test_container"];
				
				if(this.prop == null)this.prop = this.rootLink.stateMethods.changeComponents(component);
				
				var isDone = this.prop.next().done;
				
				if(!isDone){
					console.log(component);
					
					console.log(component.getAllProps());
	
					console.log(component.getAllProps({main_text: "",  variant: {componentName: "", text: ""} }));
	
					console.log(component.getAllProps({main_text: "",  variant: {style: "", text: ""} }));
				}		
			}
		}		
	},
	stateMethods: {
		
		changeComponents: function* (component){
			
			///изменяем отображаемый компонент и сразу устанавливаем ему новые свойства
			yield component.props.variant.setProp({componentName: "variant_cont_2", text: "новый текст 1", text2: "новый текст 2", style: "color: red;"});
			yield component.props.variant.setProp({componentName: "variant_arr_3", text: "новый текст 2",  style: "color: green;"});
			
			
			
			
			
		}
	}
	
}


window.onload = function(){
	
	var HM = new HTMLixState(StateMap);
	
	console.log(HM);
}