
var resp = [

             {main_text: "контейнер 7", category_title: "категория 1"},
			 {main_text: "контейнер 8", category_title: "категория 1"},
			 {main_text: "контейнер 9", category_title: "категория 1"},
			 {main_text: "контейнер 10", category_title: "категория 2"},
			 {main_text: "контейнер 11", category_title: "категория 3"},
			 {main_text: "контейнер 12", category_title: "категория 4"},
			 {main_text: "контейнер 13", category_title: "категория 4"},
			 {main_text: "контейнер 14", category_title: "категория 4"},
			 {main_text: "контейнер 15", category_title: "категория 5"},
			 {main_text: "контейнер 16", category_title: "категория 5"},
];



var StateMap = {
	
	test_array: {
		selector: "div.array",
		arrayProps: ["select_group_click", "select_group", "category", "pagin"],
		arrayMethods: {
			
			select_group_click: function(){
				
				//получаем value выбранной категории
				var category = this.parent.props.category.getProp();				
				var state = this.rootLink.stateProperties.contaiter_state;

				if(category == "все"){
					
					this.parent.reuseAll(state);
					return;
					
				}else{
					///получаем записи с выбранной категорией
					var newState = state.filter(st=>{ return st.category_title == category });
					
					this.parent.reuseAll(newState);
				}
	
			},
			pagin: function(){
				
				this.rootLink.stateProperties.contaiter_state = resp;
				//обновляем массив test_array с новыми данными из resp
				this.parent.reuseAll(resp);
				
				///отсеиваем повторяющиеся записи по полю 'category_title' чтобы сделать список для select 
				var newCats = this.rootLink.getDifrentFilds(resp, 'category_title');
	
				var select_cats = [];
				newCats.forEach(item=>{  
						select_cats.push({cat_id: item.category_title, category_title: item.category_title })  
				});
				
				newCats = [ {cat_id: "все", category_title: "все"} ].concat(select_cats);
				
				///обновляем группу select_group с созданным новым списком для фильтра по категории
				this.parent.props.select_group.setProp(newCats);
				
				
			}

		},
		container: "test_container",
		props: [  "main_text", "category_title"],
		methods: {
			
			
		},		
	},
	virtualArrayComponents: {
		
		select_array:{
			container: "select_container",
			props: [ ["cat_id", "select", ""], ["category_title", "text", ""] ],
			methods: {
			
				
			}			
		},
			
	},
	stateProperties: {
		
		contaiter_state: [],
		
		
	}

}


window.onload = function(){
	
	var HM = new HTMLixState(StateMap);
	
	HM.stateProperties.contaiter_state = HM.state['test_array'].getAll();
	
	console.log(HM.stateProperties.contaiter_state);
	
	console.log(HM);


}