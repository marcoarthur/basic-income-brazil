// exportin data for test
module.exports = {
	data : { 
		tests : [ 
			{ 
				question: "question A",
				text: "Question A ?",
				type: "text",
				properties: {
					tip : "A tip",
				},
				answered: false
			},
			{
				question: "question B",
				text: "Question B ?",
				type: "radio",
				properties: {
					choices: () => {
						return [ 'a','b', 'c', 'd', 'e'].map( (v) => ( { value: v, label: 'is ' + v } ) )
					},
					group: 'qq',
					tip: "A tip"
				},
				answered: false
			},
			{ 
				question: "question C",
				text: "Question C ?",
				type: "text",
				properties: {
					tip : "A tip",
				},
				answered: false
			},
		]
	},

	required: {
		questions: [
			{
				question: "idade",
				text: "maior de 18 anos de idade ?",
				type: "radio",
				properties: {
					choices: () => {
						return [ 'Sim','Não'].map( (v) => ( { value: v, label: v } ) )
					},
					group: "age",
					tip: "Necessário ser Maior",
				},
				answered: false
			},
			{
				question: "emprego",
				text: "tem emprego formal?",
				type: "radio",
				properties: {
					choices: () => {
						return [ 'Sim','Não'].map( (v) => ( { value: v, label: v } ) )
					},
					group: "employed",
					tip: "Não",
				},
				answered: false
			},
			{
				question: "renda",
				text: "Recebe benefício previdenciário ou assistencial, seguro-desemprego ou de outro programa de transferência de renda federal, excepto Bolsa Família?",
				type: "radio",
				properties: {
					choices: () => {
						return [ 'Sim','Não'].map( (v) => ( { value: v, label: v } ) )
					},
					group: "employed",
					tip: "Não",
				},
				answered: false
			}
		]
	}



}
