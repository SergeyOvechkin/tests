
var StateMap = {
	
	test_array: {
		
		container: "test_container",
		props: ["test_group", "main_text", "remove"],
		methods: {
			
						remove: function(){
						
						console.log( this.component() );
						
						this.parent.remove(true);
						
												
					}
			
			
		},		
	},
	virtualArrayComponents: {
		
		group_array_1:{
			container: "group_cont_1",
			props: ["text", "style", "remove"],
			methods: {
					
					remove: function(){
						
						console.log(this.parent.groupParent);
						
						this.parent.remove(true);
						
												
					}
				
			}			
		},			
	}

}


window.onload = function(){
	
	var HM = new HTMLixState(StateMap);
	
	console.log(HM);


}