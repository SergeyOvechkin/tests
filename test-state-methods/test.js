///test stateMethods
///по умолчанию this в stateMethods методах указывает на rootLink
//если необходимо, его можно переопределить с помощью функции call(this)
///переопределить контекст - this можно только объектами htmlix: HTMLixState, HTMLixArray, Container, все виды Prop и EventEmiter
//если переопределить другим объектом контекст не помменяется.	
	
var StateMap = {
	
	test_container: {
		
		container: "test_container",
		props: [ ["click", "click", "p"] ],
		methods: {
			
			click: function(){
				
				this.rootLink.stateMethods.testMethod_1(); ///вызвали вариант по умолчанию this указывает на rootLink
				
				this.rootLink.stateMethods.testMethod_1.call(this); //переопределили контекст метода
				
				
				///вызов с аргументами
				this.rootLink.stateMethods.testMethod_2(1, "2");
				
				this.rootLink.stateMethods.testMethod_2.call(this, 123, "новый контекст");
				
				
				
				//пробуем переопределить другим объектом (контекст не поменяется)
				this.rootLink.stateMethods.testMethod_2.call({test: "test"}, "контекст остался rootLink", "");
                
				//сокращенный вариант
				
                // this.$methods("testMethod_1")();
				
                //this.$methods("testMethod_1").call(this);	
				
			}
		}		
	},
	stateMethods: {
		
		testMethod_1: function(){
			
			console.log(this);			
		},
		
		
		testMethod_2: function(arg1, arg2){
			
			console.log(arg1, arg2, this);			
		}
		
	}
	
}
window.onload = function(){
	
	var HM = new HTMLixState(StateMap);
	
	//console.log(HM);

}