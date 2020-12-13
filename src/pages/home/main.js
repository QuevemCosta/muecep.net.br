const submit = document.getElementById('submit')

function removerAcentos(str) {

    return str.normalize("NFD").replace(/[\u0300-\u036f]/, "");
}
function replaceSpaceInPlus(str){

	return str.replace(/\s/g, "%20")
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


function renderData(dataApi){

	const renderData = document.querySelector('.result');

	if(dataApi){
		const {cep,bairro, localidade,uf ,logradouro} = dataApi


		const articleEl = document.createElement('article');

		const localidadeEl = document.createElement('h2');
		const addressEl = document.createElement('p');
		const cepEl = document.createElement('strong');

		const addressContent = document.createTextNode(`Bairro: ${bairro} | Logradouro: ${logradouro}`);
		const contentLocalidade = document.createTextNode(`${localidade}-${uf}`);
		const contentCep = document.createTextNode(`CEP: ${cep}`);

		addressEl.appendChild(addressContent)
		localidadeEl.appendChild(contentLocalidade);
		cepEl.appendChild(contentCep);

		articleEl.appendChild(localidadeEl);
		articleEl.appendChild(addressEl)
		articleEl.appendChild(cepEl);

		
		renderData.appendChild(articleEl);
	}
	
	else{
		
	}
}
function errMsg (){
		const renderData = document.querySelector('.result');
	
		let divEl = document.createElement('div');
		let contenDiv = document.createTextNode('CEP não encontrado, verifique se os dados estão corretos')
		
		divEl.appendChild(contenDiv)

		renderData.appendChild(divEl)
}

async function send(url){
	 await fetch(url)
	.then(response => response.json()) 
	.then(result => { 
	 console.log(result)

	if (result.length > 0) {
	 		result.map(function(data){
		 	console.log('ok')
			
			renderData(data);
		})
	}
	else{
		errMsg()
	}


	 

	})
	.catch(err => { 
	  
	  console.error('Failed retrieving information', err); 
	});
	
}
function clearResult(){
	const result = document.querySelector('.result');
	return result.innerHTML = ''
}
function getDataForm(){

	clearResult()

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
