
const queryFilepath = document.getElementById('queryFilepath')
const queryFilepathInfo = document.getElementById('queryFilepathInfo')

const fileOutputPath = document.getElementById('fileOutputPath')
const fileOutputPathInfo = document.getElementById('fileOutputPathInfo')

const fileOutputName = document.getElementById('fileOutputName')
const checkGroup = document.getElementById('checkGroup')

const search = document.getElementById('search')
const checkmsg = document.getElementById('checkmsg')


const createCheckBox = () => {
	const val = ['pdf', 'excel','txt']
	
	let textdom = ''
	for (let i = 0; i < val.length; i++) {
		textdom += `<div class="form-check my-form-check">
		<input class="form-check-input" type="checkbox" value=".${val[i]}" ${i == 0 ? 'checked' : ''} id="Check${i}">
		<label class="form-check-label" for="Check${i}">
			${val[i]}
			</label>
		</div>`
	}
	checkGroup.innerHTML = textdom
}
const searchfn= ()=>{
	if(!queryFilepathInfo.innerText||!fileOutputPathInfo.innerText){
		checkmsg.style.display = ''
	}else{
		checkmsg.style.display = 'none'
		let noStatistics=[]
		for(let i = 0;i<checkGroup.childNodes.length;i++){
			if(document.getElementById(`Check${i}`).checked){
				noStatistics.push(document.getElementById(`Check${i}`).value)
			}
		}


		window.electronAPI.find(queryFilepathInfo.innerText,fileOutputPathInfo.innerText,noStatistics,fileOutputName.value||fileOutputName.placeholder)
	}
}
window.electronAPI.notice((_event, value) => {
	if(value==1){
		alert('查询完成，已生成结果至目标地址')
	}else if(value==0){
		alert('查询完成，但没有匹配数据')
	}else{
		alert('查询失败')
	}

})
search.addEventListener('click',searchfn)
queryFilepath.addEventListener('click',
	async () => {
		const filePath = await window.electronAPI.openFile()
		queryFilepathInfo.innerText = filePath
	})

fileOutputPath.addEventListener('click',
	async () => {
		const filePath = await window.electronAPI.openFile()
		fileOutputPathInfo.innerText = filePath
	})
	
createCheckBox()