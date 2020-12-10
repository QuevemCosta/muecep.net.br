const submit = document.getElementById('submit')

function creatUrl(local){
	const protocolo = 'https://'

	console.log(local.rua)
	return `${protocolo}viacep.com.br/ws/${local.uf}/${local.cidade}/${local.rua}/json/`;
}

function getDataForm(){
	const inputs = document.querySelectorAll('input')
	
	let data = []

	inputs.forEach(function(input){

		const item = input.value

		return data.push(item);
	})

	const local = { 
			uf:data[0],
			cidade:data[1],
			rua:data[2]
			} 
		
		const url = creatUrl(local)
		
		console.log(url)
}

submit.addEventListener('click', getDataForm, false)