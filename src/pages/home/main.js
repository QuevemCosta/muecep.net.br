const submit = document.getElementById('submit')

function removerAcentos(str) {

    return str.normalize("NFD").replace(/[\u0300-\u036f]/, "");
}
function replaceSpaceInPlus(str){

	return str.replace(/\s/g, "+")
}

function creatUrl(local){
	const protocolo = 'https://'

	return `${protocolo}viacep.com.br/ws/${local.uf}/${local.cidade}/${local.rua}/json/`;
}

function validatForm(rawData){

	const {uf, cidade, rua} = rawData

	const data = {
		uf: uf.toUpperCase(),
		cidade: replaceSpaceInPlus(removerAcentos(cidade)),
		rua: replaceSpaceInPlus(removerAcentos(rua))

	}
	return data
}

function renderCep(dataApi){
	const {cep} = dataApi

	const spanEl = document.createElement('span');
	const content = document.createTextNode(`Seu Cep:${cep}`);

	spanEl.appendChild(content);

	const renderData = document.querySelector('.result')
	renderData.appendChild(spanEl)
}

async function send(url){
	 await fetch(url)
	.then(response => response.json()) 
	.then(result => { 
	 
	 const data = result[0];

	 renderCep(data)

	})
	.catch(err => { 
	  
	  console.error('Failed retrieving information', err); 
	});
	
}

function getDataForm(){
	const inputs = document.querySelectorAll('input')
	
	let data = []

	inputs.forEach(function(input){

		const item = input.value

		return data.push(item);
	})

	const rawData = { 
			uf:data[0],
			cidade:data[1],
			rua:data[2]
		} 
	

	const url = creatUrl(validatForm(rawData))
	
	send(url)

	
}

submit.addEventListener('click', getDataForm, false)
